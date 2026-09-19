/* ============================================================
   CORES DAS BANDEIRAS — RESULTADO (resultado.html)
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var THEME_KEY = 'geopoliso-theme';

  function applyTheme(theme) { root.setAttribute('data-theme', theme); }

  function initTheme() {
    var saved = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(saved);
    var toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(next);
        localStorage.setItem(THEME_KEY, next);
      });
    }
  }

  // Limiares de mensagem (0 a "total"). Ajuste aqui se quiser outras faixas.
  function messageFor(hits, total) {
    var ratio = total > 0 ? hits / total : 0;
    if (ratio >= 0.8) return 'Parabéns! Parece que temos um especialista.';
    if (ratio >= 0.4) return 'Quase lá! Por que não tentar de novo?';
    return 'Minha nossa! Fica tranquilo, na próxima você consegue.';
  }

  function loadResult() {
    var hits = 0, total = 10;
    try {
      var raw = sessionStorage.getItem('geopoliso-flags-score');
      if (raw) {
        var parsed = JSON.parse(raw);
        if (typeof parsed.hits === 'number') hits = parsed.hits;
        if (typeof parsed.total === 'number') total = parsed.total;
      }
    } catch (e) { /* sem dado salvo: mostra o padrão 0/10 */ }

    document.getElementById('resultScore').textContent = hits + '/' + total;
    document.getElementById('resultMessage').textContent = messageFor(hits, total);
  }

  function initExitButton() {
    var btn = document.getElementById('exitBtn');
    if (btn) {
      btn.addEventListener('click', function () {
        window.location.href = 'jogo2.html';
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {


    initTheme();
    loadResult();
    initExitButton();
  });
})();
