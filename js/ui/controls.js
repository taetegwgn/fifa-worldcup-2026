/* ============================================================
   WC 2026 Simulator — controls.js
   ============================================================ */
'use strict';

// 7. UTILS & UI EVENTS
// =========================================================

function showView(viewId) {
  var sections = document.querySelectorAll('.view-section');
  Array.prototype.forEach.call(sections, function(sec) {
    sec.classList.remove('active');
    sec.style.display = 'none';
  });

  var target = document.getElementById(viewId + '-view');
  if (target) {
    target.classList.add('active');
    target.style.display = 'block';
  }

  var tabs = document.querySelectorAll('.tab-btn');
  Array.prototype.forEach.call(tabs, function(tab) {
    tab.classList.remove('active');
    if (tab.getAttribute('data-tab') === viewId) {
      tab.classList.add('active');
    }
  });

  renderTab(viewId);
}

function showToast(message) {
  var toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast glass';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(function() {
    toast.classList.remove('show');
  }, 3000);
}

function setupEventListeners() {
  var tabs = document.querySelectorAll('.tab-btn');
  Array.prototype.forEach.call(tabs, function(tab) {
    tab.addEventListener('click', function() {
      showView(this.getAttribute('data-tab'));
    });
  });

  var btnReset = document.getElementById('btn-reset');
  if (btnReset) btnReset.addEventListener('click', window.resetSimulator);

  var btnAutoPredict = document.getElementById('btn-auto-predict');
  if (btnAutoPredict) btnAutoPredict.addEventListener('click', window.autoPredictBracket);

  var btnGoGroups = document.getElementById('btn-go-groups');
  if (btnGoGroups) btnGoGroups.addEventListener('click', function() { showView('groups'); });

  var btnGoBracket = document.getElementById('btn-go-bracket');
  if (btnGoBracket) btnGoBracket.addEventListener('click', function() { showView('bracket'); });

  var btnAutoFill = document.getElementById('btn-auto-fill');
  if (btnAutoFill) btnAutoFill.addEventListener('click', window.autoFillGroups);

  var btnRefresh = document.getElementById('btn-refresh');
  if (btnRefresh) btnRefresh.addEventListener('click', function() { syncLiveScoreData(); });
}

var dragSrcEl = null;

function handleDragStart(e) {
  this.classList.add('dragging');
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcEl !== this) {
    var groupKey = this.getAttribute('data-group');
    if (groupKey && dragSrcEl.getAttribute('data-group') === groupKey) {
      var sourceIndex = parseInt(dragSrcEl.getAttribute('data-index'), 10);
      var targetIndex = parseInt(this.getAttribute('data-index'), 10);
      
      var arr = state.groups[groupKey].teams;
      var temp = arr[sourceIndex];
      arr.splice(sourceIndex, 1);
      arr.splice(targetIndex, 0, temp);
      
      calculateStandingsAndBracket();
      markAllDirty();
      renderCurrentView();
    }
  }
  return false;
}

function handleDragEnd(e) {
  this.classList.remove('dragging');
  var cols = document.querySelectorAll('.team-row');
  Array.prototype.forEach.call(cols, function (col) {
    col.classList.remove('over');
  });
}

function setupDragAndDrop() {
  // 모바일에서는 드래그 비활성화 (재정렬 버튼 사용)
  var isMobile = window.matchMedia('(max-width: 768px)').matches;
  var rows = document.querySelectorAll('.team-row');
  Array.prototype.forEach.call(rows, function(row) {
    if (isMobile) {
      row.removeAttribute('draggable');
      return;
    }
    row.addEventListener('dragstart', handleDragStart, false);
    row.addEventListener('dragenter', handleDragEnter, false);
    row.addEventListener('dragover', handleDragOver, false);
    row.addEventListener('dragleave', handleDragLeave, false);
    row.addEventListener('drop', handleDrop, false);
    row.addEventListener('dragend', handleDragEnd, false);
  });
}

window.openMatchModal = function(e, matchId) {
  if (e) e.stopPropagation();
  var match = state.matches[matchId];
  if (!match || !match.t1 || !match.t2) return;
  
  var t1 = match.t1;
  var t2 = match.t2;
  
  var html = '<h2 style="text-align:center; margin-top:0;">' + t1.flag + ' ' + teamDisplayName(t1) + ' <span style="color:var(--text-muted); font-size:1rem; margin:0 10px;">VS</span> ' + teamDisplayName(t2) + ' ' + t2.flag + '</h2>';
  
  var events = state.liveEvents[matchId];
  if (events && events.length > 0) {
    html += '<h3 style="border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:5px; margin-top:20px;">' + t('matchModalTimeline') + '</h3>';
    html += '<div class="timeline-container">';
    for (var i=0; i<events.length; i++) {
      var ev = events[i];
      var teamName = ev.teamId === t1.id ? teamDisplayName(t1) : teamDisplayName(t2);
      html += '<div class="timeline-event"><strong>' + ev.min + '\'</strong> ' + ev.type + ' - ' + ev.player + ' <span style="color:var(--text-muted);">(' + teamName + ')</span></div>';
    }
    html += '</div>';
  } else {
     html += '<div style="margin-top:20px; color:var(--text-muted); text-align:center; font-size:0.85rem;">' + t('matchModalNoEvents') + '</div>';
  }
  
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('match-modal').style.display = 'flex';
};

window.closeMatchModal = function() {
  document.getElementById('match-modal').style.display = 'none';
};

// Close modal on outside click (deferred — element may not exist at parse time)
function initModalCloseHandler() {
  var modal = document.getElementById('match-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) window.closeMatchModal();
    });
  }
}
