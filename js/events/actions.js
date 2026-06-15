/* ============================================================
   WC 2026 Simulator — actions.js
   ============================================================ */
'use strict';

// 6. USER INTERACTIONS
// =========================================================

window.moveTeamRow = function(groupKey, index, direction) {
  var arr = state.groups[groupKey].teams;
  var newIndex = index + direction;
  if (newIndex < 0 || newIndex >= arr.length) return;
  
  var temp = arr[index];
  arr[index] = arr[newIndex];
  arr[newIndex] = temp;
  
  calculateStandingsAndBracket();
  markAllDirty();
  renderCurrentView();
};

window.updateThirdStat = function(groupKey, field, val) {
  state.thirdStats[groupKey][field] = parseInt(val, 10) || 0;
  calculateStandingsAndBracket();
  markAllDirty();
  renderCurrentView();
};

// Celebration removed per user request

window.selectWinner = function(matchId, teamIndex) {
  var match = state.matches[matchId];
  if (!match) return;

  var t1 = match.t1;
  var t2 = match.t2;

  if (!t1 || !t2) {
    showToast(t('toastNeedBothTeams'));
    return;
  }

  if (teamIndex === 1) {
    match.winner = t1;
    match.loser = t2;
  } else {
    match.winner = t2;
    match.loser = t1;
  }

  calculateStandingsAndBracket();
  markAllDirty();
  renderCurrentView();
};

window.autoFillGroups = function() {
  for (var key in state.groups) {
    if (Object.prototype.hasOwnProperty.call(state.groups, key)) {
      state.groups[key].teams.sort(function(a, b) {
        return b.rating - a.rating;
      });
    }
  }
  calculateStandingsAndBracket();
  renderAll();
  showToast(t('toastAutoFill'));
};

window.resetSimulator = function() {
  state.groups = JSON.parse(JSON.stringify(defaultGroups));
  for (var g in defaultThirdStats) {
    if (Object.prototype.hasOwnProperty.call(defaultThirdStats, g)) {
      state.thirdStats[g] = {
        pts: defaultThirdStats[g].pts,
        gd: defaultThirdStats[g].gd,
        gs: defaultThirdStats[g].gs
      };
    }
  }
  for (var m in state.matches) {
    if (Object.prototype.hasOwnProperty.call(state.matches, m)) {
      state.matches[m].winner = null;
      state.matches[m].loser = null;
    }
  }
  calculateStandingsAndBracket();
  renderAll();
  showToast(t('toastReset'));
};

/**
 * 확률 기반 경기 승자 예측
 * - 각 팀의 기본 rating에 ±12 범위의 랜덤 폼(form) 노이즈를 부여
 * - 조정된 rating 차이를 로지스틱 함수(k=0.055)에 넣어 승리 확률 계산
 * - 이론적 승률: rating 차 0 → 50%, 차 10 → ~61%, 차 20 → ~73%, 차 30 → ~83%
 * - 폼 노이즈 덕분에 매 실행마다 결과가 달라짐 (업셋 가능)
 */
function predictMatchWinner(t1, t2) {
  var FORM_RANGE = 12;  // 폼 노이즈 ±12 (크게 할수록 업셋 빈도↑)
  var K = 0.055;        // 민감도 (작게 할수록 rating 차가 덜 반영됨)

  var r1 = t1.rating + (Math.random() - 0.5) * FORM_RANGE * 2;
  var r2 = t2.rating + (Math.random() - 0.5) * FORM_RANGE * 2;
  var p1 = 1 / (1 + Math.exp(-K * (r1 - r2)));

  return Math.random() < p1
    ? { winner: t1, loser: t2 }
    : { winner: t2, loser: t1 };
}

window.autoPredictBracket = function() {
  var upsets = 0;
  var rounds = [
    MATCH_ORDER.slice(0, 16),  // R32: 73-88
    MATCH_ORDER.slice(16, 24), // R16: 89-96
    MATCH_ORDER.slice(24, 28), // QF:  97-100
    MATCH_ORDER.slice(28, 30), // SF:  101-102
    MATCH_ORDER.slice(30, 32)  // Finals: 103-104
  ];
  for (var r = 0; r < rounds.length; r++) {
    calculateStandingsAndBracket();
    for (var i = 0; i < rounds[r].length; i++) {
      var mId = rounds[r][i];
      var match = state.matches[mId];
      if (match.t1 && match.t2) {
        var result = predictMatchWinner(match.t1, match.t2);
        match.winner = result.winner;
        match.loser  = result.loser;
        if (result.winner.rating < result.loser.rating) upsets++;
      }
    }
  }
  calculateStandingsAndBracket();
  renderAll();

  var champ = state.matches[104] && state.matches[104].winner;
  var msg = champ
    ? t('toastPredictWin').replace('{team}', teamDisplayName(champ)).replace('{n}', upsets)
    : t('toastPredictDone').replace('{n}', upsets);
  showToast(msg);
};
