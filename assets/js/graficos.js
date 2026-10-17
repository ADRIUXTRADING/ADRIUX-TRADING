/*
 * ADRIUX TRADING — Motor de gráficos educativos (SVG, sin dependencias)
 * Los gráficos son ilustrativos: datos generados para explicar conceptos,
 * no son datos reales de mercado.
 */
(function () {
  "use strict";

  // Generador pseudoaleatorio con semilla: el mismo gráfico se dibuja igual siempre.
  function prng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /*
   * ruta(inicio, tramos, opciones) → lista de cierres.
   * tramos: [[precioObjetivo, numeroDeVelas], ...]
   */
  function ruta(inicio, tramos, op) {
    op = op || {};
    const rnd = prng(op.semilla || 7);
    const ruido = op.ruido == null ? 0.35 : op.ruido;
    const out = [];
    let actual = inicio;
    tramos.forEach(function (t) {
      const objetivo = t[0], n = t[1];
      const paso = (objetivo - actual) / n;
      for (let i = 1; i <= n; i++) {
        const base = actual + paso * i;
        const r = i === n ? 0 : (rnd() - 0.5) * 2 * ruido * Math.max(Math.abs(paso), 1);
        out.push(base + r);
      }
      actual = objetivo;
    });
    return out;
  }

  /*
   * velas(cierres, opciones) → [{o,h,l,c,v}]
   * Cada elemento puede ser un número (cierre) o un array [o,h,l,c] explícito.
   */
  function velas(cierres, op) {
    op = op || {};
    const rnd = prng((op.semilla || 11) * 31);
    const mecha = op.mecha == null ? 0.6 : op.mecha;
    const out = [];
    let prev = op.apertura != null ? op.apertura : (typeof cierres[0] === "number" ? cierres[0] : cierres[0][0]);
    cierres.forEach(function (x, i) {
      let o, h, l, c;
      if (Array.isArray(x)) {
        o = x[0]; h = x[1]; l = x[2]; c = x[3];
      } else {
        o = i === 0 && op.apertura == null ? x - (rnd() - 0.5) : prev;
        c = x;
        const cuerpo = Math.abs(c - o);
        const ref = Math.max(cuerpo, op.rangoMin || 0.8);
        h = Math.max(o, c) + rnd() * ref * mecha;
        l = Math.min(o, c) - rnd() * ref * mecha;
      }
      const vBase = op.volumen ? op.volumen[i] : null;
      const v = vBase != null ? vBase : Math.round(400 + rnd() * 600 + Math.abs(c - o) * 120);
      out.push({ o: o, h: h, l: l, c: c, v: v });
      prev = c;
    });
    return out;
  }

  function vwap(vs) {
    let pv = 0, vol = 0;
    return vs.map(function (k) {
      const tp = (k.h + k.l + k.c) / 3;
      pv += tp * k.v; vol += k.v;
      return pv / vol;
    });
  }

  function ema(vs, n) {
    const a = 2 / (n + 1);
    let e = null;
    return vs.map(function (k) {
      e = e == null ? k.c : k.c * a + e * (1 - a);
      return e;
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch];
    });
  }

  function fmt(n) {
    const abs = Math.abs(n);
    return abs >= 1000 ? n.toFixed(0) : abs >= 100 ? n.toFixed(1) : n.toFixed(2);
  }

  const COL = {
    sube: "var(--sube)", baja: "var(--baja)", oro: "var(--gold)",
    azul: "var(--azul)", gris: "var(--muted)", violeta: "var(--violeta)"
  };
  function color(c) { return COL[c] || c || COL.oro; }

  /*
   * velasSVG(cfg)
   * cfg: { velas, titulo, lineas:[{y,texto,color,discontinua}], zonas:[{y1,y2,texto,color}],
   *        marcas:[{i,texto,pos:"arriba"|"abajo",color}], series:[{valores,texto,color}],
   *        volumen:bool, perfil:bool, nota }
   */
  function velasSVG(cfg) {
    const vs = cfg.velas;
    const W = 720, H = cfg.volumen ? 380 : 320;
    const mL = 10, mR = cfg.perfil ? 150 : 62, mT = 34, mB = cfg.volumen ? 86 : 22;
    const pw = W - mL - mR, ph = H - mT - mB;
    let min = Infinity, max = -Infinity;
    vs.forEach(function (k) { min = Math.min(min, k.l); max = Math.max(max, k.h); });
    (cfg.lineas || []).forEach(function (l) { min = Math.min(min, l.y); max = Math.max(max, l.y); });
    (cfg.zonas || []).forEach(function (z) { min = Math.min(min, z.y1, z.y2); max = Math.max(max, z.y1, z.y2); });
    (cfg.series || []).forEach(function (s) { s.valores.forEach(function (v) { if (v != null) { min = Math.min(min, v); max = Math.max(max, v); } }); });
    const pad = (max - min) * 0.1 || 1;
    min -= pad; max += pad;
    const n = vs.length, paso = pw / n, cw = Math.max(2, paso * 0.62);
    const X = function (i) { return mL + paso * i + paso / 2; };
    const Y = function (p) { return mT + (max - p) / (max - min) * ph; };
    const s = [];
    s.push('<svg class="grafico" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(cfg.titulo || "Gráfico") + '">');
    s.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" rx="12" fill="var(--grafico-fondo)"/>');
    if (cfg.titulo) s.push('<text x="14" y="22" class="g-titulo">' + esc(cfg.titulo) + "</text>");
    // Rejilla y eje de precios
    for (let g = 0; g <= 4; g++) {
      const p = min + (max - min) * g / 4, y = Y(p);
      s.push('<line x1="' + mL + '" x2="' + (mL + pw) + '" y1="' + y + '" y2="' + y + '" class="g-rejilla"/>');
      s.push('<text x="' + (mL + pw + 6) + '" y="' + (y + 4) + '" class="g-eje">' + fmt(p) + "</text>");
    }
    // Zonas
    (cfg.zonas || []).forEach(function (z) {
      const y1 = Y(Math.max(z.y1, z.y2)), y2 = Y(Math.min(z.y1, z.y2));
      const x0 = z.desde != null ? X(z.desde) - paso / 2 : mL;
      const x1 = z.hasta != null ? X(z.hasta) + paso / 2 : mL + pw;
      s.push('<rect x="' + x0 + '" y="' + y1 + '" width="' + (x1 - x0) + '" height="' + Math.max(2, y2 - y1) + '" fill="' + color(z.color) + '" opacity="0.16"/>');
      if (z.texto) s.push('<text x="' + (x0 + 6) + '" y="' + (y1 + 13) + '" class="g-texto" fill="' + color(z.color) + '">' + esc(z.texto) + "</text>");
    });
    // Perfil de volumen (histograma horizontal a la derecha)
    if (cfg.perfil) {
      const bins = 24, tam = (max - min) / bins, vol = new Array(bins).fill(0);
      vs.forEach(function (k) {
        const a = Math.max(0, Math.floor((k.l - min) / tam)), b = Math.min(bins - 1, Math.floor((k.h - min) / tam));
        for (let j = a; j <= b; j++) vol[j] += k.v / (b - a + 1);
      });
      const vmax = Math.max.apply(null, vol);
      const poc = vol.indexOf(vmax);
      // Área de valor: 70 % del volumen alrededor del POC
      const total = vol.reduce(function (x, y) { return x + y; }, 0);
      let lo = poc, hi = poc, acc = vol[poc];
      while (acc < total * 0.7 && (lo > 0 || hi < bins - 1)) {
        const abajo = lo > 0 ? vol[lo - 1] : -1, arriba = hi < bins - 1 ? vol[hi + 1] : -1;
        if (arriba >= abajo) { hi++; acc += vol[hi]; } else { lo--; acc += vol[lo]; }
      }
      const x0 = mL + pw + 56, ancho = W - x0 - 10;
      vol.forEach(function (v, j) {
        const yTop = Y(min + tam * (j + 1)), hgt = Y(min + tam * j) - yTop;
        const enVA = j >= lo && j <= hi;
        s.push('<rect x="' + x0 + '" y="' + (yTop + 0.5) + '" width="' + (v / vmax * ancho) + '" height="' + Math.max(1, hgt - 1) + '" fill="' + (j === poc ? "var(--gold)" : enVA ? "var(--azul)" : "var(--muted)") + '" opacity="' + (enVA ? 0.75 : 0.35) + '"/>');
      });
      const yPoc = Y(min + tam * (poc + 0.5)), yVah = Y(min + tam * (hi + 1)), yVal = Y(min + tam * lo);
      s.push('<line x1="' + mL + '" x2="' + (mL + pw) + '" y1="' + yPoc + '" y2="' + yPoc + '" stroke="var(--gold)" stroke-width="1.5"/>');
      s.push('<text x="' + (mL + 6) + '" y="' + (yPoc - 4) + '" class="g-texto" fill="var(--gold)">POC</text>');
      [[yVah, "VAH"], [yVal, "VAL"]].forEach(function (p) {
        s.push('<line x1="' + mL + '" x2="' + (mL + pw) + '" y1="' + p[0] + '" y2="' + p[0] + '" stroke="var(--azul)" stroke-dasharray="5 4"/>');
        s.push('<text x="' + (mL + 6) + '" y="' + (p[0] - 4) + '" class="g-texto" fill="var(--azul)">' + p[1] + "</text>");
      });
    }
    // Líneas horizontales
    (cfg.lineas || []).forEach(function (l) {
      const y = Y(l.y), c = color(l.color);
      const x0 = l.desde != null ? X(l.desde) : mL, x1 = l.hasta != null ? X(l.hasta) : mL + pw;
      s.push('<line x1="' + x0 + '" x2="' + x1 + '" y1="' + y + '" y2="' + y + '" stroke="' + c + '" stroke-width="1.5"' + (l.discontinua ? ' stroke-dasharray="6 4"' : "") + "/>");
      if (l.texto) s.push('<text x="' + (x1 - 4) + '" y="' + (y - 5) + '" text-anchor="end" class="g-texto" fill="' + c + '">' + esc(l.texto) + "</text>");
    });
    // Series (VWAP, medias, etc.)
    (cfg.series || []).forEach(function (se) {
      let d = "";
      se.valores.forEach(function (v, i) { if (v != null) d += (d ? "L" : "M") + X(i).toFixed(1) + " " + Y(v).toFixed(1); });
      s.push('<path d="' + d + '" fill="none" stroke="' + color(se.color) + '" stroke-width="2"' + (se.discontinua ? ' stroke-dasharray="5 4"' : "") + "/>");
    });
    // Velas
    vs.forEach(function (k, i) {
      const c = k.c >= k.o ? COL.sube : COL.baja, x = X(i);
      const yo = Y(k.o), yc = Y(k.c);
      s.push('<line x1="' + x + '" x2="' + x + '" y1="' + Y(k.h) + '" y2="' + Y(k.l) + '" stroke="' + c + '" stroke-width="1.2"/>');
      s.push('<rect x="' + (x - cw / 2) + '" y="' + Math.min(yo, yc) + '" width="' + cw + '" height="' + Math.max(1.2, Math.abs(yc - yo)) + '" fill="' + c + '"/>');
    });
    // Volumen
    if (cfg.volumen) {
      const vmax = Math.max.apply(null, vs.map(function (k) { return k.v; }));
      const base = H - 14, alto = mB - 30;
      s.push('<text x="' + mL + '" y="' + (base - alto - 4) + '" class="g-eje">Volumen</text>');
      vs.forEach(function (k, i) {
        const h = k.v / vmax * alto;
        s.push('<rect x="' + (X(i) - cw / 2) + '" y="' + (base - h) + '" width="' + cw + '" height="' + h + '" fill="' + (k.c >= k.o ? COL.sube : COL.baja) + '" opacity="0.55"/>');
      });
    }
    // Marcas (flechas y etiquetas)
    (cfg.marcas || []).forEach(function (m) {
      const k = vs[m.i], x = X(m.i), c = color(m.color);
      if (m.pos === "abajo") {
        const y = Y(k.l) + 8;
        s.push('<path d="M' + x + " " + y + " l-6 10 h12 z" + '" fill="' + c + '"/>');
        s.push('<text x="' + x + '" y="' + (y + 24) + '" text-anchor="middle" class="g-texto" fill="' + c + '">' + esc(m.texto) + "</text>");
      } else {
        const y = Y(k.h) - 8;
        s.push('<path d="M' + x + " " + y + " l-6 -10 h12 z" + '" fill="' + c + '"/>');
        s.push('<text x="' + x + '" y="' + (y - 16) + '" text-anchor="middle" class="g-texto" fill="' + c + '">' + esc(m.texto) + "</text>");
      }
    });
    // Leyenda de series
    let lx = W - mR - 8;
    (cfg.series || []).slice().reverse().forEach(function (se) {
      if (!se.texto) return;
      const w = se.texto.length * 6.6 + 18;
      lx -= w;
      s.push('<rect x="' + lx + '" y="13" width="10" height="3" fill="' + color(se.color) + '"/>');
      s.push('<text x="' + (lx + 14) + '" y="19" class="g-eje">' + esc(se.texto) + "</text>");
    });
    s.push("</svg>");
    return figura(s.join(""), cfg.nota);
  }

  /* lineaSVG(cfg): { valores, titulo, color, etiquetas:[{i,texto}], cero:bool, nota, formato } */
  function lineaSVG(cfg) {
    const v = cfg.valores, W = 720, H = 280, mL = 10, mR = 70, mT = 34, mB = 24;
    const pw = W - mL - mR, ph = H - mT - mB;
    let min = Math.min.apply(null, v), max = Math.max.apply(null, v);
    (cfg.extra || []).forEach(function (s2) { min = Math.min(min, Math.min.apply(null, s2.valores)); max = Math.max(max, Math.max.apply(null, s2.valores)); });
    const pad = (max - min) * 0.1 || 1; min -= pad; max += pad;
    const X = function (i) { return mL + pw * i / (v.length - 1); };
    const Y = function (p) { return mT + (max - p) / (max - min) * ph; };
    const f = cfg.formato || function (x) { return fmt(x); };
    const s = [];
    s.push('<svg class="grafico" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(cfg.titulo || "Gráfico") + '">');
    s.push('<rect width="' + W + '" height="' + H + '" rx="12" fill="var(--grafico-fondo)"/>');
    if (cfg.titulo) s.push('<text x="14" y="22" class="g-titulo">' + esc(cfg.titulo) + "</text>");
    for (let g = 0; g <= 4; g++) {
      const p = min + (max - min) * g / 4, y = Y(p);
      s.push('<line x1="' + mL + '" x2="' + (mL + pw) + '" y1="' + y + '" y2="' + y + '" class="g-rejilla"/>');
      s.push('<text x="' + (mL + pw + 6) + '" y="' + (y + 4) + '" class="g-eje">' + esc(f(p)) + "</text>");
    }
    const todas = [{ valores: v, color: cfg.color, texto: cfg.texto }].concat(cfg.extra || []);
    todas.forEach(function (se) {
      let d = "";
      se.valores.forEach(function (p, i) { d += (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(p).toFixed(1); });
      s.push('<path d="' + d + '" fill="none" stroke="' + color(se.color) + '" stroke-width="2.2"/>');
    });
    let lx = W - mR - 8;
    todas.slice().reverse().forEach(function (se) {
      if (!se.texto) return;
      const w = se.texto.length * 6.6 + 18; lx -= w;
      s.push('<rect x="' + lx + '" y="13" width="10" height="3" fill="' + color(se.color) + '"/>');
      s.push('<text x="' + (lx + 14) + '" y="19" class="g-eje">' + esc(se.texto) + "</text>");
    });
    (cfg.etiquetas || []).forEach(function (e) {
      const x = X(e.i), y = Y(v[e.i]);
      s.push('<circle cx="' + x + '" cy="' + y + '" r="4" fill="var(--gold)"/>');
      s.push('<text x="' + x + '" y="' + (y - 10) + '" text-anchor="middle" class="g-texto" fill="var(--gold)">' + esc(e.texto) + "</text>");
    });
    s.push("</svg>");
    return figura(s.join(""), cfg.nota);
  }

  function figura(svg, nota) {
    return '<figure class="figura">' + svg + (nota ? "<figcaption>" + nota + "</figcaption>" : "") + "</figure>";
  }

  window.ADRIUX_G = { prng: prng, ruta: ruta, velas: velas, vwap: vwap, ema: ema, velasSVG: velasSVG, lineaSVG: lineaSVG };
})();
