/* ============================================================
   WC 2026 Simulator — defaults.js
   ============================================================ */
'use strict';

// Default Teams (Fallback)
var defaultGroups = {
  A: { name: 'Group A', teams: [
    { id: 'MEX', name: '멕시코',    nameEn: 'Mexico',      flag: '🇲🇽', rating: 84, pts: 0, gd: 0, gs: 0 },
    { id: 'KOR', name: '대한민국',  nameEn: 'South Korea', flag: '🇰🇷', rating: 80, pts: 3, gd: 1, gs: 2 },
    { id: 'CZE', name: '체코',      nameEn: 'Czech Rep.',  flag: '🇨🇿', rating: 78, pts: 0, gd: -1, gs: 1 },
    { id: 'RSA', name: '남아공',    nameEn: 'South Africa',flag: '🇿🇦', rating: 73, pts: 0, gd: 0, gs: 0 }
  ]},
  B: { name: 'Group B', teams: [
    { id: 'SUI', name: '스위스',    nameEn: 'Switzerland', flag: '🇨🇭', rating: 81, pts: 0, gd: 0, gs: 0 },
    { id: 'CAN', name: '캐나다',    nameEn: 'Canada',      flag: '🇨🇦', rating: 79, pts: 0, gd: 0, gs: 0 },
    { id: 'BIH', name: '보스니아',  nameEn: 'Bosnia & Herz.', flag: '🇧🇦', rating: 74, pts: 0, gd: 0, gs: 0 },
    { id: 'QAT', name: '카타르',    nameEn: 'Qatar',       flag: '🇶🇦', rating: 71, pts: 0, gd: 0, gs: 0 }
  ]},
  C: { name: 'Group C', teams: [
    { id: 'BRA', name: '브라질',    nameEn: 'Brazil',      flag: '🇧🇷', rating: 91, pts: 0, gd: 0, gs: 0 },
    { id: 'MAR', name: '모로코',    nameEn: 'Morocco',     flag: '🇲🇦', rating: 85, pts: 0, gd: 0, gs: 0 },
    { id: 'SCO', name: '스코틀랜드',nameEn: 'Scotland',    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', rating: 75, pts: 0, gd: 0, gs: 0 },
    { id: 'HAI', name: '아이티',    nameEn: 'Haiti',       flag: '🇭🇹', rating: 63, pts: 0, gd: 0, gs: 0 }
  ]},
  D: { name: 'Group D', teams: [
    { id: 'USA', name: '미국',      nameEn: 'United States',flag: '🇺🇸', rating: 82, pts: 3, gd: 3, gs: 4 },
    { id: 'TUR', name: '터키',      nameEn: 'Turkey',      flag: '🇹🇷', rating: 80, pts: 0, gd: 0, gs: 0 },
    { id: 'AUS', name: '호주',      nameEn: 'Australia',   flag: '🇦🇺', rating: 76, pts: 0, gd: 0, gs: 0 },
    { id: 'PAR', name: '파라과이',  nameEn: 'Paraguay',    flag: '🇵🇾', rating: 74, pts: 0, gd: -3, gs: 1 }
  ]},
  E: { name: 'Group E', teams: [
    { id: 'GER', name: '독일',      nameEn: 'Germany',     flag: '🇩🇪', rating: 88, pts: 0, gd: 0, gs: 0 },
    { id: 'ECU', name: '에콰도르',  nameEn: 'Ecuador',     flag: '🇪🇨', rating: 80, pts: 0, gd: 0, gs: 0 },
    { id: 'CIV', name: '코트디부아르',nameEn: 'Ivory Coast',flag: '🇨🇮', rating: 77, pts: 0, gd: 0, gs: 0 },
    { id: 'CUW', name: '퀴라소',    nameEn: 'Curaçao',     flag: '🇨🇼', rating: 61, pts: 0, gd: 0, gs: 0 }
  ]},
  F: { name: 'Group F', teams: [
    { id: 'NED', name: '네덜란드',  nameEn: 'Netherlands', flag: '🇳🇱', rating: 86, pts: 0, gd: 0, gs: 0 },
    { id: 'JPN', name: '일본',      nameEn: 'Japan',       flag: '🇯🇵', rating: 81, pts: 0, gd: 0, gs: 0 },
    { id: 'SWE', name: '스웨덴',    nameEn: 'Sweden',      flag: '🇸🇪', rating: 80, pts: 0, gd: 0, gs: 0 },
    { id: 'TUN', name: '튀니지',    nameEn: 'Tunisia',     flag: '🇹🇳', rating: 73, pts: 0, gd: 0, gs: 0 }
  ]},
  G: { name: 'Group G', teams: [
    { id: 'BEL', name: '벨기에',    nameEn: 'Belgium',     flag: '🇧🇪', rating: 85, pts: 0, gd: 0, gs: 0 },
    { id: 'EGY', name: '이집트',    nameEn: 'Egypt',       flag: '🇪🇬', rating: 76, pts: 0, gd: 0, gs: 0 },
    { id: 'IRN', name: '이란',      nameEn: 'Iran',        flag: '🇮🇷', rating: 75, pts: 0, gd: 0, gs: 0 },
    { id: 'NZL', name: '뉴질랜드',  nameEn: 'New Zealand', flag: '🇳🇿', rating: 66, pts: 0, gd: 0, gs: 0 }
  ]},
  H: { name: 'Group H', teams: [
    { id: 'ESP', name: '스페인',    nameEn: 'Spain',       flag: '🇪🇸', rating: 89, pts: 0, gd: 0, gs: 0 },
    { id: 'URU', name: '우루과이',  nameEn: 'Uruguay',     flag: '🇺🇾', rating: 83, pts: 0, gd: 0, gs: 0 },
    { id: 'KSA', name: '사우디',    nameEn: 'Saudi Arabia',flag: '🇸🇦', rating: 73, pts: 0, gd: 0, gs: 0 },
    { id: 'CPV', name: '카보베르데',nameEn: 'Cape Verde',  flag: '🇨🇻', rating: 71, pts: 0, gd: 0, gs: 0 }
  ]},
  I: { name: 'Group I', teams: [
    { id: 'FRA', name: '프랑스',    nameEn: 'France',      flag: '🇫🇷', rating: 90, pts: 0, gd: 0, gs: 0 },
    { id: 'NOR', name: '노르웨이',  nameEn: 'Norway',      flag: '🇳🇴', rating: 80, pts: 0, gd: 0, gs: 0 },
    { id: 'SEN', name: '세네갈',    nameEn: 'Senegal',     flag: '🇸🇳', rating: 78, pts: 0, gd: 0, gs: 0 },
    { id: 'IRQ', name: '이라크',    nameEn: 'Iraq',        flag: '🇮🇶', rating: 70, pts: 0, gd: 0, gs: 0 }
  ]},
  J: { name: 'Group J', teams: [
    { id: 'ARG', name: '아르헨티나',nameEn: 'Argentina',   flag: '🇦🇷', rating: 92, pts: 0, gd: 0, gs: 0 },
    { id: 'AUT', name: '오스트리아',nameEn: 'Austria',     flag: '🇦🇹', rating: 79, pts: 0, gd: 0, gs: 0 },
    { id: 'ALG', name: '알제리',    nameEn: 'Algeria',     flag: '🇩🇿', rating: 76, pts: 0, gd: 0, gs: 0 },
    { id: 'JOR', name: '요르단',    nameEn: 'Jordan',      flag: '🇯🇴', rating: 68, pts: 0, gd: 0, gs: 0 }
  ]},
  K: { name: 'Group K', teams: [
    { id: 'POR', name: '포르투갈',  nameEn: 'Portugal',    flag: '🇵🇹', rating: 87, pts: 0, gd: 0, gs: 0 },
    { id: 'COL', name: '콜롬비아',  nameEn: 'Colombia',    flag: '🇨🇴', rating: 82, pts: 0, gd: 0, gs: 0 },
    { id: 'UZB', name: '우즈베키스탄',nameEn: 'Uzbekistan',flag: '🇺🇿', rating: 74, pts: 0, gd: 0, gs: 0 },
    { id: 'COD', name: '민주콩고',  nameEn: 'Democratic Republic of the Congo', flag: '🇨🇩', rating: 73, pts: 0, gd: 0, gs: 0 }
  ]},
  L: { name: 'Group L', teams: [
    { id: 'ENG', name: '잉글랜드',  nameEn: 'England',     flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 89, pts: 0, gd: 0, gs: 0 },
    { id: 'CRO', name: '크로아티아',nameEn: 'Croatia',     flag: '🇭🇷', rating: 83, pts: 0, gd: 0, gs: 0 },
    { id: 'GHA', name: '가나',      nameEn: 'Ghana',       flag: '🇬🇭', rating: 77, pts: 0, gd: 0, gs: 0 },
    { id: 'PAN', name: '파나마', nameEn: 'Panama', flag: '🇵🇦', rating: 72, pts: 0, gd: 0, gs: 0 }
  ]}
};

var matchDefinitions = {
  73: { round: 32, label: '32강 1경기 (M73)', date: '6/29(월) 04:00', city: '로스앤젤레스', stadium: '소파이 스타디움', t1_source: '2A', t2_source: '2B' },
  74: { round: 32, label: '32강 2경기 (M74)', date: '6/30(화) 02:00', city: '휴스턴', stadium: 'NRG 스타디움', t1_source: '1C', t2_source: '2F' },
  75: { round: 32, label: '32강 3경기 (M75)', date: '6/30(화) 05:30', city: '보스턴', stadium: '질레트 스타디움', t1_source: '1E', t2_source: '3rd_M75' },
  76: { round: 32, label: '32강 4경기 (M76)', date: '6/30(화) 10:00', city: '몬테레이', stadium: 'BBVA 스타디움', t1_source: '1F', t2_source: '2C' },
  77: { round: 32, label: '32강 5경기 (M77)', date: '7/1(수) 02:00', city: '댈러스', stadium: 'AT&T 스타디움', t1_source: '2E', t2_source: '2I' },
  78: { round: 32, label: '32강 6경기 (M78)', date: '7/1(수) 06:00', city: '뉴욕/뉴저지', stadium: '멧라이프 스타디움', t1_source: '1I', t2_source: '3rd_M78' },
  79: { round: 32, label: '32강 7경기 (M79)', date: '7/1(수) 10:00', city: '멕시코시티', stadium: '아스테카 스타디움', t1_source: '1A', t2_source: '3rd_M79' },
  80: { round: 32, label: '32강 8경기 (M80)', date: '7/2(목) 01:00', city: '애틀랜타', stadium: '메르세데스-벤츠 스타디움', t1_source: '1L', t2_source: '3rd_M80' },
  81: { round: 32, label: '32강 9경기 (M81)', date: '7/2(목) 05:00', city: '시애틀', stadium: '루멘 필드', t1_source: '1G', t2_source: '3rd_M81' },
  82: { round: 32, label: '32강 10경기 (M82)', date: '7/2(목) 09:00', city: '샌프란시스코', stadium: '리바이스 스타디움', t1_source: '1D', t2_source: '3rd_M82' },
  83: { round: 32, label: '32강 11경기 (M83)', date: '7/3(금) 04:00', city: '로스앤젤레스', stadium: '소파이 스타디움', t1_source: '1H', t2_source: '2J' },
  84: { round: 32, label: '32강 12경기 (M84)', date: '7/3(금) 08:00', city: '토론토', stadium: 'BMO 필드', t1_source: '2K', t2_source: '2L' },
  85: { round: 32, label: '32강 13경기 (M85)', date: '7/3(금) 12:00', city: '밴쿠버', stadium: 'BC 플레이스', t1_source: '1B', t2_source: '3rd_M85' },
  86: { round: 32, label: '32강 14경기 (M86)', date: '7/4(토) 03:00', city: '댈러스', stadium: 'AT&T 스타디움', t1_source: '2D', t2_source: '2G' },
  87: { round: 32, label: '32강 15경기 (M87)', date: '7/4(토) 07:00', city: '마이애미', stadium: '하드록 스타디움', t1_source: '1J', t2_source: '2H' },
  88: { round: 32, label: '32강 16경기 (M88)', date: '7/4(토) 10:30', city: '캔자스시티', stadium: '애로우헤드 스타디움', t1_source: '1K', t2_source: '3rd_M88' },
  
  89: { round: 16, label: '16강 (M89)', date: '7/5(일) 02:00', city: '휴스턴', stadium: 'NRG', t1_source: 'W73', t2_source: 'W75' },
  90: { round: 16, label: '16강 (M90)', date: '7/5(일) 06:00', city: '필라델피아', stadium: '링컨 파이낸셜', t1_source: 'W74', t2_source: 'W77' },
  91: { round: 16, label: '16강 (M91)', date: '7/6(월) 05:00', city: '뉴욕/뉴저지', stadium: '멧라이프', t1_source: 'W76', t2_source: 'W78' },
  92: { round: 16, label: '16강 (M92)', date: '7/6(월) 09:00', city: '멕시코시티', stadium: '아스테카', t1_source: 'W79', t2_source: 'W80' },
  93: { round: 16, label: '16강 (M93)', date: '7/7(화) 04:00', city: '댈러스', stadium: 'AT&T', t1_source: 'W83', t2_source: 'W84' },
  94: { round: 16, label: '16강 (M94)', date: '7/7(화) 09:00', city: '시애틀', stadium: '루멘 필드', t1_source: 'W81', t2_source: 'W82' },
  95: { round: 16, label: '16강 (M95)', date: '7/8(수) 01:00', city: '애틀랜타', stadium: '메르세데스-벤츠', t1_source: 'W86', t2_source: 'W88' },
  96: { round: 16, label: '16강 (M96)', date: '7/8(수) 05:00', city: '밴쿠버', stadium: 'BC 플레이스', t1_source: 'W85', t2_source: 'W87' },
  
  97: { round: 8, label: '8강 (M97)', date: '7/10(금) 05:00', city: '보스턴', stadium: '질레트', t1_source: 'W89', t2_source: 'W90' },
  98: { round: 8, label: '8강 (M98)', date: '7/11(토) 04:00', city: '로스앤젤레스', stadium: '소파이', t1_source: 'W93', t2_source: 'W94' },
  99: { round: 8, label: '8강 (M99)', date: '7/12(일) 06:00', city: '마이애미', stadium: '하드록', t1_source: 'W91', t2_source: 'W92' },
  100: { round: 8, label: '8강 (M100)', date: '7/12(일) 10:00', city: '캔자스시티', stadium: '애로우헤드', t1_source: 'W95', t2_source: 'W96' },
  
  101: { round: 4, label: '준결승 (M101)', date: '7/15(수) 04:00', city: '댈러스', stadium: 'AT&T', t1_source: 'W97', t2_source: 'W98' },
  102: { round: 4, label: '준결승 (M102)', date: '7/16(목) 04:00', city: '애틀랜타', stadium: '메르세데스-벤츠', t1_source: 'W99', t2_source: 'W100' },
  
  103: { round: 2, label: '3위결정전(M103)', date: '7/19(일) 06:00', city: '마이애미', stadium: '하드록', t1_source: 'L101', t2_source: 'L102' },
  104: { round: 1, label: '결승전 (M104)', date: '7/20(월) 04:00', city: '뉴욕/뉴저지', stadium: '멧라이프', t1_source: 'W101', t2_source: 'W102' }
};

var thirdPlaceSlots = {
  M75: { source: '1E', allowed: ['A', 'B', 'C', 'D', 'F'] },
  M78: { source: '1I', allowed: ['C', 'D', 'F', 'G', 'H'] },
  M79: { source: '1A', allowed: ['C', 'E', 'F', 'H', 'I'] },
  M80: { source: '1L', allowed: ['E', 'H', 'I', 'J', 'K'] },
  M81: { source: '1G', allowed: ['A', 'E', 'H', 'I', 'J'] },
  M82: { source: '1D', allowed: ['B', 'E', 'F', 'I', 'J'] },
  M85: { source: '1B', allowed: ['E', 'F', 'G', 'I', 'J'] },
  M88: { source: '1K', allowed: ['D', 'E', 'I', 'J', 'L'] }
};

var defaultThirdStats = {
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

// State Objects
var state = {
  groups: JSON.parse(JSON.stringify(defaultGroups)),
  matches: {},
  thirdStats: {},
  thirdQualifiers: [],
  thirdMappings: {}, // e.g., { 'A': 'M79', ... }
  liveGames: [],
  prevGroupRanks: {},
  teamMap: {},         // fifa_code → team API data
  teamByNameEn: {},    // name_en  → { flag, fifa_code }
  stadiumMap: {},      // stadium_id → { name_en, city_en, country_en }
  lastUpdated: null,
  scheduleFilter: 'all',
  liveEvents: {
    104: [
      { min: 12, type: '⚽ 골', player: '비니시우스', teamId: 'BRA' },
      { min: 34, type: '🟨 경고', player: '엔조 페르난데스', teamId: 'ARG' },
      { min: 67, type: '⚽ 골', player: '메시', teamId: 'ARG' },
      { min: 89, type: '⚽ 극장골', player: '호드리구', teamId: 'BRA' }
    ]
  }
};

// Initialize matches state
for (var m in matchDefinitions) {
  if (Object.prototype.hasOwnProperty.call(matchDefinitions, m)) {
    state.matches[m] = {
      t1: null,
      t2: null,
      winner: null,
      loser: null
    };
  }
}

for (var g in defaultThirdStats) {
  if (Object.prototype.hasOwnProperty.call(defaultThirdStats, g)) {
    state.thirdStats[g] = {
      pts: defaultThirdStats[g].pts,
      gd: defaultThirdStats[g].gd,
      gs: defaultThirdStats[g].gs
    };
  }
}
