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
    // escuro -> favicon branco | claro -> favicon preto
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
     2. JOGO — CONEXÕES GEOPOLÍTICAS (estilo Conexo)
  --------------------------------------------------- */

  // Banco de temas: a cada partida, 4 destes 9 são sorteados,
  // então cada jogo tem uma combinação diferente de assuntos.
  const CATEGORY_POOL = [
    { name: 'Primeira Guerra Mundial', color: '#B5652E',
      words: ['Sarajevo', 'Trincheiras', 'Tríplice Entente', 'Versalhes'] },
    { name: 'Segunda Guerra Mundial', color: '#3E7C9E',
      words: ['Blitzkrieg', 'Pearl Harbor', 'Normandia', 'Hiroshima'] },
    { name: 'Guerra Fria', color: '#8C4A5C',
      words: ['Muro de Berlim', 'Cortina de Ferro', 'OTAN', 'Pacto de Varsóvia'] },
    { name: 'Território e Fronteiras', color: '#5C7A34',
      words: ['Enclave', 'Soberania', 'Anexação', 'Zona de Influência'] },
    { name: 'Recursos Naturais', color: '#A87F2E',
      words: ['Água', 'Petróleo', 'Minérios', 'Rotas Comerciais'] },
    { name: 'Poder Militar e Econômico', color: '#5B4A8C',
      words: ['Hegemonia', 'Sanções', 'Dissuasão', 'Corrida Armamentista'] },
    { name: 'Organizações Globais', color: '#357A6B',
      words: ['ONU', 'União Europeia', 'Mercosul', 'OMC'] },
    { name: 'Disputa EUA x China', color: '#A13E3E',
      words: ['Taiwan', 'Guerra Comercial', 'Mar do Sul da China', 'Rota da Seda'] },
    { name: 'Rotas e Conflitos por Energia', color: '#3E5C8C',
      words: ['Estreito de Ormuz', 'Canal de Suez', 'Gasoduto', 'Estreito de Malaca'] }
  ];
  const MAX_MISTAKES = 4;

  const els = {
    mistakeDots: document.getElementById('mistakeDots'),
    solvedGroups: document.getElementById('solvedGroups'),
    toast: document.getElementById('gameToast'),
    grid: document.getElementById('tilesGrid'),
    submitBtn: document.getElementById('submitBtn'),
    shuffleBtn: document.getElementById('shuffleBtn'),
    deselectBtn: document.getElementById('deselectBtn'),
    newGameBtn: document.getElementById('newGameBtn'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    overlay: document.getElementById('gameOverlay'),
    modalTitle: document.getElementById('modalTitle'),
    modalText: document.getElementById('modalText')
  };

  let state = null;
  let toastTimer = null;

  function shuffleArr(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startNewGame() {
    const chosen = shuffleArr(CATEGORY_POOL).slice(0, 4);
    let id = 0;
    let tiles = [];
    chosen.forEach((cat, ci) => {
      cat.words.forEach(word => tiles.push({ id: id++, word, catIndex: ci }));
    });
    tiles = shuffleArr(tiles);

    state = {
      categories: chosen,
      tiles,
      selected: [],
      solvedCats: [],
      mistakes: 0
    };
  };
});
