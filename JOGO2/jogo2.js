/* ============================================================
   CORES DAS BANDEIRAS — INTRODUÇÃO (jogo2.html)
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

  function randomRoomCode() {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var code = '';
    for (var i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  function goToGame(roomCode) {
    if (roomCode) {
      window.location.href = 'jogar.html?room=' + encodeURIComponent(roomCode);
    } else {
      window.location.href = 'jogar.html';
    }
  }

  function initButtons() {
    var soloBtn = document.getElementById('soloBtn');
    var createRoomBtn = document.getElementById('createRoomBtn');
    var joinRoomBtn = document.getElementById('joinRoomBtn');

    var overlay = document.getElementById('roomOverlay');
    var modalTitle = document.getElementById('roomModalTitle');
    var modalText = document.getElementById('roomModalText');
    var createView = document.getElementById('roomCreateView');
    var joinView = document.getElementById('roomJoinView');
    var roomCodeDisplay = document.getElementById('roomCodeDisplay');
    var roomCodeInput = document.getElementById('roomCodeInput');

    var roomStartBtn = document.getElementById('roomStartBtn');
    var roomCancelBtn = document.getElementById('roomCancelBtn');
    var roomJoinConfirmBtn = document.getElementById('roomJoinConfirmBtn');
    var roomJoinCancelBtn = document.getElementById('roomJoinCancelBtn');

    function closeModal() {
      overlay.classList.remove('show');
      createView.style.display = 'none';
      joinView.style.display = 'none';
    }

    if (soloBtn) {
      soloBtn.addEventListener('click', function () { goToGame(); });
    }

    if (createRoomBtn) {
      createRoomBtn.addEventListener('click', function () {
        var code = randomRoomCode();
        modalTitle.textContent = 'Sala criada';
        modalText.textContent = 'Compartilhe este código com quem você quer que entre na sua sala.';
        createView.style.display = 'block';
        joinView.style.display = 'none';
        roomCodeDisplay.textContent = code;
        roomStartBtn.onclick = function () { goToGame(code); };
        overlay.classList.add('show');
      });
    }

    if (joinRoomBtn) {
      joinRoomBtn.addEventListener('click', function () {
        modalTitle.textContent = 'Entrar em uma sala';
        modalText.textContent = 'Digite o código da sala que você recebeu.';
        createView.style.display = 'none';
        joinView.style.display = 'block';
        roomCodeInput.value = '';
        overlay.classList.add('show');
        roomCodeInput.focus();
      });
    }

    if (roomCancelBtn) roomCancelBtn.addEventListener('click', closeModal);
    if (roomJoinCancelBtn) roomJoinCancelBtn.addEventListener('click', closeModal);

    if (roomJoinConfirmBtn) {
      roomJoinConfirmBtn.addEventListener('click', function () {
        var code = roomCodeInput.value.trim().toUpperCase();
        if (!code) {
          roomCodeInput.focus();
          return;
        }
        goToGame(code);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {

/* ---------------------------------------------------
   0. TELA DE CARREGAMENTO GEOPOLISO
--------------------------------------------------- */

const loader = document.getElementById('geopolisoLoader');
const loaderProgressBar = document.getElementById('loaderProgressBar');
const loaderSkip = document.getElementById('loaderSkip');
const geopoliticalFact = document.getElementById('geopoliticalFact');
const loaderStatus = document.getElementById('loaderStatus');


/* =====================================================
   CURIOSIDADES GEOPOLÍTICAS
===================================================== */

const geopoliticalFacts = [

  "A Rússia é o maior país do mundo em extensão territorial, ocupando mais de 17 milhões de km².",

  "O Brasil faz fronteira com 10 países da América do Sul. A única exceção é Chile e Equador.",

  "A Antártida não pertence oficialmente a nenhum país. Seu território é regulado pelo Sistema do Tratado da Antártida.",

  "O Canal de Suez conecta o Mar Mediterrâneo ao Mar Vermelho e é uma das principais rotas comerciais do planeta.",

  "O Canal do Panamá permite a ligação entre os oceanos Atlântico e Pacífico, reduzindo drasticamente as rotas marítimas.",

  "A Organização das Nações Unidas foi criada em 1945, após a Segunda Guerra Mundial.",

  "A África possui 54 países reconhecidos internacionalmente e é o segundo maior continente em área e população.",

  "A localização geográfica de um país pode influenciar suas relações comerciais, militares e diplomáticas.",

  "O petróleo e o gás natural são recursos que possuem grande importância estratégica nas relações internacionais.",

  "O Ártico ganhou importância geopolítica devido aos recursos naturais e às novas rotas marítimas possibilitadas pelo derretimento do gelo.",

  "A União Europeia reúne diversos países em um projeto de integração política e econômica.",

  "A posição de um país em relação a mares, oceanos e rotas comerciais pode influenciar sua importância estratégica.",

  "As fronteiras políticas atuais são resultado de processos históricos, guerras, acordos, colonização e movimentos de independência.",

  "A geopolítica não trata apenas de guerras: comércio, energia, tecnologia, território e recursos também fazem parte dela.",

  "O Brasil possui uma das maiores extensões territoriais do mundo e ocupa grande parte da América do Sul."

];


/* =====================================================
   ESCOLHE UMA CURIOSIDADE ALEATÓRIA
===================================================== */

const randomFact =
  geopoliticalFacts[
    Math.floor(Math.random() * geopoliticalFacts.length)
  ];

if (geopoliticalFact) {
  geopoliticalFact.textContent = randomFact;
}


/* =====================================================
   CONFIGURAÇÃO DO CARREGAMENTO
===================================================== */

// Tempo normal: 5 segundos
const normalLoadingTime = 5000;

// Ao clicar: 3 segundos
const clickLoadingTime = 3000;

let loadingTime = normalLoadingTime;

let startTime = performance.now();

let loaderFinished = false;


/* =====================================================
   FRASES DURANTE O CARREGAMENTO
===================================================== */

const loadingMessages = [
  "CONECTANDO AO MUNDO",
  "MAPEANDO O PLANETA",
  "ANALISANDO FRONTEIRAS",
  "CONECTANDO NAÇÕES",
  "PREPARANDO A GEOPOLÍTICA"
];

let messageIndex = 0;

const messageInterval = setInterval(() => {

  messageIndex =
    (messageIndex + 1) % loadingMessages.length;

  if (loaderStatus) {
    loaderStatus.textContent =
      loadingMessages[messageIndex];
  }

}, 900);


/* =====================================================
   FINALIZA O LOADING
===================================================== */

function finishLoader(){

  if (loaderFinished) return;

  loaderFinished = true;

  clearInterval(messageInterval);

  if (loaderProgressBar) {
    loaderProgressBar.style.width = "100%";
  }

  setTimeout(() => {

    if (loader) {
      loader.classList.add('loader-hidden');
    }

    // Libera o scroll
    document.body.style.overflow = "";

  }, 250);

}


/* =====================================================
   ANIMAÇÃO DO PROGRESSO
===================================================== */

function updateLoader(){

  if (loaderFinished) return;

  const elapsed = performance.now() - startTime;

  const progress =
    Math.min((elapsed / loadingTime) * 100, 100);

  if (loaderProgressBar) {
    loaderProgressBar.style.width =
      progress + "%";
  }

  if (progress >= 100) {

    finishLoader();

    return;

  }

  requestAnimationFrame(updateLoader);
}


/* =====================================================
   BLOQUEIA O SCROLL ENQUANTO CARREGA
===================================================== */

document.body.style.overflow = "hidden";


/* =====================================================
   CLIQUE = CARREGAMENTO MAIS RÁPIDO
===================================================== */

function accelerateLoader(){

  if (loaderFinished) return;

  const elapsed = performance.now() - startTime;

  // O carregamento passa a terminar em 3 segundos
  if (elapsed < clickLoadingTime) {

    loadingTime = clickLoadingTime;

  } else {

    finishLoader();

  }

}


/* Clique na tela */
if (loader) {

  loader.addEventListener(
    'click',
    accelerateLoader
  );

}


/* Botão também funciona */
if (loaderSkip) {

  loaderSkip.addEventListener(
    'click',
    (event) => {

      event.stopPropagation();

      accelerateLoader();

    }
  );

}


/* Começa o carregamento */
requestAnimationFrame(updateLoader);


    initTheme();
    initButtons();
  });
})();
