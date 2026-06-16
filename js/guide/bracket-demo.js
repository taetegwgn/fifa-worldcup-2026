/* ============================================================
   Bracket Guide — interactive 3rd-place mapping demo
   ============================================================ */
'use strict';

var GUIDE_THIRD_SLOTS = {
  M75: { source: '1E', allowed: ['A', 'B', 'C', 'D', 'F'] },
  M78: { source: '1I', allowed: ['C', 'D', 'F', 'G', 'H'] },
  M79: { source: '1A', allowed: ['C', 'E', 'F', 'H', 'I'] },
  M80: { source: '1L', allowed: ['E', 'H', 'I', 'J', 'K'] },
  M81: { source: '1G', allowed: ['A', 'E', 'H', 'I', 'J'] },
  M82: { source: '1D', allowed: ['B', 'E', 'F', 'I', 'J'] },
  M85: { source: '1B', allowed: ['E', 'F', 'G', 'I', 'J'] },
  M88: { source: '1K', allowed: ['D', 'E', 'I', 'J', 'L'] }
};

var GUIDE_R32_MATCHES = [
  { id: 73, t1: '2A', t2: '2B', city: 'Los Angeles' },
  { id: 74, t1: '1C', t2: '2F', city: 'Houston' },
  { id: 75, t1: '1E', t2: '3rd', city: 'Boston' },
  { id: 76, t1: '1F', t2: '2C', city: 'Monterrey' },
  { id: 77, t1: '2E', t2: '2I', city: 'Dallas' },
  { id: 78, t1: '1I', t2: '3rd', city: 'New York/NJ' },
  { id: 79, t1: '1A', t2: '3rd', city: 'Mexico City' },
  { id: 80, t1: '1L', t2: '3rd', city: 'Atlanta' },
  { id: 81, t1: '1G', t2: '3rd', city: 'Seattle' },
  { id: 82, t1: '1D', t2: '3rd', city: 'San Francisco' },
  { id: 83, t1: '1H', t2: '2J', city: 'Los Angeles' },
  { id: 84, t1: '2K', t2: '2L', city: 'Toronto' },
  { id: 85, t1: '1B', t2: '3rd', city: 'Vancouver' },
  { id: 86, t1: '2D', t2: '2G', city: 'Dallas' },
  { id: 87, t1: '1J', t2: '2H', city: 'Miami' },
  { id: 88, t1: '1K', t2: '3rd', city: 'Kansas City' }
];

var GUIDE_KNOCKOUT = {
  r16: [
    { id: 89, t1: 'W73', t2: 'W75' },
    { id: 90, t1: 'W74', t2: 'W77' },
    { id: 91, t1: 'W76', t2: 'W78' },
    { id: 92, t1: 'W79', t2: 'W80' },
    { id: 93, t1: 'W83', t2: 'W84' },
    { id: 94, t1: 'W81', t2: 'W82' },
    { id: 95, t1: 'W86', t2: 'W88' },
    { id: 96, t1: 'W85', t2: 'W87' }
  ],
  qf: [
    { id: 97, t1: 'W89', t2: 'W90' },
    { id: 98, t1: 'W93', t2: 'W94' },
    { id: 99, t1: 'W91', t2: 'W92' },
    { id: 100, t1: 'W95', t2: 'W96' }
  ],
  sf: [
    { id: 101, t1: 'W97', t2: 'W98' },
    { id: 102, t1: 'W99', t2: 'W100' }
  ],
  final: [
    { id: 103, t1: 'L101', t2: 'L102', label: '3rd Place' },
    { id: 104, t1: 'W101', t2: 'W102', label: 'Final' }
  ]
};

var DEFAULT_THIRD_STATS = {
  A: { pts: 0, gd: -1, gs: 1 },
  B: { pts: 1, gd: 0, gs: 1 },
  C: { pts: 1, gd: 0, gs: 1 },
  D: { pts: 0, gd: -2, gs: 0 },
  E: { pts: 4, gd: 1, gs: 3 },
  F: { pts: 4, gd: 0, gs: 4 },
  G: { pts: 2, gd: -3, gs: 2 },
  H: { pts: 6, gd: 3, gs: 7 },
  I: { pts: 3, gd: -1, gs: 4 },
  J: { pts: 4, gd: 2, gs: 6 },
  K: { pts: 4, gd: -1, gs: 3 },
  L: { pts: 3, gd: 0, gs: 4 }
};

var demoStats = {};

function initDemoStats() {
  demoStats = JSON.parse(JSON.stringify(DEFAULT_THIRD_STATS));
}

function findThirdMapping(qualifiers) {
  var slots = Object.keys(GUIDE_THIRD_SLOTS);
  function backtrack(idx, mapping, used) {
    if (idx === slots.length) return mapping;
    var slotId = slots[idx];
    var allowed = GUIDE_THIRD_SLOTS[slotId].allowed;
    for (var i = 0; i < qualifiers.length; i++) {
      var grp = qualifiers[i].group;
      if (!used[grp] && allowed.indexOf(grp) !== -1) {
        used[grp] = true;
        mapping[grp] = slotId;
        var result = backtrack(idx + 1, mapping, used);
        if (result) return result;
        used[grp] = false;
        delete mapping[grp];
      }
    }
    return null;
  }
  return backtrack(0, {}, {}) || {};
}

function getQualifiers() {
  var list = [];
  var groups = 'ABCDEFGHIJKL'.split('');
  for (var i = 0; i < groups.length; i++) {
    var g = groups[i];
    var s = demoStats[g];
    list.push({ group: g, pts: s.pts, gd: s.gd, gs: s.gs });
  }
  list.sort(function(a, b) {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gs - a.gs;
  });
  return list;
}

function renderR32Table() {
  var tbody = document.getElementById('r32-table-body');
  if (!tbody) return;
  var html = '';
  for (var i = 0; i < GUIDE_R32_MATCHES.length; i++) {
    var m = GUIDE_R32_MATCHES[i];
    var t1Class = m.t1.indexOf('1') === 0 ? 'slot-1st' : (m.t1.indexOf('2') === 0 ? 'slot-2nd' : '');
    var t2Class = m.t2 === '3rd' ? 'slot-3rd' : (m.t2.indexOf('1') === 0 ? 'slot-1st' : 'slot-2nd');
    html += '<tr>';
    html += '<td>M' + m.id + '</td>';
    html += '<td class="' + t1Class + '">' + m.t1 + '</td>';
    html += '<td class="' + t2Class + '">' + m.t2 + '</td>';
    html += '<td>' + m.city + '</td>';
    html += '</tr>';
  }
  tbody.innerHTML = html;
}

function renderThirdDemo() {
  var grid = document.getElementById('third-grid');
  var mappingEl = document.getElementById('mapping-result');
  if (!grid) return;

  var qualifiers = getQualifiers();
  var top8 = qualifiers.slice(0, 8);
  var top8Set = {};
  for (var t = 0; t < top8.length; t++) top8Set[top8[t].group] = t + 1;

  var html = '';
  var groups = 'ABCDEFGHIJKL'.split('');
  for (var i = 0; i < groups.length; i++) {
    var g = groups[i];
    var s = demoStats[g];
    var rank = top8Set[g];
    var cls = 'third-card';
    if (rank) cls += ' qualified';
    else cls += ' eliminated';
    html += '<div class="' + cls + '" data-group="' + g + '" onclick="cycleThirdStat(\'' + g + '\')">';
    html += '<div class="grp-label">Group ' + g + '</div>';
    html += '<div class="stat-row"><span>승점</span><span>' + s.pts + ' pts</span></div>';
    html += '<div class="stat-row"><span>득실차</span><span>' + (s.gd >= 0 ? '+' : '') + s.gd + '</span></div>';
    html += '<div class="stat-row"><span>다득점</span><span>' + s.gs + ' gs</span></div>';
    if (rank) {
      html += '<span class="rank-badge in">3위 ' + rank + '위 → 32강</span>';
    } else {
      html += '<span class="rank-badge out">탈락</span>';
    }
    html += '</div>';
  }
  grid.innerHTML = html;

  if (mappingEl) {
    var mapping = findThirdMapping(top8);
    var keys = Object.keys(mapping);
    if (keys.length === 8) {
      var mHtml = '<h3>✅ Annex C 배정 결과</h3><div class="mapping-cards">';
      var slotOrder = Object.keys(GUIDE_THIRD_SLOTS);
      for (var si = 0; si < slotOrder.length; si++) {
        var slotId = slotOrder[si];
        var slot = GUIDE_THIRD_SLOTS[slotId];
        var assignedGrp = null;
        for (var gk in mapping) {
          if (mapping[gk] === slotId) assignedGrp = gk;
        }
        mHtml += '<div class="mapping-card">';
        mHtml += '<div class="match-id">' + slotId + '</div>';
        mHtml += '<div class="matchup">' + slot.source + ' vs 3' + (assignedGrp || '?') + '</div>';
        mHtml += '<div class="allowed">허용 조: ' + slot.allowed.join(', ') + '</div>';
        mHtml += '</div>';
      }
      mHtml += '</div>';
      mappingEl.innerHTML = mHtml;
    } else {
      mappingEl.innerHTML = '<h3>⚠️ 유효한 Annex C 배정 불가</h3><p style="color:var(--text-muted);font-size:0.88rem;">현재 3위팀 조합으로는 FIFA 규칙에 맞는 대진을 만들 수 없습니다. 승점을 조정해보세요.</p>';
    }
  }
}

function cycleThirdStat(group) {
  var s = demoStats[group];
  s.pts = (s.pts + 1) % 7;
  if (s.pts === 0) {
    s.gd = ((s.gd + 3) % 7) - 3;
    s.gs = (s.gs % 8) + 1;
  }
  renderThirdDemo();
}

function resetThirdStats() {
  initDemoStats();
  renderThirdDemo();
}

function randomizeThirdStats() {
  var groups = 'ABCDEFGHIJKL'.split('');
  for (var i = 0; i < groups.length; i++) {
    var g = groups[i];
    demoStats[g] = {
      pts: Math.floor(Math.random() * 5),
      gd: Math.floor(Math.random() * 7) - 3,
      gs: Math.floor(Math.random() * 6) + 1
    };
  }
  renderThirdDemo();
}

function renderKnockoutTree() {
  var container = document.getElementById('knockout-tree');
  if (!container) return;

  function col(title, matches) {
    var h = '<div class="tree-col"><h4>' + title + '</h4>';
    for (var i = 0; i < matches.length; i++) {
      var m = matches[i];
      h += '<div class="tree-match">';
      h += '<div class="mid">M' + m.id + (m.label ? ' · ' + m.label : '') + '</div>';
      h += '<div class="teams">' + m.t1 + ' vs ' + m.t2 + '</div>';
      h += '</div>';
    }
    h += '</div>';
    return h;
  }

  var html = '';
  html += col('32강', GUIDE_R32_MATCHES.map(function(m) {
    return { id: m.id, t1: m.t1, t2: m.t2 };
  }));
  html += col('16강', GUIDE_KNOCKOUT.r16);
  html += col('8강', GUIDE_KNOCKOUT.qf);
  html += col('준결승', GUIDE_KNOCKOUT.sf);
  html += col('결승', GUIDE_KNOCKOUT.final);
  container.innerHTML = html;
}

function initBracketGuide() {
  initDemoStats();
  renderR32Table();
  renderThirdDemo();
  renderKnockoutTree();

  document.querySelectorAll('.guide-nav a').forEach(function(a) {
    a.addEventListener('click', function(e) {
      document.querySelectorAll('.guide-nav a').forEach(function(x) { x.classList.remove('active'); });
      a.classList.add('active');
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBracketGuide);
} else {
  initBracketGuide();
}
