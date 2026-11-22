"use strict";

const MODEL_VERSION = "glofas-screening-v1";

function coordinates(village) {
  if (Number.isFinite(Number(village.latitude)) && Number.isFinite(Number(village.longitude))) {
    return { latitude: Number(village.latitude), longitude: Number(village.longitude) };
  }
  const label = String(village.district || "");
  const match = label.match(/(-?\d+(?:\.\d+)?)\s*°?\s*N[\s,;]+(-?\d+(?:\.\d+)?)\s*°?\s*E/i);
  return match ? { latitude: Number(match[1]), longitude: Number(match[2]) } : null;
}

function locationList(rows) {
  return Array.isArray(rows) ? rows : rows ? [rows] : [];
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(8500) });
  const body = await response.text();
  if (!response.ok) throw new Error("Forecast provider returned HTTP " + response.status);
  return JSON.parse(body);
}

async function fetchModelData(locations) {
  const usable = locations.map((point, index) => ({ point, index })).filter((entry) => entry.point);
  if (!usable.length) return { weather: [], flood: [], weatherError: "No village coordinates", floodError: "No village coordinates" };
  const latitude = usable.map((entry) => entry.point.latitude).join(",");
  const longitude = usable.map((entry) => entry.point.longitude).join(",");
  const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
  weatherUrl.searchParams.set("latitude", latitude);
  weatherUrl.searchParams.set("longitude", longitude);
  weatherUrl.searchParams.set("hourly", "precipitation");
  weatherUrl.searchParams.set("forecast_hours", "72");
  weatherUrl.searchParams.set("timezone", "GMT");

  const floodUrl = new URL("https://flood-api.open-meteo.com/v1/flood");
  floodUrl.searchParams.set("latitude", latitude);
  floodUrl.searchParams.set("longitude", longitude);
  floodUrl.searchParams.set("daily", "river_discharge,river_discharge_mean,river_discharge_p75");
  floodUrl.searchParams.set("forecast_days", "7");
  floodUrl.searchParams.set("timezone", "GMT");

  const [weatherResult, floodResult] = await Promise.allSettled([
    fetchJson(weatherUrl),
    fetchJson(floodUrl)
  ]);
  const weather = Array(locations.length).fill(null);
  const flood = Array(locations.length).fill(null);
  const weatherRows = weatherResult.status === "fulfilled" ? locationList(weatherResult.value) : [];
  const floodRows = floodResult.status === "fulfilled" ? locationList(floodResult.value) : [];
  usable.forEach((entry, index) => {
    weather[entry.index] = weatherRows[index] || null;
    flood[entry.index] = floodRows[index] || null;
  });
  return {
    weather,
    flood,
    weatherError: weatherResult.status === "rejected" ? weatherResult.reason.message : "",
    floodError: floodResult.status === "rejected" ? floodResult.reason.message : ""
  };
}

function rainfall(weather, hours, nowMs) {
  const times = weather && weather.hourly && weather.hourly.time || [];
  const values = weather && weather.hourly && weather.hourly.precipitation || [];
  let total = 0;
  let count = 0;
  const end = nowMs + hours * 60 * 60 * 1000;
  for (let index = 0; index < Math.min(times.length, values.length); index += 1) {
    const label = String(times[index]);
    const millis = Date.parse(label.endsWith("Z") ? label : label + "Z");
    const amount = Number(values[index]);
    if (Number.isFinite(millis) && millis >= nowMs - 60 * 60 * 1000 && millis < end && Number.isFinite(amount)) {
      total += amount;
      count += 1;
    }
  }
  return { mm: Math.round(total * 10) / 10, available: count > 0 };
}

function dischargeSeries(flood) {
  const daily = flood && flood.daily || {};
  const preferred = daily.river_discharge_p75 || daily.river_discharge_mean || daily.river_discharge || [];
  return preferred.map((value) => value === null || value === undefined ? null : Number(value));
}

function dischargeRise(values, day) {
  if (values.length <= day || !Number.isFinite(values[0]) || values[0] <= 0) return null;
  return Math.round(((values[day] - values[0]) / values[0]) * 100);
}

function category(score) {
  if (score >= 85) return "Severe";
  if (score >= 65) return "High";
  if (score >= 40) return "Elevated";
  return "Monitor";
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function latestRealObservation(rows, villageId) {
  return rows.find((row) =>
    String(row.village_id || row.villageId || "") === String(villageId) &&
    !Boolean(row.is_simulated ?? row.isSimulated)
  ) || null;
}

function buildVillageForecast(village, observation, weather, flood, generatedAt) {
  const base = clamp(Number(village.risk ?? 30), 0, 100);
  const isolation = String(village.access || "").toLowerCase().includes("isolation") ? 8 : 0;
  const point = coordinates(village);
  const rain6 = rainfall(weather, 6, Date.now());
  const rain24 = rainfall(weather, 24, Date.now());
  const rain72 = rainfall(weather, 72, Date.now());
  const discharge = dischargeSeries(flood);
  const rise24 = dischargeRise(discharge, 1);
  const rise72 = dischargeRise(discharge, 3);
  const hasWeather = rain6.available || rain24.available || rain72.available;
  const hasFlood = discharge.length > 1;

  const measuredRiverRise = observation ? Number(observation.river_rise_cm_hr || 0) : 0;
  const soil = observation ? Number(observation.soil_saturation_pct || 0) : 0;
  const soilSignal = Math.min(10, soil * 0.1);
  const baseline = base * 0.32;
  const river6 = Math.min(6, Math.max(0, measuredRiverRise) * 2);
  const river24 = rise24 === null ? river6 : Math.min(25, Math.max(0, rise24) * 0.18);
  const river72 = rise72 === null ? river24 : Math.min(25, Math.max(0, rise72) * 0.15);
  const rainSignal6 = rain6.available ? Math.min(25, rain6.mm * 0.48) : 0;
  const rainSignal24 = rain24.available ? Math.min(25, rain24.mm * 0.24) : 0;
  const rainSignal72 = rain72.available ? Math.min(28, rain72.mm * 0.1) : 0;
  const scores = {
    "6h": Math.round(clamp(baseline + rainSignal6 + river6 + soilSignal + isolation, 0, 100)),
    "24h": Math.round(clamp(baseline + rainSignal24 + river24 + soilSignal + isolation, 0, 100)),
    "72h": Math.round(clamp(baseline + rainSignal72 + river72 + soilSignal + isolation, 0, 100))
  };
  const horizons = {};
  for (const [key, score] of Object.entries(scores)) {
    horizons[key] = { riskIndex: score, category: category(score) };
  }

  const drivers = ["Demo village baseline: " + Math.round(base) + "/100"];
  if (rain6.available) drivers.push("Forecast rainfall next 6h: " + rain6.mm + " mm");
  if (rain24.available) drivers.push("Forecast rainfall next 24h: " + rain24.mm + " mm");
  if (rain72.available) drivers.push("Forecast rainfall next 72h: " + rain72.mm + " mm");
  if (rise24 !== null) drivers.push("GloFAS discharge change, 24h: " + (rise24 > 0 ? "+" : "") + rise24 + "%");
  if (rise72 !== null) drivers.push("GloFAS discharge change, 72h: " + (rise72 > 0 ? "+" : "") + rise72 + "%");
  if (observation && Number.isFinite(measuredRiverRise)) {
    drivers.push("Field river trend: " + measuredRiverRise + " cm/hour");
  }
  if (isolation) drivers.push("Village access is marked at risk of isolation");

  const sources = [];
  if (hasWeather) sources.push("Open-Meteo precipitation forecast");
  if (hasFlood) sources.push("GloFAS river-discharge forecast");
  if (observation) sources.push("field reading");
  if (!sources.length) sources.push("forecast feeds unavailable · baseline only");
  const confidence = hasWeather && hasFlood
    ? "Low · global models, no local gauge"
    : hasWeather || hasFlood
      ? "Low · partial model coverage"
      : "Low · baseline only";
  return {
    id: "forecast-" + String(village.id || "village"),
    villageId: String(village.id || ""),
    villageName: String(village.name || "Unknown village"),
    access: String(village.access || "Access unverified"),
    baselineRisk: Math.round(base),
    observedAt: generatedAt,
    source: sources.join(" + "),
    isSimulated: !hasWeather && !hasFlood && !observation,
    confidence,
    drivers,
    horizons,
    generatedAt,
    modelVersion: MODEL_VERSION,
    dataQuality: {
      location: point ? "Approximate village coordinate; nearest model grid cell" : "No village coordinate",
      weatherAvailable: hasWeather,
      riverModelAvailable: hasFlood,
      localGaugeAvailable: Boolean(observation)
    }
  };
}

async function buildOutlooks(villages, observations) {
  const points = villages.map(coordinates);
  const data = await fetchModelData(points);
  const generatedAt = new Date().toISOString();
  const forecasts = villages.map((village, index) =>
    buildVillageForecast(
      village,
      latestRealObservation(observations, village.id),
      data.weather[index] || null,
      data.flood[index] || null,
      generatedAt
    )
  ).sort((a, b) => b.horizons["24h"].riskIndex - a.horizons["24h"].riskIndex);
  return {
    forecasts,
    generatedAt,
    notice: "Experimental flood-screening index, not a probability or official warning. GloFAS uses an approximate 5 km river grid; check local gauges and official alerts.",
    modelVersion: MODEL_VERSION,
    providerErrors: { weather: data.weatherError, flood: data.floodError }
  };
}

module.exports = { buildOutlooks, MODEL_VERSION };
