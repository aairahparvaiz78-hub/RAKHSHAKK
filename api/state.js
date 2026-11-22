"use strict";

const database = require("../lib/supabase");

module.exports = async function stateRoute(request, response) {
  try {
    if (request.method === "GET") {
      return response.status(200).json(await database.getState() || { state: null });
    }
    if (request.method === "PUT") {
      const body = request.body;
      const state = body && body.state;
      if (!state || typeof state !== "object" || !Array.isArray(state.villages)) {
        return response.status(400).json({ error: "A valid Rakhshak state with villages is required." });
      }
      await database.saveState(state);
      return response.status(200).json({ saved: true, mode: "supabase", updatedAt: new Date().toISOString() });
    }
    response.setHeader("Allow", "GET, PUT");
    return response.status(405).json({ error: "Method not allowed." });
  } catch (error) {
    return response.status(error.statusCode || 503).json({ error: error.message, mode: "supabase" });
  }
};
