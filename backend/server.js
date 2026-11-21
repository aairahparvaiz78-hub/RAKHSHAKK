"use strict";

// Local API for Rakhshak. SQLite and the HTTP server use Node built-ins;
// optional Supabase credentials are read only by this server.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { randomUUID } = require("node:crypto");
const { DatabaseSync } = require("node:sqlite");
const { buildOutlooks } = require("../lib/flood-outlook");
const { normalizeBaseUrl } = require("../lib/supabase");

const ROOT = path.resolve(__dirname, "..");
const DB_FILE = path.join(__dirname, "data", "rakhshak.sqlite3");
const MAX_BODY_BYTES = 1_000_000;

function loadEnv() {
  for (const file of [path.join(ROOT, ".env"), path.join(__dirname, ".env")]) {
    if (!fs.existsSync(file)) continue;
    for (const raw of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith("#") || !line.includes("=")) continue;
      const index = line.indexOf("=");
      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim().replace(/^["']|["']$/g, "");
      if (key && process.env[key] === undefined) process.env[key] = value;
    }
  }
}

const now = () => new Date().toISOString();

class SQLiteStore {
  mode = "sqlite";

  constructor() {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    this.db = new DatabaseSync(DB_FILE);
    this.db.exec("PRAGMA journal_mode=WAL");
    this.db.exec(
      "CREATE TABLE IF NOT EXISTS app_state (state_key TEXT PRIMARY KEY, payload TEXT NOT NULL, updated_at TEXT NOT NULL);" +
      "CREATE TABLE IF NOT EXISTS observations (id TEXT PRIMARY KEY, village_id TEXT NOT NULL, village_name TEXT NOT NULL, observed_at TEXT NOT NULL, rainfall_6h_mm REAL NOT NULL, rainfall_24h_mm REAL NOT NULL, river_level_cm REAL NOT NULL, river_rise_cm_hr REAL NOT NULL, soil_saturation_pct REAL NOT NULL, source TEXT NOT NULL, is_simulated INTEGER NOT NULL DEFAULT 0);" +
      "CREATE INDEX IF NOT EXISTS observations_village_time ON observations(village_id, observed_at DESC);" +
      "CREATE TABLE IF NOT EXISTS forecasts (id TEXT PRIMARY KEY, village_id TEXT NOT NULL, village_name TEXT NOT NULL, generated_at TEXT NOT NULL, horizons TEXT NOT NULL, confidence TEXT NOT NULL, source TEXT NOT NULL, is_simulated INTEGER NOT NULL, model_version TEXT NOT NULL);"
    );
  }

  ping() {
    this.db.prepare("SELECT 1").get();
  }

  getState() {
    const row = this.db.prepare(
      "SELECT payload, updated_at FROM app_state WHERE state_key='active'"
    ).get();
    return row ? { state: JSON.parse(row.payload), updatedAt: row.updated_at } : null;
  }

  saveState(state) {
    this.db.prepare(
      "INSERT INTO app_state(state_key,payload,updated_at) VALUES('active',?,?) " +
      "ON CONFLICT(state_key) DO UPDATE SET payload=excluded.payload,updated_at=excluded.updated_at"
    ).run(JSON.stringify(state), now());
  }

  listObservations() {
    return this.db.prepare(
      "SELECT * FROM observations ORDER BY observed_at DESC LIMIT 500"
    ).all().map((row) => ({ ...row, is_simulated: Boolean(row.is_simulated) }));
  }

  addObservation(row) {
    this.db.prepare(
      "INSERT INTO observations VALUES (:id,:village_id,:village_name,:observed_at,:rainfall_6h_mm,:rainfall_24h_mm,:river_level_cm,:river_rise_cm_hr,:soil_saturation_pct,:source,:is_simulated)"
    ).run({ ...row, is_simulated: Number(row.is_simulated) });
  }

  saveForecasts(rows) {
    const statement = this.db.prepare(
      "INSERT INTO forecasts VALUES (:id,:village_id,:village_name,:generated_at,:horizons,:confidence,:source,:is_simulated,:model_version) " +
      "ON CONFLICT(id) DO UPDATE SET village_name=excluded.village_name,generated_at=excluded.generated_at,horizons=excluded.horizons,confidence=excluded.confidence,source=excluded.source,is_simulated=excluded.is_simulated,model_version=excluded.model_version"
    );
    for (const row of rows) {
      statement.run({ ...row, horizons: JSON.stringify(row.horizons), is_simulated: Number(row.is_simulated) });
    }
  }
}

class SupabaseStore {
  mode = "supabase";

  constructor(baseUrl, secretKey) {
    this.baseUrl = normalizeBaseUrl(baseUrl);
    this.secretKey = secretKey;
  }

  async request(resource, method, payload, prefer) {
    const headers = { apikey: this.secretKey, Accept: "application/json" };
    // Current sb_secret keys use apikey only; legacy service-role JWTs also
    // require the bearer header.
    if (!this.secretKey.startsWith("sb_secret_")) {
      headers.Authorization = "Bearer " + this.secretKey;
    }
    const options = { method: method || "GET", headers };
    if (payload !== undefined) {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(payload);
    }
    if (prefer) headers.Prefer = prefer;
    const response = await fetch(this.baseUrl + "/rest/v1/" + resource, options);
    const text = await response.text();
    if (!response.ok) {
      throw new Error("Supabase returned HTTP " + response.status + ": " + text.slice(0, 500));
    }
    return text ? JSON.parse(text) : null;
  }

  async ping() {
    await this.request("rakhshak_app_state?select=state_key&limit=1");
  }

  async getState() {
    const rows = await this.request(
      "rakhshak_app_state?state_key=eq.active&select=payload,updated_at&limit=1"
    );
    return rows && rows.length ? { state: rows[0].payload, updatedAt: rows[0].updated_at } : null;
  }

  async saveState(state) {
    await this.request(
      "rakhshak_app_state?on_conflict=state_key",
      "POST",
      { state_key: "active", payload: state, updated_at: now() },
      "resolution=merge-duplicates,return=minimal"
    );
  }

  async listObservations() {
    return await this.request(
      "rakhshak_observations?select=*&order=observed_at.desc&limit=500"
    ) || [];
  }

  async addObservation(row) {
    await this.request(
      "rakhshak_observations?on_conflict=id",
      "POST",
      row,
      "resolution=merge-duplicates,return=minimal"
    );
  }

  async saveForecasts(rows) {
    await this.request(
      "rakhshak_forecasts?on_conflict=id",
      "POST",
      rows,
      "resolution=merge-duplicates,return=minimal"
    );
  }
}

function makeStore() {
  const url = (process.env.SUPABASE_URL || "").trim();
  const secret = (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  return url && secret ? new SupabaseStore(url, secret) : new SQLiteStore();
}

function sendJson(response, status, value) {
  const body = Buffer.from(JSON.stringify(value));
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": body.length,
    "Cache-Control": "no-store"
  });
  response.end(body);
}

async function readJson(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new Error("Request body is too large.");
    chunks.push(chunk);
  }
  if (!size) throw new Error("Request body is empty.");
  let body;
  try {
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new Error("Request body must contain valid JSON.");
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new Error("Request body must be a JSON object.");
  }
  return body;
}

async function handleApi(request, response, store, url) {
  try {
    if (request.method === "GET" && url.pathname === "/api/health") {
      await store.ping();
      return sendJson(response, 200, { connected: true, mode: store.mode, database: "ready" });
    }
    if (request.method === "GET" && url.pathname === "/api/state") {
      return sendJson(response, 200, await store.getState() || { state: null });
    }
    if (request.method === "GET" && url.pathname === "/api/observations") {
      return sendJson(response, 200, { observations: await store.listObservations() });
    }
    if (request.method === "GET" && url.pathname === "/api/forecasts") {
      const snapshot = await store.getState();
      if (!snapshot || !snapshot.state || typeof snapshot.state !== "object") {
        return sendJson(response, 409, { error: "Load the incident state before forecasting." });
      }
      const villages = snapshot.state.villages || [];
      if (!villages.length) return sendJson(response, 200, { forecasts: [], notice: "No villages are configured." });
      const result = await buildOutlooks(villages, await store.listObservations());
      const forecasts = result.forecasts;
      await store.saveForecasts(forecasts.map((row) => ({
        id: row.id,
        village_id: row.villageId,
        village_name: row.villageName,
        generated_at: row.generatedAt,
        horizons: row.horizons,
        confidence: row.confidence,
        source: row.source,
        is_simulated: row.isSimulated,
        model_version: row.modelVersion
      })));
      return sendJson(response, 200, {
        forecasts,
        notice: result.notice,
        modelVersion: result.modelVersion,
        providerErrors: result.providerErrors
      });
    }
    if (request.method === "PUT" && url.pathname === "/api/state") {
      const payload = await readJson(request);
      const state = payload.state;
      if (!state || typeof state !== "object" || !Array.isArray(state.villages)) {
        return sendJson(response, 400, { error: "A valid Rakhshak state with villages is required." });
      }
      await store.saveState(state);
      return sendJson(response, 200, { saved: true, mode: store.mode, updatedAt: now() });
    }
    if (request.method === "POST" && url.pathname === "/api/observations") {
      const body = await readJson(request);
      const snapshot = await store.getState();
      if (!snapshot) return sendJson(response, 409, { error: "Save the incident before adding readings." });
      const villageId = String(body.villageId || "").trim();
      const village = (snapshot.state.villages || []).find((item) => String(item.id) === villageId);
      if (!village) return sendJson(response, 400, { error: "Choose a village from this incident." });
      const number = (name, min, max) => {
        const value = Number(body[name]);
        if (!Number.isFinite(value)) throw new Error(name + " must be a number.");
        if (value < min || value > max) throw new Error(name + " must be between " + min + " and " + max + ".");
        return value;
      };
      const source = String(body.source || "Manual observation").trim().slice(0, 100);
      if (!source) return sendJson(response, 400, { error: "Add the source of the observation." });
      const observation = {
        id: "obs-" + randomUUID(),
        village_id: villageId,
        village_name: String(village.name),
        observed_at: now(),
        rainfall_6h_mm: number("rainfall6hMm", 0, 1000),
        rainfall_24h_mm: number("rainfall24hMm", 0, 3000),
        river_level_cm: number("riverLevelCm", 0, 100000),
        river_rise_cm_hr: number("riverRiseCmHr", -100, 100),
        soil_saturation_pct: number("soilSaturationPct", 0, 100),
        source,
        is_simulated: Boolean(body.isSimulated)
      };
      await store.addObservation(observation);
      return sendJson(response, 201, { saved: true, observation });
    }
    return sendJson(response, 404, { error: "API route not found." });
  } catch (error) {
    return sendJson(response, request.method === "GET" ? 503 : 400, {
      error: error.message || "Backend request failed.",
      mode: store.mode
    });
  }
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

async function serveStatic(request, response, url) {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    return response.end();
  }
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    response.writeHead(400);
    return response.end("Bad request");
  }
  if (pathname === "/backend" || pathname.startsWith("/backend/") ||
      pathname.split("/").some((part) => part.startsWith("."))) {
    response.writeHead(404);
    return response.end("Not found");
  }
  let file = path.resolve(ROOT, "." + pathname);
  const relative = path.relative(ROOT, file);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    response.writeHead(403);
    return response.end("Forbidden");
  }
  try {
    if (fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    const data = await fs.promises.readFile(file);
    response.writeHead(200, {
      "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream",
      "Content-Length": data.length,
      "Cache-Control": "no-cache"
    });
    response.end(request.method === "HEAD" ? undefined : data);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

async function main() {
  loadEnv();
  const store = makeStore();
  const port = Number(process.env.PORT || 8000);
  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url, "http://localhost");
    if (url.pathname.startsWith("/api/")) {
      await handleApi(request, response, store, url);
    } else {
      await serveStatic(request, response, url);
    }
  });
  server.listen(port, "127.0.0.1", () => {
    console.log("Rakhshak is running at http://localhost:" + port);
    console.log("Database mode: " + store.mode);
    if (store.mode === "sqlite") {
      console.log("Local database: " + DB_FILE);
      console.log("Set SUPABASE_URL and SUPABASE_SECRET_KEY in backend/.env for Supabase.");
    }
  });
}

main().catch((error) => {
  console.error("Could not start the Rakhshak backend:", error.message);
  process.exitCode = 1;
});
