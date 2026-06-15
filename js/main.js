/* WC 2026 Simulator — bootstrap */
'use strict';

(function bootstrap() {
  function start() {
    try {
      init();
    } catch (e) {
      var errDiv = document.createElement('div');
      errDiv.className = 'error-banner';
      errDiv.style.cssText = 'background:red;color:white;padding:20px';
      errDiv.textContent = 'Critical Error: ' + e.message;
      document.body.insertBefore(errDiv, document.body.firstChild);
    }
  }
  if (document.readyState === 'interactive' || document.readyState === 'complete') start();
  else document.addEventListener('DOMContentLoaded', start);
})();
