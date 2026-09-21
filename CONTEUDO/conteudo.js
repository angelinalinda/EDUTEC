/* =====================================================
   GEOPOLISO — TELA DE CARREGAMENTO E TEMA
===================================================== */

const loader = document.getElementById('geopolisoLoader');
const loaderProgressBar = document.getElementById('loaderProgressBar');
const loaderSkip = document.getElementById('loaderSkip');
const geopoliticalFact = document.getElementById('geopoliticalFact');
const loaderStatus = document.getElementById('loaderStatus');

const geopoliticalFacts = [
  "A Rússia é o maior país do mundo em extensão territorial.",
  "O Brasil possui fronteiras terrestres com quase todos os países da América do Sul.",
  "A Antártida é regulada pelo Sistema do Tratado da Antártida.",
  "O Canal de Suez conecta o Mar Mediterrâneo ao Mar Vermelho.",
  "O Canal do Panamá conecta os oceanos Atlântico e Pacífico.",
  "A Organização das Nações Unidas foi criada em 1945.",
  "A África possui 54 países reconhecidos internacionalmente.",
  "A posição geográfica influencia relações comerciais, militares e diplomáticas.",
  "Petróleo e gás natural possuem grande importância estratégica.",
  "O Ártico possui importância geopolítica crescente.",
  "A União Europeia reúne países em um projeto de integração política e econômica.",
  "Rotas marítimas são fundamentais para o comércio internacional.",
  "As fronteiras atuais resultam de processos históricos, guerras e acordos.",
  "Geopolítica envolve território, comércio, energia, tecnologia e recursos.",
  "O Brasil ocupa grande parte da América do Sul."
];

if (geopoliticalFact) {
  geopoliticalFact.textContent =
    geopoliticalFacts[Math.floor(Math.random() * geopoliticalFacts.length)];
}

const normalLoadingTime = 5000;
const clickLoadingTime = 3000;

let loadingTime = normalLoadingTime;
let startTime = performance.now();
let loaderFinished = false;

const loadingMessages = [
  "CONECTANDO AO MUNDO",
  "MAPEANDO O PLANETA",
  "ANALISANDO FRONTEIRAS",
  "CONECTANDO NAÇÕES",
  "PREPARANDO A GEOPOLÍTICA"
];

let messageIndex = 0;

const messageInterval = setInterval(() => {
  messageIndex = (messageIndex + 1) % loadingMessages.length;

  if (loaderStatus) {
    loaderStatus.textContent = loadingMessages[messageIndex];
  }
}, 900);

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

  const elapsed = performance.now() - startTime;
  const progress = Math.min((elapsed / loadingTime) * 100, 100);

  if (loaderProgressBar) {
    loaderProgressBar.style.width = progress + "%";
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

  const elapsed = performance.now() - startTime;

  if (elapsed < clickLoadingTime) {
    loadingTime = clickLoadingTime;
  } else {
    finishLoader();
  }
}

if (loader) {
  loader.addEventListener("click", accelerateLoader);
}

if (loaderSkip) {
  loaderSkip.addEventListener("click", function (e) {
    e.stopPropagation();
    accelerateLoader();
  });
}

requestAnimationFrame(updateLoader);


/* =====================================================
   TEMA
===================================================== */

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const favicon = document.getElementById("favicon");

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
      "href",
      "data:image/svg+xml;base64," + btoa(svg)
    );
  } catch (error) {
    console.warn("Não foi possível criar o favicon:", error);
  }
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);

  buildGlobeFavicon(
    theme === "light" ? "#000000" : "#ffffff"
  );
}

let savedTheme =
  localStorage.getItem("geopoliso-theme") || "dark";

applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current =
      root.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";

    const next =
      current === "dark"
        ? "light"
        : "dark";

    applyTheme(next);

    localStorage.setItem(
      "geopoliso-theme",
      next
    );
  });
}


/* =====================================================
   CONTEÚDO DOS CONTINENTES
===================================================== */

const REGION_META = {

  "América do Norte": {
    icon: "🗽",
    banner: "linear-gradient(135deg,#5b6b8c,#2c3550)",
    landscape: {
      kind: "landscape",
      urls: [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Grand_Canyon_view_from_Pima_Point_2010.jpg?width=1400",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Grand_Canyon_from_Pima_Point_2010.jpg?width=1400"
      ],
      caption: "Paisagem emblemática: Grand Canyon, Estados Unidos",
      alt: "Vista panorâmica do Grand Canyon, no Arizona, Estados Unidos",
      palette: ["#f2b880", "#b5563a", "#6e2f1f"]
    },
    sources: "T-MEC/USMCA, NORAD, OTAN e Banco Mundial",
    paragraphs: [
      "A América do Norte reúne Canadá, Estados Unidos e México, três países que concentram parcela decisiva da produção, da inovação tecnológica e do poder militar do hemisfério ocidental. As assimetrias são grandes: os Estados Unidos atuam como potência global, enquanto Canadá e México equilibram a forte integração com Washington e a busca de autonomia diplomática.",
      "O T-MEC (USMCA), que substituiu o Nafta em 2020, organiza cadeias produtivas integradas nos setores automotivo, agrícola e industrial. Suas revisões periódicas fazem de tarifas, regras de origem e normas trabalhistas instrumentos de negociação política entre os três sócios.",
      "A segurança é compartilhada por mecanismos como o NORAD, que integra a defesa aeroespacial de Canadá e Estados Unidos, e pela OTAN. Ao mesmo tempo, migração, tráfico de drogas sintéticas como o fentanil e o controle das fronteiras figuram entre os temas mais sensíveis da agenda regional.",
      "No extremo norte, o degelo do Ártico abre rotas como a Passagem do Noroeste e reacende disputas por soberania, recursos e presença militar. A Groenlândia, território autônomo da Dinamarca, tornou-se ponto de atenção estratégica para a defesa e para o acesso a minerais críticos.",
      "O continente também abriga instituições centrais da governança global: a sede da ONU, em Nova York, o FMI e o Banco Mundial, em Washington, e o dólar, principal moeda de reserva do sistema financeiro internacional."
    ]
  },

  "América Central": {
    icon: "🌎",
    banner: "linear-gradient(135deg,#4f7a6a,#1e3730)",
    landscape: {
      kind: "landscape",
      urls: [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Volcan_Arenal_from_Tenorio.jpg?width=1400",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Arenal_Volcano.jpg?width=1400"
      ],
      caption: "Paisagem emblemática: Vulcão Arenal, Costa Rica",
      alt: "Vulcão Arenal cercado por floresta tropical na Costa Rica",
      palette: ["#9ad8c4", "#3f8f78", "#1d4a3d"]
    },
    sources: "SICA, CARICOM, Autoridade do Canal do Panamá e ONU",
    paragraphs: [
      "A América Central e o Caribe funcionam como ponte territorial entre a América do Norte e a América do Sul e como fronteira entre os oceanos Atlântico e Pacífico. Essa posição transforma a região em corredor de comércio, de migração e de rotas do narcotráfico, além de zona histórica de influência dos Estados Unidos.",
      "O Canal do Panamá é o principal elemento estratégico do istmo: uma parcela relevante do comércio marítimo mundial depende dele, e secas recentes mostraram como o clima pode restringir seu tráfego. O debate sobre a influência de Estados Unidos e China nos portos e na infraestrutura do canal segue presente.",
      "A integração se organiza em blocos como o SICA, no istmo, e a CARICOM, no Caribe anglófono, além do acordo de livre comércio CAFTA-DR com os Estados Unidos. Nos países do chamado Triângulo Norte (Guatemala, Honduras e El Salvador), violência, pobreza e migração pressionam a agenda regional, e as remessas de emigrantes são pilar econômico.",
      "A região também é palco da disputa diplomática entre China e Taiwan. Panamá, El Salvador, Nicarágua, Honduras, Costa Rica e República Dominicana romperam com Taipé em favor de Pequim, enquanto Belize, Guatemala, Haiti, São Cristóvão e Neves, Santa Lúcia e São Vicente e Granadinas mantêm relações com Taiwan.",
      "Furacões, elevação do nível do mar e o Corredor Seco tornam a região uma das mais vulneráveis às mudanças climáticas. Os pequenos Estados insulares caribenhos atuam em bloco, sobretudo na Aliança dos Pequenos Estados Insulares (AOSIS), para cobrar financiamento climático e alívio de dívidas."
    ]
  },

  "América do Sul": {
    icon: "🌳",
    banner: "linear-gradient(135deg,#4f8f5e,#1c3a24)",
    landscape: {
      kind: "landscape",
      urls: [
        "https://commons.wikimedia.org/wiki/Special:FilePath/80_-_Machu_Picchu_-_Juin_2009_-_edit.jpg?width=1400",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Machu_Picchu,_Peru.jpg?width=1400"
      ],
      caption: "Paisagem emblemática: Machu Picchu, Peru",
      alt: "Cidadela de Machu Picchu entre montanhas dos Andes, no Peru",
      palette: ["#bfe3c8", "#4f8f5e", "#1f4a2c"]
    },
    sources: "Mercosul, CEPAL, OTCA e Banco Mundial",
    paragraphs: [
      "A América do Sul reúne doze países soberanos e um território ultramarino europeu (a Guiana Francesa), com grande diversidade territorial, econômica e política. Andes, Amazônia, Cone Sul e costas atlânticas e pacíficas moldam economias exportadoras de commodities e desafios de integração física.",
      "O Mercosul é o principal projeto de integração comercial do Cone Sul, ao lado da Comunidade Andina e da Aliança do Pacífico. A tentativa de aprofundar a cooperação política, como a UNASUL, enfrentou fragmentação ideológica, e o acordo entre Mercosul e União Europeia segue dependente de ratificações e de impasses ambientais e agrícolas.",
      "A Amazônia, compartilhada por nove países e articulada pela OTCA, tem importância internacional por sua biodiversidade, seu papel climático e as pressões de desmatamento, garimpo ilegal e crime organizado. A COP30, realizada em Belém em 2025, colocou a região no centro da diplomacia climática.",
      "O subcontinente concentra recursos estratégicos: lítio no chamado Triângulo do Lítio (Argentina, Bolívia e Chile), cobre no Chile e no Peru, petróleo na Venezuela, no Brasil e na Guiana, e grande produção de alimentos. A China é hoje principal parceiro comercial de vários países, como mostra o porto de Chancay, no Peru, enquanto os Estados Unidos preservam laços históricos de segurança.",
      "Persistem disputas e agendas sensíveis: a soberania sobre as ilhas Malvinas, o território de Essequibo entre Venezuela e Guiana, a demanda boliviana por saída ao mar e as reivindicações sobrepostas na Antártida. O narcotráfico, a crise migratória venezuelana e a instabilidade institucional completam o quadro."
    ]
  },

  "Europa": {
    icon: "🏛️",
    banner: "linear-gradient(135deg,#7a6b8c,#332a45)",
    landscape: {
      kind: "landscape",
      urls: [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Matterhorn_Riffelsee_2005-06-11.jpg?width=1400",
        "https://commons.wikimedia.org/wiki/Special:FilePath/2007_Matterhorn.jpg?width=1400"
      ],
      caption: "Paisagem emblemática: Matterhorn (Cervin), Alpes Suíços",
      alt: "Montanha Matterhorn refletida no lago Riffelsee, nos Alpes Suíços",
      palette: ["#c9d7ee", "#7a8fb8", "#3a4468"]
    },
    sources: "União Europeia, OTAN, OSCE e Eurostat",
    paragraphs: [
      "A Europa saiu de duas guerras mundiais no século XX para construir um dos projetos de integração mais ambiciosos da história. A União Europeia reúne 27 Estados em mercado único, com moeda comum em boa parte deles, e projeta poder normativo, comercial e diplomático muito além de suas fronteiras.",
      "A segurança do continente se apoia na OTAN e no vínculo transatlântico. A invasão russa da Ucrânia, em 2022, transformou esse cenário: acelerou o rearmamento, levou Finlândia e Suécia a aderirem à Aliança e forçou a redução da dependência do gás russo.",
      "Debates sobre autonomia estratégica atravessam a política europeia: energia, semicondutores, defesa e relação com Estados Unidos e China. O Brexit, em 2020, e as tensões com governos como o húngaro sobre Estado de direito e política externa mostram os limites e os conflitos internos do bloco.",
      "Nos Bálcãs Ocidentais, no Leste europeu e no Cáucaso, a perspectiva de adesão à UE e à OTAN compete com a influência russa. Conflitos congelados, como Transnístria, Chipre e Kosovo, permanecem como pontos de fricção, e a migração pelo Mediterrâneo e pelos Bálcãs é tema político permanente.",
      "A posição entre Atlântico, Mediterrâneo, Ártico e Eurásia confere valor a passagens como o Bósforo, os estreitos dinamarqueses e o Estreito de Gibraltar. Com o degelo, o Ártico europeu, em especial Noruega, Finlândia, Suécia e Islândia, ganha peso militar e econômico."
    ]
  },

  "África": {
    icon: "🦁",
    banner: "linear-gradient(135deg,#c9954f,#5a3d1a)",
    landscape: {
      kind: "landscape",
      urls: [
        "https://catracalivre.com.br/wp-content/uploads/2019/04/africa-do-sul-por-do-sol-910x604.jpg"
      ],
      caption: "Paisagem emblemática: Cataratas Vitória, Zâmbia e Zimbábue",
      alt: "Cataratas Vitória entre Zâmbia e Zimbábue",
      palette: ["#f5d29a", "#c9954f", "#6b4520"]
    },
    sources: "União Africana, AfCFTA, CEDEAO e Banco Mundial",
    paragraphs: [
      "A África reúne 54 países reconhecidos internacionalmente e cerca de 1,4 bilhão de pessoas, a população mais jovem do planeta. Grande parte de suas fronteiras deriva da partilha colonial e da descolonização, e o princípio da intangibilidade das fronteiras herdadas foi adotado pela União Africana para evitar novas guerras territoriais.",
      "A União Africana, criada em 2002, busca ampliar a cooperação política e a mediação de crises. A Zona de Livre Comércio Continental Africana (AfCFTA) procura integrar mercados, e blocos regionais como CEDEAO, SADC, EAC e IGAD têm peso próprio, embora a saída de Mali, Burkina Faso e Níger da CEDEAO, em 2025, evidencie fraturas.",
      "O continente abriga minerais críticos para a transição energética e a indústria digital, como cobalto, lítio, platina e manganês, além de petróleo e gás. China, União Europeia, Estados Unidos, Rússia, Turquia e países do Golfo disputam influência por meio de investimentos, crédito, cooperação militar e corredores logísticos, como o Corredor de Lobito.",
      "Rotas marítimas como o Canal de Suez, o Estreito de Bab el-Mandeb e o Cabo da Boa Esperança conectam a África ao comércio global. No Chifre, o Djibuti abriga bases de vários países, e a pirataria no Golfo da Guiné e no Índico segue como tema de segurança.",
      "Conflitos no Sahel, no Sudão, no Leste da República Democrática do Congo e no Chifre, golpes de Estado, endividamento e vulnerabilidade climática desafiam o desenvolvimento. Em 2023, a União Africana passou a integrar o G20 como membro permanente, sinal do peso crescente do continente nos fóruns globais."
    ]
  },

  "Ásia": {
    icon: "🏯",
    banner: "linear-gradient(135deg,#b8563e,#4a1f16)",
    landscape: {
      kind: "landscape",
      urls: [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Mount_Fuji_from_Lake_Kawaguchi.jpg?width=1400",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Lake_Kawaguchiko_Sakura_Mount_Fuji_3.JPG?width=1400"
      ],
      caption: "Paisagem emblemática: Monte Fuji, Japão",
      alt: "Monte Fuji visto do lago Kawaguchi, no Japão",
      palette: ["#f7c9b6", "#d97a5c", "#5a2a2a"]
    },
    sources: "ASEAN, OCS, APEC, Quad e ONU",
    paragraphs: [
      "A Ásia é o maior e mais populoso continente e concentra cerca de 60% da humanidade. China, Índia, Japão, Coreia do Sul e as economias do Sudeste Asiático fazem do continente o centro de gravidade econômico e tecnológico do mundo, especialmente em manufatura e semicondutores.",
      "A rivalidade entre Estados Unidos e China estrutura o chamado Indo-Pacífico. Aliados norte-americanos como Japão, Coreia do Sul, Filipinas e Austrália, o Quad e o pacto AUKUS respondem à expansão chinesa. Taiwan, o Mar do Sul da China e o Mar da China Oriental são os principais pontos de tensão.",
      "O continente reúne várias potências nucleares e disputas de fronteira antigas, como Índia e Paquistão em Caxemira, Índia e China no Himalaia e as duas Coreias, separadas por uma zona desmilitarizada desde o armistício de 1953. Iniciativas como ASEAN, OCS, APEC e RCEP tentam equilibrar cooperação econômica e rivalidades.",
      "A Ásia Ocidental, ou Oriente Médio, combina as maiores reservas de petróleo e gás do planeta com conflitos como o israelo-palestino, as rivalidades entre Irã e Arábia Saudita e as consequências das guerras no Iraque, na Síria e no Iêmen. O Estreito de Ormuz é ponto vital para a energia global.",
      "Estreitos como Malaca e Taiwan, além de Ormuz e Bab el-Mandeb, reúnem grande parte do comércio marítimo mundial. Na Ásia Central, Rússia e China disputam influência, e a Iniciativa Cinturão e Rota (Belt and Road) liga a região a portos e corredores logísticos de Eurásia, África e Europa."
    ]
  },

  "Oceania": {
    icon: "🏝️",
    banner: "linear-gradient(135deg,#3f8f96,#173b3e)",
    landscape: {
      kind: "landscape",
      urls: [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Uluru,_Australia.jpg?width=1400",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Uluru,_helicopter_view,_cropped.jpg?width=1400"
      ],
      caption: "Paisagem emblemática: Uluru, Austrália",
      alt: "Monólito Uluru no deserto central da Austrália",
      palette: ["#f6c99a", "#d9693f", "#6b2a1c"]
    },
    sources: "Fórum das Ilhas do Pacífico, AUKUS, ANZUS e ONU",
    paragraphs: [
      "A Oceania reúne Austrália, Nova Zelândia e dezenas de Estados e territórios insulares da Melanésia, Micronésia e Polinésia. Apesar da pouca população, a região controla imensas zonas econômicas exclusivas, ricas em pesca, minerais marinhos e posições estratégicas no Pacífico.",
      "O Pacífico tornou-se palco da competição entre China e potências ocidentais. O acordo de segurança entre China e Ilhas Salomão, em 2022, e a troca de reconhecimento diplomático de Taiwan para Pequim em Kiribati, Ilhas Salomão e Nauru levaram Austrália, Nova Zelândia e Estados Unidos a ampliar investimentos, cooperação policial e presença diplomática.",
      "Austrália e Nova Zelândia integram a aliança de inteligência Five Eyes, e a Austrália participa do AUKUS e do Quad. Micronésia, Ilhas Marshall e Palau mantêm Acordos de Livre Associação com os Estados Unidos, que garantem defesa em troca de acesso militar. O Fórum das Ilhas do Pacífico é a principal instância de coordenação regional.",
      "As mudanças climáticas são uma questão existencial para atóis como Tuvalu, Kiribati e Ilhas Marshall. Vanuatu liderou a iniciativa que levou a Corte Internacional de Justiça a emitir, em 2025, parecer consultivo sobre obrigações dos Estados em matéria climática, e a Austrália firmou com Tuvalu um tratado de mobilidade e segurança.",
      "A herança colonial e nuclear permanece: França mantém a Nova Caledônia e a Polinésia Francesa, e os testes nucleares em Bikini, Enewetak e Moruroa deixaram efeitos duradouros. Austrália e Nova Zelândia também reivindicam setores da Antártida."
    ]
  },

  "Antártida": {
    icon: "🧊",
    banner: "linear-gradient(135deg,#9fb3c9,#3a4a5c)",
    landscape: {
      kind: "landscape",
      urls: [
        "https://commons.wikimedia.org/wiki/Special:FilePath/00_3324_Lemaire_Channel_-_Antarctic.jpg?width=1400"
      ],
      caption: "Paisagem emblemática: Canal Lemaire, Península Antártica",
      alt: "Icebergs e montanhas cobertas de gelo no Canal Lemaire, na Península Antártica",
      palette: ["#e4f0fb", "#9fc3e6", "#4a6a8c"]
    },
    sources: "Sistema do Tratado da Antártida, CCAMLR e SCAR",
    paragraphs: [
      "A Antártida é regida pelo Sistema do Tratado da Antártida, assinado em 1959 por doze países e em vigor desde 1961. O tratado reserva o continente a fins pacíficos e à pesquisa científica, proíbe atividades militares e congela, sem extinguir, as reivindicações territoriais.",
      "Sete países mantêm reivindicações de soberania: Argentina, Austrália, Chile, França, Noruega, Nova Zelândia e Reino Unido. Argentina, Chile e Reino Unido têm pretensões sobrepostas na Península Antártica, enquanto Estados Unidos e Rússia reservam o direito de reivindicar, sem reconhecer as demais.",
      "O Protocolo de Madri, de 1991, proíbe a exploração mineral e estabelece proteção ambiental rigorosa. A partir de 2048, qualquer parte consultiva poderá pedir a revisão de aspectos do protocolo, o que alimenta debates sobre recursos, pesca de krill regulada pela CCAMLR e pressões futuras sobre o regime.",
      "A presença científica é também uma forma de presença estratégica. Dezenas de países mantêm bases, entre eles o Brasil, que participa do Sistema do Tratado desde 1975 e opera a Estação Antártica Comandante Ferraz por meio do Programa Antártico Brasileiro (PROANTAR). Portos como Ushuaia, Punta Arenas e Hobart funcionam como portas de acesso.",
      "O continente é um laboratório do clima global: o derretimento de suas geleiras influencia o nível do mar, as correntes oceânicas e o clima de todos os continentes, o que torna a governança antártica um tema de interesse mundial."
    ]
  }

};


/* =====================================================
   PAÍSES
===================================================== */

const CONTINENT_COUNTRIES = {

  "América do Norte": [
    "Canadá",
    "Estados Unidos",
    "México"
  ],

  "América Central": [
    "Antígua e Barbuda",
    "Bahamas",
    "Barbados",
    "Belize",
    "Costa Rica",
    "Cuba",
    "Dominica",
    "El Salvador",
    "Granada",
    "Guatemala",
    "Haiti",
    "Honduras",
    "Jamaica",
    "Nicarágua",
    "Panamá",
    "República Dominicana",
    "Santa Lúcia",
    "São Cristóvão e Neves",
    "São Vicente e Granadinas",
    "Trinidade e Tobago"
  ],

  "América do Sul": [
    "Argentina",
    "Bolívia",
    "Brasil",
    "Chile",
    "Colômbia",
    "Equador",
    "Guiana",
    "Guiana Francesa",
    "Paraguai",
    "Peru",
    "Suriname",
    "Uruguai",
    "Venezuela"
  ],

  "Europa": [
    "Albânia",
    "Alemanha",
    "Andorra",
    "Áustria",
    "Bélgica",
    "Bielorrússia",
    "Bósnia e Herzegovina",
    "Bulgária",
    "Chipre",
    "Croácia",
    "Dinamarca",
    "Eslováquia",
    "Eslovênia",
    "Espanha",
    "Estônia",
    "Finlândia",
    "França",
    "Grécia",
    "Hungria",
    "Irlanda",
    "Islândia",
    "Itália",
    "Letônia",
    "Liechtenstein",
    "Lituânia",
    "Luxemburgo",
    "Macedônia do Norte",
    "Malta",
    "Moldávia",
    "Mônaco",
    "Montenegro",
    "Noruega",
    "Países Baixos",
    "Polônia",
    "Portugal",
    "Reino Unido",
    "República Tcheca",
    "Romênia",
    "Rússia",
    "San Marino",
    "Sérvia",
    "Suécia",
    "Suíça",
    "Ucrânia",
    "Vaticano"
  ],

  "África": [
    "África do Sul",
    "Egito",
    "Nigéria",
    "Quênia",
    "Marrocos",
    "Angola"
  ],

  "Ásia": [
    "Afeganistão",
    "Arábia Saudita",
    "Bahrein",
    "Bangladesh",
    "Brunei",
    "Butão",
    "Camboja",
    "Catar",
    "Cazaquistão",
    "China",
    "Coreia do Norte",
    "Coreia do Sul",
    "Emirados Árabes Unidos",
    "Filipinas",
    "Iêmen",
    "Índia",
    "Indonésia",
    "Irã",
    "Iraque",
    "Israel",
    "Japão",
    "Jordânia",
    "Kuwait",
    "Laos",
    "Líbano",
    "Malásia",
    "Maldivas",
    "Mianmar",
    "Mongólia",
    "Nepal",
    "Omã",
    "Palestina",
    "Paquistão",
    "Quirguistão",
    "Singapura",
    "Síria",
    "Sri Lanka",
    "Tailândia",
    "Taiwan",
    "Tajiquistão",
    "Timor-Leste",
    "Turcomenistão",
    "Turquia",
    "Uzbequistão",
    "Vietnã"
  ],

  "Oceania": [
    "Austrália",
    "Estados Federados da Micronésia",
    "Fiji",
    "Ilhas Marshall",
    "Ilhas Salomão",
    "Kiribati",
    "Nauru",
    "Nova Zelândia",
    "Palau",
    "Papua-Nova Guiné",
    "Samoa",
    "Tonga",
    "Tuvalu",
    "Vanuatu"
  ],

  "Antártida": []
};


/* =====================================================
   PAÍSES — DADOS (ISO da bandeira, fontes e análise)
   Formato: "País": ["iso", "fontes", "parágrafo 1", "parágrafo 2", "parágrafo 3"]
===================================================== */

const COUNTRY_DATA = {

  /* ---------- AMÉRICA DO NORTE ---------- */

  "Canadá": ["ca", "Global Affairs Canada, OTAN e T-MEC",
    "O Canadá é o segundo maior país do mundo em área e divide com os Estados Unidos a mais longa fronteira terrestre entre dois países. Sua costa banha os oceanos Atlântico, Pacífico e Ártico.",
    "Membro do G7, da OTAN e do T-MEC, tem nos Estados Unidos o eixo de seu comércio e de sua defesa, integrada ao NORAD. Essa dependência leva Ottawa a diversificar parcerias com Europa e Ásia.",
    "O Ártico canadense, com a Passagem do Noroeste, e os recursos de petróleo, urânio, potássio e minerais críticos ampliam as disputas sobre soberania marítima e rotas polares."],

  "Estados Unidos": ["us", "Departamento de Estado, OTAN e Banco Mundial",
    "Os Estados Unidos são a maior economia do mundo e a principal potência militar, tecnológica e financeira do sistema internacional, com o dólar como moeda de reserva global.",
    "Sua rede de alianças inclui a OTAN, o Quad, o AUKUS e tratados bilaterais com Japão, Coreia do Sul e Filipinas. A competição estratégica com a China envolve tarifas, sanções e controles de exportação de tecnologia.",
    "A posição entre os oceanos Atlântico e Pacífico, a superioridade naval e a rede de bases no exterior sustentam sua projeção global, hoje debatida internamente entre engajamento e prioridades domésticas."],

  "México": ["mx", "T-MEC, Banco Mundial e ONU",
    "O México divide com os Estados Unidos uma fronteira de cerca de 3.100 km e é o principal sócio comercial norte-americano, integrado às cadeias industriais do T-MEC, sobretudo a automotiva.",
    "A relocalização de cadeias produtivas para perto do mercado americano (nearshoring), a migração, o tráfico de drogas e a segurança fronteiriça condicionam a relação bilateral e a agenda interna.",
    "A estatal Pemex e a política energética, o papel de rota migratória da América Latina e a diplomacia de não alinhamento colocam o país entre a América do Norte e a América Latina."],

  /* ---------- AMÉRICA CENTRAL E CARIBE ---------- */

  "Antígua e Barbuda": ["ag", "CARICOM, OECS e ONU",
    "Antígua e Barbuda é um pequeno Estado insular do Caribe oriental, independente do Reino Unido desde 1981 e membro da Commonwealth, da CARICOM e da OECS.",
    "A economia depende do turismo e de serviços financeiros, e a exposição a furacões pesa sobre as finanças públicas, o que leva o país a defender alívio de dívida e financiamento climático.",
    "Como parte da AOSIS, o país atua em foros da ONU para dar voz aos pequenos Estados insulares em negociações sobre clima e oceanos."],

  "Bahamas": ["bs", "CARICOM, OEA e ONU",
    "As Bahamas formam um arquipélago a poucos quilômetros da Flórida, com posição estratégica no acesso ao Caribe e ao Golfo do México. São independentes desde 1973 e integram a Commonwealth.",
    "O turismo e os serviços financeiros sustentam a economia, e a proximidade com os Estados Unidos condiciona a relação de segurança, a cooperação contra o tráfico e o controle da migração marítima.",
    "Os furacões de grande intensidade e a elevação do nível do mar expõem o país a riscos diretos, o que o torna voz ativa nos debates climáticos do Caribe."],

  "Barbados": ["bb", "CARICOM, Commonwealth e ONU",
    "Barbados tornou-se República em 2021, removendo a rainha como chefe de Estado e mantendo-se na Commonwealth. A decisão simboliza o debate caribenho sobre heranças coloniais.",
    "A primeira-ministra Mia Mottley projetou o país internacionalmente com a Iniciativa Bridgetown, que propõe reformar o financiamento climático e o sistema financeiro multilateral em benefício de países vulneráveis.",
    "Economia baseada em turismo e serviços financeiros, o país é membro ativo da CARICOM e defende reparações por escravidão."],

  "Belize": ["bz", "CARICOM, SICA e Corte Internacional de Justiça",
    "Belize é o único país da América Central com o inglês como língua oficial, e faz parte tanto da CARICOM quanto do SICA, o que o coloca na fronteira entre o Caribe e o istmo.",
    "Mantém uma disputa territorial com a Guatemala, que reivindica parte de seu território, levada à Corte Internacional de Justiça por acordo entre as partes.",
    "O país reconhece diplomaticamente Taiwan. A Grande Barreira de Corais do Belize é patrimônio da UNESCO e base do turismo e da agenda ambiental."],

  "Costa Rica": ["cr", "OCDE, SICA e ONU",
    "A Costa Rica aboliu o exército em 1948 e construiu uma diplomacia baseada em direitos humanos, desarmamento e defesa do direito internacional. É uma das democracias mais estáveis da América Latina.",
    "Membro da OCDE desde 2021, combina zonas francas, produção de dispositivos médicos e ecoturismo. Reconheceu a China em 2007, rompendo com Taiwan.",
    "Mantém litígios com a Nicarágua no Rio San Juan e na costa, tratados na Corte Internacional de Justiça, e enfrenta a expansão do narcotráfico em suas rotas."],

  "Cuba": ["cu", "ONU, OEA e Banco Mundial",
    "Cuba é uma república socialista de partido único, alvo de embargo econômico dos Estados Unidos desde a década de 1960. Sua relação com Washington é um dos eixos da Guerra Fria no hemisfério.",
    "A crise econômica, a escassez e a emigração em massa marcam o período recente. O país mantém laços com Rússia, China e Venezuela e sustenta uma diplomacia médica presente em dezenas de países.",
    "A base naval de Guantánamo, arrendada aos Estados Unidos desde 1903, permanece como ponto de atrito político."],

  "Dominica": ["dm", "CARICOM, OECS e ONU",
    "Dominica é um pequeno Estado insular da OECS conhecido como a Ilha da Natureza, com relevo vulcânico, floresta tropical e forte vocação para o ecoturismo.",
    "O furacão Maria, em 2017, causou destruição em grande escala e levou o governo a defender a meta de tornar-se a primeira nação climaticamente resiliente.",
    "O programa de cidadania por investimento gera receitas e é debatido por organismos internacionais por riscos de transparência."],

  "El Salvador": ["sv", "SICA, ONU e FMI",
    "El Salvador é o menor país da América Central em área e o mais densamente povoado. Usa o dólar norte-americano como moeda desde 2001.",
    "O governo adotou um regime de exceção contra gangues a partir de 2022, com forte queda de homicídios e críticas de organizações de direitos humanos. A política de criptomoedas foi posteriormente ajustada em acordo com o FMI.",
    "Mantém cooperação com os Estados Unidos em migração e segurança, e mudou o reconhecimento de Taiwan para a China em 2018."],

  "Granada": ["gd", "CARICOM, OECS e Commonwealth",
    "Granada, conhecida como Ilha das Especiarias por sua produção de noz-moscada, integra a CARICOM e a OECS e mantém economia apoiada no turismo e na agricultura.",
    "Em 1983, tropas dos Estados Unidos e de aliados caribenhos invadiram a ilha após um golpe interno, episódio marcante da Guerra Fria no Caribe.",
    "Como outros Estados insulares, é vulnerável a furacões e defende financiamento climático e reforma da dívida."],

  "Guatemala": ["gt", "SICA, ONU e Corte Internacional de Justiça",
    "A Guatemala é o país mais populoso da América Central, com forte presença de povos indígenas e economia ligada à agricultura, às remessas e a manufaturas leves.",
    "Reivindica território de Belize, questão submetida à Corte Internacional de Justiça, e é um dos poucos países que mantêm relações diplomáticas com Taiwan.",
    "Violência, corrupção e narcotráfico pressionam suas instituições, e a migração para os Estados Unidos está no centro da relação com Washington. A posse do presidente Bernardo Arévalo, em 2024, foi vista como teste para a democracia."],

  "Haiti": ["ht", "ONU, CARICOM e OEA",
    "O Haiti foi a primeira república negra independente do mundo, em 1804, após a única revolta de escravizados bem-sucedida na história. Essa origem marcou a diplomacia e o isolamento imposto por potências coloniais.",
    "Terremotos, instabilidade política e o controle de amplas áreas por gangues criaram uma das crises humanitárias mais graves das Américas, com missões internacionais de segurança e assistência autorizadas pela ONU.",
    "Divide a ilha de Hispaniola com a República Dominicana, e a fronteira é foco de tensões migratórias e comerciais."],

  "Honduras": ["hn", "SICA, ONU e OEA",
    "Honduras integra o Triângulo Norte da América Central e enfrenta desafios de pobreza, violência e migração, com remessas equivalentes a parcela expressiva do PIB.",
    "O golpe de 2009 e as controvérsias sobre as Zonas de Emprego e Desenvolvimento Econômico (ZEDEs) evidenciam a polarização política interna.",
    "Em 2023, rompeu com Taiwan e estabeleceu relações com a China, movimento que reflete a disputa diplomática de Pequim e Taipé na região."],

  "Jamaica": ["jm", "CARICOM, Commonwealth e ONU",
    "A Jamaica é uma das maiores ilhas do Caribe anglófono e uma das maiores economias da CARICOM, baseada em turismo, bauxita e remessas de sua diáspora.",
    "Sua posição nas rotas marítimas do Caribe a torna relevante para o comércio e para a cooperação contra o narcotráfico, em parceria com os Estados Unidos.",
    "O país debate a transição para uma república e a discussão sobre reparações históricas por escravidão, além de enfrentar furacões cada vez mais intensos."],

  "Nicarágua": ["ni", "SICA, ONU e Corte Internacional de Justiça",
    "A Nicarágua é governada por Daniel Ortega e Rosario Murillo, com concentração de poder e sanções dos Estados Unidos e da União Europeia por violações de direitos e restrições à oposição.",
    "O país aproximou-se de Rússia e China e rompeu com Taiwan em 2021. Projetos como um canal interoceânico, anunciado com apoio chinês, nunca saíram do papel.",
    "Tem litígios marítimos e fluviais julgados na Corte Internacional de Justiça, com a Colômbia e com a Costa Rica."],

  "Panamá": ["pa", "Autoridade do Canal do Panamá, ONU e Banco Mundial",
    "O Panamá tem posição estratégica entre os oceanos Atlântico e Pacífico. O Canal do Panamá permite a passagem de embarcações entre os dois oceanos e é essencial para o comércio marítimo mundial.",
    "O canal foi administrado pelos Estados Unidos até 1999, quando passou ao controle panamenho conforme os Tratados Torrijos-Carter. Hoje há debate sobre a influência de Washington e Pequim em portos e infraestrutura da rota.",
    "O país também abriga a Zona Livre de Colón e um centro financeiro internacional, e enfrenta desafios como a gestão da água do canal em períodos de seca."],

  "República Dominicana": ["do", "SICA, CARICOM e OEA",
    "A República Dominicana ocupa dois terços da ilha de Hispaniola e é uma das maiores economias do Caribe, com destaque para turismo, zonas francas e remessas.",
    "A fronteira com o Haiti é um foco de tensão migratória e de segurança, com muro e controles reforçados diante da crise haitiana.",
    "Aliada dos Estados Unidos, rompeu com Taiwan em 2018 para reconhecer a China, e participa do CAFTA-DR."],

  "Santa Lúcia": ["lc", "CARICOM, OECS e ONU",
    "Santa Lúcia é um Estado insular da OECS cujo símbolo são os Pitons, patrimônio da UNESCO. A economia migrou das bananas para o turismo.",
    "Mantém relações diplomáticas com Taiwan, o que a inclui no grupo de pequenos países que sustentam o reconhecimento de Taipé.",
    "A elevação do nível do mar e os furacões pautam sua agenda climática, defendida em conjunto com outros Estados insulares."],

  "São Cristóvão e Neves": ["kn", "CARICOM, OECS e ONU",
    "São Cristóvão e Neves é o menor país das Américas em área e população, uma federação de duas ilhas independente do Reino Unido desde 1983.",
    "Tem um dos programas de cidadania por investimento mais antigos do mundo, alvo de escrutínio internacional. O país reconhece Taiwan.",
    "A vulnerabilidade a furacões e a dependência do turismo orientam suas prioridades de política externa."],

  "São Vicente e Granadinas": ["vc", "CARICOM, ALBA e ONU",
    "São Vicente e Granadinas é um Estado de arquipélago no Caribe oriental, com economia baseada em turismo e agricultura e exposta a furacões e a erupções, como a do vulcão La Soufrière em 2021.",
    "É membro da CARICOM, da OECS e da ALBA, e mantém relações diplomáticas com Taiwan.",
    "Seu território, de pequenas ilhas, reforça a agenda de defesa das águas territoriais e dos recursos marinhos."],

  "Trinidade e Tobago": ["tt", "CARICOM, ONU e OEA",
    "Trinidad e Tobago é um dos maiores produtores de petróleo e gás natural do Caribe, com exportações de gás natural liquefeito e petroquímica.",
    "Está a poucos quilômetros da costa venezuelana, o que o torna sensível a sanções sobre a Venezuela, à migração e ao tráfico. Projetos de gás compartilhados com o vizinho foram afetados por essas restrições.",
    "É membro da CARICOM e um dos países caribenhos com maior peso econômico regional."],

  /* ---------- AMÉRICA DO SUL ---------- */

  "Argentina": ["ar", "Mercosul, G20 e FMI",
    "A Argentina é a segunda maior economia do Cone Sul e integra o Mercosul e o G20. Sua história recente combina crises de dívida, inflação e renegociações com o FMI.",
    "Reivindica soberania sobre as ilhas Malvinas, administradas pelo Reino Unido, e um setor da Antártida. Possui reservas de lítio e o campo de gás e petróleo de Vaca Muerta.",
    "Equilibra relações com China, Estados Unidos, Brasil e Europa, e seu papel no Atlântico Sul é ampliado por acesso à Antártida a partir de Ushuaia."],

  "Bolívia": ["bo", "Mercosul, Comunidade Andina e Corte Internacional de Justiça",
    "A Bolívia perdeu o acesso ao Oceano Pacífico na Guerra do Pacífico (1879-1884). Em 2018, a Corte Internacional de Justiça decidiu que o Chile não tem obrigação de negociar esse acesso.",
    "O país possui uma das maiores reservas de lítio do mundo, além de gás natural, e tenta desenvolver sua industrialização mantendo controle estatal sobre esses recursos.",
    "Estado plurinacional com forte presença indígena, iniciou sua adesão plena ao Mercosul e vive tensões políticas e econômicas internas."],

  "Brasil": ["br", "Itamaraty, BRICS, Mercosul e Banco Mundial",
    "O Brasil é o maior país da América do Sul e possui uma das maiores extensões territoriais do planeta, com fronteiras com dez países. Sua economia tem forte participação de agricultura, mineração, energia e indústria.",
    "Integra o Mercosul, o BRICS e o G20, e tem tradição diplomática de multilateralismo e não alinhamento. Sediou a COP30 em Belém, em 2025, ressaltando o papel da Amazônia nas negociações climáticas.",
    "O Atlântico Sul, as reservas de petróleo do pré-sal, a Amazônia e o papel de grande exportador de alimentos fazem do país um ator relevante para segurança alimentar, energia e clima."],

  "Chile": ["cl", "APEC, OCDE, Aliança do Pacífico e ONU",
    "O Chile é o maior produtor mundial de cobre e um dos principais de lítio, com economia aberta e uma rede ampla de acordos de livre comércio com Ásia, Europa e Américas.",
    "Voltado para o Pacífico, é membro da APEC, da OCDE e da Aliança do Pacífico. O Estreito de Magalhães e a Passagem de Drake lhe conferem posição estratégica entre os dois oceanos.",
    "Reivindica um setor da Antártida sobreposto ao da Argentina e ao do Reino Unido, e o legado da Guerra do Pacífico ainda marca suas relações com Peru e Bolívia."],

  "Colômbia": ["co", "Aliança do Pacífico, OCDE, OEA e ONU",
    "A Colômbia tem costas nos oceanos Atlântico e Pacífico e é um dos aliados mais próximos dos Estados Unidos na região. É parceira global da OTAN e membro da OCDE.",
    "O acordo de paz com as FARC, em 2016, encerrou décadas de conflito armado, mas o narcotráfico e a presença de grupos armados persistem. O país também recebe milhões de migrantes venezuelanos.",
    "Petróleo, carvão e café dominam suas exportações, e o país busca diversificar parcerias com China e Europa."],

  "Equador": ["ec", "Aliança do Pacífico, ONU e CAN",
    "O Equador usa o dólar norte-americano como moeda desde 2000 e depende de exportações de petróleo, banana, camarão e flores. Seu território inclui as ilhas Galápagos, patrimônio da humanidade.",
    "Nos últimos anos, o país enfrentou avanço do crime organizado ligado ao tráfico de drogas, com estado de exceção e cooperação de segurança com Washington.",
    "O país também tem parte da Amazônia e debates internos sobre exploração petrolífera em áreas protegidas."],

  "Guiana": ["gy", "CARICOM, ONU e Corte Internacional de Justiça",
    "A Guiana passou por uma transformação econômica após as descobertas de petróleo offshore no Bloco Stabroek, a partir de 2015, com operação liderada pela ExxonMobil.",
    "Enfrenta uma disputa fronteiriça com a Venezuela, que reivindica a região de Essequibo, cerca de dois terços de seu território. O caso está sob análise da Corte Internacional de Justiça.",
    "Membro da CARICOM, é o único país sul-americano de língua oficial inglesa e busca apoio de Estados Unidos e vizinhos para defender suas fronteiras."],

  "Guiana Francesa": ["fr", "França, União Europeia e Agência Espacial Europeia",
    "A Guiana Francesa é um território ultramarino da França e, portanto, parte da União Europeia na América do Sul. Sua bandeira oficial é a tricolor francesa.",
    "Abriga o Centro Espacial de Kourou, de onde partem foguetes europeus, e é a principal porta de acesso da Europa ao espaço.",
    "Faz fronteira com o Brasil (Oiapoque) e com o Suriname, e enfrenta desafios como garimpo ilegal, imigração e a presença de florestas amazônicas."],

  "Paraguai": ["py", "Mercosul, Itaipu Binacional e ONU",
    "O Paraguai é um país sem litoral, e depende da Hidrovia Paraguai-Paraná e de portos vizinhos para escoar sua produção de soja, carne e energia.",
    "A usina de Itaipu, binacional com o Brasil, é a base de sua matriz elétrica. A revisão do Anexo C do tratado é tema recorrente na relação bilateral.",
    "É o único país sul-americano que mantém relações diplomáticas formais com Taiwan e integra o Mercosul."],

  "Peru": ["pe", "Aliança do Pacífico, APEC e OCDE",
    "O Peru é um dos maiores produtores mundiais de cobre, ouro, prata e zinco, com economia aberta e acordos de livre comércio com China, Estados Unidos e União Europeia.",
    "O porto de Chancay, com investimento da chinesa COSCO, inaugurado em 2024, liga a América do Sul diretamente à Ásia e tornou-se símbolo da competição entre Washington e Pequim.",
    "Instabilidade política recorrente, presença andina e amazônica e o legado inca, com Machu Picchu, definem sua projeção externa."],

  "Suriname": ["sr", "CARICOM, ONU e OTCA",
    "O Suriname é o menor país da América do Sul em população, ex-colônia holandesa e membro da CARICOM, com florestas que cobrem a maior parte do território.",
    "Descobertas offshore de petróleo na região do Guiana-Suriname abrem perspectiva de crescimento com projetos de empresas como a TotalEnergies.",
    "Tem uma disputa fronteiriça marítima resolvida por arbitragem em 2007 com a Guiana e mantém questões de fronteira terrestre."],

  "Uruguai": ["uy", "Mercosul, ONU e OEA",
    "O Uruguai é um país pequeno, estável e com instituições sólidas, situado entre Brasil e Argentina, com forte tradição de mediação regional e sede do Mercosul.",
    "Exporta carne, soja, celulose e produtos lácteos, e busca ampliar acordos comerciais para além do bloco, inclusive com a China.",
    "Sua posição no Atlântico Sul e o acesso à Bacia do Prata conferem peso logístico ao país."],

  "Venezuela": ["ve", "OPEP, ONU e OEA",
    "A Venezuela possui as maiores reservas comprovadas de petróleo do mundo, mas sua produção e sua economia sofreram colapso na última década, com sanções internacionais e uma das maiores crises migratórias globais.",
    "Mantém alianças com Rússia, China, Irã e Cuba, e a legitimidade de seu governo é contestada por vários países. O Essequibo, disputa com a Guiana, segue sob análise da Corte Internacional de Justiça.",
    "A situação política e as relações com os Estados Unidos mudam com rapidez, e a Venezuela permanece no centro da atenção regional por energia, migração e segurança."],

  /* ---------- EUROPA ---------- */

  "Albânia": ["al", "OTAN, União Europeia e Banco Mundial",
    "A Albânia foi um dos regimes comunistas mais isolados da Europa até 1991. Desde então, aderiu à OTAN (2009) e é candidata à União Europeia, com negociações abertas.",
    "Sua posição no Adriático e nos Bálcãs Ocidentais e a presença de comunidades albanesas em países vizinhos, como Kosovo e Macedônia do Norte, dão peso regional a sua política externa.",
    "A emigração, o turismo e os acordos com a Itália para gerir migrantes marcaram a agenda recente."],

  "Alemanha": ["de", "União Europeia, OTAN e Banco Mundial",
    "A Alemanha é a maior economia da União Europeia e uma das maiores exportadoras do mundo, com forte peso da indústria automotiva, química e de máquinas.",
    "Após a invasão da Ucrânia em 2022, anunciou a Zeitenwende, virada estratégica que aumentou gastos com defesa e reduziu a dependência do gás russo. Continua, com a França, motor das decisões da UE.",
    "Sua dependência de exportações e da energia importada coloca desafios diante de tensões comerciais com Estados Unidos e China."],

  "Andorra": ["ad", "Copríncipes, Conselho da Europa e ONU",
    "Andorra é um pequeno principado nos Pirenéus, com dois copríncipes: o presidente da França e o bispo de Urgell, na Espanha.",
    "Não é membro da União Europeia, mas negocia um acordo de associação. Usa o euro e depende de turismo, comércio e serviços financeiros.",
    "Sua defesa é garantida por França e Espanha, e o país participa de organismos como o Conselho da Europa e a ONU."],

  "Áustria": ["at", "União Europeia, OSCE e ONU",
    "A Áustria mantém neutralidade permanente, definida em 1955, e integra a União Europeia desde 1995, sem pertencer à OTAN. Viena abriga sedes da ONU, da OPEP, da AIEA e da OSCE.",
    "Sua posição entre Europa Central, Bálcãs e Leste a torna uma ponte diplomática, e a dependência histórica de gás russo entrou em revisão após 2022.",
    "O país defende a ampliação da UE nos Bálcãs Ocidentais, região próxima de seus interesses econômicos e de segurança."],

  "Bélgica": ["be", "União Europeia, OTAN e Benelux",
    "A Bélgica abriga as principais instituições da União Europeia, como a Comissão e o Conselho, e a sede da OTAN, o que faz de Bruxelas um centro decisório da política ocidental.",
    "O país é uma federação com regiões flamenga, valã e de Bruxelas, cujas divisões linguísticas marcam a política interna.",
    "O porto de Antuérpia é um dos maiores da Europa e conecta o continente ao comércio marítimo global."],

  "Bielorrússia": ["by", "Estado da União, OTSC e ONU",
    "A Bielorrússia é aliada estreita da Rússia, com quem integra o Estado da União e a Organização do Tratado de Segurança Coletiva. O governo de Alexander Lukashenko é sancionado por União Europeia e Estados Unidos.",
    "Seu território serviu de base para a ofensiva russa de 2022 e abriga forças russas e, conforme acordos anunciados, armas nucleares táticas russas.",
    "Faz fronteira com Polônia, Lituânia e Letônia, o que a torna um ponto sensível do flanco leste da OTAN e da política migratória europeia."],

  "Bósnia e Herzegovina": ["ba", "Acordos de Dayton, União Europeia e ONU",
    "A Bósnia e Herzegovina nasceu da desintegração da Iugoslávia e passou por uma guerra entre 1992 e 1995, encerrada pelos Acordos de Dayton, que criaram um Estado com duas entidades: a Federação e a Republika Srpska.",
    "Um Alto Representante internacional supervisiona a implementação do acordo, e as divisões étnicas entre bósnios, sérvios e croatas continuam marcando a política.",
    "O país é candidato à União Europeia, e a influência de Sérvia, Croácia, Rússia e Turquia é constante."],

  "Bulgária": ["bg", "União Europeia, OTAN e Mar Negro",
    "A Bulgária integra a OTAN (2004) e a União Europeia (2007) e tem acesso ao Mar Negro, o que lhe dá relevância para a segurança regional.",
    "Historicamente próxima da Rússia, reavaliou a dependência energética após 2022 e avançou no caminho da zona do euro e de Schengen.",
    "Mantém disputas históricas e linguísticas com a Macedônia do Norte, que já bloquearam o processo de adesão do vizinho à UE."],

  "Chipre": ["cy", "União Europeia, ONU e Commonwealth",
    "Chipre está dividido desde 1974, quando a Turquia interveio após um golpe apoiado por Atenas. A República de Chipre, membro da UE, controla o sul; o norte é a República Turca do Chipre do Norte, reconhecida apenas pela Turquia.",
    "Uma zona de amortecimento controlada pela ONU separa as áreas, e as negociações de reunificação não avançaram de forma definitiva.",
    "As reservas de gás no Mediterrâneo Oriental e as bases soberanas britânicas de Akrotiri e Dhekelia aumentam a relevância estratégica da ilha."],

  "Croácia": ["hr", "União Europeia, OTAN e Banco Mundial",
    "A Croácia entrou na OTAN em 2009 e na União Europeia em 2013, e aderiu ao euro e ao espaço Schengen em 2023. Sua costa no Adriático é central para o turismo.",
    "Herdeira da Iugoslávia, teve a Guerra de Independência (1991-1995), e mantém relações complexas com Sérvia e Bósnia.",
    "O país é ponte entre Europa Central, Bálcãs e Mediterrâneo, e projeta terminais de GNL para diversificar a energia da região."],

  "Dinamarca": ["dk", "União Europeia, OTAN e Conselho Ártico",
    "A Dinamarca controla a Groenlândia e as Ilhas Faroé, o que a faz uma das potências do Ártico. O interesse estratégico e mineral da Groenlândia tem atraído a atenção de Estados Unidos, China e Rússia.",
    "Os estreitos dinamarqueses controlam o acesso ao Mar Báltico, e o país é membro da OTAN e da UE, com algumas exceções (opt-outs) em política de defesa e moeda.",
    "Após 2022, aumentou fortemente os gastos militares e cooperou no apoio à Ucrânia."],

  "Eslováquia": ["sk", "União Europeia, OTAN e Grupo de Visegrado",
    "A Eslováquia integra União Europeia, OTAN, zona do euro e o Grupo de Visegrado, e faz fronteira com a Ucrânia, o que a expõe diretamente à guerra vizinha.",
    "Sua economia é fortemente industrial e ligada às cadeias automotivas da Europa Central. A rota de oleodutos e gasodutos de origem russa (como o Druzhba) tem sido tema de debate político.",
    "O governo tem adotado posturas mais céticas que os demais sócios da UE sobre o apoio a Kiev."],

  "Eslovênia": ["si", "União Europeia, OTAN e Schengen",
    "A Eslovênia foi a república iugoslava mais rica e a primeira ex-iugoslava a aderir à UE, em 2004, e ao euro, em 2007. É também membro da OTAN e do espaço Schengen.",
    "Localizada entre os Alpes, os Bálcãs e o Adriático, tem no porto de Koper uma porta de acesso para a Europa Central.",
    "Manteve uma longa disputa marítima com a Croácia, julgada em arbitragem internacional em 2017, cujo resultado foi contestado."],

  "Espanha": ["es", "União Europeia, OTAN e Comunidade Ibero-Americana",
    "A Espanha controla as duas margens do Estreito de Gibraltar, por onde passa boa parte do tráfego marítimo entre o Atlântico e o Mediterrâneo. Reivindica a soberania de Gibraltar, administrado pelo Reino Unido.",
    "Ceuta e Melilla, enclaves no norte do Marrocos, fazem do país a fronteira terrestre da UE com a África, o que a expõe a fluxos migratórios e a tensões com Rabat.",
    "Sua política externa privilegia a UE e a ligação histórica e cultural com a América Latina, e o país enfrenta debates internos de autonomia regional, como o da Catalunha."],

  "Estônia": ["ee", "OTAN, União Europeia e Cyber Defence Centre",
    "A Estônia é uma ex-república soviética que integra a OTAN e a UE desde 2004 e faz fronteira com a Rússia. Sua estratégia de defesa combina forças reforçadas por aliados e um serviço militar amplo.",
    "Após os ataques cibernéticos de 2007, tornou-se referência mundial em segurança digital e sedia o Centro de Excelência de Defesa Cibernética da OTAN.",
    "É um dos países que mais investem em defesa em proporção ao PIB e apoia com firmeza a Ucrânia."],

  "Finlândia": ["fi", "OTAN, União Europeia e Conselho Ártico",
    "A Finlândia abandonou sua tradição de não alinhamento e aderiu à OTAN em 2023, após a invasão russa da Ucrânia. Sua fronteira terrestre com a Rússia tem cerca de 1.340 km.",
    "A memória da Guerra de Inverno (1939-1940) sustenta uma política de defesa baseada em serviço militar amplo e forte preparo civil.",
    "País ártico, integra o Conselho Ártico e é referência em tecnologia, educação e mediação diplomática."],

  "França": ["fr", "ONU, União Europeia, OTAN e Ministério da Europa e das Relações Exteriores",
    "A França é potência nuclear, membro permanente do Conselho de Segurança da ONU e um dos pilares da União Europeia, com política externa que valoriza autonomia estratégica.",
    "Seus territórios ultramarinos lhe conferem uma das maiores zonas econômicas exclusivas do mundo e presença no Caribe, América do Sul, Índico e Pacífico, com foco crescente no Indo-Pacífico.",
    "Reduziu sua presença militar no Sahel após rupturas com governos locais, e busca redefinir relações com a África."],

  "Grécia": ["gr", "União Europeia, OTAN e Mediterrâneo Oriental",
    "A Grécia está no encontro entre Europa, Ásia e África e controla milhares de ilhas no Egeu. Tem disputas com a Turquia sobre espaço aéreo, plataforma continental e zonas econômicas.",
    "Após a crise da dívida de 2010, passou por resgates e reformas. O porto do Pireu, com capital chinês, é peça de conexão entre a Ásia e a Europa.",
    "Alinhada à OTAN e à UE, cooperou com Chipre, Israel e Egito em projetos de gás no Mediterrâneo Oriental."],

  "Hungria": ["hu", "União Europeia, OTAN e Grupo de Visegrado",
    "A Hungria integra a UE e a OTAN, e seu governo tem entrado em atrito com Bruxelas por questões de Estado de direito, políticas migratórias e apoio à Ucrânia.",
    "O país depende em grande parte de petróleo e gás russos e de tecnologia nuclear russa, o que condiciona sua postura sobre sanções.",
    "Como membro do Grupo de Visegrado, articula posições com Polônia, Eslováquia e República Tcheca, embora haja divergências entre eles."],

  "Irlanda": ["ie", "União Europeia, ONU e Acordo de Sexta-Feira Santa",
    "A Irlanda mantém neutralidade militar e é membro da UE. Sua política externa é marcada pela questão da Irlanda do Norte e pelo Acordo de Sexta-Feira Santa de 1998.",
    "O Brexit tornou a fronteira irlandesa um tema sensível, tratado pelo Marco de Windsor. O país é sede europeia de grandes empresas de tecnologia e farmacêuticas, atraídas por regime tributário favorável.",
    "Reconheceu o Estado da Palestina em 2024 e tem papel ativo em debates de direitos humanos na ONU."],

  "Islândia": ["is", "OTAN, EFTA e Conselho Ártico",
    "A Islândia é membro fundador da OTAN e não possui forças armadas próprias. Sua posição no Atlântico Norte, no corredor GIUK, é estratégica para o monitoramento naval entre Ártico e Atlântico.",
    "Não pertence à União Europeia: retirou sua candidatura em 2015 e integra o Espaço Econômico Europeu e a EFTA.",
    "A economia de pesca, energia geotérmica e turismo, e o interesse nas novas rotas árticas, definem seu papel."],

  "Itália": ["it", "União Europeia, OTAN e G7",
    "A Itália é fundadora da União Europeia e integra OTAN e G7. Sua posição central no Mediterrâneo faz do país ponto de chegada da migração vinda da Líbia e da Tunísia, o que domina sua agenda europeia.",
    "A economia industrial é integrada às cadeias da Europa e o país saiu da Iniciativa Cinturão e Rota chinesa em 2023.",
    "Busca ampliar sua influência no Mediterrâneo e na África com iniciativas de cooperação energética e de desenvolvimento."],

  "Letônia": ["lv", "OTAN, União Europeia e Mar Báltico",
    "A Letônia é uma ex-república soviética que integra OTAN e UE desde 2004, e faz fronteira com Rússia e Bielorrússia. Tem grande minoria de língua russa.",
    "Recebe tropas multinacionais da OTAN, dentro da presença avançada reforçada na região, e ampliou seus gastos militares após 2022.",
    "O porto de Riga e o setor de trânsito eram ligados à Rússia, e a economia se reorienta para o Ocidente."],

  "Liechtenstein": ["li", "EEE, EFTA e ONU",
    "Liechtenstein é um principado alpino entre Suíça e Áustria, sem forças armadas, e um dos países mais ricos do mundo per capita.",
    "É membro do Espaço Econômico Europeu, mas não da UE, e mantém união aduaneira e monetária com a Suíça, que o representa em várias áreas diplomáticas.",
    "Sua economia depende de indústria de precisão e serviços financeiros."],

  "Lituânia": ["lt", "OTAN, União Europeia e Mar Báltico",
    "A Lituânia foi a primeira república soviética a declarar independência, em 1990. Integra OTAN e UE desde 2004 e faz fronteira com Bielorrússia e com Kaliningrado, enclave russo.",
    "O Corredor de Suwałki, faixa de terra que liga o país à Polônia, é considerado um ponto vulnerável do flanco leste da OTAN. A Alemanha estacionou uma brigada permanente no território lituano.",
    "Diversificou a energia com um terminal de GNL em Klaipėda e é um dos apoiadores mais firmes da Ucrânia."],

  "Luxemburgo": ["lu", "União Europeia, OTAN e Benelux",
    "Luxemburgo é um dos fundadores da UE e do Benelux e abriga instituições europeias, como o Tribunal de Justiça e o Banco Europeu de Investimento.",
    "É um dos maiores centros financeiros do mundo, com renda per capita entre as mais altas.",
    "Integra a OTAN e defende o multilateralismo e a integração europeia como garantia de segurança de um pequeno Estado."],

  "Macedônia do Norte": ["mk", "OTAN, União Europeia e Acordo de Prespa",
    "A Macedônia do Norte mudou de nome em 2019 pelo Acordo de Prespa, resolvendo uma disputa de décadas com a Grécia, e aderiu à OTAN em 2020.",
    "É candidata à União Europeia desde 2005, mas a adesão foi bloqueada por controvérsias históricas e linguísticas com a Bulgária.",
    "Sua população inclui uma grande minoria albanesa, e o equilíbrio étnico é central no arranjo político."],

  "Malta": ["mt", "União Europeia, Commonwealth e ONU",
    "Malta é um Estado insular no centro do Mediterrâneo, membro da UE, da zona do euro e da Commonwealth, com neutralidade prevista em sua Constituição.",
    "Sua localização entre Europa e África a coloca na rota migratória do Mediterrâneo Central, tema de disputas sobre resgates e responsabilidades na UE.",
    "A economia se apoia em turismo, jogos e serviços financeiros."],

  "Moldávia": ["md", "União Europeia, OSCE e ONU",
    "A Moldávia é candidata à União Europeia desde 2022 e mantém relações estreitas com a Romênia. Sua orientação ocidental convive com pressões de Moscou.",
    "A Transnístria, região separatista com presença de tropas russas, e a Gagaúzia, região autônoma, mostram as tensões territoriais internas.",
    "A guerra na Ucrânia vizinha trouxe refugiados, riscos de segurança e a necessidade de diversificar o abastecimento energético."],

  "Mônaco": ["mc", "França, Conselho da Europa e ONU",
    "Mônaco é um principado de cerca de 2 km², entre os menores Estados do mundo. Usa o euro e tem sua defesa assegurada pela França.",
    "Sua economia gira em torno de turismo, serviços financeiros e imobiliário de luxo, com regime tributário atrativo.",
    "Não integra a União Europeia, mas tem acordos de convivência com o bloco."],

  "Montenegro": ["me", "OTAN, União Europeia e Adriático",
    "Montenegro se tornou independente da Sérvia em 2006 e aderiu à OTAN em 2017, apesar de resistências de Moscou. Lidera as negociações de adesão à UE entre os países dos Bálcãs.",
    "Usa o euro de forma unilateral e depende do turismo na costa adriática.",
    "A influência sérvia, russa e chinesa na economia e na política interna é debatida, inclusive pelos empréstimos para infraestrutura."],

  "Noruega": ["no", "OTAN, EEE e Conselho Ártico",
    "A Noruega é uma das maiores exportadoras de petróleo e gás da Europa e, após 2022, tornou-se peça essencial no abastecimento do continente. Seu fundo soberano é um dos maiores do mundo.",
    "Membro da OTAN, mas fora da UE (participa do Espaço Econômico Europeu), tem fronteira com a Rússia no Ártico e administra o arquipélago de Svalbard segundo o Tratado de 1920.",
    "A pesca, as rotas árticas e a exploração offshore integram sua política de segurança e economia."],

  "Países Baixos": ["nl", "União Europeia, OTAN e Corte Internacional de Justiça",
    "Os Países Baixos abrigam o porto de Roterdã, o maior da Europa, e Haia, sede da Corte Internacional de Justiça e do Tribunal Penal Internacional.",
    "A empresa ASML, única fabricante das máquinas mais avançadas de litografia, coloca o país no centro do controle de exportações de semicondutores entre EUA e China.",
    "Integra o Benelux, a UE e a OTAN, e mantém territórios caribenhos, como Aruba, Curaçao e Sint Maarten."],

  "Polônia": ["pl", "OTAN, União Europeia e Grupo de Visegrado",
    "A Polônia é o maior país do flanco leste da OTAN e um dos principais apoiadores da Ucrânia, país com o qual faz fronteira. Seus gastos militares estão entre os mais altos da Aliança em proporção ao PIB.",
    "Sua história de partilhas e ocupações moldou uma política de segurança baseada em aliança com os EUA, e o país reduziu a dependência de energia russa com terminais de GNL e novos gasodutos.",
    "Faz fronteira com Bielorrússia e com Kaliningrado, o que a expõe à pressão híbrida e migratória."],

  "Portugal": ["pt", "União Europeia, OTAN e CPLP",
    "Portugal é membro fundador da OTAN e integra a União Europeia desde 1986. Sua posição no Atlântico, com os arquipélagos dos Açores e da Madeira, é estratégica.",
    "A Base das Lajes, nos Açores, foi um ponto relevante para operações norte-americanas. O porto de Sines é polo energético e logístico.",
    "É fundador da CPLP, ponte entre a Europa e os países lusófonos, e tem laços históricos com o Brasil e a África."],

  "Reino Unido": ["gb", "ONU, OTAN, Commonwealth e G7",
    "O Reino Unido é potência nuclear e membro permanente do Conselho de Segurança da ONU. Deixou a União Europeia em 2020 e busca reposicionar-se com o conceito de Global Britain.",
    "Integra o Five Eyes, a OTAN e o AUKUS, e lidera a Commonwealth. Mantém disputas de soberania sobre as Malvinas, com a Argentina, e sobre Gibraltar, com a Espanha, e negociou a situação do arquipélago de Chagos.",
    "A questão da Irlanda do Norte, moldada pelo Brexit, segue como ponto sensível, e a Escócia debate periodicamente sua independência."],

  "República Tcheca": ["cz", "União Europeia, OTAN e Grupo de Visegrado",
    "A República Tcheca é membro da OTAN e da UE e faz parte do Grupo de Visegrado. Sua indústria está integrada às cadeias automotivas e mecânicas europeias.",
    "Após 2022, reduziu a dependência de energia russa e acolheu grande número de refugiados ucranianos. Mantém forte tradição de apoio militar à Ucrânia.",
    "A energia nuclear e os debates sobre projetos com empresas russas e chinesas fazem parte de sua discussão estratégica."],

  "Romênia": ["ro", "OTAN, União Europeia e Mar Negro",
    "A Romênia é um dos pilares da presença da OTAN no Mar Negro, com o porto de Constança, a base aérea Mihail Kogălniceanu e um sistema antimísseis em Deveselu.",
    "Faz fronteira com Ucrânia e Moldávia, sendo corredor para exportação de grãos ucranianos e porta de apoio à Moldávia.",
    "É membro da UE e da OTAN, e o delta do Danúbio e as reservas de gás do Mar Negro fortalecem sua relevância energética."],

  "Rússia": ["ru", "ONU, OCS, BRICS e Ministério das Relações Exteriores",
    "A Rússia é o maior país do mundo em extensão, com território na Europa e na Ásia, potência nuclear e membro permanente do Conselho de Segurança da ONU. Sua economia se apoia em petróleo, gás, minérios e grãos.",
    "A invasão da Ucrânia, em 2022, levou a sanções sem precedentes do Ocidente e a uma reorientação comercial rumo à China, à Índia e a outros parceiros, dentro de arranjos como BRICS e OCS. A Crimeia, anexada em 2014, não é reconhecida pela maioria dos países.",
    "O Ártico e a Rota do Mar do Norte, o enclave de Kaliningrado, a presença militar na Síria e na Bielorrússia e a influência no espaço pós-soviético definem sua estratégia."],

  "San Marino": ["sm", "Conselho da Europa, ONU e Itália",
    "San Marino é um microestado enclavado na Itália e é considerado a república mais antiga do mundo ainda existente, com tradição que remonta ao século IV.",
    "Usa o euro e mantém acordos especiais com a Itália e com a UE, com negociações de associação em andamento.",
    "Sua economia gira em torno de turismo, serviços financeiros e comércio."],

  "Sérvia": ["rs", "União Europeia, ONU e Acordo de Bruxelas",
    "A Sérvia é candidata à União Europeia, mas mantém vínculos estreitos com Rússia e China. Não aderiu às sanções contra Moscou e conserva neutralidade militar formal.",
    "O Kosovo, que declarou independência em 2008, é reconhecido por muitos países ocidentais, mas não por Sérvia, Rússia, China e vários outros. O diálogo mediado pela UE busca normalizar as relações.",
    "O bombardeio da OTAN em 1999 ainda marca a opinião pública, e o país tem influência sobre sérvios na Bósnia e em Montenegro."],

  "Suécia": ["se", "OTAN, União Europeia e Conselho do Báltico",
    "A Suécia rompeu com uma neutralidade de mais de dois séculos e aderiu à OTAN em 2024. Sua posição no Báltico, com a ilha de Gotland, é importante para a defesa do flanco norte.",
    "Possui uma forte indústria de defesa (Saab, entre outras) e ampliou os gastos militares após 2022.",
    "Integra a UE, fora da zona do euro, e tem tradição de mediação e de defesa de direitos humanos e ajuda ao desenvolvimento."],

  "Suíça": ["ch", "ONU, EFTA e acordos bilaterais com a União Europeia",
    "A Suíça mantém neutralidade permanente e não pertence à União Europeia, embora tenha extensa rede de acordos bilaterais. Genebra abriga a sede europeia da ONU e diversos organismos internacionais.",
    "É um dos principais centros financeiros do mundo. Após 2022, adotou parte das sanções à Rússia, o que reabriu o debate sobre o alcance de sua neutralidade.",
    "Tem papel tradicional de bons ofícios, mediação e sede de negociações de paz."],

  "Ucrânia": ["ua", "ONU, União Europeia, OTAN e OSCE",
    "A Ucrânia é o maior país inteiramente europeu em área. Está em guerra desde a invasão em larga escala pela Rússia, em fevereiro de 2022, que se seguiu à anexação da Crimeia, em 2014, e ao conflito no Donbass.",
    "Candidata à União Europeia desde 2022, busca reforçar a integração ocidental e recebe apoio militar e financeiro de países da OTAN e da UE. A questão de garantias de segurança e o futuro das regiões ocupadas são centrais em qualquer negociação.",
    "O país é grande exportador de grãos, óleo de girassol e minerais, e o acesso ao Mar Negro afeta a segurança alimentar global."],

  "Vaticano": ["va", "Santa Sé, ONU e Tratados de Latrão",
    "O Vaticano é o menor Estado soberano do mundo, criado pelos Tratados de Latrão de 1929. A Santa Sé é sujeito de direito internacional e mantém relações diplomáticas com cerca de 180 Estados.",
    "Exerce soft power global por meio da liderança do papa, da diplomacia e da atuação em temas como paz, migração, meio ambiente e diálogo inter-religioso.",
    "Tem status de observador permanente na ONU e mediou negociações em conflitos, como a reaproximação entre Cuba e Estados Unidos."],

  /* ---------- ÁFRICA ---------- */

  "África do Sul": ["za", "União Africana, BRICS, SADC e Banco Mundial",
    "A África do Sul possui uma das economias mais industrializadas do continente e integra o BRICS e o G20, que sediou em 2025 em Joanesburgo, o primeiro em solo africano. Seu papel regional se apoia na SADC e na União Africana.",
    "O legado do apartheid moldou sua política externa de defesa dos direitos humanos e do multilateralismo. Em 2023, apresentou à Corte Internacional de Justiça um caso contra Israel, sobre a aplicação da Convenção do Genocídio em Gaza.",
    "É grande produtor de platina, manganês, cromo e ouro, e sua localização no extremo sul da África a conecta às rotas marítimas do Cabo da Boa Esperança, que ganharam relevância com os desvios da rota do Mar Vermelho."],

  "Egito": ["eg", "União Africana, Liga Árabe e Autoridade do Canal de Suez",
    "O Egito controla o Canal de Suez, artéria por onde passa parcela significativa do comércio mundial entre Ásia e Europa. As tensões no Mar Vermelho afetaram as receitas do canal.",
    "É o país árabe mais populoso, assinou a paz com Israel em 1979 e atua como mediador em Gaza. Compartilha uma fronteira com o território de Gaza, no ponto de Rafah.",
    "A disputa com a Etiópia pela Grande Represa do Renascimento, no Nilo, ameaça o abastecimento de água de que o Egito depende em quase totalidade."],

  "Nigéria": ["ng", "CEDEAO, União Africana e OPEP",
    "A Nigéria é o país mais populoso da África e uma das maiores economias do continente, com peso na produção de petróleo e gás. Integra a OPEP e lidera a CEDEAO.",
    "Enfrenta insurgências, como o Boko Haram e o ISWAP, no Nordeste, violência de grupos armados e desafios de segurança no Golfo da Guiné.",
    "Sua indústria cultural, o Nollywood, a diáspora e a influência diplomática ampliam seu poder brando no continente."],

  "Quênia": ["ke", "União Africana, Comunidade da África Oriental e ONU",
    "O Quênia é polo econômico e logístico da África Oriental, com o porto de Mombasa como principal saída para o Oceano Índico da região dos Grandes Lagos. Sua capital, Nairóbi, abriga órgãos da ONU.",
    "Envolveu-se no combate ao Al-Shabaab na Somália e é aliado próximo dos Estados Unidos, tendo sido designado aliado importante fora da OTAN em 2024. Também liderou a missão multinacional de apoio à segurança do Haiti.",
    "Investimentos chineses em ferrovia e infraestrutura e o endividamento associado são um tema central de sua política econômica."],

  "Marrocos": ["ma", "União Africana, Liga Árabe e União Europeia",
    "Marrocos controla a margem sul do Estreito de Gibraltar e o porto de Tanger Med, e é próximo da União Europeia por comércio e cooperação migratória. Possui as maiores reservas de fosfato do mundo.",
    "A questão do Saara Ocidental, território que Rabat administra em sua maior parte e que a ONU considera não autônomo, opõe o país à Frente Polisário e à Argélia. Os Estados Unidos reconheceram a soberania marroquina em 2020, e Rabat propõe um plano de autonomia.",
    "Normalizou relações com Israel em 2020, retornou à União Africana em 2017 e reivindica Ceuta e Melilla, enclaves espanhóis."],

  "Angola": ["ao", "União Africana, SADC, CPLP e OPEP+",
    "Angola é um dos maiores produtores de petróleo da África e saiu da OPEP em 2024. A economia depende das exportações de hidrocarbonetos e dos empréstimos ligados à China.",
    "Tem papel relevante na mediação de conflitos na região dos Grandes Lagos e é membro da SADC, da União Africana e da CPLP.",
    "O Corredor de Lobito, ferrovia que liga o porto angolano às regiões mineiras da RDC e da Zâmbia, tornou-se foco da competição entre projetos ocidentais e chineses por minerais críticos."],

  /* ---------- ÁSIA ---------- */

  "Afeganistão": ["af", "ONU e OCS",
    "O Afeganistão é governado pelo Talibã desde 2021, após a retirada das forças dos Estados Unidos e da OTAN. O governo não é formalmente reconhecido pela maioria dos Estados, embora mantenha canais diplomáticos com vários deles.",
    "O país já foi disputado por impérios e por potências da Guerra Fria. Faz fronteira com Paquistão, Irã, China e Ásia Central, e a Linha Durand, com o Paquistão, é uma fronteira contestada.",
    "Uma grave crise humanitária, o potencial mineral e a rota de gasodutos e corredores regionais moldam a política em torno do país."],

  "Arábia Saudita": ["sa", "OPEP+, Conselho de Cooperação do Golfo e Liga Árabe",
    "A Arábia Saudita é a maior exportadora de petróleo do mundo e lidera a OPEP+. Abriga Meca e Medina, o que lhe confere autoridade religiosa no mundo islâmico.",
    "O plano Visão 2030 busca diversificar a economia para além dos hidrocarbonetos. O país disputa influência regional com o Irã e equilibra a relação de segurança com os Estados Unidos e a aproximação com China e Rússia.",
    "A normalização com Israel, discutida nos últimos anos, é condicionada por debates sobre a questão palestina."],

  "Bahrein": ["bh", "Conselho de Cooperação do Golfo e ONU",
    "O Bahrein é uma pequena monarquia insular no Golfo Pérsico que abriga a Quinta Frota da Marinha dos Estados Unidos, peça central da segurança marítima da região.",
    "Governado por uma dinastia sunita sobre uma população de maioria xiita, tem tensões políticas internas e alinhamento estreito com a Arábia Saudita, a que se liga por uma ponte.",
    "Aderiu aos Acordos de Abraão em 2020, normalizando as relações com Israel."],

  "Bangladesh": ["bd", "ONU, BIMSTEC e SAARC",
    "Bangladesh é um dos países mais densamente povoados do mundo, no delta do Ganges-Brahmaputra. Sua economia se apoia na indústria têxtil e nas remessas.",
    "É extremamente vulnerável às mudanças climáticas, com inundações e elevação do nível do mar, e acolhe cerca de um milhão de refugiados rohingya vindos de Mianmar.",
    "As relações com a Índia, que o circunda em grande parte, e com a China são centrais. A transição política de 2024, com a saída da primeira-ministra Sheikh Hasina, abriu um período de reconfiguração."],

  "Brunei": ["bn", "ASEAN, Commonwealth e ONU",
    "Brunei é um sultanato rico em petróleo e gás na ilha de Bornéu, com uma das maiores rendas per capita da Ásia. Seu governo tem um sistema monárquico absoluto.",
    "Integra a ASEAN e possui reivindicações marítimas no Mar do Sul da China que se sobrepõem às da China, mas evita confrontos diretos.",
    "Sua diplomacia é de baixo perfil e busca equilíbrio entre Pequim, Washington e vizinhos."],

  "Butão": ["bt", "ONU, SAARC e Índia",
    "O Butão é um reino no Himalaia, entre Índia e China, e mantém estreita relação com a Índia, que apoia sua defesa e seu comércio. Não tem relações diplomáticas formais com a China.",
    "As negociações de fronteira com Pequim e o episódio de Doklam, em 2017, mostram como o país está no centro da rivalidade sino-indiana.",
    "A economia depende da exportação de energia hidrelétrica para a Índia, e o país adotou o conceito de Felicidade Interna Bruta."],

  "Camboja": ["kh", "ASEAN, ONU e Comissão do Rio Mekong",
    "O Camboja é um dos aliados mais próximos da China no Sudeste Asiático, com investimentos em infraestrutura e a modernização da base naval de Ream, no Golfo da Tailândia.",
    "O projeto do canal Funan Techo, que liga o Mekong ao mar, provoca tensões com o Vietnã, dependente da água do rio.",
    "Membro da ASEAN, enfrenta o legado do regime do Khmer Vermelho e tensões fronteiriças com a Tailândia."],

  "Catar": ["qa", "Conselho de Cooperação do Golfo, ONU e OPEP",
    "O Catar é um dos maiores exportadores de gás natural liquefeito do mundo, e sua renda per capita está entre as mais altas do planeta. Abriga a base aérea de Al Udeid, a maior dos Estados Unidos na região.",
    "Sofreu um bloqueio de vizinhos árabes entre 2017 e 2021, e desde então reforçou sua autonomia. Atua como mediador em crises, inclusive com o Talibã e o Hamas.",
    "Sediou a Copa do Mundo de 2022 e projeta influência por meio da rede Al Jazeera e de fundos soberanos."],

  "Cazaquistão": ["kz", "OCS, União Econômica Eurasiática e OTSC",
    "O Cazaquistão é o maior país sem litoral do mundo e o maior produtor mundial de urânio, além de exportar petróleo e gás pelo Mar Cáspio.",
    "Equilibra Rússia e China e diversifica parcerias com Turquia, União Europeia e Estados Unidos. Integra a OCS, a União Econômica Eurasiática e a OTSC.",
    "O cosmódromo de Baikonur, alugado à Rússia, e o corredor transcaspiano ganharam importância com a reorganização das rotas comerciais."],

  "China": ["cn", "ONU, BRICS, OCS e Banco Mundial",
    "A China é a segunda maior economia do mundo e o principal parceiro comercial de dezenas de países. Sua participação nas cadeias globais de produção e o domínio de insumos, como terras raras, dão-lhe peso decisivo.",
    "Avança a Iniciativa Cinturão e Rota, expande sua marinha e reivindica Taiwan e a maior parte do Mar do Sul da China, contestada pelas Filipinas, Vietnã e outros. A arbitragem de 2016 rejeitou suas reivindicações históricas, e Pequim não a aceita.",
    "Como membro permanente do Conselho de Segurança e integrante de BRICS e OCS, busca reformar a ordem internacional, em rivalidade tecnológica e estratégica com os Estados Unidos."],

  "Coreia do Norte": ["kp", "ONU e Conselho de Segurança",
    "A Coreia do Norte possui armas nucleares e mísseis balísticos e é alvo de sanções do Conselho de Segurança da ONU. A península vive sob o armistício de 1953, sem tratado de paz.",
    "Sua principal sustentação é a China, e em 2024 assinou um tratado de defesa mútua com a Rússia, com envio de tropas norte-coreanas ao conflito com a Ucrânia.",
    "A zona desmilitarizada de 38º paralelo é uma das fronteiras mais militarizadas do mundo."],

  "Coreia do Sul": ["kr", "ONU, OCDE, APEC e aliança com os EUA",
    "A Coreia do Sul é aliada de segurança dos Estados Unidos, que mantêm tropas no país, e enfrenta a ameaça do vizinho do Norte ao longo da zona desmilitarizada.",
    "É uma potência tecnológica e industrial, com empresas líderes em semicondutores, automóveis e eletrônicos, como Samsung e Hyundai.",
    "Equilibra a dependência de segurança dos EUA com a dependência comercial da China, e mantém relações complexas com o Japão por questões históricas e territoriais, como a das ilhas Dokdo."],

  "Emirados Árabes Unidos": ["ae", "Conselho de Cooperação do Golfo, OPEP e ONU",
    "Os Emirados Árabes Unidos são uma federação de sete emirados, com Abu Dhabi como polo petrolífero e Dubai como centro de comércio, finanças e logística global.",
    "Estabeleceram relações com Israel em 2020, pelos Acordos de Abraão, e ampliaram sua atuação militar e comercial no Chifre da África e no Mar Vermelho. Aderiram ao BRICS em 2024.",
    "Fundos soberanos investem em ativos no mundo todo, e os portos de Jebel Ali e a companhia DP World são peças da logística global."],

  "Filipinas": ["ph", "ASEAN, ONU e tratado de defesa mútua com os EUA",
    "As Filipinas são um arquipélago no encontro entre o Mar do Sul da China e o Pacífico. Em 2016, um tribunal arbitral em Haia deu ganho de causa ao país contra as reivindicações chinesas, decisão que Pequim rejeita.",
    "Incidentes com a guarda costeira chinesa em áreas como o Second Thomas Shoal aproximaram Manila dos Estados Unidos, com quem mantém tratado de defesa mútua e acordos que ampliam o acesso a bases.",
    "A proximidade com o Estreito de Luzon, ao sul de Taiwan, torna o arquipélago peça-chave em qualquer cenário de crise no Estreito."],

  "Iêmen": ["ye", "ONU e Conselho de Segurança",
    "O Iêmen vive uma guerra civil desde 2014, com os houthis, apoiados pelo Irã, controlando a capital e boa parte do norte, e um governo internacionalmente reconhecido apoiado por uma coalizão liderada pela Arábia Saudita.",
    "O país está na margem do Estreito de Bab el-Mandeb. Os ataques houthis a navios no Mar Vermelho, desde 2023, alteraram rotas do comércio entre Ásia e Europa.",
    "É um dos maiores cenários de crise humanitária do mundo, com efeitos da guerra sobre alimentos, saúde e deslocados."],

  "Índia": ["in", "ONU, BRICS, Quad e G20",
    "A Índia é o país mais populoso do mundo e uma das economias que mais crescem. Adota uma política de autonomia estratégica e múltiplos alinhamentos, participando do Quad, do BRICS e da OCS.",
    "Mantém disputas de fronteira com o Paquistão na Caxemira e com a China no Himalaia, com confrontos como o de Galwan, em 2020. Ambos os vizinhos são potências nucleares.",
    "Sua posição no centro do Oceano Índico e o crescimento da indústria e da tecnologia a tornam ator central no Indo-Pacífico."],

  "Indonésia": ["id", "ASEAN, G20, BRICS e ONU",
    "A Indonésia é o maior arquipélago do mundo e a maior economia do Sudeste Asiático, com importante papel na ASEAN e no G20. Aderiu ao BRICS em 2025.",
    "Controla passagens marítimas estratégicas, como os estreitos de Malaca, Sunda e Lombok. É o maior produtor de níquel do mundo, recurso essencial para baterias, e restringe a exportação do minério bruto para atrair indústria.",
    "Está construindo a nova capital, Nusantara, em Bornéu, e mantém política externa de não alinhamento, com reivindicações sobrepostas às da China perto das ilhas Natuna."],

  "Irã": ["ir", "ONU, OCS, BRICS e AIEA",
    "O Irã é um dos maiores produtores de petróleo e gás, e controla a margem norte do Estreito de Ormuz, por onde passa boa parte do petróleo transportado por mar. Seu programa nuclear é motivo de tensão com Ocidente e Israel.",
    "O acordo nuclear de 2015 (JCPOA) foi abandonado pelos Estados Unidos em 2018, e o país sofre sanções. Em 2025, houve confrontos diretos com Israel e Estados Unidos.",
    "Mantém uma rede de aliados e milícias na região, conhecida como Eixo da Resistência, e aprofundou laços com Rússia e China."],

  "Iraque": ["iq", "ONU, Liga Árabe e OPEP",
    "O Iraque é um dos maiores produtores de petróleo do mundo e vive as consequências da invasão de 2003 liderada pelos Estados Unidos e da ascensão e queda do Estado Islâmico.",
    "Tem um sistema político dividido entre grupos xiitas, sunitas e curdos, e a região do Curdistão possui ampla autonomia. Sofre com a influência simultânea de Irã e Estados Unidos.",
    "Depende dos rios Tigre e Eufrates, cuja vazão é reduzida por barragens turcas, o que agrava a escassez de água."],

  "Israel": ["il", "ONU, Acordos de Abraão e Departamento de Estado dos EUA",
    "Israel foi criado em 1948 e mantém aliança estreita com os Estados Unidos. Possui um arsenal nuclear não declarado oficialmente e uma indústria de tecnologia e defesa avançada.",
    "O conflito israelo-palestino, a ocupação da Cisjordânia, o status de Jerusalém e a guerra em Gaza, iniciada após os ataques de 7 de outubro de 2023, são temas centrais e altamente controversos, com decisões e pareceres de cortes internacionais.",
    "Normalizou relações com Emirados, Bahrein, Marrocos e Sudão em 2020, e tem tratados de paz com Egito e Jordânia; suas relações com a Arábia Saudita seguem em discussão."],

  "Japão": ["jp", "ONU, G7, Quad e aliança com os EUA",
    "O Japão é uma potência econômica e tecnológica e aliado dos Estados Unidos, que mantêm bases no país. Sua Constituição pacifista, artigo 9, tem sido reinterpretada para permitir maior capacidade de defesa.",
    "Enfrenta disputas territoriais com a China (ilhas Senkaku/Diaoyu), a Rússia (Curilas do Sul) e a Coreia do Sul (Takeshima/Dokdo).",
    "Integra o Quad e o G7 e tem papel decisivo em materiais e equipamentos de semicondutores, essenciais às cadeias globais."],

  "Jordânia": ["jo", "Liga Árabe, ONU e tratado de paz com Israel",
    "A Jordânia é uma monarquia hachemita, aliada dos Estados Unidos, e assinou a paz com Israel em 1994. É guardiã dos lugares sagrados islâmicos de Jerusalém.",
    "Recebeu grandes contingentes de refugiados palestinos, iraquianos e sírios, e enfrenta escassez de água e limitações econômicas.",
    "Sua posição entre Israel, Síria, Iraque e Arábia Saudita a torna um ponto de equilíbrio e de risco para a estabilidade regional."],

  "Kuwait": ["kw", "Conselho de Cooperação do Golfo, OPEP e ONU",
    "O Kuwait foi invadido pelo Iraque em 1990, o que desencadeou a Guerra do Golfo e uma coalizão liderada pelos Estados Unidos. Desde então, abriga bases americanas.",
    "É um grande exportador de petróleo e possui um dos fundos soberanos mais antigos, além de uma monarquia com parlamento eleito.",
    "O porto de Mubarak Al-Kabeer, na ilha de Bubiyan, e as fronteiras marítimas com o Iraque seguem como temas sensíveis."],

  "Laos": ["la", "ASEAN, Comissão do Rio Mekong e ONU",
    "O Laos é o único país da ASEAN sem litoral. Investiu em hidrelétricas no Mekong e na ferrovia China-Laos, inaugurada em 2021.",
    "O endividamento com a China é elevado e há preocupação com a perda de controle sobre ativos estratégicos, como a rede elétrica.",
    "As barragens do Mekong afetam a pesca e a agricultura de vizinhos como Camboja e Vietnã."],

  "Líbano": ["lb", "ONU, Liga Árabe e UNIFIL",
    "O Líbano tem um sistema político confessional, no qual os cargos são divididos entre comunidades religiosas. O Hezbollah, grupo xiita armado e partido político, tem grande influência.",
    "A crise econômica iniciada em 2019 e a explosão no porto de Beirute em 2020 agravaram a instabilidade. O país acolhe grandes contingentes de refugiados sírios.",
    "A fronteira com Israel é vigiada pela missão da ONU, UNIFIL, e os conflitos com Israel afetaram fortemente o sul do país."],

  "Malásia": ["my", "ASEAN, Commonwealth e OMC",
    "A Malásia controla a margem leste do Estreito de Malaca, uma das rotas comerciais mais movimentadas do mundo, e é um polo de produção e montagem de semicondutores.",
    "Exporta óleo de palma, petróleo e gás e mantém política externa de não alinhamento, com relações amplas com China, Estados Unidos e países muçulmanos. É parceira do BRICS desde 2025.",
    "Tem reivindicações no Mar do Sul da China e uma disputa histórica com as Filipinas sobre Sabah."],

  "Maldivas": ["mv", "ONU, SAARC e Commonwealth",
    "As Maldivas são um arquipélago de atóis no Oceano Índico e uma das nações mais baixas do mundo, o que as torna extremamente vulneráveis à elevação do nível do mar.",
    "Sua posição em rotas marítimas do Índico atrai a competição entre Índia e China por influência, com investimentos em infraestrutura e cooperação de segurança.",
    "A economia depende quase totalmente do turismo e da pesca."],

  "Mianmar": ["mm", "ASEAN, ONU e Corte Internacional de Justiça",
    "Mianmar vive uma crise política e uma guerra civil desde o golpe militar de 2021, com resistência armada em várias regiões e forte repressão.",
    "A perseguição aos rohingya levou centenas de milhares a se refugiar em Bangladesh e resultou em um caso na Corte Internacional de Justiça.",
    "China e Rússia são seus principais apoios, e o porto de Kyaukphyu, no Índico, faz parte dos interesses chineses de acesso ao oceano; a ASEAN restringe sua participação em nível político."],

  "Mongólia": ["mn", "ONU, OSCE e política do terceiro vizinho",
    "A Mongólia é um país sem litoral entre a Rússia e a China, de quem depende para trânsito e comércio. Adota a política do terceiro vizinho para diversificar parcerias com Japão, Estados Unidos, Coreia e União Europeia.",
    "A economia se baseia em carvão, cobre e ouro, com a mina de Oyu Tolgoi como um dos maiores projetos, e a maior parte das exportações vai para a China.",
    "É um país neutro em conflitos, e mantém tradição de diplomacia discreta."],

  "Nepal": ["np", "ONU, SAARC e BIMSTEC",
    "O Nepal está no Himalaia, entre Índia e China, e abriga o Monte Everest. Equilibra sua relação com os dois gigantes, dos quais depende para comércio e trânsito.",
    "Mantém disputas de fronteira com a Índia, como em Kalapani e Lipulekh, e recebe investimentos chineses em infraestrutura.",
    "As remessas dos nepaleses no exterior e o turismo de montanha são pilares da economia, e os gurkhas servem em exércitos estrangeiros."],

  "Omã": ["om", "Conselho de Cooperação do Golfo e ONU",
    "Omã tem uma diplomacia de neutralidade e mediação, e já facilitou contatos entre Estados Unidos e Irã. Controla a margem sul do Estreito de Ormuz, pela península de Musandam.",
    "Seu porto de Duqm, no Mar da Arábia, tem valor logístico e militar, fora do gargalo de Ormuz.",
    "É um sultanato com mais equilíbrio entre os vizinhos do Golfo e busca diversificar a economia além do petróleo."],

  "Palestina": ["ps", "ONU, Liga Árabe e Corte Internacional de Justiça",
    "A Palestina é reconhecida como Estado por mais de 140 países e tem status de Estado observador não membro na ONU desde 2012. Seus territórios incluem a Cisjordânia, Jerusalém Oriental e a Faixa de Gaza.",
    "A Autoridade Nacional Palestina administra parcialmente a Cisjordânia, enquanto Gaza foi governada pelo Hamas desde 2007. A ocupação israelense, os assentamentos e o estatuto de Jerusalém são pontos centrais do conflito.",
    "O reconhecimento internacional se ampliou nos últimos anos, e a Corte Internacional de Justiça emitiu pareceres sobre a legalidade da ocupação. As negociações por uma solução de dois Estados seguem sem resolução."],

  "Paquistão": ["pk", "ONU, OCS, OCI e Corredor China-Paquistão",
    "O Paquistão é uma potência nuclear e rival da Índia, com a disputa por Caxemira como principal fonte de conflito, incluindo confrontos em 2025. Aliado histórico da China, é peça central do Corredor Econômico China-Paquistão, que liga Xinjiang ao porto de Gwadar.",
    "A fronteira com o Afeganistão e a presença de grupos armados nas áreas tribais afetam sua segurança. Mantém relações complexas com os Estados Unidos.",
    "A partilha das águas do Indo, regulada por tratado com a Índia, tornou-se tema sensível."],

  "Quirguistão": ["kg", "OTSC, União Econômica Eurasiática e OCS",
    "O Quirguistão é um país montanhoso da Ásia Central, membro da OTSC e da União Econômica Eurasiática, e mantém forte vínculo com a Rússia, onde trabalham milhões de emigrantes.",
    "Já abrigou uma base aérea americana em Manas, fechada em 2014, e sedia uma base russa. Compartilha fronteira com a China e o Uzbequistão.",
    "A água dos rios da região e as fronteiras vizinhas no Vale de Fergana causam disputas com o Tajiquistão."],

  "Singapura": ["sg", "ASEAN, Commonwealth e OMC",
    "Singapura é uma cidade-Estado no Estreito de Malaca, um dos principais portos e centros financeiros do mundo, com política externa pragmática de equilíbrio entre potências.",
    "Membro fundador da ASEAN, mantém acordos de defesa com Malásia, Austrália, Reino Unido e Nova Zelândia (Five Power Defence) e forte cooperação militar com os Estados Unidos.",
    "Sua economia depende do comércio internacional, e a estabilidade das rotas marítimas é interesse vital."],

  "Síria": ["sy", "ONU, Liga Árabe e OPAQ",
    "A Síria viveu uma guerra civil desde 2011, com atores locais e estrangeiros, como Rússia, Irã, Turquia, Estados Unidos e Israel. Em dezembro de 2024, o governo de Bashar al-Assad foi deposto, abrindo um período de transição política.",
    "O território permanece fragmentado, com presença de forças curdas no nordeste, influência turca no norte e ações militares israelenses, e o país enfrenta reconstrução e sanções.",
    "A Síria está no centro das rotas de energia e das redes de influência do Oriente Médio, e milhões de sírios seguem deslocados ou refugiados."],

  "Sri Lanka": ["lk", "ONU, SAARC e Commonwealth",
    "O Sri Lanka está no centro das rotas marítimas do Oceano Índico. O porto de Hambantota foi arrendado a uma empresa chinesa por 99 anos, em 2017, e virou símbolo do debate sobre armadilha da dívida.",
    "O país declarou moratória da dívida externa em 2022, em meio a uma grave crise econômica e política, e passou por reestruturação com apoio do FMI.",
    "Equilibra a relação com a Índia, vizinha próxima, e a China, sua grande credora."],

  "Tailândia": ["th", "ASEAN, APEC e tratado com os EUA",
    "A Tailândia é aliada de tratado dos Estados Unidos e mantém relações econômicas profundas com a China, seguindo uma diplomacia flexível, conhecida como bambu que se curva ao vento.",
    "É um centro industrial e turístico do Sudeste Asiático. A geografia da península alimenta a ideia do canal de Kra, ainda hipotético, que encurtaria a rota entre o Índico e o Pacífico.",
    "Tem uma história de instabilidade política, e tensões de fronteira com o Camboja ocorreram em 2025."],

  "Taiwan": ["tw", "Lei de Relações com Taiwan (EUA) e Organização Mundial do Comércio",
    "Taiwan é governada de forma autônoma, com sistema democrático próprio, e é reivindicada pela República Popular da China. Cerca de uma dúzia de Estados mantêm relações diplomáticas formais com Taipé, e a ONU não a reconhece como membro desde 1971.",
    "Os Estados Unidos mantêm uma política de ambiguidade estratégica, apoiada na Lei de Relações com Taiwan, e fornecem armamentos à ilha. O Estreito de Taiwan é uma das passagens marítimas mais importantes do mundo.",
    "A empresa TSMC produz a maior parte dos semicondutores mais avançados do mundo, o que faz da ilha um ponto crítico para a economia global."],

  "Tajiquistão": ["tj", "OTSC, OCS e Comunidade de Estados Independentes",
    "O Tajiquistão é um país montanhoso da Ásia Central, com longa fronteira com o Afeganistão e forte dependência da Rússia, que mantém no país sua maior base militar no exterior.",
    "A barragem de Rogun, que será uma das maiores do mundo, é motivo de disputas com o Uzbequistão pelo uso da água.",
    "As remessas dos trabalhadores no exterior, sobretudo na Rússia, são uma parcela enorme do PIB."],

  "Timor-Leste": ["tl", "ONU, CPLP e ASEAN",
    "O Timor-Leste tornou-se independente em 2002, após a ocupação indonésia e a administração transitória da ONU, e é um dos países mais jovens do mundo. Faz parte da CPLP e avançou na adesão à ASEAN.",
    "Sua economia depende de receitas de petróleo e gás do Mar de Timor, cujas fronteiras marítimas com a Austrália foram definidas por tratado em 2018, após conciliação sob a Convenção da ONU sobre o Direito do Mar.",
    "Localiza-se entre a Ásia e a Oceania e recebe interesse de China, Austrália e outras potências."],

  "Turcomenistão": ["tm", "ONU e Comunidade de Estados Independentes",
    "O Turcomenistão tem neutralidade permanente reconhecida pela ONU desde 1995 e possui grandes reservas de gás natural, cuja exportação depende sobretudo da China.",
    "É um dos países mais fechados do mundo, com pouca participação em blocos, e sua posição no Mar Cáspio o liga a rotas de gás para a Europa e a Ásia.",
    "A relação com o Afeganistão, vizinho ao sul, e projetos de gasodutos regionais compõem sua agenda externa."],

  "Turquia": ["tr", "OTAN, ONU e Convenção de Montreux",
    "A Turquia controla o Bósforo e os Dardanelos, os estreitos que ligam o Mar Negro ao Mediterrâneo, regulados pela Convenção de Montreux (1936). Faz parte da OTAN e possui um dos maiores exércitos da Aliança.",
    "Candidata à União Europeia, mantém relações tensas com Grécia e Chipre, comprou sistemas de defesa russos S-400 e atua como mediadora em crises, como a da Ucrânia.",
    "Sua posição entre Europa, Ásia e Oriente Médio, a questão curda e o papel de corredor de gás e de migração fazem do país ator central na região."],

  "Uzbequistão": ["uz", "Organização de Cooperação de Xangai e ONU",
    "O Uzbequistão é o país mais populoso da Ásia Central e um dos dois países do mundo duplamente sem litoral. Após 2016, abandonou o isolamento e melhorou a relação com os vizinhos.",
    "Exporta algodão, gás e ouro, e busca ampliar seus laços com Rússia, China, Turquia e Ocidente, sem aderir a alianças militares.",
    "Seu papel de ponte entre Ásia Central e Sul da Ásia inclui projetos de corredores ferroviários pelo Afeganistão."],

  "Vietnã": ["vn", "ASEAN, CPTPP e ONU",
    "O Vietnã, em processo de abertura econômica desde as reformas Doi Moi, tornou-se um dos principais polos de manufatura alternativos à China. Seu partido único mantém controle político.",
    "Reivindica ilhas no Mar do Sul da China, como as Paracel e as Spratly, em contraste com Pequim, e pratica a chamada diplomacia do bambu, com parcerias estratégicas com China, Rússia e Estados Unidos.",
    "O rio Mekong, cujas águas dependem de barragens a montante, é tema de segurança hídrica."],

  /* ---------- OCEANIA ---------- */

  "Austrália": ["au", "AUKUS, Quad, Five Eyes e ANZUS",
    "A Austrália é o maior país da Oceania em território e população. Sua economia tem forte relação comercial com países da Ásia-Pacífico, e a China é seu maior parceiro de comércio.",
    "Integra o AUKUS, o Quad, o Five Eyes e mantém aliança com os EUA (ANZUS). O acordo de submarinos de propulsão nuclear reforça sua postura no Indo-Pacífico.",
    "É grande exportadora de minério de ferro, carvão, gás e lítio, e reivindica cerca de 42% da Antártida, o maior setor reivindicado. Disputa influência com a China nas ilhas do Pacífico."],

  "Estados Federados da Micronésia": ["fm", "Acordo de Livre Associação e ONU",
    "Os Estados Federados da Micronésia mantêm um Acordo de Livre Associação com os Estados Unidos, que garante defesa e ajuda econômica em troca de acesso militar exclusivo.",
    "Sua zona econômica exclusiva, extensa, é rica em atum, e a posição no Pacífico Ocidental tem valor estratégico.",
    "A elevação do nível do mar e os eventos climáticos extremos ameaçam as ilhas baixas, e o país atua em foros climáticos."],

  "Fiji": ["fj", "Fórum das Ilhas do Pacífico, Commonwealth e ONU",
    "Fiji é o principal centro logístico e diplomático do Pacífico Sul e sedia o secretariado do Fórum das Ilhas do Pacífico, em Suva. Já teve golpes de Estado e voltou a ter transição democrática.",
    "Fornece contingentes a missões de paz da ONU e é destino de investimento e ajuda da Austrália, Nova Zelândia, China e Estados Unidos.",
    "O turismo e a agricultura sustentam a economia, e as mudanças climáticas já forçam a realocação de comunidades costeiras."],

  "Ilhas Marshall": ["mh", "Acordo de Livre Associação e ONU",
    "As Ilhas Marshall têm Acordo de Livre Associação com os Estados Unidos, que mantêm no atol de Kwajalein uma base de testes de mísseis e de rastreamento espacial.",
    "O legado dos testes nucleares em Bikini e Enewetak, entre 1946 e 1958, permanece como questão de saúde, meio ambiente e compensação.",
    "Reconhece diplomaticamente Taiwan e destaca-se pelo registro de navios de bandeira de conveniência, além de ser uma das nações mais ameaçadas pela elevação do nível do mar."],

  "Ilhas Salomão": ["sb", "Fórum das Ilhas do Pacífico e ONU",
    "As Ilhas Salomão trocaram o reconhecimento de Taiwan pelo da China em 2019 e assinaram, em 2022, um acordo de segurança com Pequim, que gerou preocupação em Austrália, Estados Unidos e Nova Zelândia.",
    "Palco de batalhas na Segunda Guerra Mundial, como Guadalcanal, o país depende de ajuda externa, incluindo missão regional liderada pela Austrália para estabilizar o país após a crise de 2003.",
    "Sua posição na Melanésia importa para as rotas entre Austrália e o Pacífico Norte."],

  "Kiribati": ["ki", "Fórum das Ilhas do Pacífico e ONU",
    "Kiribati é um país de atóis no Pacífico Central, com uma das maiores zonas econômicas exclusivas do mundo, ricas em atum. Mudou o reconhecimento de Taiwan para a China em 2019.",
    "A proximidade de Kiritimati e de outras ilhas com rotas do Pacífico e a possibilidade de pistas de pouso e portos despertam interesse estratégico de China, Estados Unidos e Austrália.",
    "A elevação do nível do mar coloca em risco a própria existência do território, e o país já comprou terras em Fiji para eventual realocação."],

  "Nauru": ["nr", "Fórum das Ilhas do Pacífico e ONU",
    "Nauru é a menor república do mundo e teve a economia baseada na extração de fosfato, hoje esgotado. Passou a depender de pesca, ajuda externa e de acordos com a Austrália.",
    "Recebeu, por acordo com a Austrália, centros de detenção offshore para requerentes de asilo, tema de críticas de organismos de direitos humanos.",
    "Em janeiro de 2024, mudou o reconhecimento de Taiwan para a China, mais um sinal da disputa diplomática no Pacífico."],

  "Nova Zelândia": ["nz", "Five Eyes, Fórum das Ilhas do Pacífico e ONU",
    "A Nova Zelândia tem uma política externa independente, com forte defesa do multilateralismo e do controle de armas. Adotou uma política de zona livre de armas nucleares nos anos 1980, que levou à suspensão da aliança ANZUS com os EUA.",
    "Participa do Five Eyes e reforçou a cooperação de defesa com Austrália e Estados Unidos. Seus laços com o Pacífico, incluindo Ilhas Cook, Niue e Tokelau, definem sua diplomacia regional.",
    "Reivindica a Dependência de Ross, na Antártida, e mantém uma relação comercial expressiva com a China."],

  "Palau": ["pw", "Acordo de Livre Associação e ONU",
    "Palau mantém Acordo de Livre Associação com os Estados Unidos e é um dos poucos países que reconhecem Taiwan. Sua posição no Pacífico Ocidental, próxima às Filipinas e a Guam, tem valor estratégico.",
    "O país foi pioneiro em criar um grande santuário marinho, e o turismo é sua principal fonte de renda.",
    "A pressão de Pequim sobre seus aliados de Taiwan e o interesse dos Estados Unidos em instalar radares e bases refletem a competição regional."],

  "Papua-Nova Guiné": ["pg", "Fórum das Ilhas do Pacífico, Commonwealth e ONU",
    "Papua-Nova Guiné é o maior e mais populoso dos países insulares do Pacífico, com enorme diversidade de línguas e grandes recursos de gás, ouro, cobre e florestas.",
    "A região autônoma de Bougainville votou pela independência em 2019, em referendo não vinculante, e o processo político segue em negociação com o governo central.",
    "A Austrália, antiga administradora, e a China competem por influência, e o país assinou um pacto de segurança com Canberra em 2023."],

  "Samoa": ["ws", "Fórum das Ilhas do Pacífico, Commonwealth e ONU",
    "Samoa foi o primeiro país da Polinésia a alcançar a independência, em 1962, e é membro ativo do Fórum das Ilhas do Pacífico.",
    "O país tem parcerias de desenvolvimento com Austrália, Nova Zelândia e China, e debates internos sobre projetos de infraestrutura, como um porto em Vaiusu.",
    "Ciclones e elevação do nível do mar determinam sua agenda climática e de resiliência."],

  "Tonga": ["to", "Fórum das Ilhas do Pacífico, Commonwealth e ONU",
    "Tonga é uma monarquia polinésia e o único país do Pacífico que nunca foi formalmente colonizado, embora tenha sido protetorado britânico.",
    "Tem uma dívida significativa com o Exim Bank da China, um dos exemplos citados no debate sobre influência de Pequim no Pacífico.",
    "A erupção do vulcão Hunga Tonga-Hunga Ha'apai, em 2022, destruiu comunidades e cabos submarinos, evidenciando a vulnerabilidade das ilhas à conectividade e a desastres."],

  "Tuvalu": ["tv", "Fórum das Ilhas do Pacífico e ONU",
    "Tuvalu é um dos menores e mais baixos países do mundo, e reconhece diplomaticamente Taiwan. A elevação do nível do mar ameaça sua sobrevivência territorial.",
    "Em 2023, assinou com a Austrália o Tratado da União Falepili, que combina cooperação de segurança e acesso a mobilidade para seus cidadãos diante da crise climática.",
    "Parte da receita vem da venda do domínio de internet .tv e da pesca de atum."],

  "Vanuatu": ["vu", "Fórum das Ilhas do Pacífico, Commonwealth e ONU",
    "Vanuatu é um arquipélago da Melanésia, independente desde 1980, e é uma das vozes mais ativas do Pacífico em temas de clima e direito internacional.",
    "Liderou a campanha que levou a Assembleia Geral da ONU a pedir à Corte Internacional de Justiça um parecer sobre as obrigações dos Estados diante das mudanças climáticas, emitido em 2025.",
    "Recebe investimentos e cooperação de Austrália, China e Nova Zelândia, e negocia acordos de segurança e mobilidade, em meio à competição regional."]

};

/* ---------- Geração automática de COUNTRY_ISO e COUNTRY_CONTENT ---------- */

const COUNTRY_ISO = {};
const COUNTRY_CONTENT = {};

function isoToFlagEmoji(iso) {
  return String.fromCodePoint(
    ...iso.toUpperCase().split("").map(letter => 0x1F1E6 + letter.charCodeAt(0) - 65)
  );
}

(function buildCountryContent() {
  const continentOf = {};

  Object.entries(CONTINENT_COUNTRIES).forEach(([continent, list]) => {
    list.forEach(name => { continentOf[name] = continent; });
  });

  Object.entries(COUNTRY_DATA).forEach(([name, entry]) => {
    const iso = entry[0];
    const sources = entry[1];
    const paragraphs = entry.slice(2);
    const region = REGION_META[continentOf[name]];

    COUNTRY_ISO[name] = iso;

    COUNTRY_CONTENT[name] = {
      icon: isoToFlagEmoji(iso),
      banner: region ? region.banner : "linear-gradient(135deg,#5e6355,#232823)",
      sources: sources,
      paragraphs: paragraphs
    };
  });
})();

/* ---------- Imagens (bandeiras e paisagens) com fallback ---------- */

function escapeSvgText(text) {
  return String(text).replace(/[&<>"']/g, ch => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]
  ));
}

function landscapeFallbackSVG(spec) {
  const p = spec.palette || ["#cfd8dc", "#78909c", "#37474f"];

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/>` +
    `</linearGradient></defs>` +
    `<rect width="1200" height="420" fill="url(#g)"/>` +
    `<circle cx="920" cy="120" r="54" fill="#ffffff" opacity=".85"/>` +
    `<path d="M0 420V300L170 190L300 290L470 130L640 300L790 220L960 310L1200 200V420Z" fill="${p[2]}" opacity=".85"/>` +
    `<path d="M0 420V350L220 280L420 350L640 270L860 350L1040 300L1200 350V420Z" fill="#000" opacity=".28"/>` +
    `</svg>`;

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function flagFallbackSVG(label) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400">` +
    `<rect width="640" height="400" fill="#37474f"/>` +
    `<rect x="24" y="24" width="592" height="352" fill="none" stroke="#b0bec5" stroke-width="4" stroke-dasharray="14 10"/>` +
    `<text x="320" y="190" text-anchor="middle" font-family="sans-serif" font-size="30" fill="#eceff1">Bandeira de</text>` +
    `<text x="320" y="240" text-anchor="middle" font-family="sans-serif" font-size="36" font-weight="700" fill="#ffffff">${escapeSvgText(label)}</text>` +
    `</svg>`;

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/*
  spec = {
    kind: "flag" | "landscape",
    urls: [principal, alternativa...],
    caption, alt, label (bandeira), palette (paisagem)
  }
*/
function createFigure(spec) {
  const figure = document.createElement("figure");
  figure.className = `cp-figure cp-figure--${spec.kind}`;

  const img = document.createElement("img");
  img.className = `cp-visual-image cp-visual-image--${spec.kind}`;
  img.alt = spec.alt || spec.caption || "";
  img.decoding = "async";
  img.referrerPolicy = "no-referrer";

  const caption = document.createElement("figcaption");
  caption.textContent = spec.caption || "";

  const urls = (spec.urls || []).slice();
  let index = 0;

  function tryNext() {
    if (index < urls.length) {
      img.src = urls[index++];
      return;
    }

    img.onerror = null;

    if (spec.kind === "flag") {
      img.src = flagFallbackSVG(spec.label || "");
      caption.textContent = `Bandeira de ${spec.label} (imagem indisponível no momento)`;
    } else {
      img.src = landscapeFallbackSVG(spec);
      caption.textContent = `Ilustração da paisagem — imagem original indisponível (${(spec.caption || "").replace(/^Paisagem emblemática:\s*/, "")})`;
    }
  }

  img.onerror = tryNext;
  tryNext();

  figure.appendChild(img);
  figure.appendChild(caption);

  return figure;
}

function flagSpec(country) {
  const iso = COUNTRY_ISO[country];

  return {
    kind: "flag",
    label: country,
    urls: iso
      ? [
          `https://flagcdn.com/w640/${iso}.png`,
          `https://flagpedia.net/data/flags/w580/${iso}.png`
        ]
      : [],
    caption: `Bandeira oficial de ${country}`,
    alt: `Bandeira oficial de ${country}`
  };
}


/* =====================================================
   CENTROS DOS CONTINENTES
===================================================== */

const CONTINENT_CENTERS = {

  "América do Norte": {
    lon: -105,
    lat: 45
  },

  "América Central": {
    lon: -87,
    lat: 14
  },

  "América do Sul": {
    lon: -60,
    lat: -15
  },

  "Europa": {
    lon: 15,
    lat: 50
  },

  "África": {
    lon: 20,
    lat: 5
  },

  "Ásia": {
    lon: 90,
    lat: 35
  },

  "Oceania": {
    lon: 135,
    lat: -25
  },

  "Antártida": {
    lon: 0,
    lat: -80
  }
};


/* =====================================================
   DETECTOR GEOGRÁFICO
===================================================== */

const GeoDetector = {

  canvas: document.createElement("canvas"),

  ctx: null,

  width: 2048,

  height: 1024,

  ready: false,

  regions: [
    "América do Norte",
    "América Central",
    "América do Sul",
    "Europa",
    "África",
    "Ásia",
    "Oceania",
    "Antártida"
  ],

  init() {

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = this.canvas.getContext(
      "2d",
      {
        willReadFrequently: true
      }
    );

    if (!this.ctx) {
      console.warn(
        "Canvas de detecção geográfica indisponível."
      );

      return;
    }

    this.clear();

    fetch(
      "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson"
    )
      .then(response => {

        if (!response.ok) {
          throw new Error(
            "Falha ao carregar GeoJSON."
          );
        }

        return response.json();

      })

      .then(data => {

        this.drawGeoJSON(data);

        this.ready = true;

      })

      .catch(error => {

        console.warn(
          "GeoJSON indisponível:",
          error
        );

        this.drawFallback();

        this.ready = true;

      });
  },


  clear() {

    this.ctx.fillStyle = "#000000";

    this.ctx.fillRect(
      0,
      0,
      this.width,
      this.height
    );
  },


  project(lon, lat) {

    return {

      x:
        ((lon + 180) / 360)
        * this.width,

      y:
        ((90 - lat) / 180)
        * this.height
    };
  },


  normalizeISO(value) {

    if (!value) return "";

    return String(value)
      .trim()
      .toUpperCase();
  },


  /*
     Países que precisam de tratamento especial
     porque o continente geográfico não é suficiente.
  */

  centralAmerica: new Set([
    "GTM",
    "BLZ",
    "HND",
    "SLV",
    "NIC",
    "CRI",
    "PAN"
  ]),


  caribbean: new Set([
    "CUB",
    "DOM",
    "HTI",
    "JAM",
    "BHS",
    "BRB",
    "ATG",
    "DMA",
    "GRD",
    "LCA",
    "VCT",
    "KNA",
    "TTO"
  ]),


  southAmerica: new Set([
    "ARG",
    "BOL",
    "BRA",
    "CHL",
    "COL",
    "ECU",
    "GUY",
    "PRY",
    "PER",
    "SUR",
    "URY",
    "VEN",
    "GUF"
  ]),


  europe: new Set([
    "ALB",
    "AND",
    "AUT",
    "BEL",
    "BGR",
    "BIH",
    "BLR",
    "CHE",
    "CYP",
    "CZE",
    "DEU",
    "DNK",
    "ESP",
    "EST",
    "FIN",
    "FRA",
    "GBR",
    "GRC",
    "HRV",
    "HUN",
    "IRL",
    "ISL",
    "ITA",
    "LIE",
    "LTU",
    "LUX",
    "LVA",
    "MCO",
    "MDA",
    "MKD",
    "MLT",
    "MNE",
    "NLD",
    "NOR",
    "POL",
    "PRT",
    "ROU",
    "SMR",
    "SRB",
    "SVK",
    "SVN",
    "SWE",
    "UKR",
    "VAT"
  ]),


  africa: new Set([
    "DZA",
    "AGO",
    "BEN",
    "BWA",
    "BFA",
    "BDI",
    "CMR",
    "CPV",
    "CAF",
    "TCD",
    "COM",
    "COG",
    "COD",
    "CIV",
    "DJI",
    "EGY",
    "GNQ",
    "ERI",
    "SWZ",
    "ETH",
    "GAB",
    "GMB",
    "GHA",
    "GIN",
    "GNB",
    "KEN",
    "LSO",
    "LBR",
    "LBY",
    "MDG",
    "MWI",
    "MLI",
    "MRT",
    "MUS",
    "MAR",
    "MOZ",
    "NAM",
    "NER",
    "NGA",
    "RWA",
    "STP",
    "SEN",
    "SYC",
    "SLE",
    "SOM",
    "ZAF",
    "SSD",
    "SDN",
    "TZA",
    "TGO",
    "TUN",
    "UGA",
    "ZMB",
    "ZWE"
  ]),


  oceania: new Set([
    "AUS",
    "NZL",
    "PNG",
    "FJI",
    "SLB",
    "VUT",
    "WSM",
    "TON",
    "TUV",
    "KIR",
    "NRU",
    "PLW",
    "FSM",
    "MHL"
  ]),


  asia: new Set([
    "AFG",
    "ARM",
    "AZE",
    "BHR",
    "BGD",
    "BTN",
    "BRN",
    "KHM",
    "CHN",
    "GEO",
    "IND",
    "IDN",
    "IRN",
    "IRQ",
    "ISR",
    "JPN",
    "JOR",
    "KAZ",
    "KWT",
    "KGZ",
    "LAO",
    "LBN",
    "MYS",
    "MDV",
    "MNG",
    "MMR",
    "NPL",
    "PRK",
    "OMN",
    "PAK",
    "PHL",
    "QAT",
    "SAU",
    "SGP",
    "KOR",
    "LKA",
    "SYR",
    "TJK",
    "THA",
    "TLS",
    "TKM",
    "TUR",
    "ARE",
    "UZB",
    "VNM",
    "YEM"
  ]),


  getRegionFromISO(iso) {

    iso = this.normalizeISO(iso);

    if (!iso) return null;

    if (iso === "ATA") {
      return "Antártida";
    }

    if (this.centralAmerica.has(iso)) {
      return "América Central";
    }

    if (this.caribbean.has(iso)) {
      return "América Central";
    }

    if (this.southAmerica.has(iso)) {
      return "América do Sul";
    }

    if (this.europe.has(iso)) {
      return "Europa";
    }

    if (this.africa.has(iso)) {
      return "África";
    }

    if (this.oceania.has(iso)) {
      return "Oceania";
    }

    if (this.asia.has(iso)) {
      return "Ásia";
    }

    if (
      iso === "CAN" ||
      iso === "USA" ||
      iso === "MEX" ||
      iso === "GRL"
    ) {
      return "América do Norte";
    }

    return null;
  },


  getFeatureISO(feature) {

    const properties =
      feature.properties || {};

    const possible = [

      properties.ADM0_A3,

      properties.ISO_A3,

      properties.ISO_A3_EH,

      properties.SOV_A3,

      properties.WB_A3

    ];

    for (const value of possible) {

      const normalized =
        this.normalizeISO(value);

      if (
        normalized &&
        normalized !== "-99"
      ) {
        return normalized;
      }
    }

    return "";
  },


  drawGeoJSON(data) {

    this.clear();

    if (
      !data ||
      !Array.isArray(data.features)
    ) {
      this.drawFallback();
      return;
    }

    const colors = {

      "América do Norte": 20,

      "América Central": 40,

      "América do Sul": 60,

      "Europa": 80,

      "África": 100,

      "Ásia": 120,

      "Oceania": 140,

      "Antártida": 160

    };


    data.features.forEach(feature => {

      const iso =
        this.getFeatureISO(feature);

      const region =
        this.getRegionFromISO(iso);

      if (!region) return;

      const color =
        colors[region];

      this.ctx.fillStyle =
        `rgb(${color},0,0)`;

      const geometry =
        feature.geometry;

      if (!geometry) return;


      const drawRing = ring => {

        if (
          !Array.isArray(ring) ||
          ring.length === 0
        ) {
          return;
        }

        this.ctx.beginPath();

        ring.forEach((coord, index) => {

          const point =
            this.project(
              coord[0],
              coord[1]
            );

          if (index === 0) {

            this.ctx.moveTo(
              point.x,
              point.y
            );

          } else {

            this.ctx.lineTo(
              point.x,
              point.y
            );
          }
        });

        this.ctx.closePath();

        this.ctx.fill();
      };


      if (
        geometry.type === "Polygon"
      ) {

        geometry.coordinates.forEach(
          drawRing
        );

      } else if (
        geometry.type === "MultiPolygon"
      ) {

        geometry.coordinates.forEach(
          polygon => {

            polygon.forEach(
              drawRing
            );

          }
        );
      }

    });
  },


  drawFallback() {

    /*
       Fallback simplificado.
       Só é utilizado quando o GeoJSON
       não consegue ser baixado.
    */

    this.clear();

    const fallback = [

      {
        region: "América do Norte",
        lon: -110,
        lat: 50,
        w: 70,
        h: 45
      },

      {
        region: "América Central",
        lon: -90,
        lat: 15,
        w: 20,
        h: 20
      },

      {
        region: "América do Sul",
        lon: -60,
        lat: -15,
        w: 40,
        h: 65
      },

      {
        region: "Europa",
        lon: 15,
        lat: 50,
        w: 35,
        h: 25
      },

      {
        region: "África",
        lon: 20,
        lat: 0,
        w: 50,
        h: 60
      },

      {
        region: "Ásia",
        lon: 90,
        lat: 35,
        w: 100,
        h: 50
      },

      {
        region: "Oceania",
        lon: 135,
        lat: -25,
        w: 65,
        h: 35
      },

      {
        region: "Antártida",
        lon: 0,
        lat: -80,
        w: 300,
        h: 20
      }

    ];


    fallback.forEach(item => {

      const center =
        this.project(
          item.lon,
          item.lat
        );

      const width =
        (item.w / 360) *
        this.width;

      const height =
        (item.h / 180) *
        this.height;

      const colorMap = {

        "América do Norte": 20,
        "América Central": 40,
        "América do Sul": 60,
        "Europa": 80,
        "África": 100,
        "Ásia": 120,
        "Oceania": 140,
        "Antártida": 160

      };

      this.ctx.fillStyle =
        `rgb(${colorMap[item.region]},0,0)`;

      this.ctx.fillRect(
        center.x - width / 2,
        center.y - height / 2,
        width,
        height
      );

    });
  },


  getRegionFromUV(u, v) {

    if (!this.ready) {
      return null;
    }

    const x =
      Math.floor(
        u * this.width
      );

    const y =
      Math.floor(
        (1 - v) * this.height
      );


    if (
      x < 0 ||
      y < 0 ||
      x >= this.width ||
      y >= this.height
    ) {
      return null;
    }


    const pixel =
      this.ctx.getImageData(
        x,
        y,
        1,
        1
      ).data;


    if (
      !pixel ||
      pixel[0] === 0
    ) {
      return null;
    }


    const colors = {

      20: "América do Norte",

      40: "América Central",

      60: "América do Sul",

      80: "Europa",

      100: "África",

      120: "Ásia",

      140: "Oceania",

      160: "Antártida"

    };


    return colors[pixel[0]] || null;
  }

};

GeoDetector.init();


/* =====================================================
   INTERFACE
===================================================== */

const UI = {

  views: {

    world:
      document.getElementById(
        "globeView"
      ),

    countries:
      document.getElementById(
        "countryListView"
      ),

    content:
      document.getElementById(
        "contentView"
      )

  },


  currentContinent: null,

  currentCountry: null,


  switchView(viewName) {

    Object.values(this.views)
      .forEach(view => {

        if (view) {
          view.classList.remove(
            "active"
          );
        }

      });


    if (
      this.views[viewName]
    ) {

      this.views[viewName]
        .classList.add("active");

    }

  },


  updateBreadcrumb(path) {

    const nav =
      document.getElementById(
        "breadcrumb"
      );

    if (!nav) return;

    nav.innerHTML = "";


    path.forEach(
      (step, index) => {

        const button =
          document.createElement(
            "button"
          );

        button.textContent =
          step.label;


        if (
          index ===
          path.length - 1
        ) {

          button.classList.add(
            "current"
          );

          button.setAttribute(
            "aria-current",
            "page"
          );

        } else if (
          typeof step.onClick ===
          "function"
        ) {

          button.onclick =
            step.onClick;
        }


        nav.appendChild(button);


        if (
          index <
          path.length - 1
        ) {

          nav.appendChild(
            document.createTextNode(
              " › "
            )
          );

        }

      }
    );
  },


  goWorld() {

    this.currentContinent =
      null;

    this.currentCountry =
      null;


    this.switchView(
      "world"
    );


    this.updateBreadcrumb([
      {
        label: "Mundo"
      }
    ]);


    if (
      typeof Globe !==
      "undefined"
    ) {

      Globe.deactivateRegion();

    }

  },


  showContinentArticle(name) {

    const data =
      REGION_META[name];

    if (!data) return;


    this.currentContinent =
      name;

    this.switchView(
      "content"
    );


    this.renderContent(
      data.icon,
      data.banner,
      name,
      data.paragraphs,
      data.sources,
      data.landscape,
      name
    );


    this.updateBreadcrumb([

      {
        label: "Mundo",
        onClick:
          () => this.goWorld()
      },

      {
        label: name
      }

    ]);


    const backButton =
      document.getElementById(
        "contentBackBtn"
      );

    if (backButton) {

      backButton.onclick =
        () => this.goWorld();

    }

  },


  showCountryList(
    continentName
  ) {

    this.currentContinent =
      continentName;


    this.switchView(
      "countries"
    );


    const title =
      document.getElementById(
        "countryListTitle"
      );

    if (title) {

      title.textContent =
        `Países: ${continentName}`;

    }


    const listRegion =
      REGION_META[continentName];

    const listIntro =
      document.getElementById(
        "countryListIntro"
      );

    const listFigure =
      document.getElementById(
        "countryListFigure"
      );

    if (listIntro) {
      listIntro.textContent =
        listRegion
          ? listRegion.paragraphs[0]
          : "";
    }

    if (listFigure) {
      listFigure.innerHTML = "";

      if (listRegion && listRegion.landscape) {
        listFigure.appendChild(
          createFigure(
            listRegion.landscape
          )
        );
      }
    }

    const grid =
      document.getElementById(
        "countryGrid"
      );

    if (!grid) return;

    grid.innerHTML = "";


    const list =
      CONTINENT_COUNTRIES[
        continentName
      ] || [];


    if (
      list.length === 0
    ) {

      grid.innerHTML =
        `<p class="hint">
          A Antártida não possui países: é regida pelo Sistema do Tratado da
          Antártida, que reserva o continente à paz e à ciência e suspende
          reivindicações territoriais. Leia a análise completa em
          «Explorar Região».
        </p>`;

    } else {

      list.forEach(country => {

        const card =
          document.createElement(
            "div"
          );

        card.className =
          "country-card";

        card.tabIndex = 0;


        const iso =
          COUNTRY_ISO[country];


        if (iso) {

          card.innerHTML = `
            <img
              src="https://flagcdn.com/w160/${iso}.png"
              alt="Bandeira de ${country}"
              class="country-flag"
              loading="lazy"
            >

            <span>
              ${country}
            </span>
          `;

        } else {

          card.textContent =
            country;

        }


        card.onclick =
          () => this.showCountryArticle(
            country,
            continentName
          );


        card.onkeydown =
          event => {

            if (
              event.key === "Enter" ||
              event.key === " "
            ) {

              event.preventDefault();

              this.showCountryArticle(
                country,
                continentName
              );

            }

          };


        grid.appendChild(card);

      });

    }


    this.updateBreadcrumb([

      {
        label: "Mundo",
        onClick:
          () => this.goWorld()
      },

      {
        label: continentName,
        onClick:
          () =>
            this.showCountryList(
              continentName
            )
      },

      {
        label: "Países"
      }

    ]);

  },


  showCountryArticle(
    country,
    continent
  ) {

    this.currentCountry =
      country;


    this.switchView(
      "content"
    );


    const data =
      COUNTRY_CONTENT[country];

    const regionData =
      REGION_META[continent] || {};

    const paragraphs =
      data
        ? data.paragraphs
        : (regionData.paragraphs || []).slice(0, 3);

    this.renderContent(
      data ? data.icon : "🌐",
      data
        ? data.banner
        : (regionData.banner ||
           "linear-gradient(135deg,#5e6355,#232823)"),
      country,
      paragraphs,
      data
        ? data.sources
        : (regionData.sources || "Geopoliso"),
      flagSpec(country)
    );

    this.updateBreadcrumb([

      {
        label: "Mundo",
        onClick:
          () => this.goWorld()
      },

      {
        label: continent,
        onClick:
          () =>
            this.showCountryList(
              continent
            )
      },

      {
        label: country
      }

    ]);


    const backButton =
      document.getElementById(
        "contentBackBtn"
      );

    if (backButton) {

      backButton.onclick =
        () =>
          this.showCountryList(
            continent
          );

    }

  },


  renderContent(
    icon,
    banner,
    title,
    paragraphs,
    sources,
    image,
    imageAlt
  ) {

    const iconElement =
      document.getElementById(
        "cpIcon"
      );

    const bannerElement =
      document.getElementById(
        "cpBanner"
      );

    const titleElement =
      document.getElementById(
        "cpTitle"
      );

    const proseElement =
      document.getElementById(
        "cpProse"
      );

    const sourcesElement =
      document.getElementById(
        "cpSources"
      );


    if (iconElement) {
      iconElement.textContent =
        icon || "🌐";
    }


    if (bannerElement) {

      bannerElement.style.background =
        banner || "";

    }


    if (titleElement) {

      titleElement.textContent =
        String(title || "")
          .toUpperCase();

    }


    if (proseElement) {

      proseElement.innerHTML =
        paragraphs
          .map(
            paragraph =>
              `<p>${paragraph}</p>`
          )
          .join("");

    }


    if (sourcesElement) {

      sourcesElement.innerHTML =
        `Fontes principais:
         <strong>${sources || "Geopoliso"}</strong>`;

    }


    /*
       Remove figura anterior e insere a nova
       (bandeira ou paisagem), com fallback.
    */

    const oldImage =
      document.getElementById(
        "dynamicContentImage"
      );

    if (oldImage) {
      oldImage.remove();
    }

    if (image && titleElement) {

      const figure =
        createFigure(image);

      figure.id =
        "dynamicContentImage";

      titleElement
        .parentElement
        ?.insertBefore(
          figure,
          titleElement
        );
    }
  }

};


/* =====================================================
   BOTÕES ACESSÍVEIS
===================================================== */

document
  .querySelectorAll(
    '.back-btn[data-target="world"]'
  )
  .forEach(button => {

    button.onclick =
      () => UI.goWorld();

  });


const accContainer =
  document.getElementById(
    "accessibleButtons"
  );


/*
   CORREÇÃO IMPORTANTE:

   O código anterior tentava usar
   appendChild() mesmo quando
   #accessibleButtons não existia.

   Agora só cria os botões se
   o container realmente existir.
*/

if (accContainer) {

  Object.keys(
    REGION_META
  ).forEach(region => {

    const button =
      document.createElement(
        "button"
      );

    button.textContent =
      region;

    button.type =
      "button";

    button.onclick =
      () =>
        Globe.focusRegionFromData(
          region
        );

    accContainer.appendChild(
      button
    );

  });

}


/* =====================================================
   GLOBO 3D
===================================================== */

const Globe = {

  container:
    document.getElementById(
      "globeContainer"
    ),

  canvas:
    document.getElementById(
      "globeCanvas"
    ),

  statusEl:
    document.getElementById(
      "globeStatus"
    ),


  callout: {

    svg:
      document.getElementById(
        "calloutSvg"
      ),

    box:
      document.getElementById(
        "calloutBox"
      ),

    title:
      document.getElementById(
        "calloutTitle"
      ),

    line:
      document.getElementById(
        "calloutLine"
      ),

    pulse:
      document.getElementById(
        "calloutPulse"
      ),

    dot:
      document.getElementById(
        "calloutDot"
      ),

    btnReg:
      document.getElementById(
        "calloutContinentBtn"
      ),

    btnCtry:
      document.getElementById(
        "calloutCountriesBtn"
      ),

    close:
      document.getElementById(
        "calloutClose"
      )

  },


  scene:
    new THREE.Scene(),


  camera:
    new THREE.PerspectiveCamera(
      38,
      1,
      0.1,
      100
    ),


  renderer:
    null,


  earthGroup:
    new THREE.Group(),


  earthMesh:
    null,


  targetZ:
    3.35,


  currentZ:
    3.35,


  baseQuat:
    new THREE.Quaternion()
      .setFromEuler(
        new THREE.Euler(
          0.12,
          -0.35,
          0
        )
      ),


  targetQuat:
    null,


  autoRotate:
    true,


  isDragging:
    false,


  dragMoved:
    false,


  pointer: {

    x: 0,

    y: 0,

    downX: 0,

    downY: 0

  },


  raycaster:
    new THREE.Raycaster(),


  mouseNDC:
    new THREE.Vector2(),


  activeRegion:
    null,


  activeLocalPoint:
    null,


  initialized:
    false,


  init() {

    if (this.initialized) {
      return;
    }


    if (
      !this.container ||
      !this.canvas
    ) {

      console.error(
        "Globo: elementos do HTML não encontrados."
      );

      return;

    }


    if (
      typeof THREE ===
      "undefined"
    ) {

      console.error(
        "Three.js não foi carregado."
      );

      return;

    }


    this.initialized =
      true;


    try {

      this.renderer =
        new THREE.WebGLRenderer({

          canvas:
            this.canvas,

          antialias:
            true,

          alpha:
            true,

          powerPreference:
            "high-performance"

        });

    } catch (error) {

      console.error(
        "Não foi possível criar o WebGL:",
        error
      );

      return;

    }


    this.renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio || 1,
        2
      )
    );


    if (
      "outputEncoding" in
      this.renderer
    ) {

      this.renderer.outputEncoding =
        THREE.sRGBEncoding;

    }


    this.scene.add(
      this.earthGroup
    );


    this.camera.position.z =
      this.currentZ;


    /*
       Iluminação
    */

    this.scene.add(
      new THREE.AmbientLight(
        0xffffff,
        0.65
      )
    );


    const sunLight =
      new THREE.DirectionalLight(
        0xffffff,
        1.8
      );

    sunLight.position.set(
      -3,
      2.5,
      4
    );

    this.scene.add(
      sunLight
    );


    const rimLight =
      new THREE.DirectionalLight(
        0x9fb0c9,
        0.5
      );

    rimLight.position.set(
      4,
      -1,
      -3
    );

    this.scene.add(
      rimLight
    );


    /*
       Terra
    */

    const earthGeometry =
      new THREE.SphereGeometry(
        1.48,
        96,
        96
      );


    const earthMaterial =
      new THREE.MeshPhongMaterial({

        color:
          0x112233,

        shininess:
          10

      });


    this.earthMesh =
      new THREE.Mesh(
        earthGeometry,
        earthMaterial
      );


    this.earthGroup.add(
      this.earthMesh
    );


    /*
       Atmosfera
    */

    const atmosphere =
      new THREE.Mesh(

        new THREE.SphereGeometry(
          1.56,
          64,
          64
        ),

        new THREE.MeshBasicMaterial({

          color:
            0x9db9d2,

          transparent:
            true,

          opacity:
            0.12,

          side:
            THREE.BackSide,

          blending:
            THREE.AdditiveBlending

        })

      );


    this.earthGroup.add(
      atmosphere
    );


    this.setStatus(
      "Carregando texturas..."
    );


    const textureLoader =
      new THREE.TextureLoader();


    textureLoader.crossOrigin =
      "anonymous";


    Promise.all([

      this.loadTexture(
        textureLoader,
        "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      ),

      this.loadTexture(
        textureLoader,
        "https://unpkg.com/three-globe/example/img/earth-topology.png"
      ),

      this.loadTexture(
        textureLoader,
        "https://unpkg.com/three-globe/example/img/earth-water.png"
      )

    ]).then(
      textures => {

        const map =
          textures[0];

        const bump =
          textures[1];

        const specular =
          textures[2];


        if (map) {

          if (
            "encoding" in map
          ) {

            map.encoding =
              THREE.sRGBEncoding;

          }


          this.earthMesh.material =
            new THREE.MeshPhongMaterial({

              map:
                map,

              bumpMap:
                bump || null,

              bumpScale:
                0.015,

              specularMap:
                specular || null,

              specular:
                new THREE.Color(
                  0x333333
                ),

              shininess:
                15

            });


          this.setStatus("");

        } else {

          this.setStatus(
            "Textura indisponível. Globo 3D mantido."
          );


          setTimeout(
            () =>
              this.setStatus(""),
            3000
          );

        }

      }
    );


    this.bindEvents();


    this.resize();


    if (
      typeof ResizeObserver !==
      "undefined"
    ) {

      new ResizeObserver(
        () => this.resize()
      ).observe(
        this.container
      );

    } else {

      window.addEventListener(
        "resize",
        () => this.resize()
      );

    }


    if (this.callout.close) {

      this.callout.close.onclick =
        () =>
          this.deactivateRegion();

    }


    UI.goWorld();


    this.animate();

  },


  loadTexture(
    loader,
    url
  ) {

    return new Promise(
      resolve => {

        loader.load(

          url,

          texture =>
            resolve(texture),

          undefined,

          () =>
            resolve(null)

        );

      }
    );

  },


  setStatus(message) {

    if (!this.statusEl) {
      return;
    }


    this.statusEl.textContent =
      message;


    if (message) {

      this.statusEl.classList.add(
        "visible"
      );

    } else {

      this.statusEl.classList.remove(
        "visible"
      );

    }

  },


  resize() {

    if (
      !this.container ||
      !this.renderer
    ) {
      return;
    }


    const width =
      Math.max(
        this.container.clientWidth,
        1
      );


    const height =
      Math.max(
        this.container.clientHeight,
        1
      );


    this.camera.aspect =
      width / height;


    this.camera.updateProjectionMatrix();


    this.renderer.setSize(
      width,
      height,
      false
    );


    this.earthGroup.position.x =
      width > 820
        ? -0.42
        : 0;

  },


  bindEvents() {

    this.canvas.addEventListener(
      "pointerdown",
      event => {

        if (
          this.activeRegion
        ) {
          return;
        }


        this.isDragging =
          true;

        this.dragMoved =
          false;

        this.autoRotate =
          false;


        this.pointer.downX =
          event.clientX;

        this.pointer.downY =
          event.clientY;

        this.pointer.x =
          event.clientX;

        this.pointer.y =
          event.clientY;


        this.canvas.classList.add(
          "dragging"
        );


        try {

          this.canvas.setPointerCapture(
            event.pointerId
          );

        } catch (_) {}

      }
    );


    this.canvas.addEventListener(
      "pointermove",
      event => {

        if (
          this.isDragging
        ) {

          const dx =
            event.clientX -
            this.pointer.x;


          const dy =
            event.clientY -
            this.pointer.y;


          if (
            Math.abs(
              event.clientX -
              this.pointer.downX
            ) > 5 ||
            Math.abs(
              event.clientY -
              this.pointer.downY
            ) > 5
          ) {

            this.dragMoved =
              true;

          }


          const horizontalRotation =
            new THREE.Quaternion()
              .setFromAxisAngle(
                new THREE.Vector3(
                  0,
                  1,
                  0
                ),
                dx * 0.005
              );


          const verticalRotation =
            new THREE.Quaternion()
              .setFromAxisAngle(
                new THREE.Vector3(
                  1,
                  0,
                  0
                ),
                dy * 0.004
              );


          this.baseQuat
            .premultiply(
              horizontalRotation
            )
            .premultiply(
              verticalRotation
            );


          this.pointer.x =
            event.clientX;

          this.pointer.y =
            event.clientY;


        } else if (
          !this.activeRegion
        ) {

          const hit =
            this.raycast(event);


          if (hit) {

            const region =
              GeoDetector
                .getRegionFromUV(
                  hit.uv.x,
                  hit.uv.y
                );


            this.canvas.classList.toggle(
              "pointer",
              !!region
            );

          } else {

            this.canvas.classList.remove(
              "pointer"
            );

          }

        }

      }
    );


    this.canvas.addEventListener(
      "pointerup",
      event => {

        this.isDragging =
          false;


        this.canvas.classList.remove(
          "dragging"
        );


        try {

          this.canvas.releasePointerCapture(
            event.pointerId
          );

        } catch (_) {}


        if (
          !this.dragMoved &&
          !this.activeRegion
        ) {

          const hit =
            this.raycast(event);


          if (hit) {

            const region =
              GeoDetector
                .getRegionFromUV(
                  hit.uv.x,
                  hit.uv.y
                );


            if (region) {

              this.activateRegion(
                region,
                hit.point
              );

            }

          }

        } else if (
          !this.activeRegion
        ) {

          setTimeout(
            () => {

              if (
                !this.activeRegion &&
                !this.isDragging
              ) {

                this.autoRotate =
                  true;

              }

            },
            400
          );

        }

      }
    );


    this.canvas.addEventListener(
      "pointercancel",
      () => {

        this.isDragging =
          false;

        this.canvas.classList.remove(
          "dragging"
        );

      }
    );


    this.canvas.addEventListener(
      "wheel",
      event => {

        event.preventDefault();


        if (
          this.activeRegion
        ) {
          return;
        }


        this.targetZ =
          Math.max(
            2.2,
            Math.min(
              4.8,
              this.targetZ +
              event.deltaY *
              0.0015
            )
          );

      },
      {
        passive: false
      }
    );

  },


  raycast(event) {

    if (
      !this.earthMesh
    ) {
      return null;
    }


    const rect =
      this.canvas.getBoundingClientRect();


    if (
      rect.width <= 0 ||
      rect.height <= 0
    ) {
      return null;
    }


    this.mouseNDC.x =
      (
        (
          event.clientX -
          rect.left
        ) /
        rect.width
      ) * 2 - 1;


    this.mouseNDC.y =
      -(
        (
          event.clientY -
          rect.top
        ) /
        rect.height
      ) * 2 + 1;


    this.raycaster.setFromCamera(
      this.mouseNDC,
      this.camera
    );


    const intersections =
      this.raycaster.intersectObject(
        this.earthMesh,
        false
      );


    if (
      intersections.length === 0
    ) {
      return null;
    }


    return intersections[0];

  },


  activateRegion(
    name,
    worldPoint
  ) {

    if (!name) return;


    this.activeRegion =
      name;


    this.autoRotate =
      false;


    this.canvas.classList.add(
      "dimmed"
    );


    this.canvas.classList.remove(
      "pointer"
    );


    /*
       Converte o ponto clicado para
       coordenadas locais da Terra.
    */

    this.activeLocalPoint =
      this.earthMesh.worldToLocal(
        worldPoint.clone()
      );


    const direction =
      this.activeLocalPoint
        .clone()
        .normalize();


    /*
       Rotação para trazer o ponto
       selecionado para a frente.
    */

    this.targetQuat =
      new THREE.Quaternion()
        .setFromUnitVectors(
          direction,
          new THREE.Vector3(
            0,
            0,
            1
          )
        );


    this.targetZ =
      2.65;


    if (this.callout.title) {

      this.callout.title.textContent =
        name;

    }


    if (this.callout.btnReg) {

      this.callout.btnReg.onclick =
        () =>
          UI.showContinentArticle(
            name
          );

    }


    const hasCountries =
      Array.isArray(
        CONTINENT_COUNTRIES[name]
      ) &&
      CONTINENT_COUNTRIES[name]
        .length > 0;


    if (this.callout.btnCtry) {

      this.callout.btnCtry.style.display =
        hasCountries
          ? "inline-block"
          : "none";


      this.callout.btnCtry.onclick =
        () =>
          UI.showCountryList(
            name
          );

    }


    if (this.callout.svg) {

      this.callout.svg.classList.add(
        "visible"
      );

    }


    if (this.callout.box) {

      setTimeout(
        () => {

          this.callout.box.classList.add(
            "visible"
          );

        },
        200
      );

    }

  },


  deactivateRegion() {

    this.activeRegion =
      null;

    this.activeLocalPoint =
      null;

    this.targetQuat =
      null;

    this.autoRotate =
      true;

    this.targetZ =
      3.35;


    this.canvas.classList.remove(
      "dimmed"
    );


    if (this.callout.svg) {

      this.callout.svg.classList.remove(
        "visible"
      );

    }


    if (this.callout.box) {

      this.callout.box.classList.remove(
        "visible"
      );

    }

  },


  focusRegionFromData(name) {

    const center =
      CONTINENT_CENTERS[name];


    if (!center) {
      return;
    }


    if (!this.earthMesh) {
      return;
    }


    const latitude =
      THREE.MathUtils.degToRad(
        center.lat
      );


    const longitude =
      THREE.MathUtils.degToRad(
        center.lon
      );


    const radius =
      1.48;


    /*
       Conversão correta de latitude/
       longitude para ponto na esfera.

       Isso é importante para impedir
       que Europa, Oceania, América etc.
       sejam apontadas para posições erradas.
    */

    const localPoint =
      new THREE.Vector3(

        radius *
        Math.cos(latitude) *
        Math.cos(longitude),

        radius *
        Math.sin(latitude),

        -radius *
        Math.cos(latitude) *
        Math.sin(longitude)

      );


    const worldPoint =
      this.earthMesh.localToWorld(
        localPoint.clone()
      );


    this.activateRegion(
      name,
      worldPoint
    );

  },


  updateCalloutLine() {

    if (
      !this.activeRegion ||
      !this.activeLocalPoint ||
      !this.callout.dot ||
      !this.callout.line
    ) {
      return;
    }


    const worldPosition =
      this.activeLocalPoint
        .clone()
        .applyMatrix4(
          this.earthMesh.matrixWorld
        );


    const screenPosition =
      worldPosition
        .clone()
        .project(
          this.camera
        );


    const rect =
      this.container.getBoundingClientRect();


    const pointX =
      (
        screenPosition.x *
        0.5 +
        0.5
      ) *
      rect.width;


    const pointY =
      (
        1 -
        (
          screenPosition.y *
          0.5 +
          0.5
        )
      ) *
      rect.height;


    this.callout.dot.setAttribute(
      "cx",
      pointX
    );


    this.callout.dot.setAttribute(
      "cy",
      pointY
    );


    if (this.callout.pulse) {

      this.callout.pulse.setAttribute(
        "cx",
        pointX
      );

      this.callout.pulse.setAttribute(
        "cy",
        pointY
      );

    }


    this.callout.line.setAttribute(
      "x1",
      pointX
    );


    this.callout.line.setAttribute(
      "y1",
      pointY
    );


    if (!this.callout.box) {
      return;
    }


    const boxRect =
      this.callout.box.getBoundingClientRect();


    const isMobile =
      window.innerWidth <= 820;


    const targetX =
      isMobile

        ? (
            boxRect.left -
            rect.left +
            boxRect.width / 2
          )

        : (
            boxRect.left -
            rect.left
          );


    const targetY =
      isMobile

        ? (
            boxRect.top -
            rect.top
          )

        : (
            boxRect.top -
            rect.top +
            boxRect.height / 2
          );


    this.callout.line.setAttribute(
      "x2",
      targetX
    );


    this.callout.line.setAttribute(
      "y2",
      targetY
    );

  },


  animate() {

    requestAnimationFrame(
      () => this.animate()
    );


    if (
      !this.renderer ||
      !this.earthMesh
    ) {
      return;
    }


    if (
      this.autoRotate &&
      !this.isDragging
    ) {

      const rotation =
        new THREE.Quaternion()
          .setFromAxisAngle(

            new THREE.Vector3(
              0,
              1,
              0
            ),

            0.0015

          );


      this.baseQuat.premultiply(
        rotation
      );

    }


    if (this.targetQuat) {

      this.baseQuat.slerp(
        this.targetQuat,
        0.08
      );

    }


    this.earthGroup.quaternion.copy(
      this.baseQuat
    );


    this.currentZ +=
      (
        this.targetZ -
        this.currentZ
      ) * 0.1;


    this.camera.position.z =
      this.currentZ;


    this.updateCalloutLine();


    this.renderer.render(
      this.scene,
      this.camera
    );

  }

};


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

window.addEventListener(
  "load",
  () => {

    if (
      typeof THREE ===
      "undefined"
    ) {

      console.error(
        "ERRO: Three.js não foi encontrado."
      );

      return;
    }


    Globe.init();

  }
);