// Homepage layout. Edit this file to change the Rakhshak landing page.
window.RakhshakPages = window.RakhshakPages || {};
window.RakhshakPages.home = function (ctx) {
  const { state, mapSvg, esc } = ctx;
  const openCount = state.sos.filter(item => !['Assistance complete', 'Unable to reach'].includes(item.status)).length;
  const recentCases = state.sos.slice(0, 2).map(item => `
    <div class="case-peek-row">
      <span class="case-peek-dot ${item.priority >= 85 ? 'urgent' : ''}"></span>
      <span class="case-peek-copy"><b>${esc(item.need)}</b><small>${esc(item.villageId ? state.villages.find(v => v.id === item.villageId)?.name : 'Location pending')} · ${item.people} people</small></span>
      <span class="case-peek-priority">${item.priority}</span>
    </div>`).join('');
  const relayMessages = state.messages.slice(0, 2).map(message => `
    <div class="relay-peek-row">
      <span class="relay-peek-icon">⌁</span>
      <span class="relay-peek-copy"><b>${esc(message.title)}</b><small>${esc(message.sender)} · ${message.hops} hops</small></span>
      <span class="relay-peek-status ${message.ack ? 'ack' : ''}">${esc(message.status)}</span>
    </div>`).join('');

  return `
  <div class="home-page inspiration-home">
    <header class="home-nav">
      <button class="home-brand" data-page="home" aria-label="Rakhshak home">
        <span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M7 25c0-9 6-16 16-17 0 8-4 15-12 18m5-2 11 9m-5-17 8 1m-20 6 1 9"/><circle cx="29" cy="13" r="3"/></svg></span>
        <span><b>Rakhshak</b><small>RESILIENT RESPONSE NETWORK</small></span>
      </button>
      <nav class="home-nav-links" aria-label="Homepage links">
        <button data-page="public">Public alerts</button>
        <span class="home-active"><i></i> Kosi Basin incident active</span>
        <button class="button home-command" data-page="dashboard">Command center <span>↗</span></button>
      </nav>
    </header>

    <main class="home-main">
      <section class="inspiration-cover">
        <div class="cover-orbit" aria-hidden="true">
          <svg viewBox="0 0 260 230">
            <defs><radialGradient id="coverEarth"><stop stop-color="#d9a36a"/><stop offset=".72" stop-color="#824735"/><stop offset="1" stop-color="#321f1a"/></radialGradient></defs>
            <ellipse cx="130" cy="132" rx="88" ry="69" transform="rotate(-22 130 132)" fill="none" stroke="#d9b88c" stroke-opacity=".36" stroke-dasharray="3 7"/>
            <circle cx="130" cy="132" r="49" fill="url(#coverEarth)" opacity=".94"/>
            <path d="M91 123c10-18 23-19 31-14l5 9-11 8-7 16-14-3zm48-19 19 5 8 13-9 11-18-6-8-11zm1 38 16-5 14 8 4 13-14 10-17-7z" fill="#e5c392" opacity=".55"/>
            <circle cx="130" cy="132" r="59" fill="none" stroke="#e4c39a" stroke-opacity=".25"/>
            <g class="cover-satellite-orbit"><g transform="translate(130 62)">
              <path d="M-29-5h-25v17h25zm58 0h25v17H29z" fill="#d89b58" stroke="#f3d5a3" stroke-width="1"/>
              <path d="M-45-5v17m8-17v17m22-17v17M45-5v17m-8-17v17M23-5v17" stroke="#583b2d"/>
              <path d="m-11-10 11-9 11 9v17L0 15-11 7z" fill="#f0d4a0" stroke="#fff0ce"/>
              <path d="M0-19V15M-11-2h22M0 15v10" stroke="#76513a"/>
              <circle cy="27" r="2" fill="#f0d4a0"/>
            </g></g>
            <circle class="cover-signal" cx="130" cy="132" r="62" fill="none" stroke="#efc986" stroke-opacity=".55"/>
          </svg>
        </div>
        <div class="cover-copy">
          <div class="home-kicker"><span class="kicker-mark">✳</span> COMMUNITY RESPONSE · KOSI BASIN</div>
          <h1>Rakhshak<br><em>Response Network</em></h1>
          <p class="cover-subtitle">When roads and signals fail, every request still needs a way through.</p>
          <p class="cover-detail">One shared response picture for communities, rescue teams, and the people coordinating help.</p>
          <div class="cover-actions">
            <button class="cover-sos" data-action="new-sos"><span class="cover-sos-mark">SOS</span><span><b>Request emergency help</b><small>Send a location and tell responders what you need</small></span><i>↗</i></button>
            <button class="home-dashboard-link" data-page="dashboard">Explore the command center <span>→</span></button>
          </div>
          <div class="cover-meta"><span><i></i> RESPONSE DESK ACTIVE</span><b></b><span>SIMULATED FLOOD RESPONSE · SUPAUL, BIHAR</span></div>
        </div>
      </section>

      <section class="home-stats" aria-label="Incident snapshot">
        <div><b>${state.villages.length}</b><span>VILLAGES MONITORED</span></div>
        <i></i><div><b>${state.teams.length}</b><span>RESPONSE TEAMS</span></div>
        <i></i><div><b>${openCount}</b><span>OPEN SOS REQUESTS</span></div>
        <i></i><div><b>${state.messages.filter(message => message.ack).length}</b><span>MESSAGES ACKNOWLEDGED</span></div>
      </section>

      <section class="portfolio-grid" aria-label="Rakhshak response features">
        <article class="portfolio-card map-tile">
          <div class="tile-browser"><span class="tile-brand"><i>◉</i> FIELD VIEW</span><span>Map &nbsp; Villages &nbsp; Teams</span><span class="tile-pill">LIVE REPLAY</span></div>
          <div class="tile-intro"><div><small>01 / SITUATION MAP</small><h2>See the ground.<br><em>Move with context.</em></h2><p>Flood extent, village risk, SOS markers and response locations in one picture.</p><button class="tile-link" data-page="map">Open disaster map ↗</button></div><div class="tile-map">${mapSvg('mini')}</div></div>
          <div class="tile-feature-row"><div><b>Flood extent</b><small>Simulated replay layer</small></div><div><b>${state.villages.length} villages</b><small>Risk-ranked</small></div><div><b>Road status</b><small>${state.roads.bridge ? 'North bridge blocked' : 'Crossing unverified'}</small></div></div>
        </article>

        <article class="portfolio-card sos-tile">
          <div class="tile-browser"><span class="tile-brand"><i>✳</i> SOS & RESCUE</span><span>Requests &nbsp; Dispatch &nbsp; Routes</span><span class="tile-pill alert">${openCount} OPEN</span></div>
          <div class="sos-tile-content"><div><small>02 / COMMUNITY SOS</small><h2>One clear signal<br><em>starts a response.</em></h2><p>Urgency, medical need, people affected and isolation help explain priority.</p><button class="tile-link" data-page="sos">View rescue queue ↗</button></div><div class="case-peek">${recentCases}</div></div>
          <div class="tile-feature-row"><div><b>Transparent priority</b><small>Explainable factors</small></div><div><b>Team assignment</b><small>Dispatch & reassign</small></div><div><b>Confirmed outcomes</b><small>Contact before complete</small></div></div>
        </article>

        <article class="portfolio-card community-tile">
          <div class="tile-browser"><span class="tile-brand"><i>⌂</i> COMMUNITY FIRST</span><span>People &nbsp; Villages &nbsp; Shelters</span><span class="tile-pill">FIELD CONTEXT</span></div>
          <div class="community-photo"><img src="assets/flood-community.png" alt="Family standing in floodwater outside their home"><span>FLOOD RESPONSE · COMMUNITY CONTEXT</span></div>
          <div class="community-copy"><div><small>03 / VILLAGE RISK</small><h2>The last mile<br><em>is human.</em></h2><p>Find communities at risk of isolation and see why each village is prioritized.</p></div><button class="tile-link" data-page="villages">Explore village risk ↗</button></div>
          <div class="tile-feature-row"><div><b>Estimated population</b><small>Clearly labelled</small></div><div><b>Warnings</b><small>Received or pending</small></div><div><b>Access status</b><small>Reachable or unverified</small></div></div>
        </article>

        <article class="portfolio-card relay-tile">
          <div class="tile-browser"><span class="tile-brand"><i>⌁</i> VEHICLE RELAY</span><span>Messages &nbsp; Devices &nbsp; Gateway</span><span class="tile-pill relay">STORE · CARRY · FORWARD</span></div>
          <div class="relay-tile-content"><div><small>04 / OFFLINE COMMUNICATION</small><h2>When signal drops,<br><em>messages keep moving.</em></h2><p>Rescue vehicles can carry queued updates toward a gateway and reconnect isolated teams.</p><button class="tile-link" data-page="offline">Open relay network ↗</button></div><div class="relay-peek">${relayMessages}</div></div>
          <div class="tile-feature-row"><div><b>Offline queue</b><small>Saved on device</small></div><div><b>Relay hops</b><small>Simulated in demo</small></div><div><b>Acknowledgement</b><small>Required for delivery</small></div></div>
        </article>
      </section>

      <section class="home-values"><div><span>✳</span><b>COMMUNITY FIRST</b><small>Clear SOS access</small></div><div><span>⌁</span><b>VEHICLES AS RELAYS</b><small>Carry information forward</small></div><div><span>◌</span><b>UNCERTAINTY VISIBLE</b><small>Source, freshness, confidence</small></div><div><span>↗</span><b>OUTCOMES CONFIRMED</b><small>Track delivery and assistance</small></div></section>
      <footer class="home-footer"><span><i>✳</i> RAKHSHAK <b>·</b> DEMO ENVIRONMENT</span><span>Every estimate is labelled. Every delivery waits for acknowledgement.</span><button data-page="dashboard">Open incident dashboard ↗</button></footer>
      <button class="floating-sos" id="floatingSOS" data-action="new-sos"><span class="floating-sos-icon">!</span><span class="floating-sos-copy"><b>Need help now?</b><small>Send an SOS to responders</small></span><span class="floating-sos-arrow">↗</span></button>
    </main>
  </div>`;
};
