/* ============================================================
   CONEXÕES GEOPOLÍTICAS — PARTIDA (partida.html)
   Aqui acontece o jogo de verdade: sorteia um baralho de temas
   geopolíticos, deixa o jogador selecionar 4 termos por vez,
   confere se formam um grupo e mostra o resultado no final.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Tema claro/escuro (mesmo padrão do site) ---------- */
  var root = document.documentElement;
  var THEME_KEY = 'geopoliso-theme';

    const favicon =
    document.getElementById('favicon');


  function buildGlobeFavicon(color) {

    const svg = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >

        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="${color}"
          stroke-width="1.8"
        />

        <ellipse
          cx="12"
          cy="12"
          rx="4.2"
          ry="10"
          fill="none"
          stroke="${color}"
          stroke-width="1.8"
        />

        <line
          x1="2"
          y1="12"
          x2="22"
          y2="12"
          stroke="${color}"
          stroke-width="1.8"
        />

        <line
          x1="3.5"
          y1="7"
          x2="20.5"
          y2="7"
          stroke="${color}"
          stroke-width="1.4"
        />

        <line
          x1="3.5"
          y1="17"
          x2="20.5"
          y2="17"
          stroke="${color}"
          stroke-width="1.4"
        />

      </svg>
    `;

    favicon.href =
      'data:image/svg+xml;base64,' +
      btoa(svg);
  }


  function applyTheme(theme) {

    root.setAttribute(
      'data-theme',
      theme
    );

    buildGlobeFavicon(
      theme === 'light'
        ? '#000'
        : '#fff'
    );
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
  }

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

  /* ---------- Baralhos temáticos (4 grupos de 4 termos cada) ----------
     A cada "Novo jogo" um baralho é sorteado aleatoriamente, então o
     tema muda a cada partida como pedem as instruções na tela. */
  var DECKS = [
    {
      groups: [
        { name: 'Organizações Internacionais', words: ['ONU', 'OTAN', 'OMS', 'UNESCO'] },
        { name: 'Blocos Econômicos', words: ['BRICS', 'Mercosul', 'ASEAN', 'União Europeia'] },
        { name: 'Estreitos Estratégicos', words: ['Ormuz', 'Bósforo', 'Málaca', 'Gibraltar'] },
        { name: 'Impérios Históricos', words: ['Otomano', 'Bizantino', 'Mongol', 'Britânico'] }
      ]
    },
    {
      groups: [
        { name: 'Moedas Nacionais', words: ['Rublo', 'Iene', 'Rand', 'Won'] },
        { name: 'Tratados Históricos', words: ['Versalhes', 'Vestfália', 'Kyoto', 'Maastricht'] },
        { name: 'Ilhas Disputadas', words: ['Malvinas', 'Curilas', 'Senkaku', 'Chipre'] },
        { name: 'Organizações Econômicas', words: ['FMI', 'Banco Mundial', 'OMC', 'OCDE'] }
      ]
    },
    {
      groups: [
        { name: 'Alianças Militares', words: ['OTAN', 'ANZUS', 'Pacto de Varsóvia', 'CSTO'] },
        { name: 'Blocos Regionais Africanos', words: ['União Africana', 'CEDEAO', 'SADC', 'COMESA'] },
        { name: 'Linhas Imaginárias', words: ['Equador', 'Meridiano de Greenwich', 'Trópico de Câncer', 'Círculo Polar Ártico'] },
        { name: 'Revoluções Históricas', words: ['Francesa', 'Russa', 'Cubana', 'Industrial'] }
      ]
    },
    {
      groups: [
        { name: 'Muros e Fronteiras', words: ['Berlim', 'DMZ Coreana', 'Linha de Controle', 'Grande Muralha'] },
        { name: 'Superpotências', words: ['Estados Unidos', 'União Soviética', 'China', 'Reino Unido'] },
        { name: 'Capitais Planejadas', words: ['Brasília', 'Naypyidaw', 'Astana', 'Abuja'] },
        { name: 'Conflitos Territoriais', words: ['Caxemira', 'Crimeia', 'Cisjordânia', 'Curdistão'] }
      ]
    }
  ];

  var GROUP_COLORS = ['var(--accent)', 'var(--accent-dark)', 'var(--accent-darker)', 'var(--red)'];
  var MAX_MISTAKES = 4;

  /* ---------- Estado da partida ---------- */
  var state = {
    tiles: [],          // { word, groupIndex, el }
    selected: [],        // words selecionadas (máx. 4)
    solvedGroups: [],    // índices de grupo já resolvidos
    mistakesLeft: MAX_MISTAKES,
    gameOver: false
  };

  /* ---------- Referências de elementos ---------- */
  var els = {};

  function cacheEls() {
    els.mistakeDots = document.getElementById('mistakeDots');
    els.solvedGroups = document.getElementById('solvedGroups');
    els.toast = document.getElementById('gameToast');
    els.tilesGrid = document.getElementById('tilesGrid');
    els.newGameBtn = document.getElementById('newGameBtn');
    els.shuffleBtn = document.getElementById('shuffleBtn');
    els.deselectBtn = document.getElementById('deselectBtn');
    els.submitBtn = document.getElementById('submitBtn');
    els.overlay = document.getElementById('gameOverlay');
    els.modalTitle = document.getElementById('modalTitle');
    els.modalText = document.getElementById('modalText');
    els.playAgainBtn = document.getElementById('playAgainBtn');
  }

  function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  var toastTimer = null;
  function showToast(message, duration) {
    if (!els.toast) return;
    els.toast.textContent = message;
    clearTimeout(toastTimer);
    if (duration !== 0) {
      toastTimer = setTimeout(function () {
        els.toast.textContent = '';
      }, duration || 2200);
    }
  }

  /* ---------- Iniciar/Reiniciar partida ---------- */
  function startGame() {
    var deck = DECKS[Math.floor(Math.random() * DECKS.length)];

    state.deck = deck;
    state.tiles = [];
    state.selected = [];
    state.solvedGroups = [];
    state.mistakesLeft = MAX_MISTAKES;
    state.gameOver = false;

    deck.groups.forEach(function (group, groupIndex) {
      group.words.forEach(function (word) {
        state.tiles.push({ word: word, groupIndex: groupIndex, el: null });
      });
    });
    shuffleArray(state.tiles);

    renderMistakeDots();
    renderSolvedGroups();
    renderTiles();
    updateSubmitState();
    hideModal();
    showToast('');
  }

  /* ---------- Renderização ---------- */
  function renderMistakeDots() {
    if (!els.mistakeDots) return;
    els.mistakeDots.innerHTML = '';
    for (var i = 0; i < MAX_MISTAKES; i++) {
      var dot = document.createElement('span');
      dot.className = 'mistake-dot' + (i >= state.mistakesLeft ? ' used' : '');
      els.mistakeDots.appendChild(dot);
    }
  }

  function renderSolvedGroups() {
    if (!els.solvedGroups) return;
    els.solvedGroups.innerHTML = '';
    state.solvedGroups.forEach(function (groupIndex) {
      var group = state.deck.groups[groupIndex];
      var block = document.createElement('div');
      block.className = 'solved-group';
      block.style.background = GROUP_COLORS[groupIndex % GROUP_COLORS.length];

      var name = document.createElement('div');
      name.className = 'group-name';
      name.textContent = group.name;

      var words = document.createElement('div');
      words.className = 'group-words';
      words.textContent = group.words.join(' · ');

      block.appendChild(name);
      block.appendChild(words);
      els.solvedGroups.appendChild(block);
    });
  }

  function renderTiles() {
    if (!els.tilesGrid) return;
    els.tilesGrid.innerHTML = '';
    state.tiles.forEach(function (tile) {
      if (state.solvedGroups.indexOf(tile.groupIndex) !== -1) return;

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tile';
      btn.textContent = tile.word;
      btn.setAttribute('aria-pressed', 'false');
      if (state.selected.indexOf(tile.word) !== -1) {
        btn.classList.add('selected');
        btn.setAttribute('aria-pressed', 'true');
      }
      btn.addEventListener('click', function () { onTileClick(tile); });

      tile.el = btn;
      els.tilesGrid.appendChild(btn);
    });
  }

  function updateSubmitState() {
    if (!els.submitBtn) return;
    els.submitBtn.disabled = state.selected.length !== 4 || state.gameOver;
  }

  /* ---------- Interações ---------- */
  function onTileClick(tile) {
    if (state.gameOver) return;

    var idx = state.selected.indexOf(tile.word);
    if (idx !== -1) {
      state.selected.splice(idx, 1);
    } else {
      if (state.selected.length >= 4) return;
      state.selected.push(tile.word);
    }
    renderTiles();
    updateSubmitState();
  }

  function deselectAll() {
    if (state.gameOver) return;
    state.selected = [];
    renderTiles();
    updateSubmitState();
  }

  function shuffleTiles() {
    if (state.gameOver) return;
    shuffleArray(state.tiles);
    renderTiles();
  }

  function shakeSelected() {
    state.selected.forEach(function (word) {
      var tile = state.tiles.find(function (t) { return t.word === word; });
      if (tile && tile.el) {
        tile.el.classList.add('shake');
        setTimeout(function () {
          if (tile.el) tile.el.classList.remove('shake');
        }, 400);
      }
    });
  }

  function submitSelection() {
    if (state.gameOver || state.selected.length !== 4) return;

    var chosenTiles = state.selected.map(function (word) {
      return state.tiles.find(function (t) { return t.word === word; });
    });
    var groupIndex = chosenTiles[0].groupIndex;
    var allSameGroup = chosenTiles.every(function (t) { return t.groupIndex === groupIndex; });

    if (allSameGroup) {
      state.solvedGroups.push(groupIndex);
      state.selected = [];
      showToast('Grupo encontrado: ' + state.deck.groups[groupIndex].name + '!');
      renderSolvedGroups();
      renderTiles();
      updateSubmitState();

      if (state.solvedGroups.length === state.deck.groups.length) {
        endGame(true);
      }
      return;
    }

    // Conta quantos termos diferentes de grupo apareceram, pra avisar "quase lá"
    var groupCount = {};
    chosenTiles.forEach(function (t) {
      groupCount[t.groupIndex] = (groupCount[t.groupIndex] || 0) + 1;
    });
    var maxSameGroup = Math.max.apply(null, Object.keys(groupCount).map(function (k) { return groupCount[k]; }));

    state.mistakesLeft -= 1;
    shakeSelected();
    renderMistakeDots();

    if (maxSameGroup === 3) {
      showToast('Quase lá! Um dos termos não pertence a esse grupo.');
    } else {
      showToast('Esses termos não formam um grupo. Tente novamente.');
    }

    if (state.mistakesLeft <= 0) {
      endGame(false);
      return;
    }

    state.selected = [];
    renderTiles();
    updateSubmitState();
  }

  /* ---------- Fim de jogo ---------- */
  function endGame(won) {
    state.gameOver = true;
    updateSubmitState();

    if (won) {
      showModal(
        'Parabéns!',
        'Você decifrou as 4 conexões geopolíticas desta partida.'
      );
      return;
    }

    var remaining = state.deck.groups
      .map(function (group, i) { return { group: group, i: i }; })
      .filter(function (item) { return state.solvedGroups.indexOf(item.i) === -1; })
      .map(function (item) { return item.group.name + ': ' + item.group.words.join(', '); })
      .join('\n');

    showModal(
      'Fim de jogo',
      'Você usou todas as tentativas. Os grupos que faltavam eram:\n' + remaining
    );
  }

  function showModal(title, text) {
    if (!els.overlay) return;
    els.modalTitle.textContent = title;
    els.modalText.textContent = text;
    els.overlay.classList.add('show');
  }

  function hideModal() {
    if (!els.overlay) return;
    els.overlay.classList.remove('show');
  }

  /* ---------- Ligações de eventos ---------- */
  function bindEvents() {
    if (els.newGameBtn) els.newGameBtn.addEventListener('click', startGame);
    if (els.shuffleBtn) els.shuffleBtn.addEventListener('click', shuffleTiles);
    if (els.deselectBtn) els.deselectBtn.addEventListener('click', deselectAll);
    if (els.submitBtn) els.submitBtn.addEventListener('click', submitSelection);
    if (els.playAgainBtn) els.playAgainBtn.addEventListener('click', function () {
      hideModal();
      startGame();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    cacheEls();
    bindEvents();
    startGame();
  });
})();
