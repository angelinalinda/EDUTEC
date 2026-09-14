/* ============================================================
   CORES DAS BANDEIRAS — PARTIDA (jogar.html)
   Cada bandeira aparece com UMA parte sem cor (uma faixa, a
   cruz, o círculo ou o fundo, dependendo do tipo). O jogador
   não vê essa cor: precisa adivinhar de memória e reproduzi-la
   no seletor (anel de matiz + diamante de saturação/brilho,
   desenhados em <canvas>, mais sliders H/S/B e R/G/B). Ao
   confirmar, a parte que faltava é revelada com a cor real.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Tema claro/escuro (mesmo padrão do site) ---------- */
  var root = document.documentElement;
  var THEME_KEY = 'geopoliso-theme';

  function applyTheme(theme) { root.setAttribute('data-theme', theme); }

  function initTheme() {
    var saved = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(saved);
    var toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(next);
        localStorage.setItem(THEME_KEY, next);
      });
    }
  }

  /* ---------- Sala (opcional, vinda da introdução) ---------- */
  function initRoomTag() {
    var params = new URLSearchParams(window.location.search);
    var room = params.get('room');
    var tag = document.getElementById('roomTag');
    if (room && tag) {
      tag.textContent = 'Sala: ' + room.toUpperCase();
    }
  }

  /* ============================================================
     MATEMÁTICA DE COR (HSB <-> RGB <-> HEX)
     ============================================================ */
  function hsbToRgb(h, s, b) {
    s = s / 100; b = b / 100;
    function k(n) { return (n + h / 60) % 6; }
    function f(n) {
      var kk = k(n);
      return b - b * s * Math.max(Math.min(kk, 4 - kk, 1), 0);
    }
    return [Math.round(f(5) * 255), Math.round(f(3) * 255), Math.round(f(1) * 255)];
  }

  function rgbToHsb(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var d = max - min;
    var h = 0;
    if (d !== 0) {
      if (max === r) h = 60 * (((g - b) / d) % 6);
      else if (max === g) h = 60 * ((b - r) / d + 2);
      else h = 60 * ((r - g) / d + 4);
    }
    if (h < 0) h += 360;
    var s = max === 0 ? 0 : d / max;
    var bri = max;
    return [h, s * 100, bri * 100];
  }

  function rgbToHex(r, g, b) {
    function c(n) { var s = Math.round(n).toString(16).toUpperCase(); return s.length < 2 ? '0' + s : s; }
    return '#' + c(r) + c(g) + c(b);
  }

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    return [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16)
    ];
  }

  function colorDistance(hexA, hexB) {
    var a = hexToRgb(hexA), b = hexToRgb(hexB);
    var dr = a[0] - b[0], dg = a[1] - b[1], db = a[2] - b[2];
    return Math.sqrt(dr * dr + dg * dg + db * db);
  }

  var MATCH_THRESHOLD = 95; // distância máxima (0-441) para considerar "Correto". Ajuste aqui se quiser mais/menos tolerância.

  /* ============================================================
     BANCO DE BANDEIRAS
     Cada entrada descreve como desenhar a bandeira (faixas
     horizontais/verticais, cruz nórdica ou círculo central) e
     qual parte dela (targetIndex ou targetRegion) fica sem cor
     na rodada — essa é a cor que o jogador precisa adivinhar.
     Não é a lista completa dos ~195 países reconhecidos pela
     ONU — isso exigiria reproduzir brasões e emblemas com
     precisão, o que não é confiável sem os arquivos de imagem
     oficiais. A lista cobre um conjunto amplo e real de
     bandeiras e foi escrita para ser fácil de estender (basta
     adicionar novos objetos no mesmo formato).
     ============================================================ */
  var FLAGS = [
    { name: 'Alemanha', type: 'h', colors: ['#000000', '#DD0000', '#FFCE00'], targetIndex: 1 },
    { name: 'Rússia', type: 'h', colors: ['#FFFFFF', '#0039A6', '#D52B1E'], targetIndex: 1 },
    { name: 'Países Baixos', type: 'h', colors: ['#AE1C28', '#FFFFFF', '#21468B'], targetIndex: 2 },
    { name: 'Bulgária', type: 'h', colors: ['#FFFFFF', '#00966E', '#D62612'], targetIndex: 1 },
    { name: 'Hungria', type: 'h', colors: ['#CE2939', '#FFFFFF', '#477050'], targetIndex: 0 },
    { name: 'Áustria', type: 'h', colors: ['#ED2939', '#FFFFFF', '#ED2939'], targetIndex: 0 },
    { name: 'Iêmen', type: 'h', colors: ['#CE1126', '#FFFFFF', '#000000'], targetIndex: 0 },
    { name: 'Egito', type: 'h', colors: ['#CE1126', '#FFFFFF', '#000000'], targetIndex: 2 },
    { name: 'Armênia', type: 'h', colors: ['#D90012', '#0033A0', '#F2A800'], targetIndex: 1 },
    { name: 'Serra Leoa', type: 'h', colors: ['#1EB53A', '#FFFFFF', '#0072C6'], targetIndex: 0 },
    { name: 'Gabão', type: 'h', colors: ['#009E60', '#FCD116', '#3A75C4'], targetIndex: 1 },
    { name: 'Lituânia', type: 'h', colors: ['#FDB913', '#006A44', '#C1272D'], targetIndex: 0 },
    { name: 'Estônia', type: 'h', colors: ['#0072CE', '#000000', '#FFFFFF'], targetIndex: 0 },
    { name: 'Índia', type: 'h', colors: ['#FF9933', '#FFFFFF', '#138808'], targetIndex: 0 },
    { name: 'Bolívia', type: 'h', colors: ['#D52B1E', '#F9E300', '#007A33'], targetIndex: 1 },
    { name: 'Sudão', type: 'h', colors: ['#D21034', '#FFFFFF', '#000000'], targetIndex: 0 },
    { name: 'Iraque', type: 'h', colors: ['#CE1126', '#FFFFFF', '#000000'], targetIndex: 0 },
    { name: 'Colômbia', type: 'h', colors: ['#FCD116', '#003893', '#CE1126'], targetIndex: 0 },
    { name: 'Ucrânia', type: 'h', colors: ['#0057B7', '#FFD700'], targetIndex: 0 },
    { name: 'Polônia', type: 'h', colors: ['#FFFFFF', '#DC143C'], targetIndex: 1 },
    { name: 'Indonésia', type: 'h', colors: ['#CE1126', '#FFFFFF'], targetIndex: 0 },
    { name: 'Letônia', type: 'h', colors: ['#9E3039', '#FFFFFF', '#9E3039'], targetIndex: 0 },

    { name: 'França', type: 'v', colors: ['#0055A4', '#FFFFFF', '#EF4135'], targetIndex: 0 },
    { name: 'Itália', type: 'v', colors: ['#008C45', '#FFFFFF', '#CD212A'], targetIndex: 0 },
    { name: 'Bélgica', type: 'v', colors: ['#000000', '#FAE042', '#ED2939'], targetIndex: 1 },
    { name: 'Irlanda', type: 'v', colors: ['#169B62', '#FFFFFF', '#FF883E'], targetIndex: 2 },
    { name: 'Romênia', type: 'v', colors: ['#002B7F', '#FCD116', '#CE1126'], targetIndex: 0 },
    { name: 'Chade', type: 'v', colors: ['#002664', '#FECB00', '#C60C30'], targetIndex: 1 },
    { name: 'Mali', type: 'v', colors: ['#14B53A', '#FCD116', '#CE1126'], targetIndex: 0 },
    { name: 'Guiné', type: 'v', colors: ['#CE1126', '#FCD116', '#009460'], targetIndex: 2 },
    { name: 'Senegal', type: 'v', colors: ['#00853F', '#FDEF42', '#E31B23'], targetIndex: 1 },
    { name: 'Camarões', type: 'v', colors: ['#007A5E', '#CE1126', '#FCD116'], targetIndex: 0 },
    { name: 'Nigéria', type: 'v', colors: ['#008751', '#FFFFFF', '#008751'], targetIndex: 0 },
    { name: 'México', type: 'v', colors: ['#006847', '#FFFFFF', '#CE1126'], targetIndex: 2 },
    { name: 'Costa do Marfim', type: 'v', colors: ['#F77F00', '#FFFFFF', '#009E60'], targetIndex: 0 },
    { name: 'Peru', type: 'v', colors: ['#D91023', '#FFFFFF', '#D91023'], targetIndex: 0 },

    { name: 'Dinamarca', type: 'cross', bg: '#C60C30', cross: '#FFFFFF', offset: true, targetRegion: 'bg' },
    { name: 'Suécia', type: 'cross', bg: '#006AA7', cross: '#FECC00', offset: true, targetRegion: 'bg' },
    { name: 'Noruega', type: 'cross', bg: '#EF2B2D', cross: '#FFFFFF', borderColor: '#002868', offset: true, targetRegion: 'border' },
    { name: 'Finlândia', type: 'cross', bg: '#FFFFFF', cross: '#002F6C', offset: true, targetRegion: 'cross' },
    { name: 'Islândia', type: 'cross', bg: '#02529C', cross: '#FFFFFF', borderColor: '#DC1E35', offset: true, targetRegion: 'bg' },
    { name: 'Suíça', type: 'cross', bg: '#D52B1E', cross: '#FFFFFF', offset: false, targetRegion: 'bg' },

    { name: 'Japão', type: 'circle', bg: '#FFFFFF', circle: '#BC002D', offsetX: 0.5, targetRegion: 'circle' },
    { name: 'Bangladesh', type: 'circle', bg: '#006A4E', circle: '#F42A41', offsetX: 0.45, targetRegion: 'bg' },
    { name: 'Palau', type: 'circle', bg: '#4AADD6', circle: '#FFDE00', offsetX: 0.42, targetRegion: 'bg' }
  ];

  function getTargetHex(f) {
    if (f.type === 'h' || f.type === 'v') return f.colors[f.targetIndex];
    if (f.type === 'cross') {
      if (f.targetRegion === 'bg') return f.bg;
      if (f.targetRegion === 'cross') return f.cross;
      if (f.targetRegion === 'border') return f.borderColor;
    }
    if (f.type === 'circle') {
      if (f.targetRegion === 'bg') return f.bg;
      if (f.targetRegion === 'circle') return f.circle;
    }
    return '#000000';
  }

  var MISSING_DEFS =
    '<defs><pattern id="missingPattern" width="12" height="12" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">' +
    '<rect width="12" height="12" fill="#c9c9c9"/>' +
    '<line x1="0" y1="0" x2="0" y2="12" stroke="#9a9a9a" stroke-width="7"/>' +
    '</pattern></defs>';
  var MISSING_FILL = 'url(#missingPattern)';

  /* reveal=false -> a parte-alvo aparece com a textura de "falta cor".
     reveal=true  -> a bandeira aparece completa, com a cor real revelada. */
  function renderFlagSVG(f, reveal) {
    var W = 300, H = 200;
    var inner = MISSING_DEFS;

    if (f.type === 'h') {
      var n = f.colors.length, bandH = H / n;
      f.colors.forEach(function (c, i) {
        var isTarget = i === f.targetIndex;
        var fill = (isTarget && !reveal) ? MISSING_FILL : c;
        inner += '<rect x="0" y="' + (i * bandH) + '" width="' + W + '" height="' + bandH + '" fill="' + fill + '"/>';
        if (isTarget && !reveal) {
          inner += '<text x="' + (W / 2) + '" y="' + (i * bandH + bandH / 2) + '" text-anchor="middle" dominant-baseline="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="' + (bandH * 0.6) + '" fill="#7a7a7a">?</text>';
        }
      });
    } else if (f.type === 'v') {
      var nv = f.colors.length, bandW = W / nv;
      f.colors.forEach(function (c, i) {
        var isTarget = i === f.targetIndex;
        var fill = (isTarget && !reveal) ? MISSING_FILL : c;
        inner += '<rect x="' + (i * bandW) + '" y="0" width="' + bandW + '" height="' + H + '" fill="' + fill + '"/>';
        if (isTarget && !reveal) {
          inner += '<text x="' + (i * bandW + bandW / 2) + '" y="' + (H / 2) + '" text-anchor="middle" dominant-baseline="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="' + (bandW * 0.9) + '" fill="#7a7a7a">?</text>';
        }
      });
    } else if (f.type === 'cross') {
      var vertX = f.offset ? W * 0.32 : W * 0.42;
      var vertW = W * 0.16;
      var horizY = H * 0.42;
      var horizH = H * 0.16;

      var bgFill = (f.targetRegion === 'bg' && !reveal) ? MISSING_FILL : f.bg;
      inner += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="' + bgFill + '"/>';

      if (f.borderColor) {
        var borderFill = (f.targetRegion === 'border' && !reveal) ? MISSING_FILL : f.borderColor;
        inner += '<rect x="' + (vertX - 6) + '" y="0" width="' + (vertW + 12) + '" height="' + H + '" fill="' + borderFill + '"/>';
        inner += '<rect x="0" y="' + (horizY - 6) + '" width="' + W + '" height="' + (horizH + 12) + '" fill="' + borderFill + '"/>';
      }

      var crossFill = (f.targetRegion === 'cross' && !reveal) ? MISSING_FILL : f.cross;
      inner += '<rect x="' + vertX + '" y="0" width="' + vertW + '" height="' + H + '" fill="' + crossFill + '"/>';
      inner += '<rect x="0" y="' + horizY + '" width="' + W + '" height="' + horizH + '" fill="' + crossFill + '"/>';

      if (!reveal && (f.targetRegion === 'bg' || f.targetRegion === 'cross')) {
        var qx = f.targetRegion === 'bg' ? W * 0.78 : (vertX + vertW / 2);
        var qy = f.targetRegion === 'bg' ? H * 0.78 : (horizY + horizH / 2);
        inner += '<text x="' + qx + '" y="' + qy + '" text-anchor="middle" dominant-baseline="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="22" fill="#7a7a7a">?</text>';
      }
    } else if (f.type === 'circle') {
      var cx = W * (f.offsetX || 0.5), cy = H * 0.5, r = H * 0.3;
      var cBgFill = (f.targetRegion === 'bg' && !reveal) ? MISSING_FILL : f.bg;
      inner += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="' + cBgFill + '"/>';
      var cCircleFill = (f.targetRegion === 'circle' && !reveal) ? MISSING_FILL : f.circle;
      inner += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + cCircleFill + '"/>';
      if (!reveal && f.targetRegion === 'circle') {
        inner += '<text x="' + cx + '" y="' + cy + '" text-anchor="middle" dominant-baseline="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="' + (r * 0.9) + '" fill="#7a7a7a">?</text>';
      } else if (!reveal && f.targetRegion === 'bg') {
        inner += '<text x="' + (W * 0.15) + '" y="' + (H * 0.18) + '" text-anchor="middle" dominant-baseline="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="22" fill="#7a7a7a">?</text>';
      }
    }

    return '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' + inner + '</svg>';
  }

  /* ============================================================
     SELETOR DE COR — anel de matiz + diamante de saturação/brilho
     ============================================================ */
  var wheel = {
    hueCanvas: null, sbCanvas: null,
    hueCtx: null, sbCtx: null,
    size: 220,
    outerR: 0, innerR: 0, cx: 0, cy: 0,
    half: 0 // metade da diagonal do quadrado interno (antes da rotação)
  };

  function initWheelGeometry() {
    wheel.hueCanvas = document.getElementById('hueRingCanvas');
    wheel.sbCanvas = document.getElementById('sbDiamondCanvas');
    wheel.hueCtx = wheel.hueCanvas.getContext('2d');
    wheel.sbCtx = wheel.sbCanvas.getContext('2d');
    wheel.size = wheel.hueCanvas.width;
    wheel.cx = wheel.size / 2;
    wheel.cy = wheel.size / 2;
    wheel.outerR = wheel.size * 0.48;
    wheel.innerR = wheel.size * 0.31;
    wheel.half = wheel.innerR * Math.SQRT1_2; // innerR / sqrt(2)
  }

  function drawHueRing() {
    var ctx = wheel.hueCtx;
    var size = wheel.size;
    var img = ctx.createImageData(size, size);
    var data = img.data;
    var cx = wheel.cx, cy = wheel.cy, outerR = wheel.outerR, innerR = wheel.innerR;

    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        var dx = x - cx, dy = y - cy;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var idx = (y * size + x) * 4;
        if (dist >= innerR && dist <= outerR) {
          var angle = Math.atan2(dy, dx) * 180 / Math.PI;
          angle = (angle + 360) % 360;
          var rgb = hsbToRgb(angle, 100, 100);
          data[idx] = rgb[0]; data[idx + 1] = rgb[1]; data[idx + 2] = rgb[2]; data[idx + 3] = 255;
        } else {
          data[idx + 3] = 0;
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  function drawSbDiamond(hue) {
    var ctx = wheel.sbCtx;
    var size = wheel.size;
    var img = ctx.createImageData(size, size);
    var data = img.data;
    var cx = wheel.cx, cy = wheel.cy, h = wheel.half;
    var c45 = Math.SQRT1_2; // cos(45) = sin(45)

    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        var dx = x - cx, dy = y - cy;
        var u = dx * c45 + dy * c45;
        var v = -dx * c45 + dy * c45;
        var idx = (y * size + x) * 4;
        if (u >= -h && u <= h && v >= -h && v <= h) {
          var s = ((u + h) / (2 * h)) * 100;
          var b = ((h - v) / (2 * h)) * 100;
          var rgb = hsbToRgb(hue, s, b);
          data[idx] = rgb[0]; data[idx + 1] = rgb[1]; data[idx + 2] = rgb[2]; data[idx + 3] = 255;
        } else {
          data[idx + 3] = 0;
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  function positionHueIndicator(hue) {
    var el = document.getElementById('hueIndicator');
    var midR = (wheel.outerR + wheel.innerR) / 2;
    var rad = hue * Math.PI / 180;
    var x = wheel.cx + midR * Math.cos(rad);
    var y = wheel.cy + midR * Math.sin(rad);
    el.style.left = x + 'px';
    el.style.top = y + 'px';
  }

  function positionSbIndicator(s, b) {
    var el = document.getElementById('sbIndicator');
    var h = wheel.half;
    var u = (s / 100) * (2 * h) - h;
    var v = h - (b / 100) * (2 * h);
    var c45 = Math.SQRT1_2;
    var dx = c45 * (u - v);
    var dy = c45 * (u + v);
    el.style.left = (wheel.cx + dx) + 'px';
    el.style.top = (wheel.cy + dy) + 'px';
  }

  function angleFromEvent(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var scaleX = wheel.size / rect.width;
    var scaleY = wheel.size / rect.height;
    var px = (evt.clientX - rect.left) * scaleX;
    var py = (evt.clientY - rect.top) * scaleY;
    var dx = px - wheel.cx, dy = py - wheel.cy;
    var angle = Math.atan2(dy, dx) * 180 / Math.PI;
    return (angle + 360) % 360;
  }

  function sbFromEvent(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var scaleX = wheel.size / rect.width;
    var scaleY = wheel.size / rect.height;
    var px = (evt.clientX - rect.left) * scaleX;
    var py = (evt.clientY - rect.top) * scaleY;
    var dx = px - wheel.cx, dy = py - wheel.cy;
    var c45 = Math.SQRT1_2;
    var u = dx * c45 + dy * c45;
    var v = -dx * c45 + dy * c45;
    var h = wheel.half;
    u = Math.max(-h, Math.min(h, u));
    v = Math.max(-h, Math.min(h, v));
    var s = ((u + h) / (2 * h)) * 100;
    var b = ((h - v) / (2 * h)) * 100;
    return [s, b];
  }

  /* ============================================================
     ESTADO DA COR ATUAL + SLIDERS
     ============================================================ */
  var color = { h: 214, s: 14, b: 100 };

  var els = {};

  function cacheEls() {
    els.sliderH = document.getElementById('slider-h');
    els.sliderS = document.getElementById('slider-s');
    els.sliderB = document.getElementById('slider-b');
    els.valueH = document.getElementById('value-h');
    els.valueS = document.getElementById('value-s');
    els.valueB = document.getElementById('value-b');

    els.colorPreview = document.getElementById('colorPreview');

    els.flagVisual = document.getElementById('flagVisual');
    els.answerLabel = document.getElementById('answerLabel');
    els.answerSwatch = document.getElementById('answerSwatch');
    els.answerHex = document.getElementById('answerHex');
    els.answerVerdict = document.getElementById('answerVerdict');
    els.roundBadge = document.getElementById('roundBadge');
    els.confirmBtn = document.getElementById('confirmBtn');
  }

  function currentHex() {
    var rgb = hsbToRgb(color.h, color.s, color.b);
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
  }

  function refreshSliderTracks() {
    var hueRgb = hsbToRgb(color.h, 100, 100);
    var hueHex = rgbToHex(hueRgb[0], hueRgb[1], hueRgb[2]);

    els.sliderH.style.background = 'linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)';
    els.sliderS.style.background = 'linear-gradient(to right, #FFFFFF, ' + hueHex + ')';
    els.sliderB.style.background = 'linear-gradient(to right, #000000, #FFFFFF)';
  }

  function refreshColorPreview() {
    els.colorPreview.style.background = currentHex();
  }

  function syncUIFromColor(skipDiamondRedraw) {
    els.sliderH.value = Math.round(color.h);
    els.sliderS.value = Math.round(color.s);
    els.sliderB.value = Math.round(color.b);
    els.valueH.textContent = Math.round(color.h);
    els.valueS.textContent = Math.round(color.s);
    els.valueB.textContent = Math.round(color.b);

    if (!skipDiamondRedraw) drawSbDiamond(color.h);
    positionHueIndicator(color.h);
    positionSbIndicator(color.s, color.b);
    refreshSliderTracks();
    refreshColorPreview();
  }

  function setFromHSB(h, s, b, skipDiamondRedraw) {
    color.h = ((h % 360) + 360) % 360;
    color.s = Math.max(0, Math.min(100, s));
    color.b = Math.max(0, Math.min(100, b));
    syncUIFromColor(skipDiamondRedraw);
  }

  function initSliders() {
    els.sliderH.addEventListener('input', function () { setFromHSB(Number(els.sliderH.value), color.s, color.b); });
    els.sliderS.addEventListener('input', function () { setFromHSB(color.h, Number(els.sliderS.value), color.b, true); });
    els.sliderB.addEventListener('input', function () { setFromHSB(color.h, color.s, Number(els.sliderB.value), true); });

    var buttons = document.querySelectorAll('.slider-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var channel = btn.getAttribute('data-channel');
        var step = Number(btn.getAttribute('data-step'));
        if (channel === 'h') setFromHSB(color.h + step, color.s, color.b);
        else if (channel === 's') setFromHSB(color.h, color.s + step, color.b, true);
        else if (channel === 'b') setFromHSB(color.h, color.s, color.b + step, true);
      });
    });
  }

  function initWheelInteraction() {
    var dragTarget = null; // 'hue' | 'sb' | null

    function onMove(evt) {
      if (!dragTarget) return;
      evt.preventDefault();
      if (dragTarget === 'hue') {
        var angle = angleFromEvent(wheel.hueCanvas, evt);
        setFromHSB(angle, color.s, color.b, false);
      } else if (dragTarget === 'sb') {
        var sb = sbFromEvent(wheel.sbCanvas, evt);
        setFromHSB(color.h, sb[0], sb[1], true);
      }
    }

    function onDown(canvasName, evt) {
      dragTarget = canvasName;
      onMove(evt);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    }

    function onUp() {
      dragTarget = null;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    }

    function distFromCenter(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      var scaleX = wheel.size / rect.width;
      var scaleY = wheel.size / rect.height;
      var px = (evt.clientX - rect.left) * scaleX;
      var py = (evt.clientY - rect.top) * scaleY;
      var dx = px - wheel.cx, dy = py - wheel.cy;
      return Math.sqrt(dx * dx + dy * dy);
    }

    var wrap = document.getElementById('wheelWrap');
    wrap.addEventListener('pointerdown', function (evt) {
      var dist = distFromCenter(wheel.hueCanvas, evt);
      if (dist >= wheel.innerR && dist <= wheel.outerR) {
        onDown('hue', evt);
      } else if (dist < wheel.innerR) {
        onDown('sb', evt);
      }
    });
  }

  /* ============================================================
     RODADAS
     ============================================================ */
  var ROUND_COUNT = 10;
  var game = { rounds: [], index: 0, hits: 0, answered: false };

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function startGame() {
    var pool = shuffle(FLAGS);
    game.rounds = pool.slice(0, Math.min(ROUND_COUNT, pool.length));
    game.index = 0;
    game.hits = 0;
    game.answered = false;
    loadRound();
  }

  function loadRound() {
    var flag = game.rounds[game.index];
    els.flagVisual.innerHTML = renderFlagSVG(flag, false);
    els.answerLabel.textContent = flag.name;
    els.answerSwatch.style.display = 'none';
    els.answerHex.style.display = 'none';
    els.answerVerdict.textContent = '';
    els.answerVerdict.className = 'answer-verdict';
    els.roundBadge.textContent = (game.index + 1) + '/' + game.rounds.length;
    els.confirmBtn.textContent = 'Confirmar';
    game.answered = false;

    // mantém a última cor escolhida como ponto de partida da próxima rodada
    syncUIFromColor();
  }

  function submitAnswer() {
    var flag = game.rounds[game.index];

    if (!game.answered) {
      var targetHex = getTargetHex(flag);
      var pickedHex = currentHex();
      var distance = colorDistance(pickedHex, targetHex);
      var correct = distance <= MATCH_THRESHOLD;

      // revela a bandeira completa com a cor real no lugar da parte que faltava
      els.flagVisual.innerHTML = renderFlagSVG(flag, true);

      if (correct) {
        game.hits += 1;
        els.answerSwatch.style.display = 'none';
        els.answerHex.style.display = 'none';
        els.answerVerdict.textContent = 'Correto + 20';
        els.answerVerdict.className = 'answer-verdict correct';
      } else {
        els.answerSwatch.style.background = targetHex;
        els.answerSwatch.style.display = 'inline-block';
        els.answerHex.textContent = targetHex.replace('#', '');
        els.answerHex.style.display = 'inline-block';
        els.answerVerdict.textContent = 'Incorreto';
        els.answerVerdict.className = 'answer-verdict incorrect';
      }

      game.answered = true;
      var isLast = game.index === game.rounds.length - 1;
      els.confirmBtn.textContent = isLast ? 'Ver resultado' : 'Próxima bandeira';
      return;
    }

    // segundo clique: avança de rodada ou termina o jogo
    if (game.index < game.rounds.length - 1) {
      game.index += 1;
      loadRound();
    } else {
      finishGame();
    }
  }

  function finishGame() {
    try {
      sessionStorage.setItem('geopoliso-flags-score', JSON.stringify({
        hits: game.hits,
        total: game.rounds.length
      }));
    } catch (e) { /* sessionStorage indisponível: segue sem persistir */ }
    window.location.href = 'resultado.html';
  }

  /* ============================================================
     INICIALIZAÇÃO
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initRoomTag();
    cacheEls();
    initWheelGeometry();
    drawHueRing();
    drawSbDiamond(color.h);
    initSliders();
    initWheelInteraction();

    els.confirmBtn.addEventListener('click', submitAnswer);

    syncUIFromColor();
    startGame();
  });
})();