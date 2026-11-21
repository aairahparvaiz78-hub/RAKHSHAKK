(() => {
  const root = document.getElementById('appMount');
  if (!root) return;
  root.innerHTML = `<div class="app-shell">
    <aside class="sidebar" id="sidebar">
      <a class="brand" href="index.html" aria-label="Rakhshak home">
        <span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M7 25c0-9 6-16 16-17 0 8-4 15-12 18m5-2 11 9m-5-17 8 1m-20 6 1 9"/><circle cx="29" cy="13" r="3"/></svg></span>
        <span><strong>Rakhshak</strong><small>FIELD COMMAND</small></span>
      </a>
      <div class="incident-mini"><span class="live-dot"></span><div><b>ACTIVE INCIDENT</b><span>Kosi Basin · Flood response</span></div><span class="mini-chevron">⌄</span></div>
      <div class="nav-caption">OPERATIONS</div>
      <nav class="side-nav" aria-label="Main navigation" id="mainNav"></nav>
      <div class="sidebar-bottom">
        <div class="network-card"><div class="network-title"><span class="signal-icon">⌁</span> Relay network <span class="network-state" id="sideNetworkState">ONLINE</span></div><div class="network-line"><i></i><i></i><i></i><i></i><i></i><span>Gateway connected</span></div></div>
        <div class="profile"><div class="avatar">AS</div><div><b>Ananya Sharma</b><small>Incident coordinator</small></div></div>
      </div>
    </aside>
    <main class="main-area">
      <header class="topbar"><button class="icon-btn menu-toggle" id="menuToggle" aria-label="Open navigation">☰</button><div class="breadcrumbs"><span>INCIDENTS</span><b>/</b><strong id="crumbTitle">Dashboard</strong></div><div class="top-actions"><span class="database-pill" id="databaseStatus" data-state="connecting"><i></i><span>Database starting</span></span><span class="replay-pill"><i></i> SIMULATED REPLAY</span><button id="networkToggle" class="network-toggle" aria-pressed="false"><span class="toggle-dot"></span><span id="networkToggleText">Network online</span></button><button class="alert-button" id="publicAlertBtn"><span class="alert-bell" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg></span><span>Public alert</span></button></div></header>
      <section class="content" id="content" tabindex="-1"></section>
      <footer class="app-footer"><span><i class="footer-leaf">✳</i> Rakhshak <span class="footer-sep">·</span> DEMO ENVIRONMENT</span><span>Data is simulated for demonstration <span class="footer-sep">·</span> Last sync <b id="lastSync">just now</b></span></footer>
    </main>
  </div>`;
})();
