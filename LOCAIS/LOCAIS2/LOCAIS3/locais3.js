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
   2. MAPA — FAIXA DE GAZA
======================================================= */

const gaza = [
  31.3547,
  34.3088
];


const map = L.map('map', {

  zoomControl: true,

  scrollWheelZoom: false,

  dragging: true,

  doubleClickZoom: true,

  touchZoom: true

}).setView(
  gaza,
  10
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


L.marker(gaza)
  .addTo(map)
  .bindPopup(
    'Faixa de Gaza'
  );

     /* =======================================================
     3. EVENTOS
  ======================================================= */

  const events = [

  {
    title: 'Faixa de Gaza',
    years: 'Oriente Médio',
    label: 'TERRITÓRIO',
    location: 'Faixa de Gaza',
    description: 'Território palestino situado na costa do Mediterrâneo.',
    coords: [31.3547, 34.3088]
  },

  {
    title: 'Gaza',
    years: 'Faixa de Gaza',
    label: 'CIDADE',
    location: 'Cidade de Gaza',
    description: 'Principal cidade da Faixa de Gaza.',
    coords: [31.5017, 34.4668]
  },

  {
    title: 'Rafah',
    years: 'Faixa de Gaza',
    label: 'CIDADE',
    location: 'Rafah',
    description: 'Cidade localizada no extremo sul da Faixa de Gaza, próxima à fronteira com o Egito.',
    coords: [31.2969, 34.2436]
  },

  {
    title: 'Sul de Israel',
    years: 'Israel',
    label: 'REGIÃO',
    location: 'Sul de Israel',
    description: 'Área localizada próxima à Faixa de Gaza.',
    coords: [31.4500, 34.6500]
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
