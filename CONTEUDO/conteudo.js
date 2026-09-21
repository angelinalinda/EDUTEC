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

    banner:
      "linear-gradient(135deg,#5b6b8c,#2c3550)",

    landscape:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Grand_Canyon_from_Pima_Point_2010.jpg",

    sources:
      "Casa Branca, T-MEC e Banco Mundial",

    paragraphs: [
      "A geopolítica da América do Norte envolve principalmente Canadá, Estados Unidos e México. Os três países apresentam diferentes estruturas econômicas e políticas, mas possuem forte integração comercial.",
      
      "O T-MEC organiza parte importante das relações econômicas entre os três países, conectando cadeias produtivas especialmente nos setores industrial, automotivo e agrícola.",

      "A posição dos Estados Unidos como potência econômica e militar possui grande influência sobre a dinâmica política e estratégica do continente."
    ]
  },

  "América Central": {
    icon: "🌎",

    banner:
      "linear-gradient(135deg,#4f7a6a,#1e3730)",

    landscape:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Volcan_Arenal_from_Tenorio.jpg",

    sources:
      "SICA, Banco Mundial e ONU",

    paragraphs: [
      "A América Central funciona como uma ponte territorial entre a América do Norte e a América do Sul.",

      "Sua posição geográfica faz com que rotas marítimas, comércio internacional, migração e segurança tenham grande importância geopolítica.",

      "O Canal do Panamá é um dos principais elementos estratégicos da região por conectar os oceanos Atlântico e Pacífico."
    ]
  },

  "América do Sul": {
    icon: "🌳",

    banner:
      "linear-gradient(135deg,#4f8f5e,#1c3a24)",

    landscape:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Machu_Picchu%2C_Peru.jpg",

    sources:
      "Mercosul, CEPAL e Banco Mundial",

    paragraphs: [
      "A América do Sul possui grande diversidade territorial, econômica e política.",

      "O Mercosul constitui um dos principais projetos de integração econômica da região.",

      "A Amazônia também possui importância geopolítica internacional devido à sua biodiversidade, dimensão territorial e influência ambiental."
    ]
  },

  "Europa": {
    icon: "🏛️",

    banner:
      "linear-gradient(135deg,#7a6b8c,#332a45)",

    landscape:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Eiffel_Tower_at_Night.jpg",

    sources:
      "União Europeia, OTAN e Eurostat",

    paragraphs: [
      "A Europa passou por profundas transformações políticas durante os séculos XX e XXI.",

      "A União Europeia criou um dos principais projetos de integração econômica e política do mundo contemporâneo.",

      "A posição da Europa entre o Atlântico e a Eurásia também contribui para sua importância estratégica."
    ]
  },

  "África": {
    icon: "🦁",

    banner:
      "linear-gradient(135deg,#c9954f,#5a3d1a)",

    landscape:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Victoria_Falls_from_Zambian_side.jpg",

    sources:
      "União Africana e Banco Mundial",

    paragraphs: [
      "A África é formada por 54 países reconhecidos internacionalmente e apresenta grande diversidade política, econômica e cultural.",

      "A União Africana busca ampliar a cooperação entre os países do continente.",

      "Os recursos naturais, a localização das principais rotas marítimas e o crescimento demográfico fazem da África uma região importante para as relações internacionais."
    ]
  },

  "Ásia": {
    icon: "🏯",

    banner:
      "linear-gradient(135deg,#b8563e,#4a1f16)",

    landscape:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mount_Fuji_from_Lake_Kawaguchi.jpg",

    sources:
      "ASEAN e ONU",

    paragraphs: [
      "A Ásia é o continente mais populoso do mundo e reúne algumas das maiores economias globais.",

      "China, Índia, Japão e outras potências asiáticas possuem influência significativa sobre comércio, tecnologia e segurança internacional.",

      "Rotas comerciais e pontos estratégicos marítimos também desempenham papel importante na geopolítica asiática."
    ]
  },

  "Oceania": {
    icon: "🏝️",

    banner:
      "linear-gradient(135deg,#3f8f96,#173b3e)",

    landscape:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Uluru%2C_Australia.jpg",

    sources:
      "Fórum das Ilhas do Pacífico e ONU",

    paragraphs: [
      "A Oceania reúne Austrália, Nova Zelândia e diversos pequenos Estados insulares do Pacífico.",

      "A região possui importância estratégica devido à sua localização entre a Ásia e o Pacífico.",

      "As mudanças climáticas também são uma questão geopolítica importante para os pequenos Estados insulares."
    ]
  },

  "Antártida": {
    icon: "🧊",

    banner:
      "linear-gradient(135deg,#9fb3c9,#3a4a5c)",

    landscape:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Antarctica.jpg",

    sources:
      "Tratado da Antártida",

    paragraphs: [
      "A Antártida possui um regime internacional específico estabelecido pelo Sistema do Tratado da Antártida.",

      "O continente é utilizado principalmente para pesquisas científicas e cooperação internacional.",

      "As mudanças climáticas tornam a região especialmente importante para estudos ambientais e científicos."
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
   BANDEIRAS
===================================================== */

const COUNTRY_ISO = {

  "Brasil": "br",
  "Estados Unidos": "us",
  "Canadá": "ca",
  "México": "mx",

  "Argentina": "ar",
  "Bolívia": "bo",
  "Chile": "cl",
  "Colômbia": "co",
  "Equador": "ec",
  "Guiana": "gy",
  "Paraguai": "py",
  "Peru": "pe",
  "Suriname": "sr",
  "Uruguai": "uy",
  "Venezuela": "ve",

  "Alemanha": "de",
  "França": "fr",
  "Espanha": "es",
  "Portugal": "pt",
  "Itália": "it",
  "Reino Unido": "gb",
  "Ucrânia": "ua",
  "Polônia": "pl",
  "Rússia": "ru",

  "China": "cn",
  "Japão": "jp",
  "Índia": "in",
  "Coreia do Sul": "kr",
  "Coreia do Norte": "kp",
  "Indonésia": "id",
  "Israel": "il",
  "Turquia": "tr",

  "Austrália": "au",
  "Nova Zelândia": "nz",
  "Fiji": "fj",

  "África do Sul": "za",
  "Egito": "eg",
  "Nigéria": "ng",
  "Quênia": "ke",
  "Marrocos": "ma",
  "Angola": "ao",

  "Panamá": "pa",
  "Costa Rica": "cr",
  "Guatemala": "gt",
  "Cuba": "cu",
  "Jamaica": "jm"
};


/* =====================================================
   CONTEÚDO DOS PAÍSES
===================================================== */

const COUNTRY_CONTENT = {

  "Brasil": {
    icon: "🇧🇷",
    banner: "linear-gradient(135deg,#3f8f5e,#123320)",
    sources: "Itamaraty e Banco Mundial",

    paragraphs: [
      "O Brasil é o maior país da América do Sul e possui uma das maiores extensões territoriais do planeta.",

      "Sua economia possui forte participação de setores como agricultura, mineração, energia e indústria.",

      "A posição brasileira na América do Sul também influencia sua participação em processos de integração regional."
    ]
  },

  "Estados Unidos": {
    icon: "🇺🇸",
    banner: "linear-gradient(135deg,#5b6b8c,#1c2438)",
    sources: "Departamento de Estado e Banco Mundial",

    paragraphs: [
      "Os Estados Unidos possuem grande influência econômica, militar, tecnológica e diplomática no sistema internacional.",

      "O país participa de diversas alianças e organizações internacionais.",

      "Sua posição geográfica entre os oceanos Atlântico e Pacífico também contribui para sua projeção internacional."
    ]
  },

  "China": {
    icon: "🇨🇳",
    banner: "linear-gradient(135deg,#b8563e,#3d130c)",
    sources: "ONU e Banco Mundial",

    paragraphs: [
      "A China possui uma das maiores economias do mundo e exerce influência crescente no comércio internacional.",

      "O país possui grande participação nas cadeias globais de produção.",

      "Sua localização no leste da Ásia também coloca o país próximo a importantes rotas comerciais e áreas estratégicas."
    ]
  },

  "Alemanha": {
    icon: "🇩🇪",
    banner: "linear-gradient(135deg,#7a6b8c,#241d33)",
    sources: "União Europeia",

    paragraphs: [
      "A Alemanha é uma das principais economias europeias.",

      "Sua indústria possui forte participação no comércio internacional.",

      "O país desempenha papel importante nas instituições políticas e econômicas europeias."
    ]
  },

  "África do Sul": {
    icon: "🇿🇦",
    banner: "linear-gradient(135deg,#c9954f,#4a3315)",
    sources: "União Africana e Banco Mundial",

    paragraphs: [
      "A África do Sul possui uma das economias mais industrializadas do continente africano.",

      "O país possui importância regional e participa de organizações internacionais.",

      "Sua localização no extremo sul da África também está próxima de importantes rotas marítimas."
    ]
  },

  "Austrália": {
    icon: "🇦🇺",
    banner: "linear-gradient(135deg,#3f8f96,#0f2c2e)",
    sources: "Governo Australiano e ONU",

    paragraphs: [
      "A Austrália é o maior país da Oceania em território e população.",

      "Sua economia possui forte relação comercial com países da Ásia-Pacífico.",

      "A localização australiana torna o país importante para a dinâmica estratégica do Indo-Pacífico."
    ]
  },

  "Panamá": {
    icon: "🇵🇦",
    banner: "linear-gradient(135deg,#4f7a6a,#152720)",
    sources: "Autoridade do Canal do Panamá",

    paragraphs: [
      "O Panamá possui posição estratégica entre os oceanos Atlântico e Pacífico.",

      "O Canal do Panamá permite a passagem de embarcações entre os dois oceanos.",

      "Essa infraestrutura tornou o território panamenho especialmente relevante para o comércio marítimo internacional."
    ]
  }

};


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
          Esta região não possui países cadastrados nesta visualização.
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


    if (data) {

      const iso =
        COUNTRY_ISO[country];

      const flag =
        iso
          ? `https://flagcdn.com/w320/${iso}.png`
          : null;


      this.renderContent(
        data.icon,
        data.banner,
        country,
        data.paragraphs,
        data.sources,
        flag,
        `Bandeira oficial de ${country}`
      );

    } else {

      this.renderContent(

        "🌐",

        "linear-gradient(135deg,#5e6355,#232823)",

        country,

        [
          "Este país está incluído na navegação geográfica do Geopoliso.",
          "O conteúdo geopolítico detalhado desta página ainda está em desenvolvimento."
        ],

        "Geopoliso",

        COUNTRY_ISO[country]
          ? `https://flagcdn.com/w320/${COUNTRY_ISO[country]}.png`
          : null,

        `Bandeira de ${country}`

      );

    }


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
       Remove imagem anterior.
    */

    const oldImage =
      document.getElementById(
        "dynamicContentImage"
      );

    if (oldImage) {
      oldImage.remove();
    }


    if (image && bannerElement) {

      const imageElement =
        document.createElement(
          "img"
        );

      imageElement.id =
        "dynamicContentImage";

      imageElement.className =
        "cp-visual-image";

      imageElement.src =
        image;

      imageElement.alt =
        imageAlt || title;

      imageElement.loading =
        "lazy";


      bannerElement
        .parentElement
        ?.insertBefore(
          imageElement,
          bannerElement.nextSibling
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