/* ============================================================
   WC 2026 Simulator — constants
   ============================================================ */
'use strict';

var API = {
  BASE: 'https://worldcup26.ir/get',
  TEAMS: 'https://worldcup26.ir/get/teams',
  GROUPS: 'https://worldcup26.ir/get/groups',
  GAMES: 'https://worldcup26.ir/get/games',
  STADIUMS: 'https://worldcup26.ir/get/stadiums',
  REFRESH_MS: 30000
};

var MATCH_ORDER = [
  73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
  89, 90, 91, 92, 93, 94, 95, 96,
  97, 98, 99, 100,
  101, 102,
  103, 104
];

var BRACKET_COLUMNS = {
  leftR32: [73, 75, 74, 77, 83, 84, 81, 82],
  rightR32: [76, 78, 79, 80, 86, 88, 85, 87],
  leftR16: [89, 90, 93, 94],
  rightR16: [91, 92, 95, 96],
  leftQF: [97, 98],
  rightQF: [99, 100],
  leftSF: [101],
  rightSF: [102]
};

var STORAGE_KEYS = {
  COUNTRY: 'wc2026_country'
};
