"use strict";

const { randomUUID } = require("node:crypto");
const database = require("../lib/supabase");

function numeric(body, key, min, max) {
  const value = Number(body[key]);
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new Error(key + " must be a number between " + min + " and " + max + ".");
  }
  return value;
}

module.exports = async function observationsRoute(request, response) {
  try {
    if (request.method === "GET") {
      return response.status(200).json({ observations: await database.listObservations() });
    }
    if (request.method !== "POST") {
      response.setHeader("Allow", "GET, POST");
      return response.status(405).json({ error: "Method not allowed." });
    }
    const body = request.body || {};
    const snapshot = await database.getState();
    if (!snapshot) return response.status(409).json({ error: "Save the incident before adding readings." });
    const villageId = String(body.villageId || "").trim();
    const village = (snapshot.state.villages || []).find((item) => String(item.id) === villageId);
    if (!village) return response.status(400).json({ error: "Choose a village from this incident." });
    const source = String(body.source || "Manual field observation").trim().slice(0, 100);
    if (!source) return response.status(400).json({ error: "Add the source of the observation." });
    const observation = {
      id: "obs-" + randomUUID(),
      village_id: villageId,
      village_name: String(village.name),
      observed_at: new Date().toISOString(),
      rainfall_6h_mm: numeric(body, "rainfall6hMm", 0, 1000),
      rainfall_24h_mm: numeric(body, "rainfall24hMm", 0, 3000),
      river_level_cm: numeric(body, "riverLevelCm", 0, 100000),
      river_rise_cm_hr: numeric(body, "riverRiseCmHr", -100, 100),
      soil_saturation_pct: numeric(body, "soilSaturationPct", 0, 100),
      source,
      is_simulated: Boolean(body.isSimulated)
    };
    await database.addObservation(observation);
    return response.status(201).json({ saved: true, observation });
  } catch (error) {
    return response.status(error.statusCode || 400).json({ error: error.message, mode: "supabase" });
  }
};
