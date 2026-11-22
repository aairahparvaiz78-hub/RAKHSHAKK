# Rakshak

A responsive disaster-response prototype with a Node.js API, a SQLite database by default, optional Supabase storage and a warm espresso, cream, orange and rescue-red interface. It opens on a public homepage with a centered editorial headline, animated satellite orbit, four glass feature cards, your flood-community photo, and a prominent SOS action. Each destination has its own HTML route and page-layout JavaScript file. There is no build step or third-party JavaScript dependency.

## Run it

1. Install Node.js 22.13 or newer if it is not already installed.
2. Open the extracted project folder in Cursor.
3. Choose **Terminal → New Terminal** and run **node backend/server.js**.
4. Open http://localhost:8000. The backend serves both the website and its API.
<<<<<<< HEAD
5. By default, it creates a local SQLite database at backend/data/Rakshak.sqlite3. No packages need to be installed.
=======
5. By default, it creates a local SQLite database at backend/data/rakhshak.sqlite3. No packages need to be installed.
6. Live flood outlooks need an internet connection. If a model feed is unavailable, the dashboard identifies the result as baseline-only.
>>>>>>> c6fb400426897a8e758b31e8f6b9f88e8ec9a94a

## Backend and flood outlook

The local Node server uses SQLite. The Vercel deployment uses serverless functions in the api folder and Supabase for persistent storage. The dashboard's 6, 24 and 72 hour outlook requests current hourly precipitation forecasts and GloFAS river-discharge forecasts through Open-Meteo, then combines those signals with the prototype's village baseline and access context. Manual field readings can add local river and soil context.

To enable cloud storage, create a Supabase project and run backend/schema.sql in its SQL Editor. Add the Supabase Project URL and SUPABASE_SECRET_KEY as private environment variables to both Vercel and Render if both services will use the database. Use the project URL shown in Supabase settings, not the Supabase Dashboard URL. A URL ending in /rest/v1 is accepted. Never put the secret key in browser code, GitHub, or a public .env file.

This is a low-confidence flood screening index, not a flood probability, trained or validated prediction, official warning, or evacuation instruction. Open-Meteo's [Flood API](https://open-meteo.com/en/docs/flood-api) uses GloFAS river forecasts on an approximate 5 km grid and may select a nearby river rather than the intended village river. The demo's village baselines and coordinates are illustrative. Check local gauge readings and official CWC/IMD warnings before acting. Open-Meteo attribution is shown in the dashboard; its free API is for non-commercial use.

## Vercel setup

1. In Supabase, run backend/schema.sql once in the SQL Editor.
2. In Vercel, open the project settings and add SUPABASE_URL and SUPABASE_SECRET_KEY for Production, Preview and Development.
3. Add CRON_SECRET with a long random value to protect the scheduled forecast refresh.
4. Push the updated project to the GitHub repository connected to Vercel. Vercel should build the /api functions and redeploy the site.
5. Open /api/health on the deployed domain. It should return connected=true and mode=supabase. Then open the dashboard and use Refresh outlook.

The dashboard refreshes the outlook when requested. A daily Vercel Cron refresh is also configured in vercel.json. The API reads its database key only on the server.

## Render setup

If Render's `/api/health` reports Supabase `PGRST125` or another invalid-path error, check that `SUPABASE_URL` is the Supabase Project URL (for example `https://project-ref.supabase.co`) and that `SUPABASE_SECRET_KEY` is the server-side key. The backend accepts a URL with a trailing `/rest/v1` path too. Confirm that backend/schema.sql has been run in that same Supabase project. Redeploy Render, then check `/api/health`; it should report `connected: true`. Keep the Vercel environment variables set as well because Vercel and Render have separate settings.

Render needs Node.js 22.13 or newer for its built-in SQLite support. If the service root directory is `backend`, use `npm start`; if its root directory is the repository, use `node backend/server.js`. Set `SUPABASE_URL` and `SUPABASE_SECRET_KEY` in the Render service settings, then redeploy.

## Included in the demo

- Seven exact sidebar destinations: Dashboard, Disaster Map, Village Risk, SOS & Rescue, Teams & Vehicles, Offline Communication, and Reports & History.
- Shared incident records for villages, SOS cases, teams, messages, public alerts, road conditions and the event log.
- A citizen SOS form with a transparent demo priority score and responder-confirmed completion.
- A red SOS button that pops into view after scrolling down the homepage.
- An English / Hindi language switch on the homepage and command pages; the choice is remembered on this device.
- A low-confidence flood-risk screening outlook for 6, 24 and 72 hours, with model source, data freshness and uncertainty labels.
- A stylized interactive map with hazard layers, marker inspection, a before/after control and a road-condition toggle.
- Simulated store-carry-forward messaging, relay hops, network loss/restore controls, and acknowledgement-based delivery.
- Operator approval for public safety alerts, with private SOS details excluded from public content.
- JSON incident report export, CSV village export, and print layout.

## Data and limitations

This remains an educational prototype. Incident records, population estimates, map geometry, village coordinates, SOS requests, teams and routes are simulated. The map is an illustrative diagram, not a navigational map. GloFAS/Open-Meteo is a global model source, not the official CWC local gauge/forecast service; IMD API data and NDMA SACHET alerts are not yet wired into this deployment. The offline relay is simulated in browser state and does not send between physical devices. The flood screening score has not been validated against historical outcomes. Do not use it to make real emergency decisions.

For official India weather warnings and rainfall products, see the [IMD API reference](https://api.imd.gov.in/public/api_reference.html) and [IMD API portal](https://api.imd.gov.in/public/). For disaster alerts, see [NDMA SACHET](https://sachet.ndma.gov.in/CapFeed). Access terms and required credentials must be arranged before integrating those feeds.

The interface is designed to keep source, observation time, freshness and confidence visible, and to distinguish simulated observations, estimates and user reports. Use the demo flow to evaluate the product concept, not to make real response decisions.

## Edit a page

Each page has a separate HTML entry file and a matching layout file under `pages/`. Edit the page layout JavaScript to change its content, then edit `styles.css` for visual styling.

- **Homepage:** `index.html` + `pages/home.js`
- **Dashboard:** `dashboard.html` + `pages/dashboard.js`
- **Disaster Map:** `disaster-map.html` + `pages/disaster-map.js`
- **Village Risk:** `village-risk.html` + `pages/village-risk.js`
- **SOS & Rescue:** `sos-rescue.html` + `pages/sos-rescue.js`
- **Teams & Vehicles:** `teams-vehicles.html` + `pages/teams-vehicles.js`
- **Offline Communication:** `offline-communication.html` + `pages/offline-communication.js`
- **Reports & History:** `reports-history.html` + `pages/reports-history.js`
- **Public Alerts:** `public-alerts.html` + `pages/public-alerts.js`

`app.js` contains shared incident data and interactions. `shared/shell.js` contains the common sidebar, top bar, and footer. `styles.css` holds shared and page-specific styles. The supplied homepage photo is in `assets/flood-community.png`.

`shared/i18n.js` contains the English-to-Hindi interface phrases and the language switch behavior. Add or edit translations there.

`manifest.webmanifest` and `sw.js` provide the optional installable/offline shell when served from localhost or HTTPS.
