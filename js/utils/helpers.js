/* ============================================================
   WC 2026 Simulator — helpers.js
   ============================================================ */
'use strict';

// 3. HELPERS
// =========================================================

function groupLabel(g) {
  return currentLang === 'ko' ? g + t('groupSuffix') : t('groupSuffix') + ' ' + g;
}

function localizeMatchLabel(label) {
  if (currentLang === 'ko' || !label) return label;
  return label
    .replace(/32강 (\d+)경기/, 'R32 Match $1')
    .replace(/16강/, 'R16')
    .replace(/8강/, 'QF')
    .replace(/준결승/, 'SF')
    .replace(/3위결정전/, '3rd Place')
    .replace(/결승전/, 'Final');
}

function localizeBracketDate(dateStr) {
  if (currentLang === 'ko' || !dateStr) return dateStr;
  var dayMap = { '일':'Sun','월':'Mon','화':'Tue','수':'Wed','목':'Thu','금':'Fri','토':'Sat' };
  return dateStr.replace(/\((.)\)/, function(m, d) { return '(' + (dayMap[d] || d) + ')'; });
}

var STADIUM_EN = {
  '소파이 스타디움':'SoFi Stadium','NRG 스타디움':'NRG Stadium','질레트 스타디움':'Gillette Stadium',
  'BBVA 스타디움':'BBVA Stadium','AT&T 스타디움':'AT&T Stadium','멧라이프 스타디움':'MetLife Stadium',
  '아스테카 스타디움':'Estadio Azteca','메르세데스-벤츠 스타디움':'Mercedes-Benz Stadium',
  '루멘 필드':'Lumen Field','리바이스 스타디움':'Levi\'s Stadium','BMO 필드':'BMO Field',
  'BC 플레이스':'BC Place','하드록 스타디움':'Hard Rock Stadium','애로우헤드 스타디움':'Arrowhead Stadium',
  'NRG':'NRG Stadium','멧라이프':'MetLife Stadium','아스테카':'Estadio Azteca',
  '메르세데스-벤츠':'Mercedes-Benz Stadium','질레트':'Gillette Stadium','소파이':'SoFi Stadium',
  '하드록':'Hard Rock Stadium','애로우헤드':'Arrowhead Stadium','링컨 파이낸셜':'Lincoln Financial Field'
};

var CITY_EN = {
  '로스앤젤레스':'Los Angeles','휴스턴':'Houston','보스턴':'Boston','몬테레이':'Monterrey',
  '댈러스':'Dallas','뉴욕/뉴저지':'New York/New Jersey','멕시코시티':'Mexico City','애틀랜타':'Atlanta',
  '시애틀':'Seattle','샌프란시스코':'San Francisco','토론토':'Toronto','밴쿠버':'Vancouver',
  '마이애미':'Miami','캔자스시티':'Kansas City','필라델피아':'Philadelphia'
};

function localizeStadium(name) {
  if (!name) return '';
  return currentLang === 'ko' ? name : (STADIUM_EN[name] || name);
}

function bracketSourceLabel(src) {
  if (!src) return '';
  var rankEn = { '1':'1st','2':'2nd','3':'3rd' };
  var m = src.match(/^(\d)([A-L])$/);
  if (m) {
    return currentLang === 'ko'
      ? m[2] + '조 ' + m[1] + '위'
      : 'Group ' + m[2] + ' ' + (rankEn[m[1]] || m[1]);
  }
  if (src.indexOf('3rd_') === 0) return currentLang === 'ko' ? '3위 (' + src + ')' : '3rd (' + src.replace('3rd_', '') + ')';
  if (src.charAt(0) === 'W') return (currentLang === 'ko' ? '승자 ' : 'Winner ') + src;
  if (src.charAt(0) === 'L') return (currentLang === 'ko' ? '패자 ' : 'Loser ') + src;
  return src;
}

function apiTeamDisplayName(nameEn) {
  if (!nameEn) return '';
  if (currentLang === 'en') return nameEn;
  for (var gKey in state.groups) {
    if (!Object.prototype.hasOwnProperty.call(state.groups, gKey)) continue;
    var teams = state.groups[gKey].teams;
    for (var i = 0; i < teams.length; i++) {
      if (teams[i].nameEn === nameEn) return teamDisplayName(teams[i]);
    }
  }
  return nameEn;
}

// Return <img> flag (or emoji fallback) for a team's English name
function getFlagImgByNameEn(nameEn) {
  var teamInfo = state.teamByNameEn[nameEn];
  if (teamInfo && teamInfo.flag) {
    return '<img src="' + teamInfo.flag + '" alt="' + nameEn + '" class="sched-flag-img">';
  }
  for (var gk in state.groups) {
    if (!Object.prototype.hasOwnProperty.call(state.groups, gk)) continue;
    for (var i = 0; i < state.groups[gk].teams.length; i++) {
      var tm = state.groups[gk].teams[i];
      if (tm.nameEn === nameEn) {
        if (tm.flagUrl) return '<img src="' + tm.flagUrl + '" alt="' + nameEn + '" class="sched-flag-img">';
        if (tm.flag) return '<span class="sched-flag-emoji">' + tm.flag + '</span>';
      }
    }
  }
  return '';
}

// Parse scorer string: {"Name 45'","Name 67'"} → [{name, min}]
function parseScorers(str) {
  if (!str || str === 'null') return [];
  var result = [];
  var inner = str.replace(/^\{|\}$/g, '');
  var parts = inner.split(/","/);
  for (var i = 0; i < parts.length; i++) {
    // strip all quote variants: ' " ' ' ‚ „
    var item = parts[i].replace(/^[\u0022\u0027\u2018\u2019\u201a\u201b\u201c\u201d]+|[\u0022\u0027\u2018\u2019\u201a\u201b\u201c\u201d]+$/g, '').trim();
    if (!item) continue;
    // minute pattern: digits followed by any quote/prime + optional extras like +3' (OG) (pen)
    // handles: 45'  45'+3'  90'+8'  7'(OG)
    var minRe = /\s+(\d+[\u0027\u2019\u2032\u02bc][+\d\u0027\u2019\u2032\u02bc]*(\([^)]*\))?)\s*$/;
    var minMatch = item.match(minRe);
    var name, minute;
    if (minMatch) {
      minute = minMatch[1].replace(/[\u2019\u2032\u02bc]/g, "'"); // normalize to ASCII '
      name   = item.slice(0, item.length - minMatch[0].length).trim();
    } else {
      // fallback: last token looks like "67" without quote
      var fbMatch = item.match(/^(.+?)\s+(\d{1,3})\s*$/);
      if (fbMatch) {
        name   = fbMatch[1].trim();
        minute = fbMatch[2] + "'";
      } else {
        name   = item;
        minute = '';
      }
    }
    result.push({ name: name, minute: minute });
  }
  return result;
}

// Format date string "MM/DD/YYYY HH:MM" to localized display
function formatMatchDate(dateStr) {
  if (!dateStr) return '';
  var parts = dateStr.match(/(\d+)\/(\d+)\/(\d+)\s+(\d+):(\d+)/);
  if (!parts) return dateStr;
  var month = parseInt(parts[1], 10);
  var day   = parseInt(parts[2], 10);
  var hour  = parseInt(parts[4], 10);
  var min   = parts[5];
  try {
    var d = new Date(parseInt(parts[3], 10), month - 1, day);
    if (currentLang === 'en') {
      var daysEn = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      return month + '/' + day + ' (' + daysEn[d.getDay()] + ') ' + hour + ':' + min;
    }
    var daysKo = ['일','월','화','수','목','금','토'];
    return month + '/' + day + '(' + daysKo[d.getDay()] + ') ' + hour + ':' + min;
  } catch(e) {
    return month + '/' + day + ' ' + hour + ':' + min;
  }
}
