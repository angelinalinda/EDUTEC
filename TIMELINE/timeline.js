document.addEventListener('DOMContentLoaded', () => {


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
