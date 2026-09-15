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
   2. MAPA — UCRÂNIA
======================================================= */

const ucrania = [
  48.3794,
  31.1656
];


const map = L.map('map', {

  zoomControl: true,

  scrollWheelZoom: false,

  dragging: true,

  doubleClickZoom: true,

  touchZoom: true

}).setView(
  ucrania,
  6
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


/* Marcador inicial — Kyiv */

L.marker([
  50.4501,
  30.5234
])
.addTo(map)
.bindPopup(
  'Kyiv — Ucrânia'
);


const events = [

  {
    title: 'Kyiv',
    years: 'Ucrânia',
    label: 'CAPITAL',
    location: 'Kyiv, Ucrânia',
    description: 'Capital da Ucrânia.',
    coords: [50.4501, 30.5234]
  },

  {
    title: 'Donetsk',
    years: 'Ucrânia',
    label: 'REGIÃO',
    location: 'Donetsk, Ucrânia',
    description: 'Região localizada no leste da Ucrânia.',
    coords: [48.0159, 37.8028]
  },

  {
    title: 'Luhansk',
    years: 'Ucrânia',
    label: 'REGIÃO',
    location: 'Luhansk, Ucrânia',
    description: 'Região localizada no leste da Ucrânia.',
    coords: [48.5740, 39.3078]
  },

  {
    title: 'Zaporizhzhia',
    years: 'Ucrânia',
    label: 'REGIÃO',
    location: 'Zaporizhzhia, Ucrânia',
    description: 'Região localizada no sudeste da Ucrânia.',
    coords: [47.8388, 35.1396]
  },

  {
    title: 'Kherson',
    years: 'Ucrânia',
    label: 'REGIÃO',
    location: 'Kherson, Ucrânia',
    description: 'Região localizada no sul da Ucrânia.',
    coords: [46.6354, 32.6169]
  },

  {
    title: 'Kharkiv',
    years: 'Ucrânia',
    label: 'CIDADE',
    location: 'Kharkiv, Ucrânia',
    description: 'Uma das principais cidades do leste da Ucrânia.',
    coords: [49.9935, 36.2304]
  },

  {
    title: 'Odesa',
    years: 'Ucrânia',
    label: 'CIDADE',
    location: 'Odesa, Ucrânia',
    description: 'Importante cidade portuária localizada no sul da Ucrânia.',
    coords: [46.4825, 30.7233]
  }

];


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

     /* =======================================================
     5. RENDERIZAÇÃO
  ======================================================= */

  function renderEvent(index) {

    const event =
      events[index];


    titleEl.innerHTML =
      event.title;


    yearsEl.textContent =
      event.years;


    labelEl.innerHTML =
      event.label;


    locationEl.textContent =
      event.location;


    descriptionEl.textContent =
      event.description;


    map.setView(
      event.coords,
      11
    );

  }


  /* =======================================================
     6. BOTÃO ANTERIOR
  ======================================================= */

  document
    .getElementById('prevEvent')
    .addEventListener('click', () => {

      if (events.length <= 1) {
        return;
      }

      currentEvent =
        (currentEvent - 1 + events.length) %
        events.length;

      renderEvent(currentEvent);

    });


  /* =======================================================
     7. BOTÃO PRÓXIMO
  ======================================================= */

  document
    .getElementById('nextEvent')
    .addEventListener('click', () => {

      if (events.length <= 1) {
        return;
      }

      currentEvent =
        (currentEvent + 1) %
        events.length;

      renderEvent(currentEvent);

    });
    
 /* =======================================================
     8. RENDERIZA EVENTO INICIAL
  ======================================================= */

  renderEvent(currentEvent);

});
