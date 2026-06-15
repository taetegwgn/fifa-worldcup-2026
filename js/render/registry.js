
/* ============================================================
   WC 2026 Simulator — render/registry.js
   Lazy tab rendering & global render API
   ============================================================ */
'use strict';

var _renderDirty = { dashboard: true, live: true, groups: true, third: true, bracket: true, scenarios: true, schedule: true };

function markAllDirty() {
  _renderDirty = { dashboard: true, live: true, groups: true, third: true, bracket: true, scenarios: true, schedule: true };
}

function getActiveTab() {
  var el = document.querySelector('.tab-btn.active[data-tab]');
  return el ? el.getAttribute('data-tab') : 'dashboard';
}

function _safeRender(fn) {
  try { fn(); } catch (e) { console.error('[render]', e); }
}

function renderTab(tab) {
  switch (tab) {
    case 'dashboard':
      if (_renderDirty.live) { _safeRender(renderLiveMatches); _renderDirty.live = false; }
      break;
    case 'groups':
      if (_renderDirty.groups) { _safeRender(renderGroups); _renderDirty.groups = false; }
      if (_renderDirty.third) { _safeRender(renderThirdPlaceTable); _renderDirty.third = false; }
      break;
    case 'bracket':
      if (_renderDirty.bracket) { _safeRender(renderBracket); _renderDirty.bracket = false; }
      break;
    case 'scenarios':
      if (_renderDirty.scenarios) { _safeRender(renderScenarios); _renderDirty.scenarios = false; }
      break;
    case 'schedule':
      if (_renderDirty.schedule) { _safeRender(renderSchedule); _renderDirty.schedule = false; }
      break;
  }
}

function renderCurrentView() {
  markAllDirty();
  _safeRender(renderDashboard);
  _renderDirty.dashboard = false;
  renderTab(getActiveTab());
  if (typeof renderCountryModal === 'function') _safeRender(renderCountryModal);
}

function renderAll() {
  markAllDirty();
  _safeRender(renderDashboard);
  _safeRender(renderLiveMatches);
  _safeRender(renderGroups);
  _safeRender(renderThirdPlaceTable);
  _safeRender(renderBracket);
  _safeRender(renderScenarios);
  _safeRender(renderSchedule);
  _renderDirty = { dashboard: false, live: false, groups: false, third: false, bracket: false, scenarios: false, schedule: false };
}

window.renderAll = renderAll;
window.renderCurrentView = renderCurrentView;
