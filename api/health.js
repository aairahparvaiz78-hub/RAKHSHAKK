"use strict";

const database = require("../lib/supabase");

module.exports = async function health(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }
  try {
    await database.ping();
    return response.status(200).json({ connected: true, mode: "supabase", database: "ready" });
  } catch (error) {
    return response.status(error.message.includes("not configured") ? 503 : 502).json({
      connected: false,
      mode: "supabase",
      error: error.message
    });
  }
};
