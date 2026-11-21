"use strict";

const { refreshForecasts } = require("../lib/forecast-service");

module.exports = async function forecastsRoute(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }
  try {
    response.setHeader("Cache-Control", "no-store");
    return response.status(200).json(await refreshForecasts());
  } catch (error) {
    return response.status(error.statusCode || 503).json({
      error: error.message || "Could not generate the flood outlook.",
      mode: "supabase"
    });
  }
};
