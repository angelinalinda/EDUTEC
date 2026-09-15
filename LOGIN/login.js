document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     TELA DE CARREGAMENTO
     ===================================================== */

  const loader = document.getElementById("geopolisoLoader");
  const loaderProgressBar =
    document.getElementById("loaderProgressBar");
  const loaderSkip =
    document.getElementById("loaderSkip");
  const geopoliticalFact =
    document.getElementById("geopoliticalFact");
  const loaderStatus =
    document.getElementById("loaderStatus");

  const geopoliticalFacts = [
    "A Rússia é o maior país do mundo em extensão territorial.",
    "O Brasil possui fronteira com 10 países da América do Sul.",
    "A Antártida não pertence oficialmente a nenhum país.",
    "O Canal de Suez conecta o Mar Mediterrâneo ao Mar Vermelho.",
    "O Canal do Panamá conecta os oceanos Atlântico e Pacífico.",
    "A Organização das Nações Unidas foi criada em 1945.",
    "A África possui 54 países reconhecidos internacionalmente.",
    "A localização geográfica influencia as relações internacionais.",
    "O petróleo possui grande importância estratégica.",
    "A União Europeia reúne diversos países em um projeto de integração."
  ];

  if (geopoliticalFact) {
    geopoliticalFact.textContent =
      geopoliticalFacts[
        Math.floor(Math.random() * geopoliticalFacts.length)
      ];
  }


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


  const normalLoadingTime = 5000;
  const clickLoadingTime = 3000;

  let loadingTime = normalLoadingTime;
  let startTime = performance.now();
  let loaderFinished = false;


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


  function updateLoader() {

    if (loaderFinished) return;

    const elapsed =
      performance.now() - startTime;

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


  document.body.style.overflow = "hidden";


  function accelerateLoader() {

    if (loaderFinished) return;

    const elapsed =
      performance.now() - startTime;

    if (elapsed < clickLoadingTime) {

      loadingTime = clickLoadingTime;

    } else {

      finishLoader();

    }

  }


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


  /* =====================================================
     LOGIN
     ===================================================== */

  const form =
    document.getElementById("loginForm");

  if (!form) return;


  const emailInput =
    document.getElementById("loginEmail");

  const passInput =
    document.getElementById("loginSenha");

  const forgotLink =
    document.querySelector(".forgot-link");

  const btnLogin =
    form.querySelector(".btn-submit");


  /* =====================================================
     CRIA MENSAGEM SEM ALTERAR O DESIGN
     ===================================================== */

  let formMsg =
    document.getElementById("loginMsg");


  if (!formMsg) {

    formMsg =
      document.createElement("div");

    formMsg.id = "loginMsg";
    formMsg.className = "form-msg";

    form.insertBefore(
      formMsg,
      btnLogin
    );

  }


  function getUsers() {

    try {

      return JSON.parse(
        localStorage.getItem(
          "geopoliso-users"
        ) || "[]"
      );

    } catch {

      return [];

    }

  }


  function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  }


  function showMessage(message, type) {

    formMsg.textContent = message;
    formMsg.className =
      "form-msg " + type;

  }


  function clearMessage() {

    formMsg.textContent = "";
    formMsg.className = "form-msg";

  }


  /* =====================================================
     LOGIN
     ===================================================== */

  form.addEventListener("submit", (event) => {

    event.preventDefault();

    clearMessage();

    const email =
      emailInput.value.trim().toLowerCase();

    const senha =
      passInput.value;


    /* -----------------------------
       VALIDAÇÃO
       ----------------------------- */

    if (!isValidEmail(email)) {

      showMessage(
        "Digite um e-mail válido.",
        "error"
      );

      emailInput.focus();

      return;
    }


    if (senha.length < 6) {

      showMessage(
        "A senha deve ter no mínimo 6 caracteres.",
        "error"
      );

      passInput.focus();

      return;
    }


    /* =====================================================
       PROCURA A CONTA
       ===================================================== */

    const users = getUsers();

    const account =
      users.find(
        user => user.email === email
      );


    /* =====================================================
       NÃO CADASTRADO
       ===================================================== */

    if (!account) {

      showMessage(
        "Não encontramos uma conta com esse e-mail. Faça o cadastro primeiro.",
        "error"
      );

      return;

    }


    /* =====================================================
       SENHA INCORRETA
       ===================================================== */

    if (account.password !== senha) {

      showMessage(
        "Senha incorreta. Tente novamente.",
        "error"
      );

      return;

    }


    /* =====================================================
       LOGIN APROVADO
       ===================================================== */

    localStorage.setItem(
      "geopoliso-session",
      JSON.stringify({

        name:
          account.name ||
          email.split("@")[0],

        email: email,

        loggedAt: Date.now()

      })
    );


    showMessage(
      "Login realizado! Redirecionando...",
      "success"
    );


    btnLogin.disabled = true;
    btnLogin.textContent = "Entrando...";


    setTimeout(() => {

      window.location.href =
        "../index.html";

    }, 700);

  });


  /* =====================================================
     ESQUECEU A SENHA
     ===================================================== */

  if (forgotLink) {

    forgotLink.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        const email =
          emailInput.value.trim().toLowerCase();

        const users = getUsers();

        if (
          email &&
          isValidEmail(email) &&
          !users.some(
            user => user.email === email
          )
        ) {

          showMessage(
            "Não encontramos uma conta com esse e-mail. Faça o cadastro primeiro.",
            "error"
          );

          return;

        }


        showMessage(
          "A recuperação de senha será disponibilizada quando houver um sistema de e-mail.",
          "success"
        );

      }
    );

  }

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
  
});