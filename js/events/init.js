/* ============================================================
   WC 2026 Simulator — init.js
   ============================================================ */
'use strict';

// Initialization
function renderCountryModal() {
  var list = document.getElementById('cm-list');
  if (!list) return;
  list.innerHTML = buildCountryList(WC_COUNTRIES);
}

window.filterCountries = function(query) {
  var list = document.getElementById('cm-list');
  if (!list) return;
  var q = query.trim().toLowerCase();
  var filtered = q
    ? WC_COUNTRIES.filter(function(c) {
        return c.name.toLowerCase().indexOf(q) >= 0 ||
               c.nameKo.indexOf(q) >= 0 ||
               c.teamId.toLowerCase().indexOf(q) >= 0;
      })
    : WC_COUNTRIES;
  list.innerHTML = buildCountryList(filtered);
};

function buildCountryList(countries) {
  /* Group by tournament group A-L */
  var groups = 'ABCDEFGHIJKL'.split('');
  var html = '';
  groups.forEach(function(g) {
    var members = countries.filter(function(c){ return c.group === g; });
    if (!members.length) return;
    html += '<div class="cm-region-label">Group ' + g + '</div>';
    html += '<div class="cm-region-grid">';
    members.forEach(function(c) {
      var isSelected = userCountry && userCountry.teamId === c.teamId;
      var displayName = currentLang === 'ko' ? c.nameKo : c.name;
      html += '<button class="cm-country-btn' + (isSelected ? ' selected' : '') + '" onclick="saveCountry(\'' + c.teamId + '\')">';
      html += '<span class="cm-cflag">' + c.flag + '</span>';
      html += '<span class="cm-cname">' + displayName + '</span>';
      html += '</button>';
    });
    html += '</div>';
  });
  /* Fallback: no-group entries (search result has unmatched group) */
  var noGroup = countries.filter(function(c){ return !c.group; });
  if (noGroup.length) {
    html += '<div class="cm-region-grid">';
    noGroup.forEach(function(c) {
      var isSelected = userCountry && userCountry.teamId === c.teamId;
      html += '<button class="cm-country-btn' + (isSelected ? ' selected' : '') + '" onclick="saveCountry(\'' + c.teamId + '\')">';
      html += '<span class="cm-cflag">' + c.flag + '</span>';
      html += '<span class="cm-cname">' + c.name + '</span>';
      html += '</button>';
    });
    html += '</div>';
  }
  return html;
}

function init() {
  setupEventListeners();
  initModalCloseHandler();
  renderCountryModal();

  // 1) Load static schedule + stadiums instantly (no network wait)
  if (typeof STATIC_SCHEDULE !== 'undefined' && STATIC_SCHEDULE.length) {
    state.liveGames = STATIC_SCHEDULE;
  }
  if (typeof STATIC_STADIUMS !== 'undefined') {
    for (var sid in STATIC_STADIUMS) {
      if (!state.stadiumMap[sid]) state.stadiumMap[sid] = STATIC_STADIUMS[sid];
    }
  }
  // Then overlay any cached API data (has real scores)
  if (typeof loadFromCache === 'function') loadFromCache();

  calculateStandingsAndBracket();
  applyI18n();
  renderAll();
  showView('dashboard');
  initCountrySelect();

  // 2) Fetch fresh data in background
  syncLiveScoreData();

  // 3) Auto-refresh every 30 seconds
  setInterval(function() {
    syncLiveScoreData();
  }, API.REFRESH_MS);
}
