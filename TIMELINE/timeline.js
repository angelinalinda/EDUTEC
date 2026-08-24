document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     1. ALTERNÂNCIA DE TEMA (claro / escuro)
  --------------------------------------------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const favicon = document.getElementById('favicon');

  function buildGlobeFavicon(color) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="none" stroke="${color}" stroke-width="1.8"/>
        <ellipse cx="12" cy="12" rx="4.2" ry="10" fill="none" stroke="${color}" stroke-width="1.8"/>
        <line x1="2" y1="12" x2="22" y2="12" stroke="${color}" stroke-width="1.8"/>
        <line x1="3.5" y1="7" x2="20.5" y2="7" stroke="${color}" stroke-width="1.4"/>
        <line x1="3.5" y1="17" x2="20.5" y2="17" stroke="${color}" stroke-width="1.4"/>
      </svg>`;
    favicon.setAttribute('href', 'data:image/svg+xml;base64,' + btoa(svg));
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    buildGlobeFavicon(theme === 'light' ? '#000' : '#fff');
  }

  const savedTheme = localStorage.getItem('geopoliso-theme') || 'dark';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('geopoliso-theme', next);
  });

  /* ---------------------------------------------------
     2. TIMELINE — clique na imagem alterna o card
     Estado inicial: todos os cards ocultos.
     Cada bloco é independente (não fecha os outros).
  --------------------------------------------------- */
  const timelineBlocks = document.querySelectorAll('.timeline-block');

  timelineBlocks.forEach((block) => {
    block.addEventListener('click', () => {
      block.classList.toggle('is-active');
    });

    // acessibilidade: permite abrir/fechar com teclado (Enter / Espaço)
    block.setAttribute('tabindex', '0');
    block.setAttribute('role', 'button');
    block.setAttribute('aria-expanded', 'false');

    block.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        block.classList.toggle('is-active');
      }
    });

    // mantém aria-expanded sincronizado com o estado visual
    const observer = new MutationObserver(() => {
      block.setAttribute('aria-expanded', block.classList.contains('is-active'));
    });
    observer.observe(block, { attributes: true, attributeFilter: ['class'] });
  });

});
