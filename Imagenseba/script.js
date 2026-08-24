// =========================================================
// GEOPOLISO — script.js
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     1. ALTERNÂNCIA DE TEMA (claro / escuro)
  --------------------------------------------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const favicon = document.getElementById('favicon');

  // Gera o ícone de mundo (favicon) na cor certa para cada tema.
  // Único ícone alterado pelo tema, conforme pedido — nenhum outro é tocado.
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
    // escuro -> favicon verde-limão (BBD048) | claro -> favicon verde-oliva escuro (2D301D)
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
     2. CARROSSEL DO BANNER (HERO) — rotação automática
  --------------------------------------------------- */
  const heroSlides = document.querySelectorAll('.hero-slide');
  let heroIndex = 0;

  if (heroSlides.length > 1) {
    setInterval(() => {
      heroSlides[heroIndex].classList.remove('active');
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add('active');
    }, 5000);
  }

  /* ---------------------------------------------------
     3. FAQ (acordeão)
  --------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // fecha todos os outros itens
      faqItems.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-answer').style.maxHeight = null;
        other.querySelector('.faq-icon').textContent = '+';
      });

      // abre o clicado, se não estava aberto
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '×';
      }
    });
  });

  /* ---------------------------------------------------
     4. CARROSSEL DE DEVS (6 cards)
  --------------------------------------------------- */
  const devsTrack = document.getElementById('devsTrack');
  const devDots = document.querySelectorAll('.dot');
  let devIndex = 0;
  const totalDevs = devDots.length;

  function goToDevSlide(index) {
    devIndex = index;
    devsTrack.style.transform = `translateX(-${index * 100}%)`;
    devDots.forEach(dot => dot.classList.remove('active'));
    devDots[index].classList.add('active');
  }

  devDots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToDevSlide(parseInt(dot.dataset.index, 10));
    });
  });

  setInterval(() => {
    const next = (devIndex + 1) % totalDevs;
    goToDevSlide(next);
  }, 6000);

});


