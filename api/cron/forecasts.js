"use strict";

const { refreshForecasts } = require("../../lib/forecast-service");

module.exports = async function scheduledForecasts(request, response) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.authorization !== "Bearer " + secret) {
    return response.status(401).json({ error: "Scheduled forecast access is not authorized." });
  }
  try {
    const result = await refreshForecasts();
    return response.status(200).json({
      refreshedAt: result.generatedAt,
      villages: result.forecasts.length,
      modelVersion: result.modelVersion
    });
  } catch (error) {
    return response.status(error.statusCode || 503).json({ error: error.message });
  }
};
