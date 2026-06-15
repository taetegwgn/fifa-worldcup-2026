/* ============================================================
   i18n — Translation Dictionary
   Supported: ko (Korean), en (English)
   ============================================================ */
var I18N = {
  ko: {
    /* App */
    appTitle:        'WC 2026 시뮬레이터',
    appSub:          '팬 제작 · 비공식',
    appDisclaimer:   '비공식 팬 사이트입니다. FIFA와 무관합니다.',

    /* Nav tabs */
    tabDashboard:    '대시보드',
    tabGroups:       '조별리그',
    tabBracket:      '토너먼트',
    tabScenarios:    '경우의 수',
    tabSchedule:     '경기일정',

    /* Buttons */
    btnReset:        '초기화',
    btnAutoPredict:  '⚡ 자동 예측',
    btnRefresh:      '새로고침',
    btnAutoFill:     '⚡ 전력 기준 자동 정렬',
    btnGoGroups:     '📋 조별리그 시뮬레이션 시작',
    btnGoBracket:    '🏆 대진표 바로보기',

    /* Dashboard */
    dashLiveTitle:   '🔴 라이브 매치 보드 (최근 경기)',
    dashFormatTitle: '대회 방식',
    dashFormatYear:  'FIFA World Cup 2026™',
    tf48:            '역대 최초 48개국 참가',
    tf48sub:         'A조 ~ L조, 총 12개 조 · 조별 4개국',
    tf32:            '조별리그 → 32강 진출',
    tf32sub:         '각 조 1·2위 24팀 + 조 3위 상위 8팀',
    tfAnnex:         'Annex C 대진 배정',
    tfAnnexSub:      '3위 진출팀 대진은 FIFA 공식 495가지 조합으로 결정',
    tfHosts:         '3개국 공동 개최',
    hostUSA:         '🇺🇸 미국',
    hostCanada:      '🇨🇦 캐나다',
    hostMexico:      '🇲🇽 멕시코',
    dashboardNote:   '※ 조별리그 시뮬레이션 탭에서 각 조의 순위를 변경하면 대시보드의 예측 경로가 자동으로 업데이트됩니다.',
    groupStanding:   '현재 조별리그 순위',
    myTeamStatus:    '현황',
    r32Match:        '32강 매칭',
    r16Match:        '16강 매칭',
    r32Qualified1:   '32강 진출 확정 (1위)',
    r32Qualified2:   '32강 진출 확정 (2위)',
    r32Wildcard:     '32강 와일드카드 진출',
    eliminated:      '32강 진출 실패 (탈락)',
    out:             '탈락',
    assignedOnQual:  '진출 시 배정',
    localTime:       '현지시간',
    liveNoData:      '실시간 경기 데이터가 없습니다. (기본 모드)',
    liveNoRecent:    '현재 진행 중이거나 완료된 경기가 없습니다.',
    liveInProgress:  '🔴 진행중',
    thirdPlaceTitle: '조 3위 와일드카드 성적비교',
    thirdPlaceDesc:  '각 조 3위 팀들의 성적을 비교하여 상위 8개 팀만 32강에 진출합니다. 승점과 득실차를 직접 수정하여 다양한 시나리오를 시뮬레이션해보세요.',
    qualAdvanced:    '진출',
    labelPts:        '승점',
    labelGD:         '득실',
    groupSuffix:     '조',
    gamesDone:       '경기 완료',
    gamesUpcoming:   '경기 예정',
    today:           '오늘',
    myTeamGame:      '경기',
    scheduleLoading: '경기 데이터를 불러오는 중입니다...',
    bracketR32L:     '32강 (L)',
    bracketR16L:     '16강 (L)',
    bracketQFL:      '8강 (L)',
    bracketSFL:      '준결승 (L)',
    bracketR32R:     '32강 (R)',
    bracketR16R:     '16강 (R)',
    bracketQFR:      '8강 (R)',
    bracketSFR:      '준결승 (R)',
    bracketFinal:    '결승전',
    bracketThird:    '3위 결정전',
    championWin:     '우승!',
    matchModalTimeline: '라이브 타임라인',
    matchModalNoEvents: '이 경기에 등록된 라이브 이벤트가 없습니다.',
    toastLoading:    '라이브 데이터를 불러오는 중...',
    toastAutoFill:   '전력(FIFA 랭킹 등)을 기준으로 조별 순위가 자동 정렬되었습니다.',
    toastReset:      '모든 데이터가 초기화되었습니다.',
    toastNeedBothTeams: '양 팀이 모두 결정되어야 승자를 선택할 수 있습니다.',
    toastPredictDone:  '시뮬레이션 완료 (업셋 {n}건)',
    toastPredictWin:   '🏆 {team} 우승! (업셋 {n}건 발생)',

    /* Groups */
    groupsTitle:     '조별리그 순위 시뮬레이션',
    groupsDesc:      '각 조의 국가를 드래그하거나 ▲▼ 버튼으로 순위를 변경해보세요. 1·2위와 상위 3위팀이 32강에 진출합니다.',
    groupPrefix:     'GROUP',

    /* Bracket */
    bracketTitle:    '32강 토너먼트 대진표',
    bracketDesc:     '각 매치의 국가를 클릭하면 승리국으로 선택되어 다음 라운드로 진출합니다.',

    /* Scenarios */
    scenariosTitle:  '🇰🇷 대한민국 토너먼트 진출 시나리오',
    scenariosDesc:   '조별리그 순위에 따라 대한민국이 만나게 될 대진 경로, 경기 일시, 스타디움 정보를 분석합니다.',

    /* Schedule */
    scheduleTitle:   '📅 경기 결과 & 일정',
    scheduleDesc:    '완료된 경기 결과(득점자 포함)와 예정 경기 일정을 확인합니다. 60초마다 자동 업데이트됩니다.',
    filterAll:       '전체 경기',
    filterKor:       '🇰🇷 한국 경기만',
    statusDone:      '종료',
    statusLive:      '🔴 LIVE',
    statusUpcoming:  '예정',
    matchdayLbl:     '매치데이',
    roundR32:        '32강',
    roundR16:        '16강',
    roundQF:         '8강',
    roundSF:         '준결승',
    roundThird:      '3위 결정전',
    roundFinal:      '결승',

    /* Toast / loading */
    loading:         '데이터를 불러오는 중입니다...',
    liveConnected:   '라이브 데이터 연동 완료! ✅',
    liveError:       '라이브 데이터를 불러올 수 없어 기본 데이터를 사용합니다.',

    /* Footer */
    footerTitle:     '2026 World Cup Simulator',
    footerCredit:    'Made with ❤️ by',

    /* Stats headers */
    statMP: 'MP', statW: 'W', statD: 'D', statL: 'L',
    statGF: 'GF', statGA: 'GA', statGD: 'GD', statPTS: 'PTS',
  },

  en: {
    /* App */
    appTitle:        'WC 2026 Simulator',
    appSub:          'Fan-made · Unofficial',
    appDisclaimer:   'Unofficial fan site. Not affiliated with FIFA.',

    /* Nav tabs */
    tabDashboard:    'Dashboard',
    tabGroups:       'Groups',
    tabBracket:      'Bracket',
    tabScenarios:    'Scenarios',
    tabSchedule:     'Schedule',

    /* Buttons */
    btnReset:        'Reset',
    btnAutoPredict:  '⚡ Auto Predict',
    btnRefresh:      'Refresh',
    btnAutoFill:     '⚡ Sort by Rating',
    btnGoGroups:     '📋 Start Group Stage',
    btnGoBracket:    '🏆 View Bracket',

    /* Dashboard */
    dashLiveTitle:   '🔴 Live Match Board (Recent)',
    dashFormatTitle: 'Tournament Format',
    dashFormatYear:  'FIFA World Cup 2026™',
    tf48:            'Record 48 Nations',
    tf48sub:         'Groups A–L · 4 teams per group',
    tf32:            'Group Stage → Round of 32',
    tf32sub:         'Top 2 from each group (24) + best 8 third-placed',
    tfAnnex:         'Annex C Draw',
    tfAnnexSub:      'Third-place matchups determined by 495 official FIFA combos',
    tfHosts:         '3 Co-Host Nations',
    hostUSA:         '🇺🇸 USA',
    hostCanada:      '🇨🇦 Canada',
    hostMexico:      '🇲🇽 Mexico',
    dashboardNote:   '※ Adjust group standings in the Groups tab — the dashboard updates automatically.',
    groupStanding:   'Group Standing',
    myTeamStatus:    'Status',
    r32Match:        'R32 match',
    r16Match:        'R16 match',
    r32Qualified1:   'Round of 32 — 1st',
    r32Qualified2:   'Round of 32 — 2nd',
    r32Wildcard:     'Round of 32 — Wildcard',
    eliminated:      'Eliminated',
    out:             'Out',
    assignedOnQual:  'Assigned upon qualification',
    localTime:       'Local Time',
    liveNoData:      'No live match data available.',
    liveNoRecent:    'No matches in progress or completed yet.',
    liveInProgress:  '🔴 Live',
    thirdPlaceTitle: '3rd Place Wildcard Comparison',
    thirdPlaceDesc:  'Compare 3rd-placed teams across all groups. Only the top 8 advance to the Round of 32. Adjust points and goal difference to simulate scenarios.',
    qualAdvanced:    'Advanced',
    labelPts:        'Pts',
    labelGD:         'GD',
    groupSuffix:     'Group',
    gamesDone:       'completed',
    gamesUpcoming:   'upcoming',
    today:           'Today',
    myTeamGame:      'Game',
    scheduleLoading: 'Loading match data...',
    bracketR32L:     'R32 (L)',
    bracketR16L:     'R16 (L)',
    bracketQFL:      'QF (L)',
    bracketSFL:      'SF (L)',
    bracketR32R:     'R32 (R)',
    bracketR16R:     'R16 (R)',
    bracketQFR:      'QF (R)',
    bracketSFR:      'SF (R)',
    bracketFinal:    'Final',
    bracketThird:    '3rd Place',
    championWin:     'Champion!',
    matchModalTimeline: 'Live Timeline',
    matchModalNoEvents: 'No live events recorded for this match.',
    toastLoading:    'Loading live data...',
    toastAutoFill:   'Groups sorted by team rating.',
    toastReset:      'All data has been reset.',
    toastNeedBothTeams: 'Both teams must be determined before selecting a winner.',
    toastPredictDone:  'Simulation complete ({n} upsets)',
    toastPredictWin:   '🏆 {team} wins! ({n} upsets)',

    /* Groups */
    groupsTitle:     'Group Stage Simulation',
    groupsDesc:      'Drag teams or use ▲▼ buttons to reorder standings. Top 2 + best 8 third-placed advance to the Round of 32.',
    groupPrefix:     'GROUP',

    /* Bracket */
    bracketTitle:    'Round of 32 — Tournament Bracket',
    bracketDesc:     'Click a team to advance them to the next round.',

    /* Scenarios */
    scenariosTitle:  '🇰🇷 South Korea — Path Scenarios',
    scenariosDesc:   "Explore Korea's possible knockout paths based on their group finish.",

    /* Schedule */
    scheduleTitle:   '📅 Results & Schedule',
    scheduleDesc:    'Match results with scorers and upcoming fixtures. Auto-updates every 60s.',
    filterAll:       'All Matches',
    filterKor:       '🇰🇷 Korea Only',
    statusDone:      'FT',
    statusLive:      '🔴 LIVE',
    statusUpcoming:  'Soon',
    matchdayLbl:     'MD',
    roundR32:        'R32',
    roundR16:        'R16',
    roundQF:         'QF',
    roundSF:         'SF',
    roundThird:      '3rd Place',
    roundFinal:      'Final',

    /* Toast / loading */
    loading:         'Loading data...',
    liveConnected:   'Live data synced! ✅',
    liveError:       'Could not load live data. Using defaults.',

    /* Footer */
    footerTitle:     '2026 World Cup Simulator',
    footerCredit:    'Made with ❤️ by',

    /* Stats headers */
    statMP: 'MP', statW: 'W', statD: 'D', statL: 'L',
    statGF: 'GF', statGA: 'GA', statGD: 'GD', statPTS: 'PTS',
  }
};

/* Language is determined by country selection, not stored separately.
   Default to 'en' until a country is chosen. */
var currentLang = (function() {
  var saved = localStorage.getItem('wc2026_country');
  if (saved) {
    try {
      var c = JSON.parse(saved);
      return c.teamId === 'KOR' ? 'ko' : 'en';
    } catch(e) {}
  }
  return 'en';
})();

function t(key) {
  var dict = I18N[currentLang] || I18N['ko'];
  return dict[key] !== undefined ? dict[key] : (I18N['ko'][key] || key);
}

function setLang(lang, opts) {
  opts = opts || {};
  currentLang = lang;
  var root = document.getElementById('html-root');
  if (root) root.setAttribute('lang', lang);
  applyI18n();
  /* Re-render — lazy by default for faster country switching */
  if (opts.fullRender && typeof renderAll === 'function') {
    renderAll();
  } else if (typeof renderCurrentView === 'function') {
    renderCurrentView();
  } else if (typeof renderAll === 'function') {
    renderAll();
  }
}

/* Apply translations to all [data-i18n] elements */
function applyI18n() {
  var els = document.querySelectorAll('[data-i18n]');
  Array.prototype.forEach.call(els, function(el) {
    var key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  /* Sync language toggle buttons */
  var btns = document.querySelectorAll('.lang-btn');
  Array.prototype.forEach.call(btns, function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
  });
}
