# Rakshak

A responsive disaster-response prototype with a Node.js API, a SQLite database by default, optional Supabase storage and a warm espresso, cream, orange and rescue-red interface. It opens on a public homepage with a centered editorial headline, animated satellite orbit, four glass feature cards, your flood-community photo, and a prominent SOS action. Each destination has its own HTML route and page-layout JavaScript file. There is no build step or third-party JavaScript dependency.

## Run it

1. Install Node.js 22.13 or newer if it is not already installed.
2. Open the extracted project folder in Cursor.
3. Choose **Terminal → New Terminal** and run **node backend/server.js**.
4. Open http://localhost:8000. The backend serves both the website and its API.
5. By default, it creates a local SQLite database at backend/data/Rakshak.sqlite3. No packages need to be installed.

## Backend and flood outlook

The backend saves incident state, observations and forecast records in SQLite. To use Supabase instead, create a Supabase project, run backend/schema.sql in its SQL Editor, copy backend/.env.example to backend/.env, then fill in SUPABASE_URL and a server-side SUPABASE_SECRET_KEY. Restart the backend. Do not paste the secret key into browser code or commit the .env file.

The dashboard includes a transparent flood-risk screening index for 6, 24 and 72 hours. Add named rainfall, river-level and soil readings from a trusted source to refresh it. If no reading exists for a village, the backend generates clearly labelled simulated demo data. These scores are not probabilities, validated predictions or official warnings; the app is not connected to live weather or hydrology feeds.

## Included in the demo

- Seven exact sidebar destinations: Dashboard, Disaster Map, Village Risk, SOS & Rescue, Teams & Vehicles, Offline Communication, and Reports & History.
- Shared incident records for villages, SOS cases, teams, messages, public alerts, road conditions and the event log.
- A citizen SOS form with a transparent demo priority score and responder-confirmed completion.
- A red SOS button that pops into view after scrolling down the homepage.
- A flood-risk screening outlook for 6, 24 and 72 hours, with source labels and simulated fallback observations.
- A stylized interactive map with hazard layers, marker inspection, a before/after control and a road-condition toggle.
- Simulated store-carry-forward messaging, relay hops, network loss/restore controls, and acknowledgement-based delivery.
- Operator approval for public safety alerts, with private SOS details excluded from public content.
- JSON incident report export, CSV village export, and print layout.

## Data and limitations

This is an educational prototype with a local API and database. Incident records, population estimates, map geometry, locations, hazard layers and the default forecast observations are simulated. The map is an illustrative diagram, not a navigational map. No live satellite, flood, fire, seismic, road, radio, Bluetooth or satellite hardware feeds are connected. Suggested routes are not guaranteed safe. The offline relay is simulated in browser state; it does not send between physical devices. The forecast score is a transparent heuristic, not a trained or validated model. No live rainfall or river gauge feed is connected. For future integrations, see the [India rainfall catalog](https://www.data.gov.in/catalog/rainfall) and [NDMA SACHET alert feeds](https://sachet.ndma.gov.in/CapFeed); access and permitted use should be checked before wiring feeds into the app.

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

`manifest.webmanifest` and `sw.js` provide the optional installable/offline shell when served from localhost or HTTPS.
