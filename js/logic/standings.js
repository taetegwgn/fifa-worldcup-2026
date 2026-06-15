/* ============================================================
   WC 2026 Simulator — standings.js
   ============================================================ */
'use strict';

// 4. CORE LOGIC
// =========================================================

function calculateStandingsAndBracket() {
  // 1. Determine Top 8 Third-place teams
  var thirdTeamsList = [];
  for (var key in state.groups) {
    if (Object.prototype.hasOwnProperty.call(state.groups, key)) {
      var thirdTeam = state.groups[key].teams[2]; // 3rd team (index 2)
      var stats = state.thirdStats[key];
      thirdTeamsList.push({
        group: key,
        team: thirdTeam,
        pts: stats.pts,
        gd: stats.gd,
        gs: stats.gs
      });
    }
  }

  // Sort third teams
  thirdTeamsList.sort(function(a, b) {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gs - a.gs;
  });

  state.thirdQualifiers = thirdTeamsList.slice(0, 8);
  
  // Calculate valid mapping (Backtracking approach to guarantee all slots filled if possible)
  var slots = Object.keys(thirdPlaceSlots);
  
  function findMapping(slotIndex, currentMapping, used) {
    if (slotIndex === slots.length) return currentMapping;
    var matchId = slots[slotIndex];
    var allowed = thirdPlaceSlots[matchId].allowed;
    
    for (var j = 0; j < state.thirdQualifiers.length; j++) {
      var grp = state.thirdQualifiers[j].group;
      if (!used[grp] && allowed.indexOf(grp) !== -1) {
        used[grp] = true;
        currentMapping[grp] = matchId;
        var result = findMapping(slotIndex + 1, currentMapping, used);
        if (result) return result;
        used[grp] = false;
        delete currentMapping[grp];
      }
    }
    return null; // Failed this path
  }
  
  var mapping = findMapping(0, {}, {}) || {};
  state.thirdMappings = mapping;

  // 2. Propagate to Bracket
  function getTeamFromSource(source) {
    if (!source) return null;
    
    if (source.length === 2 && (source[0] === '1' || source[0] === '2')) {
      // e.g. "1A", "2B"
      var rank = parseInt(source[0], 10) - 1;
      var grpKey = source[1];
      if (state.groups[grpKey] && state.groups[grpKey].teams[rank]) {
        return state.groups[grpKey].teams[rank];
      }
    } else if (source.indexOf('3rd_M') === 0) {
      // e.g. "3rd_M75"
      var mId = source.substring(4); // "M75"
      // find which group was mapped to this match
      for (var g in mapping) {
        if (mapping[g] === mId) {
          return state.groups[g].teams[2];
        }
      }
    } else if (source.indexOf('W') === 0) {
      // e.g. "W73"
      var wMatchId = source.substring(1);
      return state.matches[wMatchId] ? state.matches[wMatchId].winner : null;
    } else if (source.indexOf('L') === 0) {
      // e.g. "L101"
      var lMatchId = source.substring(1);
      return state.matches[lMatchId] ? state.matches[lMatchId].loser : null;
    }
    return null;
  }

  // We need to resolve rounds sequentially
  var matchOrder = [
    73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, // R32
    89, 90, 91, 92, 93, 94, 95, 96, // R16
    97, 98, 99, 100, // QF
    101, 102, // SF
    103, 104 // Finals
  ];

  for (var mi = 0; mi < matchOrder.length; mi++) {
    var mId = matchOrder[mi];
    var def = matchDefinitions[mId];
    var matchState = state.matches[mId];
    
    var newT1 = getTeamFromSource(def.t1_source);
    var newT2 = getTeamFromSource(def.t2_source);
    
    matchState.t1 = newT1;
    matchState.t2 = newT2;
    
    // Clear winner if teams changed
    if (matchState.winner) {
      if ((newT1 && matchState.winner.id === newT1.id) || (newT2 && matchState.winner.id === newT2.id)) {
        // Winner is still valid
      } else {
        matchState.winner = null;
        matchState.loser = null;
      }
    }
  }
}
