"use strict";

function normalizeBaseUrl(value) {
  let parsed;
  try {
    parsed = new URL(String(value || "").trim());
  } catch {
    throw new Error("SUPABASE_URL must be the project URL from Supabase settings.");
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error("SUPABASE_URL must start with https://.");
  }
  parsed.pathname = parsed.pathname.replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
  parsed.search = "";
  parsed.hash = "";
  return parsed.toString().replace(/\/+$/, "");
}

function configuration() {
  const configuredUrl = process.env.SUPABASE_URL || "";
  const secret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!configuredUrl || !secret) {
    throw new Error("Supabase is not configured. Add SUPABASE_URL and SUPABASE_SECRET_KEY to the Vercel project.");
  }
  const baseUrl = normalizeBaseUrl(configuredUrl);
  return { baseUrl, secret };
}

async function request(resource, method, payload, prefer) {
  const { baseUrl, secret } = configuration();
  const headers = { apikey: secret, Accept: "application/json" };
  if (!secret.startsWith("sb_secret_")) headers.Authorization = "Bearer " + secret;
  const options = { method: method || "GET", headers };
  if (payload !== undefined) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(payload);
  }
  if (prefer) headers.Prefer = prefer;
  const response = await fetch(baseUrl + "/rest/v1/" + resource, options);
  const body = await response.text();
  if (!response.ok) {
    throw new Error("Supabase returned HTTP " + response.status + ": " + body.slice(0, 400));
  }
  return body ? JSON.parse(body) : null;
}

async function ping() {
  await request("rakhshak_app_state?select=state_key&limit=1");
}

async function getState() {
  const rows = await request(
    "rakhshak_app_state?state_key=eq.active&select=payload,updated_at&limit=1"
  );
  return rows && rows.length ? { state: rows[0].payload, updatedAt: rows[0].updated_at } : null;
}

async function saveState(state) {
  await request(
    "rakhshak_app_state?on_conflict=state_key",
    "POST",
    { state_key: "active", payload: state, updated_at: new Date().toISOString() },
    "resolution=merge-duplicates,return=minimal"
  );
}

async function listObservations() {
  return await request(
    "rakhshak_observations?select=*&order=observed_at.desc&limit=500"
  ) || [];
}

async function addObservation(row) {
  await request(
    "rakhshak_observations?on_conflict=id",
    "POST",
    row,
    "resolution=merge-duplicates,return=minimal"
  );
}

async function saveForecasts(rows) {
  await request(
    "rakhshak_forecasts?on_conflict=id",
    "POST",
    rows,
    "resolution=merge-duplicates,return=minimal"
  );
}

module.exports = { normalizeBaseUrl, ping, getState, saveState, listObservations, addObservation, saveForecasts };
