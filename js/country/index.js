/* ============================================================
   Country Selection — 2026 World Cup 48 Nations Only
   ============================================================ */

/* 48개국 — defaultGroups와 완전히 일치 */
var WC_COUNTRIES = [
  /* Group A */ { teamId:'MEX', code:'MX', flag:'🇲🇽', name:'Mexico',        nameKo:'멕시코',      group:'A', tz:'America/Mexico_City' },
  { teamId:'KOR', code:'KR', flag:'🇰🇷', name:'South Korea',   nameKo:'대한민국',    group:'A', tz:'Asia/Seoul' },
  { teamId:'CZE', code:'CZ', flag:'🇨🇿', name:'Czech Republic',nameKo:'체코',        group:'A', tz:'Europe/Prague' },
  { teamId:'RSA', code:'ZA', flag:'🇿🇦', name:'South Africa',  nameKo:'남아공',      group:'A', tz:'Africa/Johannesburg' },
  /* Group B */ { teamId:'SUI', code:'CH', flag:'🇨🇭', name:'Switzerland',   nameKo:'스위스',      group:'B', tz:'Europe/Zurich' },
  { teamId:'CAN', code:'CA', flag:'🇨🇦', name:'Canada',        nameKo:'캐나다',      group:'B', tz:'America/Toronto' },
  { teamId:'BIH', code:'BA', flag:'🇧🇦', name:'Bosnia & Herz.',nameKo:'보스니아',    group:'B', tz:'Europe/Sarajevo' },
  { teamId:'QAT', code:'QA', flag:'🇶🇦', name:'Qatar',         nameKo:'카타르',      group:'B', tz:'Asia/Qatar' },
  /* Group C */ { teamId:'BRA', code:'BR', flag:'🇧🇷', name:'Brazil',        nameKo:'브라질',      group:'C', tz:'America/Sao_Paulo' },
  { teamId:'MAR', code:'MA', flag:'🇲🇦', name:'Morocco',       nameKo:'모로코',      group:'C', tz:'Africa/Casablanca' },
  { teamId:'SCO', code:'GB-SCT', flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿', name:'Scotland',     nameKo:'스코틀랜드',  group:'C', tz:'Europe/London' },
  { teamId:'HAI', code:'HT', flag:'🇭🇹', name:'Haiti',         nameKo:'아이티',      group:'C', tz:'America/Port-au-Prince' },
  /* Group D */ { teamId:'USA', code:'US', flag:'🇺🇸', name:'United States', nameKo:'미국',        group:'D', tz:'America/New_York' },
  { teamId:'TUR', code:'TR', flag:'🇹🇷', name:'Turkey',        nameKo:'튀르키예',    group:'D', tz:'Europe/Istanbul' },
  { teamId:'AUS', code:'AU', flag:'🇦🇺', name:'Australia',     nameKo:'호주',        group:'D', tz:'Australia/Sydney' },
  { teamId:'PAR', code:'PY', flag:'🇵🇾', name:'Paraguay',      nameKo:'파라과이',    group:'D', tz:'America/Asuncion' },
  /* Group E */ { teamId:'GER', code:'DE', flag:'🇩🇪', name:'Germany',       nameKo:'독일',        group:'E', tz:'Europe/Berlin' },
  { teamId:'ECU', code:'EC', flag:'🇪🇨', name:'Ecuador',       nameKo:'에콰도르',    group:'E', tz:'America/Guayaquil' },
  { teamId:'CIV', code:'CI', flag:'🇨🇮', name:"Côte d'Ivoire", nameKo:'코트디부아르',group:'E', tz:'Africa/Abidjan' },
  { teamId:'CUW', code:'CW', flag:'🇨🇼', name:'Curaçao',       nameKo:'퀴라소',      group:'E', tz:'America/Curacao' },
  /* Group F */ { teamId:'NED', code:'NL', flag:'🇳🇱', name:'Netherlands',   nameKo:'네덜란드',    group:'F', tz:'Europe/Amsterdam' },
  { teamId:'JPN', code:'JP', flag:'🇯🇵', name:'Japan',         nameKo:'일본',        group:'F', tz:'Asia/Tokyo' },
  { teamId:'SWE', code:'SE', flag:'🇸🇪', name:'Sweden',        nameKo:'스웨덴',      group:'F', tz:'Europe/Stockholm' },
  { teamId:'TUN', code:'TN', flag:'🇹🇳', name:'Tunisia',       nameKo:'튀니지',      group:'F', tz:'Africa/Tunis' },
  /* Group G */ { teamId:'BEL', code:'BE', flag:'🇧🇪', name:'Belgium',       nameKo:'벨기에',      group:'G', tz:'Europe/Brussels' },
  { teamId:'EGY', code:'EG', flag:'🇪🇬', name:'Egypt',         nameKo:'이집트',      group:'G', tz:'Africa/Cairo' },
  { teamId:'IRN', code:'IR', flag:'🇮🇷', name:'Iran',          nameKo:'이란',        group:'G', tz:'Asia/Tehran' },
  { teamId:'NZL', code:'NZ', flag:'🇳🇿', name:'New Zealand',   nameKo:'뉴질랜드',    group:'G', tz:'Pacific/Auckland' },
  /* Group H */ { teamId:'ESP', code:'ES', flag:'🇪🇸', name:'Spain',         nameKo:'스페인',      group:'H', tz:'Europe/Madrid' },
  { teamId:'URU', code:'UY', flag:'🇺🇾', name:'Uruguay',       nameKo:'우루과이',    group:'H', tz:'America/Montevideo' },
  { teamId:'KSA', code:'SA', flag:'🇸🇦', name:'Saudi Arabia',  nameKo:'사우디',      group:'H', tz:'Asia/Riyadh' },
  { teamId:'CPV', code:'CV', flag:'🇨🇻', name:'Cabo Verde',    nameKo:'카보베르데',  group:'H', tz:'Atlantic/Cape_Verde' },
  /* Group I */ { teamId:'FRA', code:'FR', flag:'🇫🇷', name:'France',        nameKo:'프랑스',      group:'I', tz:'Europe/Paris' },
  { teamId:'NOR', code:'NO', flag:'🇳🇴', name:'Norway',        nameKo:'노르웨이',    group:'I', tz:'Europe/Oslo' },
  { teamId:'SEN', code:'SN', flag:'🇸🇳', name:'Senegal',       nameKo:'세네갈',      group:'I', tz:'Africa/Dakar' },
  { teamId:'IRQ', code:'IQ', flag:'🇮🇶', name:'Iraq',          nameKo:'이라크',      group:'I', tz:'Asia/Baghdad' },
  /* Group J */ { teamId:'ARG', code:'AR', flag:'🇦🇷', name:'Argentina',     nameKo:'아르헨티나',  group:'J', tz:'America/Argentina/Buenos_Aires' },
  { teamId:'AUT', code:'AT', flag:'🇦🇹', name:'Austria',       nameKo:'오스트리아',  group:'J', tz:'Europe/Vienna' },
  { teamId:'ALG', code:'DZ', flag:'🇩🇿', name:'Algeria',       nameKo:'알제리',      group:'J', tz:'Africa/Algiers' },
  { teamId:'JOR', code:'JO', flag:'🇯🇴', name:'Jordan',        nameKo:'요르단',      group:'J', tz:'Asia/Amman' },
  /* Group K */ { teamId:'POR', code:'PT', flag:'🇵🇹', name:'Portugal',      nameKo:'포르투갈',    group:'K', tz:'Europe/Lisbon' },
  { teamId:'COL', code:'CO', flag:'🇨🇴', name:'Colombia',      nameKo:'콜롬비아',    group:'K', tz:'America/Bogota' },
  { teamId:'UZB', code:'UZ', flag:'🇺🇿', name:'Uzbekistan',    nameKo:'우즈베키스탄',group:'K', tz:'Asia/Tashkent' },
  { teamId:'COD', code:'CD', flag:'🇨🇩', name:'DR Congo',      nameKo:'민주콩고',    group:'K', tz:'Africa/Kinshasa' },
  /* Group L */ { teamId:'ENG', code:'GB-ENG', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', name:'England', nameKo:'잉글랜드', group:'L', tz:'Europe/London' },
  { teamId:'CRO', code:'HR', flag:'🇭🇷', name:'Croatia',       nameKo:'크로아티아',  group:'L', tz:'Europe/Zagreb' },
  { teamId:'GHA', code:'GH', flag:'🇬🇭', name:'Ghana',         nameKo:'가나',        group:'L', tz:'Africa/Accra' },
  { teamId:'PAN', code:'PA', flag:'🇵🇦', name:'Panama',        nameKo:'파나마',      group:'L', tz:'America/Panama' },
];

/* ── State ───────────────────────────────────────────────── */
var userCountry = null;
var userTZ = null;

function initCountrySelect() {
  var saved = localStorage.getItem('wc2026_country');
  if (saved) {
    try {
      userCountry = JSON.parse(saved);
      userTZ = userCountry.tz;
      /* currentLang is already set correctly by i18n.js at boot.
         Just sync UI — no extra renderAll needed here. */
      updateCountryUI();
      return;
    } catch(e) {}
  }
  showCountryModal();
}

function saveCountry(teamId) {
  var c = WC_COUNTRIES.find(function(x){ return x.teamId === teamId; });
  if (!c) return;
  userCountry = c;
  userTZ = c.tz;
  localStorage.setItem('wc2026_country', JSON.stringify(c));
  state.scheduleFilter = 'kor';
  updateCountryUI();
  hideCountryModal();
  var targetLang = teamId === 'KOR' ? 'ko' : 'en';
  if (typeof setLang === 'function') {
    setLang(targetLang);
  } else if (typeof renderAll === 'function') {
    renderAll();
  }
}

function useDeviceTZ() {
  var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  userTZ = tz;
  /* Default to first team (MEX) as placeholder if no team chosen yet */
  userCountry = userCountry || { teamId:'__', code:'__', flag:'🌐', name:'World', nameKo:'월드', group:null, tz:tz };
  userCountry.tz = tz;
  localStorage.setItem('wc2026_country', JSON.stringify(userCountry));
  updateCountryUI();
  hideCountryModal();
  if (typeof renderAll === 'function') renderAll();
}

function getMyTeamId() {
  return userCountry ? userCountry.teamId : null;
}

function getMyTeamNameEn() {
  if (!userCountry) return null;
  /* Match to API English name */
  var apiNameMap = {
    'MEX':'Mexico','KOR':'South Korea','CZE':'Czech Republic','RSA':'South Africa',
    'SUI':'Switzerland','CAN':'Canada','BIH':'Bosnia and Herzegovina','QAT':'Qatar',
    'BRA':'Brazil','MAR':'Morocco','SCO':'Scotland','HAI':'Haiti',
    'USA':'United States','TUR':'Turkey','AUS':'Australia','PAR':'Paraguay',
    'GER':'Germany','ECU':'Ecuador','CIV':'Ivory Coast','CUW':'Curaçao',
    'NED':'Netherlands','JPN':'Japan','SWE':'Sweden','TUN':'Tunisia',
    'BEL':'Belgium','EGY':'Egypt','IRN':'Iran','NZL':'New Zealand',
    'ESP':'Spain','URU':'Uruguay','KSA':'Saudi Arabia','CPV':'Cape Verde',
    'FRA':'France','NOR':'Norway','SEN':'Senegal','IRQ':'Iraq',
    'ARG':'Argentina','AUT':'Austria','ALG':'Algeria','JOR':'Jordan',
    'POR':'Portugal','COL':'Colombia','UZB':'Uzbekistan','COD':'Democratic Republic of the Congo',
    'ENG':'England','CRO':'Croatia','GHA':'Ghana','PAN':'Panama'
  };
  return apiNameMap[userCountry.teamId] || userCountry.name;
}

function updateCountryUI() {
  var btn = document.getElementById('btn-country');
  if (btn && userCountry) {
    btn.textContent = userCountry.flag;
    btn.title = userCountry.name;
  }
  /* Update scenarios tab icon to selected team flag */
  if (userCountry) {
    var scenarioTabs = document.querySelectorAll('[data-tab="scenarios"]');
    for (var i = 0; i < scenarioTabs.length; i++) {
      var tab = scenarioTabs[i];
      var mobileIcon = tab.querySelector('.tab-icon');
      if (mobileIcon) {
        mobileIcon.textContent = userCountry.flag;
      } else {
        var label = tab.querySelector('[data-i18n="tabScenarios"]');
        if (label && label.previousSibling) {
          label.previousSibling.textContent = userCountry.flag + ' ';
        }
      }
    }
  }
}

/* ── Modal ───────────────────────────────────────────────── */
function showCountryModal() {
  var modal = document.getElementById('country-modal');
  if (modal) modal.style.display = 'flex';
}
function hideCountryModal() {
  var modal = document.getElementById('country-modal');
  if (modal) modal.style.display = 'none';
}

/* ── Timezone helpers ────────────────────────────────────── */
/* Venue UTC offsets during summer (June–July) */
var STADIUM_UTC_OFFSET = {
  1:-6, 2:-6, 3:-6,
  4:-5, 5:-5, 6:-5,
  7:-4, 8:-4, 9:-4, 10:-4, 11:-4, 12:-4,
  13:-7, 14:-7, 15:-7, 16:-7
};

/* local_date is in the venue's local timezone. Convert to UTC Date object. */
function toUserTZ(dateStr, stadiumId) {
  if (!dateStr) return null;
  try {
    var parts = dateStr.match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/);
    if (!parts) return null;
    var offset = (stadiumId && STADIUM_UTC_OFFSET[stadiumId] !== undefined)
                   ? STADIUM_UTC_OFFSET[stadiumId] : -4;
    var utcMs = Date.UTC(
      parseInt(parts[3],10), parseInt(parts[1],10)-1, parseInt(parts[2],10),
      parseInt(parts[4],10) - offset, parseInt(parts[5],10)
    );
    return new Date(utcMs);
  } catch(e) { return null; }
}

/* All format helpers use the browser's system timezone automatically. */
function _systemTZ() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function formatInUserTZ(date) {
  if (!date) return '--:--';
  var locale = currentLang === 'ko' ? 'ko-KR' : 'en-US';
  try {
    return new Intl.DateTimeFormat(locale, { timeZone:_systemTZ(), month:'short', day:'numeric', weekday:'short', hour:'numeric', minute:'2-digit', hour12:true }).format(date);
  } catch(e) { return String(date); }
}

function formatTimeOnlyUserTZ(date) {
  if (!date) return '--:--';
  var locale = currentLang === 'ko' ? 'ko-KR' : 'en-US';
  try {
    return new Intl.DateTimeFormat(locale, { timeZone:_systemTZ(), hour:'numeric', minute:'2-digit', hour12:true }).format(date);
  } catch(e) { return '--:--'; }
}

function formatDateKeyUserTZ(date) {
  if (!date) return '';
  try {
    var parts = new Intl.DateTimeFormat('en-CA', { timeZone:_systemTZ(), year:'numeric', month:'2-digit', day:'2-digit' }).formatToParts(date);
    var y='',mo='',d='';
    parts.forEach(function(p){ if(p.type==='year') y=p.value; if(p.type==='month') mo=p.value; if(p.type==='day') d=p.value; });
    return y+'-'+mo+'-'+d;
  } catch(e) { return ''; }
}

function formatDateLabelUserTZ(date) {
  if (!date) return '';
  var locale = currentLang === 'ko' ? 'ko-KR' : 'en-US';
  try {
    return new Intl.DateTimeFormat(locale, { timeZone:_systemTZ(), month:'long', day:'numeric', weekday:'short' }).format(date);
  } catch(e) { return String(date); }
}
