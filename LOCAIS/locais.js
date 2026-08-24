  // =========================================================
// GEOPOLISO — locais.js
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* =======================================================
     1. TEMA
  ======================================================= */

  const root = document.documentElement;

  const themeToggle =
    document.getElementById('themeToggle');

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


  const savedTheme =
    localStorage.getItem('geopoliso-theme') ||
    'dark';


  applyTheme(savedTheme);


  themeToggle.addEventListener('click', () => {

    const currentTheme =
      root.getAttribute('data-theme') === 'light'
        ? 'light'
        : 'dark';

    const nextTheme =
      currentTheme === 'dark'
        ? 'light'
        : 'dark';


    applyTheme(nextTheme);

    localStorage.setItem(
      'geopoliso-theme',
      nextTheme
    );

  });

 /* =======================================================
     2. MAPA
  ======================================================= */

  const volgogrado = [
    48.7080,
    44.5133
  ];


  const map = L.map('map', {

    zoomControl: true,

    scrollWheelZoom: false,

    dragging: true,

    doubleClickZoom: true,

    touchZoom: true

  }).setView(
    volgogrado,
    11
  );


  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    {
      attribution:
        '&copy; OpenStreetMap contributors &copy; CARTO',

      subdomains: 'abcd',

      maxZoom: 19
    }
  ).addTo(map);


  L.marker(volgogrado)
    .addTo(map)
    .bindPopup(
      'Stalingrado (atual Volgogrado)'
    );

     /* =======================================================
     3. EVENTOS
  ======================================================= */

  const events = [

    {
      title:
        'Batalha de<br>Stalingrado',

      label:
        'Batalha de<br>Stalingrado',

      years:
        '1942 - 1943',

      location:
        'Stalingrado, hoje Volgogrado, às margens do rio Volga, Rússia.',

      description:
        'Durante a Segunda Guerra Mundial, forças alemãs e seus aliados tentaram conquistar a cidade, mas foram cercadas pelo Exército Vermelho soviético. A rendição alemã tornou-se um grande ponto de virada na frente oriental do conflito.',

      coords:
        volgogrado
    }

  ];


  let currentEvent = 0;


  /* =======================================================
     4. ELEMENTOS DO HTML
  ======================================================= */

  const titleEl =
    document.querySelector(
      '.event-title h1'
    );


  const yearsEl =
    document.querySelector(
      '.event-years'
    );


  const labelEl =
    document.getElementById(
      'eventLabel'
    );


  const locationEl =
    document.querySelector(
      '.event-location'
    );


  const descriptionEl =
    document.querySelector(
      '.event-description'
    );
