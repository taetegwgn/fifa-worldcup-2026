/* ============================================================
   WC 2026 Simulator — live API (parallel fetch)
   ============================================================ */
'use strict';

function fetchAPI(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.timeout = 15000;
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200) {
        try { resolve(JSON.parse(xhr.responseText)); }
        catch (e) { reject(e); }
      } else {
        reject(new Error('API ' + xhr.status + ': ' + url));
      }
    };
    xhr.ontimeout = function() { reject(new Error('Timeout: ' + url)); };
    xhr.send();
  });
}

function applyTeamsData(dataTeams) {
  if (!dataTeams || !dataTeams.teams) return {};
  var teamMap = {};
  var idToFifaCode = {};
  for (var i = 0; i < dataTeams.teams.length; i++) {
    var team = dataTeams.teams[i];
    teamMap[team.fifa_code] = team;
    idToFifaCode[team.id] = team.fifa_code;
  }
  state.teamMap = teamMap;
  var byName = {};
  for (var bi = 0; bi < dataTeams.teams.length; bi++) {
    var bt = dataTeams.teams[bi];
    byName[bt.name_en] = { flag: bt.flag, fifa_code: bt.fifa_code };
  }
  state.teamByNameEn = byName;
  return { teamMap: teamMap, idToFifaCode: idToFifaCode };
}

function applyGroupsData(dataGroups, teamMap, idToFifaCode) {
  if (!dataGroups || !dataGroups.groups) return;
  for (var j = 0; j < dataGroups.groups.length; j++) {
    var groupData = dataGroups.groups[j];
    var gName = groupData.name;
    if (!state.groups[gName]) continue;
    var newTeams = [];
    for (var k = 0; k < groupData.teams.length; k++) {
      var teamData = groupData.teams[k];
      var fifaCode = idToFifaCode[teamData.team_id];
      if (!fifaCode) continue;
      var apiTeam = teamMap[fifaCode];
      var existingTeam = null;
      var internalTeams = state.groups[gName].teams;
      for (var idx = 0; idx < internalTeams.length; idx++) {
        if (internalTeams[idx].id === fifaCode) { existingTeam = internalTeams[idx]; break; }
      }
      if (existingTeam) {
        existingTeam.pts = parseInt(teamData.pts, 10) || 0;
        existingTeam.gd  = parseInt(teamData.gd,  10) || 0;
        existingTeam.gs  = parseInt(teamData.gf,  10) || 0;
        existingTeam.ga  = parseInt(teamData.ga,  10) || 0;
        existingTeam.mp  = parseInt(teamData.mp,  10) || 0;
        existingTeam.w   = parseInt(teamData.w,   10) || 0;
        existingTeam.d   = parseInt(teamData.d,   10) || 0;
        existingTeam.l   = parseInt(teamData.l,   10) || 0;
        if (apiTeam && apiTeam.flag) existingTeam.flagUrl = apiTeam.flag;
        newTeams.push(existingTeam);
      }
    }
    if (newTeams.length === 4) {
      newTeams.sort(function(a, b) {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.gd  !== a.gd)  return b.gd  - a.gd;
        return b.gs - a.gs;
      });
      state.groups[gName].teams = newTeams;
    }
  }
}

function applyGamesData(dataGames) {
  if (dataGames && dataGames.games) state.liveGames = dataGames.games;
}

function snapshotGroupRanks() {
  var snap = {};
  for (var g in state.groups) {
    if (!Object.prototype.hasOwnProperty.call(state.groups, g)) continue;
    var teams = state.groups[g].teams;
    for (var i = 0; i < teams.length; i++) {
      snap[teams[i].id] = { group: g, rank: i + 1 };
    }
  }
  return snap;
}

function applyLiveScoresToGroups() {
  if (!state.liveGames || !state.liveGames.length) return;

  var teamIdByName = {};
  for (var g in state.groups) {
    if (!Object.prototype.hasOwnProperty.call(state.groups, g)) continue;
    for (var ti = 0; ti < state.groups[g].teams.length; ti++) {
      var tm = state.groups[g].teams[ti];
      teamIdByName[tm.nameEn] = { id: tm.id, group: g };
    }
  }

  for (var i = 0; i < state.liveGames.length; i++) {
    var gm = state.liveGames[i];
    if (gm.type !== 'group') continue;
    var isLive = gm.finished !== 'TRUE' && gm.time_elapsed && gm.time_elapsed !== 'notstarted';
    if (!isLive) continue;

    var hInfo = teamIdByName[gm.home_team_name_en];
    var aInfo = teamIdByName[gm.away_team_name_en];
    if (!hInfo || !aInfo || hInfo.group !== aInfo.group) continue;

    var grpKey = hInfo.group;
    var grpTeams = state.groups[grpKey].teams;
    var hTeam = null, aTeam = null;
    for (var j = 0; j < grpTeams.length; j++) {
      if (grpTeams[j].id === hInfo.id) hTeam = grpTeams[j];
      if (grpTeams[j].id === aInfo.id) aTeam = grpTeams[j];
    }
    if (!hTeam || !aTeam) continue;

    var hGoals = parseInt(gm.home_score, 10) || 0;
    var aGoals = parseInt(gm.away_score, 10) || 0;

    hTeam._liveGF = (hTeam._liveGF || 0) + hGoals;
    hTeam._liveGA = (hTeam._liveGA || 0) + aGoals;
    aTeam._liveGF = (aTeam._liveGF || 0) + aGoals;
    aTeam._liveGA = (aTeam._liveGA || 0) + hGoals;

    if (hGoals > aGoals) {
      hTeam._livePts = (hTeam._livePts || 0) + 3;
      hTeam._liveW = (hTeam._liveW || 0) + 1;
      aTeam._liveL = (aTeam._liveL || 0) + 1;
    } else if (hGoals < aGoals) {
      aTeam._livePts = (aTeam._livePts || 0) + 3;
      aTeam._liveW = (aTeam._liveW || 0) + 1;
      hTeam._liveL = (hTeam._liveL || 0) + 1;
    } else {
      hTeam._livePts = (hTeam._livePts || 0) + 1;
      aTeam._livePts = (aTeam._livePts || 0) + 1;
      hTeam._liveD = (hTeam._liveD || 0) + 1;
      aTeam._liveD = (aTeam._liveD || 0) + 1;
    }
    hTeam._liveMP = (hTeam._liveMP || 0) + 1;
    aTeam._liveMP = (aTeam._liveMP || 0) + 1;
  }

  for (var gk in state.groups) {
    if (!Object.prototype.hasOwnProperty.call(state.groups, gk)) continue;
    var teams = state.groups[gk].teams;
    var anyLive = false;
    for (var k = 0; k < teams.length; k++) {
      if (teams[k]._liveMP) { anyLive = true; break; }
    }
    if (!anyLive) continue;

    for (var k2 = 0; k2 < teams.length; k2++) {
      var tt = teams[k2];
      tt._totalPts = (tt.pts || 0) + (tt._livePts || 0);
      tt._totalGD  = (tt.gd || 0)  + ((tt._liveGF || 0) - (tt._liveGA || 0));
      tt._totalGF  = (tt.gs || 0)  + (tt._liveGF || 0);
      tt._totalGA  = (tt.ga || 0)  + (tt._liveGA || 0);
      tt._totalMP  = (tt.mp || 0)  + (tt._liveMP || 0);
      tt._totalW   = (tt.w || 0)   + (tt._liveW || 0);
      tt._totalD   = (tt.d || 0)   + (tt._liveD || 0);
      tt._totalL   = (tt.l || 0)   + (tt._liveL || 0);
      tt._hasLive  = true;
    }

    teams.sort(function(a, b) {
      var ap = a._totalPts !== undefined ? a._totalPts : a.pts;
      var bp = b._totalPts !== undefined ? b._totalPts : b.pts;
      if (bp !== ap) return bp - ap;
      var agd = a._totalGD !== undefined ? a._totalGD : a.gd;
      var bgd = b._totalGD !== undefined ? b._totalGD : b.gd;
      if (bgd !== agd) return bgd - agd;
      var agf = a._totalGF !== undefined ? a._totalGF : a.gs;
      var bgf = b._totalGF !== undefined ? b._totalGF : b.gs;
      return bgf - agf;
    });
  }
}

function clearLiveFields() {
  for (var g in state.groups) {
    if (!Object.prototype.hasOwnProperty.call(state.groups, g)) continue;
    for (var i = 0; i < state.groups[g].teams.length; i++) {
      var t = state.groups[g].teams[i];
      delete t._livePts; delete t._liveGF; delete t._liveGA;
      delete t._liveW; delete t._liveD; delete t._liveL; delete t._liveMP;
      delete t._totalPts; delete t._totalGD; delete t._totalGF; delete t._totalGA;
      delete t._totalMP; delete t._totalW; delete t._totalD; delete t._totalL;
      delete t._hasLive;
    }
  }
}

function applyStadiumsData(dataSt) {
  if (!dataSt || !dataSt.stadiums) return;
  dataSt.stadiums.forEach(function(s) {
    state.stadiumMap[s.id] = {
      name_en: s.name_en,
      city_en: s.city_en,
      country_en: s.country_en
    };
  });
}

var _syncInFlight = false;
var CACHE_KEY = 'wc2026_apiCache';

function saveToCache(teamsData, groupsData, gamesData, stadiumsData) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      ts: Date.now(),
      teams: teamsData,
      groups: groupsData,
      games: gamesData,
      stadiums: stadiumsData
    }));
  } catch(e) { /* quota exceeded — ignore */ }
}

function loadFromCache() {
  try {
    var raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return false;
    var cache = JSON.parse(raw);
    if (!cache || !cache.games) return false;

    if (cache.teams) {
      var maps = applyTeamsData(cache.teams);
      if (cache.groups) applyGroupsData(cache.groups, maps.teamMap, maps.idToFifaCode);
    }
    if (cache.games)    applyGamesData(cache.games);
    if (cache.stadiums) applyStadiumsData(cache.stadiums);

    state.lastUpdated = cache.ts ? new Date(cache.ts) : new Date();
    clearLiveFields();
    applyLiveScoresToGroups();
    calculateStandingsAndBracket();
    return true;
  } catch(e) { return false; }
}

function syncLiveScoreData() {
  if (_syncInFlight) return;
  _syncInFlight = true;
  showToast(t('toastLoading'));

  function safeFetch(url) {
    return fetchAPI(url).catch(function(e) { console.warn('[API]', url, e); return null; });
  }

  var _rawTeams, _rawGroups, _rawGames, _rawStadiums;

  safeFetch(API.TEAMS)
    .then(function(dataTeams) {
      _rawTeams = dataTeams;
      var maps = dataTeams ? applyTeamsData(dataTeams) : { teamMap: {}, idToFifaCode: {} };
      return Promise.all([
        safeFetch(API.GROUPS),
        safeFetch(API.GAMES),
        safeFetch(API.STADIUMS)
      ]).then(function(results) {
        _rawGroups = results[0]; _rawGames = results[1]; _rawStadiums = results[2];
        if (results[0]) applyGroupsData(results[0], maps.teamMap, maps.idToFifaCode);
        if (results[1]) applyGamesData(results[1]);
        if (results[2]) applyStadiumsData(results[2]);
      });
    })
    .then(function() {
      state.lastUpdated = new Date();
      saveToCache(_rawTeams, _rawGroups, _rawGames, _rawStadiums);
      state.prevGroupRanks = snapshotGroupRanks();
      clearLiveFields();
      applyLiveScoresToGroups();
      calculateStandingsAndBracket();
      renderAll();
      showToast(t('liveConnected'));
    })
    .catch(function(e) {
      console.error('[sync]', e);
      showToast(t('liveError'));
    })
    .then(function() {
      _syncInFlight = false;
    });
}
