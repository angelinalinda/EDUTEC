(() => {
  'use strict';

  /* =========================================================
     0. CONFIGURAÇÕES GERAIS
     ========================================================= */
  const $ = (sel, root = document) => root.querySelector(sel);

  const norm = (s) =>
    String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, props = {}, ...filhos) {
    const node = document.createElement(tag);

    Object.entries(props).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k === 'style') node.style.cssText = v;
      else node.setAttribute(k, v);
    });

    filhos.forEach((f) => f && node.append(f));
    return node;
  }

  function hash(str) {
    let h = 0;

    for (let i = 0; i < str.length; i++) {
      h = (h * 31 + str.charCodeAt(i)) >>> 0;
    }

    return h;
  }

  /* =========================================================
     1. DADOS
     ========================================================= */
  const TEMAS = {
    poder: {
      nome: 'Poder e geografia',
      cor: '#5c6440'
    },

    guerrafria: {
      nome: 'Guerra Fria',
      cor: '#3f5b6e'
    },

    recursos: {
      nome: 'Recursos e rotas',
      cor: '#8a6a25'
    },

    colonial: {
      nome: 'Colonialismo e independência',
      cor: '#85493a'
    },

    conflitos: {
      nome: 'Conflitos e diplomacia',
      cor: '#3b4536'
    }
  };

  const REGIOES = [
    'Global',
    'Américas',
    'África',
    'Europa',
    'Ásia'
  ];

  const OBRAS = [
    /* ---------- Livros ---------- */

    {
      id: 'l-prisioneiros',
      tipo: 'livro',
      tema: 'poder',
      regiao: 'Global',
      titulo: 'Prisioneiros da Geografia',
      curto: 'Prisioneiros da Geografia',
      original: 'Prisoners of Geography',
      autor: 'Tim Marshall',
      ano: 2015,
      resumo:
        'Explica, região por região, como montanhas, rios, mares e planícies limitam as escolhas de países como Rússia, China e Estados Unidos. Ótima porta de entrada.'
    },

    {
      id: 'l-vinganca',
      tipo: 'livro',
      tema: 'poder',
      regiao: 'Global',
      titulo: 'A Vingança da Geografia',
      curto: 'A Vingança da Geografia',
      original: 'The Revenge of Geography',
      autor: 'Robert D. Kaplan',
      ano: 2012,
      resumo:
        'Defende que relevo e mapas continuam moldando a política mundial e revisita pensadores clássicos da geopolítica, como Halford Mackinder.'
    },

    {
      id: 'l-tabuleiro',
      tipo: 'livro',
      tema: 'poder',
      regiao: 'Ásia',
      titulo: 'O Grande Tabuleiro de Xadrez',
      curto: 'O Grande Tabuleiro',
      original: 'The Grand Chessboard',
      autor: 'Zbigniew Brzezinski',
      ano: 1997,
      resumo:
        'Trata a Eurásia como o principal palco da disputa por primazia global e discute o papel dos Estados Unidos nesse tabuleiro.'
    },

    {
      id: 'l-ascensao',
      tipo: 'livro',
      tema: 'poder',
      regiao: 'Global',
      titulo: 'Ascensão e Queda das Grandes Potências',
      curto: 'Ascensão e Queda',
      original: 'The Rise and Fall of the Great Powers',
      autor: 'Paul Kennedy',
      ano: 1987,
      resumo:
        'Mostra como economia e excesso de compromissos militares explicam a ascensão e o declínio de impérios a partir de 1500.'
    },

    {
      id: 'l-caminho-guerra',
      tipo: 'livro',
      tema: 'poder',
      regiao: 'Ásia',
      titulo: 'A Caminho da Guerra',
      curto: 'A Caminho da Guerra',
      original: 'Destined for War',
      autor: 'Graham Allison',
      ano: 2017,
      resumo:
        'Parte do conflito entre Atenas e Esparta para discutir o risco de choque entre uma potência em ascensão e outra estabelecida, como China e Estados Unidos.'
    },

    {
      id: 'l-milton',
      tipo: 'livro',
      tema: 'poder',
      regiao: 'Global',
      titulo: 'Por uma Outra Globalização',
      curto: 'Outra Globalização',
      original: null,
      autor: 'Milton Santos',
      ano: 2000,
      resumo:
        'O geógrafo brasileiro analisa a globalização como fábula, como perversidade e como possibilidade, com olhar a partir do Sul.'
    },

    {
      id: 'l-diamond',
      tipo: 'livro',
      tema: 'recursos',
      regiao: 'Global',
      titulo: 'Armas, Germes e Aço',
      curto: 'Armas, Germes e Aço',
      original: 'Guns, Germs, and Steel',
      autor: 'Jared Diamond',
      ano: 1997,
      resumo:
        'Busca explicar por que algumas sociedades dominaram outras, apontando para geografia, plantas e animais domesticáveis e doenças.'
    },

    {
      id: 'l-petroleo',
      tipo: 'livro',
      tema: 'recursos',
      regiao: 'Global',
      titulo: 'O Petróleo',
      curto: 'O Petróleo',
      original: 'The Prize',
      autor: 'Daniel Yergin',
      ano: 1991,
      resumo:
        'A história do petróleo como motor de guerras, impérios e alianças, desde o século XIX até a Guerra do Golfo.'
    },

    {
      id: 'l-diplomacia',
      tipo: 'livro',
      tema: 'conflitos',
      regiao: 'Global',
      titulo: 'Diplomacia',
      curto: 'Diplomacia',
      original: 'Diplomacy',
      autor: 'Henry Kissinger',
      ano: 1994,
      resumo:
        'Um panorama da diplomacia desde Richelieu até o fim da Guerra Fria, com foco no equilíbrio de poder.'
    },

    {
      id: 'l-china',
      tipo: 'livro',
      tema: 'conflitos',
      regiao: 'Ásia',
      titulo: 'Sobre a China',
      curto: 'Sobre a China',
      original: 'On China',
      autor: 'Henry Kissinger',
      ano: 2011,
      resumo:
        'Percorre séculos de história chinesa para explicar como Pequim pensa estratégia e se relaciona com outras potências.'
    },

    {
      id: 'l-choque',
      tipo: 'livro',
      tema: 'conflitos',
      regiao: 'Global',
      titulo: 'O Choque de Civilizações',
      curto: 'Choque de Civilizações',
      original: 'The Clash of Civilizations',
      autor: 'Samuel P. Huntington',
      ano: 1996,
      resumo:
        'Propõe que, depois da Guerra Fria, as grandes fraturas seriam culturais. Tese muito criticada, por isso mesmo boa para debater.'
    },

    {
      id: 'l-gaddis',
      tipo: 'livro',
      tema: 'guerrafria',
      regiao: 'Global',
      titulo: 'História da Guerra Fria',
      curto: 'História da Guerra Fria',
      original: 'The Cold War: A New History',
      autor: 'John Lewis Gaddis',
      ano: 2005,
      resumo:
        'Narrativa acessível da disputa entre Estados Unidos e União Soviética, das origens ao colapso soviético.'
    },

    {
      id: 'l-fukuyama',
      tipo: 'livro',
      tema: 'guerrafria',
      regiao: 'Global',
      titulo: 'O Fim da História e o Último Homem',
      curto: 'O Fim da História',
      original: 'The End of History and the Last Man',
      autor: 'Francis Fukuyama',
      ano: 1992,
      resumo:
        'Argumenta que a democracia liberal saiu vitoriosa da Guerra Fria. Marco do otimismo dos anos 1990 e, hoje, muito questionado.'
    },

    {
      id: 'l-hobsbawm',
      tipo: 'livro',
      tema: 'guerrafria',
      regiao: 'Global',
      titulo: 'A Era dos Extremos',
      curto: 'A Era dos Extremos',
      original: 'Age of Extremes',
      autor: 'Eric Hobsbawm',
      ano: 1994,
      resumo:
        'Visão panorâmica do "breve século XX", de 1914 a 1991, das guerras mundiais ao fim da União Soviética.'
    },

    {
      id: 'l-veias',
      tipo: 'livro',
      tema: 'colonial',
      regiao: 'Américas',
      titulo: 'As Veias Abertas da América Latina',
      curto: 'Veias Abertas',
      original: 'Las venas abiertas de América Latina',
      autor: 'Eduardo Galeano',
      ano: 1971,
      resumo:
        'Ensaio clássico sobre a exploração econômica do continente, do ouro e da prata coloniais às commodities. Tem tom militante e divide historiadores.'
    },

    {
      id: 'l-orientalismo',
      tipo: 'livro',
      tema: 'colonial',
      regiao: 'Ásia',
      titulo: 'Orientalismo',
      curto: 'Orientalismo',
      original: 'Orientalism',
      autor: 'Edward Said',
      ano: 1978,
      resumo:
        'Mostra como o Ocidente construiu imagens do "Oriente" que ajudaram a justificar dominação colonial.'
    },

    {
      id: 'l-fanon',
      tipo: 'livro',
      tema: 'colonial',
      regiao: 'África',
      titulo: 'Os Condenados da Terra',
      curto: 'Os Condenados da Terra',
      original: 'Les Damnés de la terre',
      autor: 'Frantz Fanon',
      ano: 1961,
      resumo:
        'Análise da violência colonial e da descolonização, escrita a partir da experiência da Argélia.'
    },

    {
      id: 'l-achebe',
      tipo: 'livro',
      tema: 'colonial',
      regiao: 'África',
      titulo: 'O Mundo se Despedaça',
      curto: 'O Mundo se Despedaça',
      original: 'Things Fall Apart',
      autor: 'Chinua Achebe',
      ano: 1958,
      resumo:
        'Romance sobre uma comunidade igbo, na Nigéria, diante da chegada de missionários e da administração britânica.'
    },

    /* ---------- Filmes ---------- */

    {
      id: 'f-lawrence',
      tipo: 'filme',
      tema: 'colonial',
      regiao: 'Ásia',
      titulo: 'Lawrence da Arábia',
      original: 'Lawrence of Arabia',
      autor: 'David Lean',
      ano: 1962,
      resumo:
        'Na Primeira Guerra, a revolta árabe contra o Império Otomano e os interesses de britânicos e franceses que redesenhariam o Oriente Médio.'
    },

    {
      id: 'f-strangelove',
      tipo: 'filme',
      tema: 'guerrafria',
      regiao: 'Global',
      titulo: 'Dr. Fantástico',
      original: 'Dr. Strangelove',
      autor: 'Stanley Kubrick',
      ano: 1964,
      resumo:
        'Sátira da corrida armamentista e da lógica da destruição mútua assegurada.'
    },

    {
      id: 'f-argel',
      tipo: 'filme',
      tema: 'colonial',
      regiao: 'África',
      titulo: 'A Batalha de Argel',
      original: 'La battaglia di Algeri',
      autor: 'Gillo Pontecorvo',
      ano: 1966,
      resumo:
        'Reconstitui a luta pela independência da Argélia contra a França, com estilo quase documental.'
    },

    {
      id: 'f-desaparecido',
      tipo: 'filme',
      tema: 'guerrafria',
      regiao: 'Américas',
      titulo: 'Desaparecido: Um Grande Mistério',
      original: 'Missing',
      autor: 'Costa-Gavras',
      ano: 1982,
      resumo:
        'Baseado em fatos, mostra a busca de um pai por seu filho desaparecido após o golpe de 1973 no Chile.'
    },

    {
      id: 'f-13dias',
      tipo: 'filme',
      tema: 'guerrafria',
      regiao: 'Américas',
      titulo: 'Treze Dias que Abalaram o Mundo',
      original: 'Thirteen Days',
      autor: 'Roger Donaldson',
      ano: 2000,
      resumo:
        'A crise dos mísseis de Cuba, em 1962, vista pelos bastidores da Casa Branca.'
    },

    {
      id: 'f-nevoa',
      tipo: 'filme',
      tema: 'guerrafria',
      regiao: 'Global',
      titulo: 'Sob a Névoa da Guerra',
      original: 'The Fog of War',
      autor: 'Errol Morris',
      ano: 2003,
      resumo:
        'Documentário em que o ex-secretário de Defesa dos EUA, Robert McNamara, reflete sobre decisões como Cuba e Vietnã.'
    },

    {
      id: 'f-lenin',
      tipo: 'filme',
      tema: 'guerrafria',
      regiao: 'Europa',
      titulo: 'Adeus, Lenin!',
      original: 'Good Bye Lenin!',
      autor: 'Wolfgang Becker',
      ano: 2003,
      resumo:
        'Comédia dramática sobre a Alemanha Oriental e a queda do Muro de Berlim.'
    },

    {
      id: 'f-ruanda',
      tipo: 'filme',
      tema: 'conflitos',
      regiao: 'África',
      titulo: 'Hotel Ruanda',
      original: 'Hotel Rwanda',
      autor: 'Terry George',
      ano: 2004,
      resumo:
        'O genocídio de 1994 e a omissão da comunidade internacional, pelo olhar de um gerente de hotel.'
    },

    {
      id: 'f-armas',
      tipo: 'filme',
      tema: 'conflitos',
      regiao: 'Global',
      titulo: 'O Senhor das Armas',
      original: 'Lord of War',
      autor: 'Andrew Niccol',
      ano: 2005,
      resumo:
        'Ficção sobre o tráfico internacional de armas e as brechas políticas que sustentam esse comércio.'
    },

    {
      id: 'f-syriana',
      tipo: 'filme',
      tema: 'recursos',
      regiao: 'Ásia',
      titulo: 'Syriana',
      original: 'Syriana',
      autor: 'Stephen Gaghan',
      ano: 2005,
      resumo:
        'Entrelaça petróleo, lobby, espionagem e política no Golfo em um mosaico de personagens.'
    },

    {
      id: 'f-diamante',
      tipo: 'filme',
      tema: 'recursos',
      regiao: 'África',
      titulo: 'Diamante de Sangue',
      original: 'Blood Diamond',
      autor: 'Edward Zwick',
      ano: 2006,
      resumo:
        'A Serra Leoa dos anos 1990 e os "diamantes de conflito" que financiaram a guerra civil.'
    },

    {
      id: 'f-vida-outros',
      tipo: 'filme',
      tema: 'guerrafria',
      regiao: 'Europa',
      titulo: 'A Vida dos Outros',
      original: 'Das Leben der Anderen',
      autor: 'Florian Henckel von Donnersmarck',
      ano: 2006,
      resumo:
        'A vigilância da Stasi, a polícia secreta da Alemanha Oriental, sobre a vida de artistas.'
    },

    {
      id: 'f-ferias',
      tipo: 'filme',
      tema: 'guerrafria',
      regiao: 'Américas',
      titulo: 'O Ano em que Meus Pais Saíram de Férias',
      original: null,
      autor: 'Cao Hamburger',
      ano: 2006,
      resumo:
        'O Brasil de 1970, com ditadura e Copa do Mundo, visto por um menino em São Paulo.'
    },

    {
      id: 'f-argo',
      tipo: 'filme',
      tema: 'conflitos',
      regiao: 'Ásia',
      titulo: 'Argo',
      original: 'Argo',
      autor: 'Ben Affleck',
      ano: 2012,
      resumo:
        'A crise dos reféns no Irã, em 1979, e a operação para resgatar diplomatas americanos. Ficcionaliza vários pontos, então vale comparar com a história.'
    },

    {
      id: 'f-phillips',
      tipo: 'filme',
      tema: 'recursos',
      regiao: 'África',
      titulo: 'Capitão Phillips',
      original: 'Captain Phillips',
      autor: 'Paul Greengrass',
      ano: 2013,
      resumo:
        'O sequestro de um navio de carga por piratas somalis, um retrato das rotas marítimas e da fragilidade do Estado na Somália.'
    },

    {
      id: 'f-ponte',
      tipo: 'filme',
      tema: 'guerrafria',
      regiao: 'Europa',
      titulo: 'A Ponte dos Espiões',
      original: 'Bridge of Spies',
      autor: 'Steven Spielberg',
      ano: 2015,
      resumo:
        'Uma troca de prisioneiros em Berlim, no auge da Guerra Fria.'
    },

    {
      id: 'f-oppenheimer',
      tipo: 'filme',
      tema: 'guerrafria',
      regiao: 'Global',
      titulo: 'Oppenheimer',
      original: 'Oppenheimer',
      autor: 'Christopher Nolan',
      ano: 2023,
      resumo:
        'O Projeto Manhattan, o início da era nuclear e os embates políticos que vieram depois.'
    },

    {
      id: 'f-aqui',
      tipo: 'filme',
      tema: 'guerrafria',
      regiao: 'Américas',
      titulo: 'Ainda Estou Aqui',
      original: null,
      autor: 'Walter Salles',
      ano: 2024,
      resumo:
        'O desaparecimento de Rubens Paiva na ditadura militar brasileira, contado a partir da família.'
    }
  ];

  /* =========================================================
     2. ARMAZENAMENTO: PROGRESSO + TEMA
     ========================================================= */

  const CHAVE_PROGRESSO = 'geopoliso-acervo';
  const CHAVE_TEMA = 'geopoliso-theme';

  let feitos = new Set();

  try {
    feitos = new Set(
      JSON.parse(localStorage.getItem(CHAVE_PROGRESSO) || '[]')
    );
  } catch (_) {
    feitos = new Set();
  }

  function salvarProgresso() {
    try {
      localStorage.setItem(
        CHAVE_PROGRESSO,
        JSON.stringify([...feitos])
      );
    } catch (_) {}
  }

  /* =========================================================
     3. TEMA + FAVICON
     ========================================================= */

  const raiz = document.documentElement;
  const temaBotao = $('#tema, #themeToggle');
  const favicon = $('#favicon');

  function buildGlobeFavicon(color) {
    if (!favicon) return;

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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

    try {
      favicon.setAttribute(
        'href',
        'data:image/svg+xml;base64,' + btoa(svg)
      );
    } catch (_) {}
  }

  function aplicarTema(tema, salvar = true) {
    const temaValido =
      tema === 'light'
        ? 'light'
        : 'dark';

    raiz.setAttribute(
      'data-theme',
      temaValido
    );

    buildGlobeFavicon(
      temaValido === 'light'
        ? '#000'
        : '#fff'
    );

    if (salvar) {
      try {
        localStorage.setItem(
          CHAVE_TEMA,
          temaValido
        );
      } catch (_) {}
    }
  }

  let temaSalvo = 'dark';

  try {
    const salvo = localStorage.getItem(
      CHAVE_TEMA
    );

    if (
      salvo === 'light' ||
      salvo === 'dark'
    ) {
      temaSalvo = salvo;
    }
  } catch (_) {}

  aplicarTema(
    temaSalvo,
    false
  );

  if (temaBotao) {
    temaBotao.addEventListener(
      'click',
      () => {
        const atual =
          raiz.getAttribute('data-theme') === 'light'
            ? 'light'
            : 'dark';

        aplicarTema(
          atual === 'light'
            ? 'dark'
            : 'light'
        );
      }
    );
  }

  /* =========================================================
     4. TELA DE CARREGAMENTO GEOPOLISO
     ========================================================= */

  const loader = $('#geopolisoLoader');
  const loaderProgressBar = $('#loaderProgressBar');
  const loaderSkip = $('#loaderSkip');
  const geopoliticalFact = $('#geopoliticalFact');
  const loaderStatus = $('#loaderStatus');

  const geopoliticalFacts = [

    'A Rússia é o maior país do mundo em extensão territorial, ocupando mais de 17 milhões de km².',

    'O Brasil faz fronteira com 10 países da América do Sul. A única exceção é Chile e Equador.',

    'A Antártida não pertence oficialmente a nenhum país. Seu território é regulado pelo Sistema do Tratado da Antártida.',

    'O Canal de Suez conecta o Mar Mediterrâneo ao Mar Vermelho e é uma das principais rotas comerciais do planeta.',

    'O Canal do Panamá permite a ligação entre os oceanos Atlântico e Pacífico, reduzindo drasticamente as rotas marítimas.',

    'A Organização das Nações Unidas foi criada em 1945, após a Segunda Guerra Mundial.',

    'A África possui 54 países reconhecidos internacionalmente e é o segundo maior continente em área e população.',

    'A localização geográfica de um país pode influenciar suas relações comerciais, militares e diplomáticas.',

    'O petróleo e o gás natural são recursos que possuem grande importância estratégica nas relações internacionais.',

    'O Ártico ganhou importância geopolítica devido aos recursos naturais e às novas rotas marítimas possibilitadas pelo derretimento do gelo.',

    'A União Europeia reúne diversos países em um projeto de integração política e econômica.',

    'A posição de um país em relação a mares, oceanos e rotas comerciais pode influenciar sua importância estratégica.',

    'As fronteiras políticas atuais são resultado de processos históricos, guerras, acordos, colonização e movimentos de independência.',

    'A geopolítica não trata apenas de guerras: comércio, energia, tecnologia, território e recursos também fazem parte dela.',

    'O Brasil possui uma das maiores extensões territoriais do mundo e ocupa grande parte da América do Sul.'
  ];

  if (geopoliticalFact) {
    geopoliticalFact.textContent =
      geopoliticalFacts[
        Math.floor(
          Math.random() *
          geopoliticalFacts.length
        )
      ];
  }

  if (loader) {

    const normalLoadingTime = 5000;
    const clickLoadingTime = 3000;

    let loadingTime =
      normalLoadingTime;

    const startTime =
      performance.now();

    let loaderFinished = false;

    const loadingMessages = [
      'CONECTANDO AO MUNDO',
      'MAPEANDO O PLANETA',
      'ANALISANDO FRONTEIRAS',
      'CONECTANDO NAÇÕES',
      'PREPARANDO A GEOPOLÍTICA'
    ];

    let messageIndex = 0;

    const messageInterval =
      setInterval(() => {

        messageIndex =
          (messageIndex + 1) %
          loadingMessages.length;

        if (loaderStatus) {
          loaderStatus.textContent =
            loadingMessages[
              messageIndex
            ];
        }

      }, 900);

    function finishLoader() {

      if (loaderFinished) return;

      loaderFinished = true;

      clearInterval(
        messageInterval
      );

      if (loaderProgressBar) {
        loaderProgressBar.style.width =
          '100%';
      }

      setTimeout(() => {

        loader.classList.add(
          'loader-hidden'
        );

        document.body.style.overflow =
          '';

      }, 250);
    }

    function updateLoader() {

      if (loaderFinished) return;

      const elapsed =
        performance.now() -
        startTime;

      const progress =
        Math.min(
          (elapsed / loadingTime) * 100,
          100
        );

      if (loaderProgressBar) {
        loaderProgressBar.style.width =
          `${progress}%`;
      }

      if (progress >= 100) {
        finishLoader();
        return;
      }

      requestAnimationFrame(
        updateLoader
      );
    }

    document.body.style.overflow =
      'hidden';

    function accelerateLoader() {

      if (loaderFinished) return;

      const elapsed =
        performance.now() -
        startTime;

      if (elapsed < clickLoadingTime) {

        loadingTime =
          clickLoadingTime;

      } else {

        finishLoader();

      }
    }

    loader.addEventListener(
      'click',
      accelerateLoader
    );

    if (loaderSkip) {

      loaderSkip.addEventListener(
        'click',
        (event) => {

          event.stopPropagation();

          accelerateLoader();

        }
      );
    }

    requestAnimationFrame(
      updateLoader
    );
  }

  /* =========================================================
     5. ESTADO DA PÁGINA
     ========================================================= */

  const estado = {
    busca: '',
    regiao: 'Todas',
    status: 'todos'
  };

  const nos = new Map();

  const rotuloTipo = (o) =>
    o.tipo === 'livro'
      ? 'Livro'
      : 'Filme';

  const verbo = (o) =>
    o.tipo === 'livro'
      ? 'lido'
      : 'visto';

  function rotuloAcessivel(o) {

    const situacao =
      feitos.has(o.id)
        ? `, ${verbo(o)}`
        : '';

    return `${o.titulo}, ${o.autor}, ${o.ano}, ${rotuloTipo(o).toLowerCase()}${situacao}`;
  }

  /* =========================================================
     6. RENDERIZAÇÃO: ESTANTE DE LIVROS
     ========================================================= */

  function renderEstante() {

    const estante = $('#estante');

    if (!estante) return;

    const livros =
      OBRAS.filter(
        (o) => o.tipo === 'livro'
      );

    let indice = 0;

    Object.entries(TEMAS)
      .forEach(([chave, tema]) => {

        const doTema =
          livros.filter(
            (l) => l.tema === chave
          );

        if (!doTema.length) return;

        const prateleira =
          el(
            'div',
            {
              class: 'prateleira',
              role: 'group',
              'aria-label':
                `Prateleira: ${tema.nome}`
            }
          );

        doTema.forEach((livro) => {

          const h = hash(
            livro.id
          );

          const botao = el(
            'button',
            {
              class: 'lombada',
              type: 'button',
              'data-id': livro.id,
              style:
                `--tema:${tema.cor}; ` +
                `--w:${54 + (h % 16)}px; ` +
                `--h:${282 + ((h >> 3) % 40)}px; ` +
                `--i:${indice++}`
            },

            el(
              'span',
              {
                class: 'lombada-titulo',
                text:
                  livro.curto ||
                  livro.titulo
              }
            ),

            el(
              'span',
              {
                class: 'lombada-autor',
                text:
                  livro.autor
                    .split(' ')
                    .slice(-1)[0]
              }
            )
          );

          botao.addEventListener(
            'click',
            () =>
              abrirDetalhe(
                livro.id
              )
          );

          nos.set(
            livro.id,
            botao
          );

          prateleira.append(
            botao
          );
        });

        const grupo = el(
          'div',
          {
            class:
              'prateleira-grupo',
            style:
              `--tema:${tema.cor}`
          },

          el(
            'h3',
            {},

            el(
              'span',
              {
                class: 'amostra',
                'aria-hidden': 'true'
              }
            ),

            tema.nome,

            el(
              'span',
              {
                class: 'qtd',
                text:
                  doTema.length === 1
                    ? '1 livro'
                    : `${doTema.length} livros`
              }
            )
          ),

          el(
            'div',
            {
              class:
                'prateleira-moldura'
            },
            prateleira
          )
        );

        estante.append(
          grupo
        );
      });
  }

  /* =========================================================
     7. RENDERIZAÇÃO: FITA DE FILMES
     ========================================================= */

  function renderFita() {

    const trilha =
      $('#fita-trilha');

    const fita =
      $('#fita');

    if (
      !trilha ||
      !fita
    ) return;

    const filmes =
      OBRAS
        .filter(
          (o) => o.tipo === 'filme'
        )
        .sort(
          (a, b) => a.ano - b.ano
        );

    filmes.forEach(
      (filme) => {

        const tema =
          TEMAS[filme.tema];

        const botao = el(
          'button',
          {
            class: 'quadro',
            type: 'button',
            'data-id':
              filme.id,
            style:
              `--tema:${tema.cor}`
          },

          el(
            'span',
            {
              class:
                'quadro-ano',
              text:
                String(filme.ano)
            }
          ),

          el(
            'span',
            {
              class:
                'quadro-titulo',
              text:
                filme.titulo
            }
          ),

          el(
            'span',
            {
              class:
                'quadro-diretor',
              text:
                filme.autor
            }
          ),

          el(
            'span',
            {
              class:
                'quadro-tags'
            },

            el(
              'span',
              {
                class: 'tag',
                text:
                  filme.regiao
              }
            )
          )
        );

        botao.addEventListener(
          'click',
          () =>
            abrirDetalhe(
              filme.id
            )
        );

        nos.set(
          filme.id,
          botao
        );

        trilha.append(
          botao
        );
      }
    );

    const rolar =
      (sentido) => {

        fita.scrollBy({
          left:
            sentido *
            fita.clientWidth *
            0.8,

          behavior:
            reduzMovimento
              ? 'auto'
              : 'smooth'
        });
      };

    const anterior =
      $('#fita-anterior');

    const proximo =
      $('#fita-proximo');

    if (anterior) {

      anterior.addEventListener(
        'click',
        () =>
          rolar(-1)
      );
    }

    if (proximo) {

      proximo.addEventListener(
        'click',
        () =>
          rolar(1)
      );
    }
  }

  /* =========================================================
     8. FILTROS
     ========================================================= */

  function correspondeAosFiltros(o) {

    if (
      estado.regiao !== 'Todas' &&
      o.regiao !== estado.regiao
    ) {
      return false;
    }

    if (
      estado.status === 'pendentes' &&
      feitos.has(o.id)
    ) {
      return false;
    }

    if (
      estado.status === 'concluidos' &&
      !feitos.has(o.id)
    ) {
      return false;
    }

    if (estado.busca) {

      const palheiro =
        norm(
          [
            o.titulo,
            o.original,
            o.autor,
            o.ano,
            o.regiao,
            TEMAS[o.tema].nome,
            o.resumo
          ]
            .filter(Boolean)
            .join(' ')
        );

      return estado.busca
        .split(/\s+/)
        .every(
          (termo) =>
            palheiro.includes(termo)
        );
    }

    return true;
  }

  function renderRegioes() {

    const caixa =
      $('#regioes');

    if (!caixa) return;

    [
      'Todas',
      ...REGIOES
    ].forEach(
      (nome) => {

        const chip = el(
          'button',
          {
            class: 'chip',
            type: 'button',
            'aria-pressed':
              String(
                nome ===
                estado.regiao
              ),
            text:
              nome === 'Todas'
                ? 'Todas as regiões'
                : nome,
            'data-regiao':
              nome
          }
        );

        chip.addEventListener(
          'click',
          () => {

            estado.regiao =
              nome;

            caixa
              .querySelectorAll(
                '.chip'
              )
              .forEach(
                (c) =>
                  c.setAttribute(
                    'aria-pressed',
                    String(
                      c.dataset.regiao ===
                      nome
                    )
                  )
              );

            atualizar();
          }
        );

        caixa.append(
          chip
        );
      }
    );
  }

  function atualizar() {

    let visiveis = 0;

    OBRAS.forEach(
      (o) => {

        const no =
          nos.get(o.id);

        if (!no) return;

        const ok =
          correspondeAosFiltros(o);

        no.disabled =
          !ok;

        no.dataset.feito =
          String(
            feitos.has(o.id)
          );

        no.setAttribute(
          'aria-label',
          rotuloAcessivel(o)
        );

        if (ok) {
          visiveis++;
        }
      }
    );

    const total =
      OBRAS.length;

    const concluidos =
      OBRAS.filter(
        (o) =>
          feitos.has(o.id)
      ).length;

    const contagem =
      $('#contagem');

    if (contagem) {

      contagem.textContent =
        visiveis === total
          ? `Mostrando as ${total} obras`
          : `Mostrando ${visiveis} de ${total} obras`;
    }

    const progressoTexto =
      $('#progresso-texto');

    if (progressoTexto) {

      progressoTexto.textContent =
        `${concluidos} de ${total} concluídos`;
    }

    const barra =
      $('#progresso-barra');

    if (barra) {

      barra.max =
        total;

      barra.value =
        concluidos;
    }

    const vazio =
      $('#vazio');

    if (vazio) {

      vazio.hidden =
        visiveis > 0;
    }

    const limpar =
      $('#limpar');

    if (limpar) {

      const filtrando =
        estado.busca ||
        estado.regiao !== 'Todas' ||
        estado.status !== 'todos';

      limpar.hidden =
        !filtrando;
    }
  }

  const busca =
    $('#busca');

  if (busca) {

    busca.addEventListener(
      'input',
      (e) => {

        estado.busca =
          norm(
            e.target.value.trim()
          );

        atualizar();
      }
    );
  }

  const status =
    $('#status');

  if (status) {

    status.addEventListener(
      'change',
      (e) => {

        estado.status =
          e.target.value;

        atualizar();
      }
    );
  }

  const limpar =
    $('#limpar');

  if (limpar) {

    limpar.addEventListener(
      'click',
      () => {

        estado.busca = '';
        estado.regiao =
          'Todas';
        estado.status =
          'todos';

        if (busca) {
          busca.value = '';
        }

        if (status) {
          status.value =
            'todos';
        }

        const regioes =
          $('#regioes');

        if (regioes) {

          regioes
            .querySelectorAll(
              '.chip'
            )
            .forEach(
              (c) =>
                c.setAttribute(
                  'aria-pressed',
                  String(
                    c.dataset.regiao ===
                    'Todas'
                  )
                )
            );
        }

        atualizar();
      }
    );
  }

  /* =========================================================
     9. DETALHES (DIALOG)
     ========================================================= */

  const dialogo =
    $('#detalhe');

  let obraAberta =
    null;

  function preencherBotaoMarcar() {

    if (!obraAberta) return;

    const feito =
      feitos.has(
        obraAberta.id
      );

    const botao =
      $('#detalhe-marcar');

    if (!botao) return;

    botao.textContent =
      feito
        ? `Desmarcar como ${verbo(obraAberta)}`
        : `Marcar como ${verbo(obraAberta)}`;

    botao.setAttribute(
      'aria-pressed',
      String(feito)
    );
  }

  function abrirDetalhe(id) {

    const o =
      OBRAS.find(
        (x) => x.id === id
      );

    if (!o) return;

    obraAberta =
      o;

    const tema =
      TEMAS[o.tema];

    const detalheTipo =
      $('#detalhe-tipo');

    const detalheTitulo =
      $('#detalhe-titulo');

    const detalheOriginal =
      $('#detalhe-original');

    const detalheAutor =
      $('#detalhe-autor');

    const detalheRegiao =
      $('#detalhe-regiao');

    const detalheTema =
      $('#detalhe-tema');

    const detalheResumo =
      $('#detalhe-resumo');

    if (detalheTipo) {

      detalheTipo.textContent =
        rotuloTipo(o);
    }

    if (detalheTitulo) {

      detalheTitulo.textContent =
        o.titulo;
    }

    if (detalheOriginal) {

      if (
        o.original &&
        norm(o.original) !==
          norm(o.titulo)
      ) {

        detalheOriginal.textContent =
          o.original;

        detalheOriginal.hidden =
          false;

      } else {

        detalheOriginal.hidden =
          true;
      }
    }

    if (detalheAutor) {

      detalheAutor.textContent =
        `${o.autor}, ${o.ano}`;
    }

    if (detalheRegiao) {

      detalheRegiao.textContent =
        o.regiao;
    }

    if (detalheTema) {

      detalheTema.textContent =
        tema.nome;

      detalheTema.style.setProperty(
        '--tema',
        tema.cor
      );
    }

    if (detalheResumo) {

      detalheResumo.textContent =
        o.resumo;
    }

    preencherBotaoMarcar();

    if (
      dialogo &&
      !dialogo.open
    ) {

      dialogo.showModal();
    }
  }

  const detalheFechar =
    $('#detalhe-fechar');

  if (
    detalheFechar &&
    dialogo
  ) {

    detalheFechar.addEventListener(
      'click',
      () =>
        dialogo.close()
    );
  }

  if (dialogo) {

    dialogo.addEventListener(
      'click',
      (e) => {

        if (
          e.target ===
          dialogo
        ) {
          dialogo.close();
        }
      }
    );
  }

  const detalheMarcar =
    $('#detalhe-marcar');

  if (detalheMarcar) {

    detalheMarcar.addEventListener(
      'click',
      () => {

        if (!obraAberta) return;

        if (
          feitos.has(
            obraAberta.id
          )
        ) {

          feitos.delete(
            obraAberta.id
          );

        } else {

          feitos.add(
            obraAberta.id
          );
        }

        salvarProgresso();

        preencherBotaoMarcar();

        atualizar();
      }
    );
  }

  /* =========================================================
     10. ME SURPREENDA
     ========================================================= */

  const surpreenda =
    $('#surpreenda');

  if (surpreenda) {

    surpreenda.addEventListener(
      'click',
      () => {

        const visiveis =
          OBRAS.filter(
            correspondeAosFiltros
          );

        if (
          !visiveis.length
        ) {
          return;
        }

        const pendentes =
          visiveis.filter(
            (o) =>
              !feitos.has(o.id)
          );

        const grupo =
          pendentes.length
            ? pendentes
            : visiveis;

        abrirDetalhe(
          grupo[
            Math.floor(
              Math.random() *
              grupo.length
            )
          ].id
        );
      }
    );
  }

  /* =========================================================
     11. INÍCIO
     ========================================================= */

  renderRegioes();
  renderEstante();
  renderFita();
  atualizar();

})();