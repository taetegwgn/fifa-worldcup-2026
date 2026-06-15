/* ============================================================
   WC 2026 Simulator — views.js
   ============================================================ */
'use strict';

// 5. RENDERING FUNCTIONS
// =========================================================

function renderFlag(team) {
  if (!team) return '';
  if (team.flagUrl) {
    return '<img src="' + team.flagUrl + '" alt="' + team.name + '" style="width: 24px; height: 16px; object-fit: contain; vertical-align: middle;">';
  }
  return team.flag;
}

function renderLiveMatches() {
  var container = document.getElementById('live-matches-container');
  if (!container) return;
  
  if (!state.liveGames || state.liveGames.length === 0) {
    container.innerHTML = '<div class="text-muted" style="padding: 20px; text-align: center;">' + t('liveNoData') + '</div>';
    return;
  }
  
  var recentGames = [];
  for (var i = 0; i < state.liveGames.length; i++) {
    var g = state.liveGames[i];
    if (g.time_elapsed !== 'notstarted') {
      recentGames.push(g);
    }
  }
  
  // Sort to show most recently played games first (descending by ID for now)
  recentGames.sort(function(a, b) {
    return parseInt(b.id, 10) - parseInt(a.id, 10);
  });
  
  if (recentGames.length === 0) {
    container.innerHTML = '<div class="text-muted" style="padding: 20px; text-align: center;">' + t('liveNoRecent') + '</div>';
    return;
  }
  
  var html = '<div style="display: flex; flex-direction: column; gap: 8px;">';
  for (var j = 0; j < Math.min(recentGames.length, 10); j++) {
    var match = recentGames[j];
    var isFinished = match.finished === 'TRUE';
    var isLiveNow = !isFinished && match.time_elapsed && match.time_elapsed !== 'notstarted';
    var statusBadge;
    if (isFinished) {
      statusBadge = '<span class="match-status-badge finished">' + t('statusDone') + '</span>';
    } else if (isLiveNow) {
      var elapsedTxt = (match.time_elapsed && match.time_elapsed !== 'live') ? ' ' + match.time_elapsed : '';
      statusBadge = '<span class="match-status-badge live">' + t('statusLive') + elapsedTxt + '</span>';
    } else {
      statusBadge = '<span class="match-status-badge finished">' + t('statusUpcoming') + '</span>';
    }
    
    var hScorers = parseScorers(match.home_scorers);
    var aScorers = parseScorers(match.away_scorers);
    var allScorers = [];
    for (var s = 0; s < hScorers.length; s++) {
      allScorers.push('⚽ ' + hScorers[s].name + ' <span style="color:var(--text-muted);">(' + match.home_team_name_en + ')</span>');
    }
    for (var s2 = 0; s2 < aScorers.length; s2++) {
      allScorers.push('⚽ ' + aScorers[s2].name + ' <span style="color:var(--text-muted);">(' + match.away_team_name_en + ')</span>');
    }
    
    html += '<div class="live-match-card">';
    html += '<div class="live-match-meta"><span>' + groupLabel(match.group) + ' · ' + t('matchdayLbl') + ' ' + match.matchday + '</span>' + statusBadge + '</div>';
    html += '<div class="live-match-score-row">';
    html += '<span class="live-team-name home">' + getFlagImgByNameEn(match.home_team_name_en) + '<span>' + apiTeamDisplayName(match.home_team_name_en) + '</span></span>';
    html += '<span class="live-score-display">' + match.home_score + ' — ' + match.away_score + '</span>';
    html += '<span class="live-team-name away">' + getFlagImgByNameEn(match.away_team_name_en) + '<span>' + apiTeamDisplayName(match.away_team_name_en) + '</span></span>';
    html += '</div>';
    if (allScorers.length > 0) {
      html += '<div class="live-scorers">' + allScorers.join(' · ') + '</div>';
    }
    if (match.local_date) {
      var liveDateObj = (typeof toUserTZ === 'function') ? toUserTZ(match.local_date, match.stadium_id) : null;
      var liveDateStr = (liveDateObj && typeof formatInUserTZ === 'function') ? formatInUserTZ(liveDateObj) : formatMatchDate(match.local_date);
      html += '<div class="live-match-date">' + liveDateStr + '</div>';
    }
    html += '</div>';
  }
  html += '</div>';
  container.innerHTML = html;
}

function renderDashboard() {
  var myTeamId = getMyTeamId ? getMyTeamId() : 'KOR';
  var myTeamInfo = userCountry || { flag:'🇰🇷', name:'South Korea', nameKo:'대한민국', group:'A', teamId:'KOR' };

  /* My team flag in hero section */
  var heroFlag = document.getElementById('korea-hero-flag');
  if (heroFlag) heroFlag.textContent = myTeamInfo.flag;
  var heroName = document.getElementById('korea-hero-name');
  if (heroName) heroName.textContent = currentLang === 'ko' ? myTeamInfo.nameKo : myTeamInfo.name;
  var heroSub = document.getElementById('korea-hero-sub');
  if (heroSub) heroSub.textContent = 'Group ' + (myTeamInfo.group || '—');
  var cardTitle = document.getElementById('myteam-card-title');
  if (cardTitle) cardTitle.textContent = myTeamInfo.flag + ' ' + (currentLang==='ko' ? myTeamInfo.nameKo : myTeamInfo.name) + ' ' + t('myTeamStatus');

  var koreaStatusNum = document.getElementById('korea-status-number');
  var koreaStatusLbl = document.getElementById('korea-status-label');
  var pathR32 = document.getElementById('korea-path-r32');
  var pathR16 = document.getElementById('korea-path-r16');

  if (!koreaStatusNum || !koreaStatusLbl) return;

  /* Find which group my team belongs to */
  var myGroup = myTeamInfo.group || 'A';
  var myRank = -1;
  var groupTeams = state.groups[myGroup] ? state.groups[myGroup].teams : [];
  for (var i = 0; i < groupTeams.length; i++) {
    if (groupTeams[i].id === myTeamId) { myRank = i + 1; break; }
  }

  var rankLabel = myRank > 0
    ? (currentLang === 'ko' ? myRank + '위' : myRank + ordinal(myRank))
    : '-';
  koreaStatusNum.textContent = rankLabel;

  if (myRank === 1) {
    koreaStatusLbl.textContent = t('r32Qualified1');
    pathR32.innerHTML = '<span class="status-label">' + t('r32Match') + '</span><span class="status-val win">Group '+myGroup+' #1 slot</span>';
    pathR16.innerHTML = '<span class="status-label">' + t('r16Match') + '</span><span class="status-val win">' + t('assignedOnQual') + '</span>';
  } else if (myRank === 2) {
    koreaStatusLbl.textContent = t('r32Qualified2');
    pathR32.innerHTML = '<span class="status-label">' + t('r32Match') + '</span><span class="status-val win">Group '+myGroup+' #2 slot</span>';
    pathR16.innerHTML = '<span class="status-label">' + t('r16Match') + '</span><span class="status-val win">' + t('assignedOnQual') + '</span>';
  } else if (myRank === 3) {
    var isQualified = false;
    for (var j = 0; j < state.thirdQualifiers.length; j++) {
      if (state.thirdQualifiers[j].group === myGroup) { isQualified = true; break; }
    }
    if (isQualified) {
      koreaStatusLbl.textContent = t('r32Wildcard');
      var mSlot = state.thirdMappings[myGroup] || '?';
      pathR32.innerHTML = '<span class="status-label">' + t('r32Match') + '</span><span class="status-val win">' + mSlot + '</span>';
    } else {
      koreaStatusLbl.textContent = t('eliminated');
      pathR32.innerHTML = '<span class="status-label">' + t('r32Match') + '</span><span class="status-val text-accent">' + t('out') + '</span>';
    }
    pathR16.innerHTML = '<span class="status-label">' + t('r16Match') + '</span><span class="status-val">-</span>';
  } else {
    koreaStatusLbl.textContent = t('eliminated');
    pathR32.innerHTML = '<span class="status-label">' + t('r32Match') + '</span><span class="status-val text-accent">' + t('out') + '</span>';
    pathR16.innerHTML = '<span class="status-label">' + t('r16Match') + '</span><span class="status-val">-</span>';
  }
}

function ordinal(n) {
  var s = ['th','st','nd','rd'], v = n % 100;
  return (s[(v-20)%10] || s[v] || s[0]);
}

// 국기 이미지 + 호버 툴팁(title=팀이름)만 표시하는 헬퍼
function teamDisplayName(team) {
  if (!team) return '';
  if (currentLang === 'ko') return team.name || team.nameEn || team.id || '';
  return team.nameEn || team.name || team.id || '';
}

function renderFlagTooltip(team) {
  var name = teamDisplayName(team);
  if (team.flagUrl) {
    return '<img src="' + team.flagUrl + '" alt="' + name + '" title="' + name + '" class="group-flag-img">';
  }
  return '<span title="' + name + '" class="group-flag-emoji">' + (team.flag || '') + '</span>';
}

function renderGroups() {
  var container = document.getElementById('groups-container');
  if (!container) return;

  var myTeamId = getMyTeamId ? getMyTeamId() : null;
  var myGroupKey = userCountry ? userCountry.group : null;

  /* Sort group keys so my team's group appears first */
  var allKeys = Object.keys(state.groups).filter(function(k){ return Object.prototype.hasOwnProperty.call(state.groups, k); });
  if (myGroupKey && allKeys.indexOf(myGroupKey) > 0) {
    allKeys.splice(allKeys.indexOf(myGroupKey), 1);
    allKeys.unshift(myGroupKey);
  }

  var html = '';
  for (var ki = 0; ki < allKeys.length; ki++) {
    var key = allKeys[ki];
    if (Object.prototype.hasOwnProperty.call(state.groups, key)) {
      var group = state.groups[key];

      html += '<div class="group-card glass">';

      // GROUP 라벨
      html += '<div class="group-card-label">GROUP ' + key + '</div>';
      // 통계 헤더 — 팀 행과 완전히 동일한 DOM 구조 사용 → 정렬 보장
      html += '<div class="team-row stats-header-row">';
      html += '<div class="team-position"></div>';
      html += '<div class="team-flag-cell"></div>';
      html += '<div class="team-live-stats">';
      html += '<span class="sh">' + t('statMP') + '</span><span class="sh">' + t('statW') + '</span>';
      html += '<span class="sh">' + t('statD') + '</span><span class="sh">' + t('statL') + '</span>';
      html += '<span class="sh">' + t('statGF') + '</span><span class="sh">' + t('statGA') + '</span>';
      html += '<span class="sh">' + t('statGD') + '</span><span class="sh">' + t('statPTS') + '</span>';
      html += '</div>';
      html += '<div class="team-reorder-buttons"></div>';
      html += '</div>';

      html += '<div class="group-teams-list" data-group="' + key + '">';

      for (var i = 0; i < group.teams.length; i++) {
        var team = group.teams[i];
        var borderClass = i < 2 ? 'qualified' : (i === 2 ? 'wildcard' : 'eliminated');

        var hasLive = !!team._hasLive;
        var mp  = hasLive ? (team._totalMP  || 0) : (team.mp || 0);
        var w   = hasLive ? (team._totalW   || 0) : (team.w  || 0);
        var d   = hasLive ? (team._totalD   || 0) : (team.d  || 0);
        var l   = hasLive ? (team._totalL   || 0) : (team.l  || 0);
        var gfVal = hasLive ? (team._totalGF || 0) : (team.gs || 0);
        var gaVal = hasLive ? (team._totalGA || 0) : (team.ga || 0);
        var gdVal = hasLive ? (team._totalGD || 0) : (team.gd || 0);
        var ptsVal= hasLive ? (team._totalPts|| 0) : (team.pts|| 0);
        var gdStr = (gdVal > 0 ? '+' : '') + gdVal;

        var rankChange = '';
        var prev = state.prevGroupRanks[team.id];
        if (prev && prev.group === key) {
          var diff = prev.rank - (i + 1);
          if (diff > 0) rankChange = '<span class="rank-up" title="▲' + diff + '">▲' + diff + '</span>';
          else if (diff < 0) rankChange = '<span class="rank-down" title="▼' + Math.abs(diff) + '">▼' + Math.abs(diff) + '</span>';
        }

        var isMyTeamRow = myTeamId && team.id === myTeamId;
        var liveRowClass = hasLive ? ' live-row' : '';
        html += '<div class="team-row ' + borderClass + liveRowClass + (isMyTeamRow ? ' my-team-row' : '') + '" draggable="true" data-group="' + key + '" data-index="' + i + '">';

        html += '<div class="team-position">' + (i + 1) + rankChange + '</div>';

        html += '<div class="team-flag-cell">' + renderFlagTooltip(team) + '</div>';

        html += '<div class="team-live-stats">';
        html += '<span>' + mp + '</span>';
        html += '<span>' + w + '</span>';
        html += '<span>' + d + '</span>';
        html += '<span>' + l + '</span>';
        html += '<span>' + gfVal + '</span>';
        html += '<span>' + gaVal + '</span>';
        html += '<span class="' + (gdVal > 0 ? 'gd-pos' : gdVal < 0 ? 'gd-neg' : '') + '">' + gdStr + '</span>';
        html += '<span class="pts-live">' + ptsVal + '</span>';
        html += '</div>';

        // 재정렬 버튼
        html += '<div class="team-reorder-buttons">';
        if (i > 0) html += '<button class="reorder-btn" onclick="window.moveTeamRow(\'' + key + '\', ' + i + ', -1)">▲</button>';
        if (i < 3) html += '<button class="reorder-btn" onclick="window.moveTeamRow(\'' + key + '\', ' + i + ', 1)">▼</button>';
        html += '</div>';

        html += '</div>';
      }

      html += '</div></div>';
    }
  }
  container.innerHTML = html;
  setupDragAndDrop();
}

function renderThirdPlaceTable() {
  var list = document.getElementById('third-teams-list');
  if (!list) return;

  var allThirds = [];
  for (var key in state.groups) {
    if (Object.prototype.hasOwnProperty.call(state.groups, key)) {
      var thirdTeam = state.groups[key].teams[2];
      var stats = state.thirdStats[key];
      allThirds.push({
        group: key,
        team: thirdTeam,
        pts: stats.pts,
        gd: stats.gd,
        gs: stats.gs
      });
    }
  }

  allThirds.sort(function(a, b) {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gs - a.gs;
  });

  var html = '<div class="third-place-grid-layout">';
  for (var i = 0; i < allThirds.length; i++) {
    var entry = allThirds[i];
    var isQual = i < 8;
    var rowClass = isQual ? 'qualified' : 'eliminated';
    var indicator = isQual ? '<span class="qual-indicator">' + t('qualAdvanced') + '</span>' : '';
    
    html += '<div class="third-team-row ' + rowClass + '">';
    html += '<div class="third-rank">' + (i + 1) + '</div>';
    html += '<div class="third-group">' + groupLabel(entry.group) + '</div>';
    html += '<div class="team-flag">' + renderFlag(entry.team) + '</div>';
    html += '<div class="team-name">' + teamDisplayName(entry.team) + indicator + '</div>';
    html += '<div class="third-score-inputs">';
    html += '<label>' + t('labelPts') + ': <input type="number" value="' + entry.pts + '" onchange="window.updateThirdStat(\'' + entry.group + '\', \'pts\', this.value)"></label>';
    html += '<label>' + t('labelGD') + ': <input type="number" value="' + entry.gd + '" onchange="window.updateThirdStat(\'' + entry.group + '\', \'gd\', this.value)"></label>';
    html += '</div></div>';
  }
  html += '</div>';
  list.innerHTML = html;
}

function renderMatchCard(mId) {
  var def = matchDefinitions[mId];
  var match = state.matches[mId];
  var isCompleted = match.winner !== null;
  var cardClass = isCompleted ? 'match-card completed' : 'match-card';
  if (mId == 104) cardClass += ' final-match-card';

  var t1 = match.t1;
  var t2 = match.t2;

  var t1Class = 'match-team';
  var t2Class = 'match-team';

  var vsBtn = '';
  if (t1 && t2) {
    vsBtn = '<button class="match-vs-btn" onclick="window.openMatchModal(event, ' + mId + ')">VS</button>';
  }

  if (isCompleted) {
    if (match.winner && t1 && match.winner.id === t1.id) { t1Class += ' winner'; t2Class += ' loser'; }
    else if (match.winner && t2 && match.winner.id === t2.id) { t2Class += ' winner'; t1Class += ' loser'; }
  }

  var html = '<div class="' + cardClass + '">';
  html += '<div class="match-info"><span class="match-number">' + localizeMatchLabel(def.label) + '</span></div>';
  
  var liveGame = null;
  for(var i=0; i<state.liveGames.length; i++) {
    if(state.liveGames[i].id == mId) { liveGame = state.liveGames[i]; break; }
  }
  var hScore = (liveGame && liveGame.time_elapsed !== 'notstarted') ? liveGame.home_score : '';
  var aScore = (liveGame && liveGame.time_elapsed !== 'notstarted') ? liveGame.away_score : '';

  // Team 1
  html += '<div class="' + t1Class + '" onclick="window.selectWinner(' + mId + ', 1)">';
  if (t1) {
    html += '<span class="team-flag">' + renderFlag(t1) + '</span><span class="team-name">' + teamDisplayName(t1) + '</span>';
    if (hScore !== '') html += '<span class="score">' + hScore + '</span>';
  } else {
    html += '<span class="team-name text-muted">' + bracketSourceLabel(def.t1_source) + '</span>';
  }
  html += '</div>';

  html += vsBtn;

  // Team 2
  html += '<div class="' + t2Class + '" onclick="window.selectWinner(' + mId + ', 2)">';
  if (t2) {
    html += '<span class="team-flag">' + renderFlag(t2) + '</span><span class="team-name">' + teamDisplayName(t2) + '</span>';
    if (aScore !== '') html += '<span class="score">' + aScore + '</span>';
  } else {
    html += '<span class="team-name text-muted">' + bracketSourceLabel(def.t2_source) + '</span>';
  }
  html += '</div>';
  var cityFlag = getCityFlag(def.city);
  html += '<div class="match-date">'
         + localizeBracketDate(def.date)
         + '<br><span class="match-venue-info">'
         + (cityFlag ? cityFlag + ' ' : '')
         + localizeStadium(def.stadium)
         + '</span></div>';
  html += '</div>';
  return html;
}

function renderBracket() {
  // Columns
  var leftR32 = [73, 75, 74, 77, 83, 84, 81, 82];
  var rightR32 = [76, 78, 79, 80, 86, 88, 85, 87];
  var leftR16 = [89, 90, 93, 94];
  var rightR16 = [91, 92, 95, 96];
  var leftQF = [97, 98];
  var rightQF = [99, 100];
  var leftSF = [101];
  var rightSF = [102];

  function renderCol(colId, matchesArray, label) {
    var el = document.getElementById(colId);
    if (!el) return;
    var html = '<div class="bracket-round-label">' + label + '</div>';
    html += '<div class="bracket-matches-grid items-' + matchesArray.length + '">';
    for (var i = 0; i < matchesArray.length; i++) {
      html += renderMatchCard(matchesArray[i]);
    }
    html += '</div>';
    el.innerHTML = html;
  }

  renderCol('left-r32-col', leftR32, t('bracketR32L'));
  renderCol('left-r16-col', leftR16, t('bracketR16L'));
  renderCol('left-qf-col', leftQF, t('bracketQFL'));
  renderCol('left-sf-col', leftSF, t('bracketSFL'));

  renderCol('right-r32-col', rightR32, t('bracketR32R'));
  renderCol('right-r16-col', rightR16, t('bracketR16R'));
  renderCol('right-qf-col', rightQF, t('bracketQFR'));
  renderCol('right-sf-col', rightSF, t('bracketSFR'));

  // Center
  var centerEl = document.getElementById('center-finals');
  if (centerEl) {
    var html = '<div class="bracket-round-label stage-label-glow">' + t('bracketFinal') + '</div>';
    html += renderMatchCard(104);
    
    var champ = state.matches[104].winner;
    if (champ) {
      html += '<div class="champion-display">';
      html += '<div class="champion-trophy">🏆</div>';
      html += '<div class="champion-team-name">' + teamDisplayName(champ) + ' ' + t('championWin') + '</div>';
      html += '</div>';
    }
    
    html += '<div class="bracket-round-label" style="margin-top: 40px;">' + t('bracketThird') + '</div>';
    html += renderMatchCard(103);
    centerEl.innerHTML = html;
  }
}

function renderScenarios() {
  var container = document.getElementById('scenarios-container');
  if (!container) return;

  // 선택된 나라와 매칭되는 팀 찾기 (teamId 직접 사용)
  var focusTeam = null, focusGroup = null, focusRank = -1;
  var targetId = getMyTeamId ? (getMyTeamId() || 'KOR') : 'KOR';

  for (var gKey in state.groups) {
    if (!Object.prototype.hasOwnProperty.call(state.groups, gKey)) continue;
    var teams = state.groups[gKey].teams;
    for (var ri = 0; ri < teams.length; ri++) {
      if (teams[ri].id === targetId) {
        focusTeam = teams[ri]; focusGroup = gKey; focusRank = ri + 1; break;
      }
    }
    if (focusTeam) break;
  }

  var isKo = (currentLang === 'ko');
  var html = '';

  if (!focusTeam) {
    // 월드컵 참가 팀이 아닌 나라 선택 시
    html += '<div class="scenario-card glass" style="text-align:center; padding:32px;">';
    html += '<div style="font-size:3rem; margin-bottom:12px;">' + (userCountry ? userCountry.flag : '🌐') + '</div>';
    html += '<h3 style="color:var(--text-primary); margin:0 0 8px;">';
    html += isKo ? '이 나라는 2026 월드컵에 참가하지 않습니다.' : 'This country is not participating in the 2026 World Cup.';
    html += '</h3>';
    html += '<p style="color:var(--text-muted); font-size:0.85rem;">';
    html += isKo ? '응원하는 팀을 조별리그에서 직접 확인해보세요.' : 'Browse the Group Stage to follow your favorite team.';
    html += '</p></div>';
    container.innerHTML = html;
    return;
  }

  var teamFlag = focusTeam.flag || '';
  var teamName = teamDisplayName(focusTeam);
  var groupLbl = groupLabel(focusGroup);
  var currentRankLbl = isKo ? '현재 ' + focusRank + '위' : 'Currently ' + focusRank + (focusRank===1?'st':focusRank===2?'nd':focusRank===3?'rd':'th');

  // 섹션 타이틀 업데이트
  var st = document.querySelector('[data-i18n="scenariosTitle"]');
  if (st) st.textContent = teamFlag + ' ' + teamName + (isKo ? ' 토너먼트 진출 시나리오' : ' — Path Scenarios');
  var sd = document.querySelector('[data-i18n="scenariosDesc"]');
  if (sd) sd.textContent = isKo
    ? groupLbl + ' 순위에 따라 ' + teamName + '이(가) 만나게 될 대진 경로를 분석합니다. (' + currentRankLbl + ')'
    : 'Explore ' + teamName + "'s possible knockout paths based on their " + groupLbl + ' finish. (' + currentRankLbl + ')';

  var R32 = isKo ? '32강' : 'R32', R16 = isKo ? '16강' : 'R16',
      QF  = isKo ? '8강'  : 'QF',  SF  = isKo ? '준결승' : 'SF';

  var m3rd = state.thirdMappings[focusGroup] || '?';

  // Rank 1 scenario
  html += '<div class="scenario-card glass">';
  html += '<div class="scenario-heading rank1"><span class="rank-badge">' + (isKo?'1위':'1st') + '</span> ';
  html += groupLbl + ' ' + (isKo?'1위 진출 시나리오':'1st Place Path') + '</div>';
  html += '<div class="scenario-desc">';
  html += isKo
    ? teamName + '이(가) 조 1위로 진출하면, 32강에서 타 조 3위 팀을 만나 비교적 유리한 대진을 맞이합니다.'
    : teamName + ' finishing 1st in ' + groupLbl + ' draws a 3rd-placed side in the Round of 32 — the easier path.';
  html += '</div>';
  html += '<div class="path-step active"><span class="step-round">' + R32 + '</span><span class="step-details">' + (isKo?'3위 팀과 대결 · Annex C 자동 배정':'vs 3rd-placed team · Annex C seeding') + '</span></div>';
  html += '<div class="path-step"><span class="step-round">' + R16 + '</span><span class="step-details">' + (isKo?'타 조 1위 또는 2위':'vs winner of adjacent R32 match') + '</span></div>';
  html += '<div class="path-step"><span class="step-round">' + QF + '</span><span class="step-details">' + (isKo?'8강 진출시 우승후보 가능성 낮음':'Lower chance of meeting tournament favorite') + '</span></div>';
  html += '<div class="path-step"><span class="step-round">' + SF + '</span><span class="step-details">' + (isKo?'준결승 진출 시 파이널 4':'Final Four') + '</span></div>';
  html += '</div>';

  // Rank 2 scenario
  html += '<div class="scenario-card glass">';
  html += '<div class="scenario-heading rank2"><span class="rank-badge">' + (isKo?'2위':'2nd') + '</span> ';
  html += groupLbl + ' ' + (isKo?'2위 진출 시나리오':'2nd Place Path') + (focusRank===2?' <span style="font-size:0.72rem; color:var(--primary);">' + (isKo?'(현재)':'(current)') + '</span>':'') + '</div>';
  html += '<div class="scenario-desc">';
  html += isKo
    ? '조 2위 진출 시 인접 조 2위와 32강을 치러야 합니다. 이후 우승 후보를 일찍 만날 가능성이 높아집니다.'
    : teamName + ' as 2nd in ' + groupLbl + ' faces a 2nd-placed team from another group in R32 — tougher draw early.';
  html += '</div>';
  html += '<div class="path-step active"><span class="step-round">' + R32 + '</span><span class="step-details">' + (isKo?'인접 조 2위와 대결':'vs 2nd-placed from paired group') + '</span></div>';
  html += '<div class="path-step"><span class="step-round">' + R16 + '</span><span class="step-details">' + (isKo?'인접 R32 승자와 대결':'vs winner of adjacent R32') + '</span></div>';
  html += '<div class="path-step"><span class="step-round">' + QF + '</span><span class="step-details">' + (isKo?'8강에서 강팀 가능성 높음':'Likely tougher QF opponent') + '</span></div>';
  html += '<div class="path-step"><span class="step-round">' + SF + '</span><span class="step-details">' + (isKo?'준결승 진출 시 파이널 4':'Final Four') + '</span></div>';
  html += '</div>';

  // Rank 3 wildcard scenario
  html += '<div class="scenario-card glass">';
  html += '<div class="scenario-heading rank3"><span class="rank-badge">' + (isKo?'3위':'3rd') + '</span> ';
  html += (isKo?'와일드카드 시나리오':'Wildcard Path') + '</div>';
  html += '<div class="scenario-desc">';
  html += isKo
    ? '조 3위 시 12개 조 3위 팀 중 상위 8개 팀이 진출합니다. 진출하더라도 타 조 1위를 만납니다.'
    : '3rd place must rank in the top 8 among all 12 groups. If they qualify, they face a group winner in R32.';
  html += '</div>';
  html += '<div class="path-step active"><span class="step-round">' + R32 + '</span><span class="step-match">' + m3rd + '</span><span class="step-details">' + (isKo?'Annex C 매핑에 따라 상대 조 1위 배정':'Annex C assigns matchup against group winner') + '</span></div>';
  html += '<div class="path-step"><span class="step-round">' + R16 + '</span><span class="step-details">' + (isKo?'32강 대진에 따라 결정':'Determined by R32 result') + '</span></div>';
  html += '</div>';

  container.innerHTML = html;
}

// local_date is venue-local time. Convert to KST using stadium timezone.
function toKST(dateStr, stadiumId) {
  if (!dateStr) return null;
  var p = dateStr.match(/(\d+)\/(\d+)\/(\d+)\s+(\d+):(\d+)/);
  if (!p) return null;
  var offset = (typeof STADIUM_UTC_OFFSET !== 'undefined' && stadiumId && STADIUM_UTC_OFFSET[stadiumId] !== undefined)
                 ? STADIUM_UTC_OFFSET[stadiumId] : -4;
  var utcMs = Date.UTC(
    parseInt(p[3], 10),
    parseInt(p[1], 10) - 1,
    parseInt(p[2], 10),
    parseInt(p[4], 10) - offset,
    parseInt(p[5], 10)
  );
  return new Date(utcMs + 9 * 3600000); // UTC → KST
}

function kstDateKey(d) {
  // "YYYY-MM-DD" for grouping (UTC fields = KST since date is shifted)
  if (!d) return 'unknown';
  var y  = d.getUTCFullYear();
  var mo = d.getUTCMonth() + 1;
  var dd = d.getUTCDate();
  return y + '-' + (mo < 10 ? '0' : '') + mo + '-' + (dd < 10 ? '0' : '') + dd;
}

function kstTimeStr(d) {
  if (!d) return '';
  var DAYS = ['일','월','화','수','목','금','토'];
  var mo  = d.getUTCMonth() + 1;
  var dd  = d.getUTCDate();
  var dow = DAYS[d.getUTCDay()];
  var h   = d.getUTCHours();
  var m   = d.getUTCMinutes();
  var ampm = h < 12 ? '오전' : '오후';
  var h12  = h % 12 || 12;
  return mo + '/' + dd + '(' + dow + ') ' + ampm + ' ' + h12 + ':' + (m < 10 ? '0' : '') + m;
}

function kstDateLabel(key) {
  // key: "2026-06-12"
  var DAYS = ['일','월','화','수','목','금','토'];
  var parts = key.split('-');
  if (parts.length < 3) return key;
  var d = new Date(Date.UTC(parseInt(parts[0],10), parseInt(parts[1],10)-1, parseInt(parts[2],10)));
  var mo  = d.getUTCMonth() + 1;
  var dd  = d.getUTCDate();
  var dow = DAYS[d.getUTCDay()];
  return mo + '월 ' + dd + '일 (' + dow + ')';
}

// 경기장 ID → 개최국 국기 이모지
function getVenueFlag(stadiumId) {
  var s = state.stadiumMap[String(stadiumId)];
  if (!s) return '';
  var c = (s.country_en || '').toLowerCase();
  if (c === 'canada')        return '🇨🇦';
  if (c === 'mexico')        return '🇲🇽';
  if (c === 'united states') return '🇺🇸';
  return '';
}

// city 이름(한국어) → 개최국 국기 이모지 (브라켓용 fallback)
var CITY_FLAG_MAP = {
  '로스앤젤레스': '🇺🇸', '휴스턴': '🇺🇸', '보스턴': '🇺🇸', '댈러스': '🇺🇸',
  '뉴욕/뉴저지': '🇺🇸', '애틀랜타': '🇺🇸', '시애틀': '🇺🇸', '샌프란시스코': '🇺🇸',
  '마이애미': '🇺🇸', '캔자스시티': '🇺🇸', '필라델피아': '🇺🇸',
  '토론토': '🇨🇦', '밴쿠버': '🇨🇦',
  '몬테레이': '🇲🇽', '멕시코시티': '🇲🇽', '과달라하라': '🇲🇽'
};
function getCityFlag(cityKo) {
  return CITY_FLAG_MAP[cityKo] || '';
}

function getRoundLabel(type, group, matchday) {
  if (type === 'group') return groupLabel(group) + ' · ' + t('matchdayLbl') + ' ' + matchday;
  var tp = (type || '').toLowerCase();
  if (tp === 'round of 32' || tp === 'r32') return t('roundR32');
  if (tp === 'round of 16' || tp === 'r16') return t('roundR16');
  if (tp === 'quarter' || tp === 'qf')       return t('roundQF');
  if (tp === 'semi' || tp === 'sf')          return t('roundSF');
  if (tp === 'third')                        return t('roundThird');
  if (tp === 'final')                        return t('roundFinal');
  return type || 'KO';
}

function renderSchedule() {
  var container = document.getElementById('schedule-container');
  if (!container) return;

  if (!state.liveGames || state.liveGames.length === 0) {
    container.innerHTML = '<div class="text-muted" style="padding:30px; text-align:center;">' + t('scheduleLoading') + '</div>';
    return;
  }

  // ── KST 변환 및 날짜별 그룹핑 ──────────────────────────
  var byDate = {};   // key → [game, ...]
  var dateOrder = [];

  for (var i = 0; i < state.liveGames.length; i++) {
    var g = state.liveGames[i];
    var dateObj = (typeof toUserTZ === 'function') ? toUserTZ(g.local_date, g.stadium_id) : toKST(g.local_date, g.stadium_id);
    var dateKey = (typeof formatDateKeyUserTZ === 'function' && dateObj) ? formatDateKeyUserTZ(dateObj) : kstDateKey(dateObj);
    var timeStr = (typeof formatTimeOnlyUserTZ === 'function' && dateObj) ? formatTimeOnlyUserTZ(dateObj) : kstTimeStr(dateObj);
    g._kst     = dateObj;
    g._kstKey  = dateKey;
    g._kstTime = timeStr;

    if (!byDate[g._kstKey]) {
      byDate[g._kstKey] = [];
      dateOrder.push(g._kstKey);
    }
    byDate[g._kstKey].push(g);
  }

  // 날짜 순 정렬
  dateOrder.sort();
  // 각 날짜 내에서 KST 시간 순 정렬
  for (var di = 0; di < dateOrder.length; di++) {
    byDate[dateOrder[di]].sort(function(a, b) {
      return (a._kst ? a._kst.getTime() : 0) - (b._kst ? b._kst.getTime() : 0);
    });
  }

  // ── 오늘 (시스템 시간대 기준) ──────────────────────────
  var todayKey = (typeof formatDateKeyUserTZ === 'function') ? formatDateKeyUserTZ(new Date()) : kstDateKey(new Date(Date.now() + (9*3600000)));

  // ── HTML 구성 ────────────────────────────────────────────
  var html = '';

  // 상단 컨트롤 바 (업데이트 시간 + 필터 버튼)
  html += '<div class="sched-topbar">';

  if (state.lastUpdated) {
    var lu = state.lastUpdated;
    var h = lu.getHours(), mi2 = lu.getMinutes(), s = lu.getSeconds();
    var tzAbbr = '';
    try {
      tzAbbr = ' ' + new Intl.DateTimeFormat('en-US', { timeZoneName:'short' }).formatToParts(lu).filter(function(p){return p.type==='timeZoneName';})[0].value;
    } catch(e){}
    var updLbl = currentLang === 'ko'
      ? '마지막 업데이트: ' + h + ':' + (mi2<10?'0':'') + mi2 + ':' + (s<10?'0':'') + s + tzAbbr + ' · 30초 자동 갱신'
      : 'Last updated: ' + h + ':' + (mi2<10?'0':'') + mi2 + ':' + (s<10?'0':'') + s + tzAbbr + ' · Auto-refresh 30s';
    html += '<span class="schedule-updated">' + updLbl + '</span>';
  }

  html += '<div class="sched-filter-group">';
  html += '<button class="sched-filter-btn active" id="sched-btn-all" onclick="window.setScheduleFilter(\'all\')">'+t('filterAll')+'</button>';
  var myTeamFilterLabel = userCountry ? (userCountry.flag + ' ' + (currentLang==='ko'?userCountry.nameKo:userCountry.name)) : t('filterKor');
  html += '<button class="sched-filter-btn kor" id="sched-btn-kor" onclick="window.setScheduleFilter(\'kor\')">' + myTeamFilterLabel + '</button>';
  html += '</div>';
  html += '</div>';

  // 날짜 퀵점프 네비게이션
  html += '<div class="sched-date-nav" id="sched-date-nav">';
  for (var ni = 0; ni < dateOrder.length; ni++) {
    var nk = dateOrder[ni];
    var myTeamEn = getMyTeamNameEn ? getMyTeamNameEn() : 'South Korea';
    var hasMyTeam = byDate[nk].some(function(g) {
      return g.home_team_name_en === myTeamEn || g.away_team_name_en === myTeamEn;
    });
    var isPast  = nk < todayKey;
    var isToday = nk === todayKey;
    var btnClass = 'sched-date-btn' + (isToday ? ' today' : '') + (isPast ? ' past' : '') + (hasMyTeam ? ' has-kor' : '');
    var parts2 = nk.split('-');
    var shortLabel = parseInt(parts2[1],10) + '/' + parseInt(parts2[2],10);
    html += '<button class="' + btnClass + '" data-has-kor="' + hasMyTeam + '" onclick="document.getElementById(\'sched-day-' + nk + '\').scrollIntoView({behavior:\'smooth\',block:\'start\'})">';
    html += shortLabel;
    if (hasMyTeam) html += ' ' + (userCountry ? userCountry.flag : '🇰🇷');
    html += '</button>';
  }
  html += '</div>';

  // 날짜별 섹션
  for (var di2 = 0; di2 < dateOrder.length; di2++) {
    var dk = dateOrder[di2];
    var games = byDate[dk];
    var finishedCount = games.filter(function(g) { return g.finished === 'TRUE'; }).length;
    var upcomingCount = games.length - finishedCount;
    var isTodayDay = dk === todayKey;
    var myTeamEnDay = getMyTeamNameEn ? getMyTeamNameEn() : 'South Korea';
    var dayHasMyTeam = games.some(function(g) {
      return g.home_team_name_en === myTeamEnDay || g.away_team_name_en === myTeamEnDay;
    });

    html += '<div class="sched-day-block" id="sched-day-' + dk + '" data-has-kor="' + dayHasMyTeam + '">';

    // 날짜 헤더
    html += '<div class="sched-day-header' + (isTodayDay ? ' today-header' : '') + (dayHasMyTeam ? ' kor-day-header' : '') + '">';
    html += '<div class="sched-day-title">';
    var dayLabelStr = (typeof formatDateLabelUserTZ === 'function' && games[0] && games[0]._kst)
      ? formatDateLabelUserTZ(games[0]._kst)
      : kstDateLabel(dk);
    html += '<span class="sched-day-label">' + dayLabelStr + '</span>';
    if (isTodayDay)   html += '<span class="sched-today-badge">' + t('today') + '</span>';
    if (dayHasMyTeam) {
      var myFlag = userCountry ? userCountry.flag : '🇰🇷';
      var myShortName = userCountry ? (currentLang==='ko'?userCountry.nameKo:userCountry.name) : (currentLang==='ko'?'한국':'KOR');
      html += '<span class="sched-kor-day-badge">' + myFlag + ' ' + myShortName + ' ' + t('myTeamGame') + '</span>';
    }
    html += '</div>';
    html += '<div class="sched-day-meta">';
    if (finishedCount > 0) html += '<span class="sched-count-badge done">' + finishedCount + ' ' + t('gamesDone') + '</span>';
    if (upcomingCount > 0) html += '<span class="sched-count-badge upcoming">' + upcomingCount + ' ' + t('gamesUpcoming') + '</span>';
    html += '</div>';
    html += '</div>';

    // 경기 목록
    html += '<div class="sched-day-matches">';
    for (var gi = 0; gi < games.length; gi++) {
      var gm     = games[gi];
      var isDone = gm.finished === 'TRUE';
      var isLive = !isDone && gm.time_elapsed && gm.time_elapsed !== 'notstarted';
      var myTeamEnCard = getMyTeamNameEn ? getMyTeamNameEn() : 'South Korea';
      var isMyTeam = gm.home_team_name_en === myTeamEnCard || gm.away_team_name_en === myTeamEnCard;
      var homeWin = isDone && parseInt(gm.home_score,10) > parseInt(gm.away_score,10);
      var awayWin = isDone && parseInt(gm.away_score,10) > parseInt(gm.home_score,10);

      html += '<div class="sched-match-wrap" data-is-kor="' + isMyTeam + '">';

      var venueFlag = getVenueFlag(gm.stadium_id);
      var venueInfo = state.stadiumMap[String(gm.stadium_id)];
      var kstTime   = gm._kstTime || '--:--';
      var roundLbl  = getRoundLabel(gm.type, gm.group, gm.matchday);
      var hIsMyTeam = isMyTeam && gm.home_team_name_en === myTeamEnCard;
      var aIsMyTeam = isMyTeam && gm.away_team_name_en === myTeamEnCard;

      var cardClass = 'sched-match-card2'
        + (isDone ? ' done' : isLive ? ' live' : ' upcoming')
        + (isMyTeam ? ' kor-game' : '');
      html += '<div class="' + cardClass + '">';

      // ── 메타 행 (시간 · 라운드 · 상태 · 경기장) ──
      html += '<div class="smc-meta">';
      html += '<span class="smc-time">' + kstTime + '</span>';
      html += '<span class="smc-round">' + roundLbl + '</span>';
      if (isDone) {
        html += '<span class="smc-status done">' + t('statusDone') + '</span>';
      } else if (isLive) {
        var elapsedSched = (gm.time_elapsed && gm.time_elapsed !== 'live') ? ' ' + gm.time_elapsed : '';
        html += '<span class="smc-status live">' + t('statusLive') + elapsedSched + '</span>';
      } else {
        html += '<span class="smc-status upcoming">' + t('statusUpcoming') + '</span>';
      }
      if (venueInfo) {
        html += '<span class="smc-venue">' + (venueFlag ? venueFlag + '\u00a0' : '') + venueInfo.name_en + '</span>';
      }
      html += '</div>';

      // ── 팀 + 스코어 행 ──
      html += '<div class="smc-teams">';

      // 홈팀
      html += '<div class="smc-team home' + (homeWin ? ' winner' : '') + (hIsMyTeam ? ' kor' : '') + '">';
      html += '<span class="smc-flag">' + getFlagImgByNameEn(gm.home_team_name_en) + '</span>';
      html += '<span class="smc-name">' + apiTeamDisplayName(gm.home_team_name_en) + '</span>';
      html += '</div>';

      // 스코어
      if (isDone || isLive) {
        html += '<div class="smc-score' + (isLive ? ' live-score' : '') + '">';
        html += '<span class="smc-s' + (homeWin ? ' win' : '') + '">' + (gm.home_score || '0') + '</span>';
        html += '<span class="smc-sep">:</span>';
        html += '<span class="smc-s' + (awayWin ? ' win' : '') + '">' + (gm.away_score || '0') + '</span>';
        html += '</div>';
      } else {
        html += '<div class="smc-vs">VS</div>';
      }

      // 원정팀
      html += '<div class="smc-team away' + (awayWin ? ' winner' : '') + (aIsMyTeam ? ' kor' : '') + '">';
      html += '<span class="smc-name">' + apiTeamDisplayName(gm.away_team_name_en) + '</span>';
      html += '<span class="smc-flag">' + getFlagImgByNameEn(gm.away_team_name_en) + '</span>';
      html += '</div>';

      html += '</div>'; // .smc-teams

      // ── 득점자 행 (완료 또는 라이브 경기) ──
      if (isDone || isLive) {
        var hS = parseScorers(gm.home_scorers);
        var aS = parseScorers(gm.away_scorers);
        if (hS.length > 0 || aS.length > 0) {
          html += '<div class="smc-scorers">';

          html += '<div class="smc-scorers-home">';
          for (var si = 0; si < hS.length; si++) {
            html += '<span class="smc-goal">'
                  + '<span class="smc-goal-ball">⚽</span>'
                  + '<span class="smc-goal-name">' + hS[si].name + '</span>'
                  + (hS[si].minute ? '<span class="smc-goal-min">' + hS[si].minute + '</span>' : '')
                  + '</span>';
          }
          html += '</div>';

          html += '<div class="smc-scorers-away">';
          for (var si2 = 0; si2 < aS.length; si2++) {
            html += '<span class="smc-goal">'
                  + (aS[si2].minute ? '<span class="smc-goal-min">' + aS[si2].minute + '</span>' : '')
                  + '<span class="smc-goal-name">' + aS[si2].name + '</span>'
                  + '<span class="smc-goal-ball">⚽</span>'
                  + '</span>';
          }
          html += '</div>';

          html += '</div>'; // .smc-scorers
        }
      }

      html += '</div>'; // .sched-match-card2
      html += '</div>'; // .sched-match-wrap
    }
    html += '</div>'; // .sched-day-matches
    html += '</div>'; // .sched-day-block
  }

  container.innerHTML = html;

  // 필터 상태 복원
  var activeFilter = state.scheduleFilter || 'all';
  window.setScheduleFilter(activeFilter);
}

window.setScheduleFilter = function(mode) {
  state.scheduleFilter = mode;
  var container = document.getElementById('schedule-container');
  if (!container) return;

  var btnAll = document.getElementById('sched-btn-all');
  var btnKor = document.getElementById('sched-btn-kor');
  var dateNav = document.getElementById('sched-date-nav');

  if (mode === 'kor') {
    container.classList.add('kor-filter-active');
    if (btnAll) btnAll.classList.remove('active');
    if (btnKor) btnKor.classList.add('active');
    // 날짜 버튼 중 한국 경기 없는 날 흐리게
    if (dateNav) {
      var dateBtns = dateNav.querySelectorAll('.sched-date-btn');
      Array.prototype.forEach.call(dateBtns, function(btn) {
        btn.classList.toggle('filtered-out', btn.getAttribute('data-has-kor') !== 'true');
      });
    }
  } else {
    container.classList.remove('kor-filter-active');
    if (btnAll) btnAll.classList.add('active');
    if (btnKor) btnKor.classList.remove('active');
    if (dateNav) {
      var dateBtns2 = dateNav.querySelectorAll('.sched-date-btn');
      Array.prototype.forEach.call(dateBtns2, function(btn) {
        btn.classList.remove('filtered-out');
      });
    }
  }
};
