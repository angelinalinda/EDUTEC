document.addEventListener("DOMContentLoaded", () => {

    

  /* =========================================================
     1. TEMA CLARO / ESCURO
     ========================================================= */

  const themeToggle = document.getElementById("themeToggle");

  // Recupera o tema salvo
  const savedTheme = localStorage.getItem("geopoliso-theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    // Tema padrão
    document.documentElement.setAttribute("data-theme", "dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {

      const currentTheme =
        document.documentElement.getAttribute("data-theme");

      const newTheme =
        currentTheme === "light" ? "dark" : "light";

      document.documentElement.setAttribute(
        "data-theme",
        newTheme
      );

      localStorage.setItem(
        "geopoliso-theme",
        newTheme
      );
    });
  }


  /* =========================================================
     2. TELA DE CARREGAMENTO — GEOPOLISO
     ========================================================= */

  const loader = document.getElementById("geopolisoLoader");
  const loaderProgressBar =
    document.getElementById("loaderProgressBar");

  const loaderSkip =
    document.getElementById("loaderSkip");

  const geopoliticalFact =
    document.getElementById("geopoliticalFact");

  const loaderStatus =
    document.getElementById("loaderStatus");


  /* ---------------------------------------------------------
     CURIOSIDADES GEOPOLÍTICAS
     --------------------------------------------------------- */

  const geopoliticalFacts = [

    "O Brasil faz fronteira com todos os países da América do Sul, exceto Chile e Equador.",

    "A Rússia é o maior país do mundo em extensão territorial.",

    "A Antártida não pertence oficialmente a nenhum país e possui regras internacionais específicas.",

    "O Canal de Suez conecta o Mar Mediterrâneo ao Mar Vermelho e é uma das principais rotas comerciais do mundo.",

    "O Canal do Panamá conecta os oceanos Atlântico e Pacífico e reduz significativamente algumas rotas marítimas.",

    "A Organização das Nações Unidas foi criada em 1945, após a Segunda Guerra Mundial.",

    "A África possui 54 países reconhecidos internacionalmente.",

    "A posição geográfica de um país pode influenciar suas relações comerciais, militares e diplomáticas.",

    "O petróleo e o gás natural possuem grande importância estratégica na política internacional.",

    "O Ártico possui grande importância geopolítica por causa de seus recursos naturais e das rotas marítimas.",

    "A União Europeia é um dos principais exemplos de integração política e econômica entre países.",

    "As fronteiras atuais de muitos países são resultado de guerras, acordos, colonização e processos de independência.",

    "A geopolítica não envolve apenas guerras. Comércio, energia, território, tecnologia e recursos também são importantes.",

    "O Brasil possui uma das maiores extensões territoriais do mundo.",

    "O Estreito de Ormuz é uma das principais passagens estratégicas para o transporte mundial de petróleo.",

    "A localização de Taiwan faz com que a ilha tenha grande importância estratégica no Leste Asiático.",

    "O Mediterrâneo possui grande importância histórica e estratégica por conectar Europa, África e Ásia.",

    "A Ásia é o maior continente do planeta e concentra algumas das maiores economias e populações do mundo.",

    "As rotas marítimas são fundamentais para o comércio internacional porque grande parte das mercadorias é transportada por navios.",

    "A posição de um país pode influenciar sua capacidade de controlar ou participar de importantes rotas comerciais."
  ];


  // Escolhe uma curiosidade aleatória
  if (geopoliticalFact) {

    const randomIndex =
      Math.floor(
        Math.random() * geopoliticalFacts.length
      );

    geopoliticalFact.textContent =
      geopoliticalFacts[randomIndex];
  }


  /* ---------------------------------------------------------
     TEMPO DA TELA
     --------------------------------------------------------- */

  const normalLoadingTime = 5000; // 5 segundos
  const clickLoadingTime = 3000;  // 3 segundos

  let loadingTime = normalLoadingTime;

  let startTime = performance.now();

  let loaderFinished = false;


  /* ---------------------------------------------------------
     MENSAGENS DA TELA
     --------------------------------------------------------- */

  const loadingMessages = [

    "CONECTANDO AO MUNDO",

    "MAPEANDO O PLANETA",

    "ANALISANDO FRONTEIRAS",

    "CONECTANDO NAÇÕES",

    "ATUALIZANDO NOTÍCIAS",

    "PREPARANDO A GEOPOLÍTICA"

  ];

  let messageIndex = 0;


  const messageInterval = setInterval(() => {

    messageIndex =
      (messageIndex + 1) %
      loadingMessages.length;

    if (loaderStatus) {

      loaderStatus.textContent =
        loadingMessages[messageIndex];

    }

  }, 850);


  /* ---------------------------------------------------------
     FINALIZAR LOADING
     --------------------------------------------------------- */

  function finishLoader() {

    if (loaderFinished) return;

    loaderFinished = true;

    clearInterval(messageInterval);

    if (loaderProgressBar) {

      loaderProgressBar.style.width = "100%";

    }

    setTimeout(() => {

      if (loader) {

        loader.classList.add("loader-hidden");

      }

      document.body.style.overflow = "";

    }, 250);

  }


  /* ---------------------------------------------------------
     ATUALIZAR BARRA
     --------------------------------------------------------- */

  function updateLoader() {

    if (loaderFinished) return;

    const elapsed =
      performance.now() - startTime;

    const progress =
      Math.min(
        (elapsed / loadingTime) * 100,
        100
      );

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


  /* ---------------------------------------------------------
     CLIQUE PARA ACELERAR
     --------------------------------------------------------- */

  function accelerateLoader() {

    if (loaderFinished) return;

    const elapsed =
      performance.now() - startTime;

    // Se ainda não passaram 3 segundos,
    // reduz o tempo total para 3 segundos
    if (elapsed < clickLoadingTime) {

      loadingTime = clickLoadingTime;

    } else {

      finishLoader();

    }

  }


  /* ---------------------------------------------------------
     EVENTOS DO LOADING
     --------------------------------------------------------- */

  document.body.style.overflow = "hidden";


  if (loader) {

    loader.addEventListener(
      "click",
      accelerateLoader
    );

  }


  if (loaderSkip) {

    loaderSkip.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        accelerateLoader();

      }
    );

  }


  requestAnimationFrame(updateLoader);


  /* =========================================================
     3. VÍDEOS
     ========================================================= */

  const videoCards =
    document.querySelectorAll(".video-card");


  videoCards.forEach((card) => {

    const playButton =
      card.querySelector(".play-btn");

    if (!playButton) return;


    card.addEventListener("click", () => {

      /*
       * Por enquanto os vídeos são apenas elementos visuais.
       * Quando você tiver os links dos vídeos, podemos fazer
       * esse clique abrir o vídeo correspondente.
       */

      const title =
        card.querySelector("h3");

      if (title) {

        console.log(
          "Vídeo selecionado:",
          title.textContent
        );

      }

    });

  });


  /* =========================================================
     4. EFEITO NAS NOTÍCIAS
     ========================================================= */

  const newsCards =
    document.querySelectorAll(
      ".card, .headline-item, .news-row"
    );


  newsCards.forEach((news) => {

    news.addEventListener("mouseenter", () => {

      news.style.transition =
        "transform .25s ease";

      news.style.transform =
        "translateY(-3px)";

    });


    news.addEventListener("mouseleave", () => {

      news.style.transform =
        "translateY(0)";

    });

  });


  /* =========================================================
     5. EFEITO NOS LINKS DE VÍDEO
     ========================================================= */

  const watchLinks =
    document.querySelectorAll(".watch-link");


  watchLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      event.preventDefault();

      console.log(
        "Link de vídeo selecionado:",
        link.textContent.trim()
      );

    });

  });


  /* =========================================================
     6. ANO AUTOMÁTICO DO RODAPÉ
     ========================================================= */

  const footerCopy =
    document.querySelector(".footer-copy");


  if (footerCopy) {

    const currentYear =
      new Date().getFullYear();

    footerCopy.textContent =
      `${currentYear} © GEOPOLISO`;

  }

});