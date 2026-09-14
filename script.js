// =========================================================
// GEOPOLISO — script.js
// =========================================================

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


