"use strict";

const database = require("./supabase");
const { buildOutlooks } = require("./flood-outlook");

async function refreshForecasts() {
  const snapshot = await database.getState();
  if (!snapshot || !snapshot.state || typeof snapshot.state !== "object") {
    const error = new Error("Save the incident state before generating village outlooks.");
    error.statusCode = 409;
    throw error;
  }
  const villages = Array.isArray(snapshot.state.villages) ? snapshot.state.villages : [];
  if (!villages.length) {
    return { forecasts: [], notice: "No villages are configured.", modelVersion: "glofas-screening-v1" };
  }
  const observations = await database.listObservations();
  const result = await buildOutlooks(villages, observations);
  const rows = result.forecasts.map((row) => ({
    id: row.id,
    village_id: row.villageId,
    village_name: row.villageName,
    generated_at: row.generatedAt,
    horizons: row.horizons,
    confidence: row.confidence,
    source: row.source,
    is_simulated: row.isSimulated,
    model_version: row.modelVersion
  }));
  await database.saveForecasts(rows);
  return result;
}

module.exports = { refreshForecasts };
