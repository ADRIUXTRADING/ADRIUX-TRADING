/* ADRIUX TRADING — Herramientas: calculadora, simulador de fondeo, indicadores y asistente */
(function () {
  "use strict";

  const $ = function (id) { return document.getElementById(id); };
  const num = function (id) { const el = $(id); return el ? Number(String(el.value).replace(",", ".")) : NaN; };
  const usd = function (n) {
    return (n < 0 ? "−$" : "$") + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  const precio = function (n) { return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  const esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  };

  const INSTRUMENTOS = {
    MNQ: { nombre: "MNQ — Micro E-mini Nasdaq-100", punto: 2 },
    NQ: { nombre: "NQ — E-mini Nasdaq-100", punto: 20 },
    MES: { nombre: "MES — Micro E-mini S&P 500", punto: 5 },
    ES: { nombre: "ES — E-mini S&P 500", punto: 50 }
  };
  const TICK = 0.25;

  /* ─────────────── Calculadora de riesgo ─────────────── */

  function instrumento() { return INSTRUMENTOS[$("calc-instrumento").value] || INSTRUMENTOS.MNQ; }

  function actualizarInfoInstrumento() {
    const ins = instrumento();
    $("calc-info").textContent = ins.nombre + ": $" + ins.punto + " por punto · tick 0,25 = " + usd(ins.punto * TICK) + ".";
  }

  // Modo 1: riesgo de una operación (conserva el comportamiento original: contratos × puntos × valor)
  function calculateRisk() {
    const ins = instrumento();
    const contratos = num("contracts");
    const puntos = num("points");
    const objetivo = num("calc-objetivo");
    const comision = num("calc-comision") || 0;
    const entrada = num("calc-entrada");
    const dir = $("calc-direccion").value;
    const out = $("result");

    if (!Number.isInteger(contratos) || contratos <= 0 || !Number.isFinite(puntos) || puntos <= 0) {
      out.innerHTML = '<p class="error">Introduce un número entero de contratos y una distancia de stop mayor que 0.</p>';
      return;
    }
    const puntosAj = Math.round(puntos / TICK) * TICK;
    const costes = contratos * comision;
    const riesgo = contratos * puntosAj * ins.punto + costes;
    let html = '<div class="resultado-grid">';
    html += celda("Riesgo total", usd(riesgo), "baja");
    html += celda("Stop", puntosAj + " pts · " + (puntosAj / TICK) + " ticks");
    html += celda("Riesgo por contrato", usd(puntosAj * ins.punto + comision));
    if (costes > 0) html += celda("Comisiones incluidas", usd(costes));
    if (Number.isFinite(objetivo) && objetivo > 0) {
      const beneficio = contratos * objetivo * ins.punto - costes;
      html += celda("Beneficio potencial", usd(beneficio), "sube");
      html += celda("Ratio", "1 : " + (beneficio / riesgo).toFixed(2));
    }
    if (Number.isFinite(entrada) && entrada > 0) {
      const s = dir === "largo" ? entrada - puntosAj : entrada + puntosAj;
      html += celda("Precio de stop", precio(s));
      if (Number.isFinite(objetivo) && objetivo > 0) html += celda("Precio objetivo", precio(dir === "largo" ? entrada + objetivo : entrada - objetivo));
    }
    html += "</div>";
    if (puntosAj !== puntos) html += '<p class="nota">El stop se ha ajustado al tick más cercano (' + puntosAj + " pts).</p>";
    out.innerHTML = html;
  }

  // Modo 2: tamaño de posición
  function calcularTamano() {
    const ins = instrumento();
    const saldo = num("calc-saldo");
    const pct = num("calc-pct");
    const fijo = num("calc-fijo");
    const stop = num("calc-stop2");
    const comision = num("calc-comision") || 0;
    const out = $("result-tamano");

    if (!Number.isFinite(stop) || stop <= 0) { out.innerHTML = '<p class="error">Introduce la distancia del stop en puntos.</p>'; return; }
    let riesgoMax;
    if (Number.isFinite(fijo) && fijo > 0) riesgoMax = fijo;
    else if (Number.isFinite(saldo) && saldo > 0 && Number.isFinite(pct) && pct > 0) riesgoMax = saldo * pct / 100;
    else { out.innerHTML = '<p class="error">Indica el saldo y el % de riesgo, o un riesgo fijo en $.</p>'; return; }

    const porContrato = stop * ins.punto + comision;
    const contratos = Math.floor(riesgoMax / porContrato);
    let html = '<div class="resultado-grid">';
    html += celda("Riesgo máximo", usd(riesgoMax));
    html += celda("Riesgo por contrato", usd(porContrato));
    html += celda("Contratos", String(contratos), contratos > 0 ? "sube" : "baja");
    html += celda("Riesgo real", usd(contratos * porContrato));
    html += "</div>";
    if (contratos === 0) {
      html += '<p class="error">El stop es demasiado grande para tu riesgo máximo: ni 1 contrato cabe. Busca un stop técnico más ajustado o no hagas la operación.</p>';
    } else if (Number.isFinite(saldo) && saldo > 0 && pct > 2) {
      html += '<p class="aviso-txt">Arriesgar más del 2 % por operación es muy agresivo. Revisa la clase 1.4.</p>';
    }
    if ($("calc-instrumento").value === "MNQ" && contratos >= 10) {
      html += '<p class="nota">' + contratos + " MNQ equivalen a " + (contratos / 10).toFixed(1) + " NQ en riesgo por punto.</p>";
    }
    out.innerHTML = html;
  }

  function celda(titulo, valor, tono) {
    return '<div class="res-celda"><span>' + esc(titulo) + '</span><strong class="' + (tono || "") + '">' + esc(valor) + "</strong></div>";
  }

  /* ─────────────── Simulador de cuentas fondeadas ─────────────── */

  function simularFondeo() {
    const inicial = num("f-inicial"), dd = num("f-dd"), diario = num("f-diario");
    const pico = num("f-pico"), saldo = num("f-saldo"), riesgo = num("f-riesgo"), stop = num("f-stop");
    const tipo = $("f-tipo").value, congela = $("f-congela").checked;
    const out = $("f-resultado");
    if (![inicial, dd, saldo, riesgo].every(function (x) { return Number.isFinite(x) && x > 0; })) {
      out.innerHTML = '<p class="error">Completa al menos: tamaño de la cuenta, drawdown, saldo actual y riesgo por operación.</p>';
      return;
    }
    const picoReal = tipo === "estatico" ? inicial : Math.max(Number.isFinite(pico) && pico > 0 ? pico : inicial, inicial, saldo);
    let umbral = picoReal - dd;
    if (tipo !== "estatico" && congela) umbral = Math.min(umbral, inicial);
    const margen = saldo - umbral;
    const perdidas = Math.floor(margen / riesgo);
    const perdidasDia = Number.isFinite(diario) && diario > 0 ? Math.floor(diario / riesgo) : null;
    const contratos = Number.isFinite(stop) && stop > 0 ? Math.floor(riesgo / (stop * 2)) : null;

    let tono = "sube", msg = "Margen cómodo: puedes encadenar 10 o más pérdidas.";
    if (margen <= 0) { tono = "baja"; msg = "El saldo está en el umbral o por debajo: con estas reglas la cuenta estaría perdida."; }
    else if (perdidas < 5) { tono = "baja"; msg = "Peligro: menos de 5 pérdidas seguidas te eliminan. Reduce el riesgo por operación."; }
    else if (perdidas < 10) { tono = "oro"; msg = "Aceptable pero ajustado. Lo prudente es poder soportar al menos 8–10 pérdidas."; }

    let html = '<div class="resultado-grid">';
    html += celda("Umbral de liquidación", usd(umbral), "baja");
    html += celda("Margen disponible", usd(Math.max(0, margen)), tono);
    html += celda("Pérdidas seguidas toleradas", String(Math.max(0, perdidas)), tono);
    if (perdidasDia != null) html += celda("Pérdidas hasta el límite diario", String(perdidasDia));
    if (contratos != null) html += celda("MNQ con ese riesgo y stop", String(contratos));
    html += celda("Riesgo recomendado (10 pérdidas)", usd(Math.max(0, margen) / 10));
    html += "</div><p class=\"" + (tono === "baja" ? "error" : tono === "oro" ? "aviso-txt" : "ok-txt") + "\">" + msg + "</p>";
    if (tipo === "intradia") html += '<p class="nota">Trailing intradía: el pico incluye beneficios no realizados. Si una operación llegó a estar en más ganancia de la que cerraste, introduce ese pico.</p>';
    out.innerHTML = html;
  }

  /* ─────────────── Indicadores ─────────────── */

  function pintarIndicadores() {
    const cont = $("lista-indicadores");
    if (!cont || !window.ADRIUX_INDICADORES) return;
    cont.innerHTML = window.ADRIUX_INDICADORES.map(function (ind) {
      return '<article class="card indicador">' +
        "<h3>" + esc(ind.nombre) + "</h3><p>" + esc(ind.descripcion) + "</p>" +
        '<div class="acciones">' +
        '<button class="button" data-copiar="' + ind.id + '">Copiar código</button>' +
        '<button class="button outline" data-descargar="' + ind.id + '">Descargar .pine</button>' +
        '<a class="button outline" href="#/clase/' + ind.leccion + '">Ver clase</a></div>' +
        '<details><summary>Ver código Pine Script</summary><pre><code>' + esc(ind.codigo) + "</code></pre></details>" +
        "</article>";
    }).join("");
    cont.addEventListener("click", function (e) {
      const b = e.target.closest("button");
      if (!b) return;
      const id = b.getAttribute("data-copiar") || b.getAttribute("data-descargar");
      const ind = window.ADRIUX_INDICADORES.find(function (x) { return x.id === id; });
      if (!ind) return;
      if (b.hasAttribute("data-copiar")) copiar(ind.codigo, b);
      else descargar(ind.id + ".pine", ind.codigo);
    });
  }

  function copiar(texto, boton) {
    const ok = function () { const t = boton.textContent; boton.textContent = "¡Copiado!"; setTimeout(function () { boton.textContent = t; }, 1600); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(ok, function () { copiarRespaldo(texto); ok(); });
    } else { copiarRespaldo(texto); ok(); }
  }
  function copiarRespaldo(texto) {
    const ta = document.createElement("textarea");
    ta.value = texto; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) { /* sin portapapeles */ }
    document.body.removeChild(ta);
  }
  function descargar(nombre, texto) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([texto], { type: "text/plain;charset=utf-8" }));
    a.download = nombre;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  /* ─────────────── Asistente ─────────────── */

  const historial = [];

  function normalizar(s) {
    return (" " + s + " ").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[¿?¡!.,;:()]/g, " ").replace(/\s+/g, " ");
  }

  function lecciones() {
    const out = [];
    (window.ADRIUX_CURSO || []).forEach(function (n) { n.lecciones.forEach(function (l) { out.push(l); }); });
    return out;
  }
  function enlaceClase(id) {
    const l = lecciones().find(function (x) { return x.id === id; });
    return l ? '<a href="#/clase/' + l.id + '">Clase ' + l.id.replace("n", "").replace("-", ".") + ": " + esc(l.titulo) + "</a>" : "";
  }

  function respuestaLocal(pregunta) {
    const q = normalizar(pregunta);

    // Cálculo de riesgo: "3 contratos 15 puntos", "riesgo de 2 mnq con stop de 20"
    const mC = q.match(/(\d+)\s*(contratos?|mnq|micros?)/);
    const mP = q.match(/(\d+(?:[.,]\d+)?)\s*(puntos|pts|punto)/);
    if (mC && mP) {
      const c = Number(mC[1]), p = Number(mP[1].replace(",", "."));
      return "<strong>Cálculo:</strong> " + c + " MNQ × " + p + " puntos × $2 = <strong>" + usd(c * p * 2) + "</strong> de riesgo (sin comisiones). En NQ serían " + usd(c * p * 20) + ". Puedes afinarlo con la <a href=\"#risk\">calculadora</a>.";
    }
    // Tamaño de posición: "cuantos contratos con 200 dolares y stop de 25"
    const mD = q.match(/\$\s*(\d+(?:[.,]\d+)?)|(\d+(?:[.,]\d+)?)\s*(dolares|usd|\$)/);
    if (/cuantos contratos|tamano|cuantos mnq/.test(q) && mD && mP) {
      const d = Number((mD[1] || mD[2]).replace(",", ".")), p = Number(mP[1].replace(",", "."));
      const c = Math.floor(d / (p * 2));
      return "Con " + usd(d) + " de riesgo y stop de " + p + " puntos: " + d + " ÷ (" + p + " × $2) = <strong>" + c + " MNQ</strong>" + (c === 0 ? ". No cabe ni 1 contrato: el stop es demasiado grande para ese riesgo." : " (riesgo real " + usd(c * p * 2) + ").");
    }

    // Glosario
    const encontrados = [];
    (window.ADRIUX_GLOSARIO || []).forEach(function (g) {
      let puntos = 0;
      g.k.forEach(function (k) {
        // Claves cortas: palabra completa. Claves largas: también como parte de palabra (velas, niveles…)
        const kk = normalizar(k).trim();
        const hay = kk.length < 5 ? q.indexOf(" " + kk + " ") !== -1 : q.indexOf(kk) !== -1;
        if (hay) puntos += kk.length;
      });
      if (puntos) encontrados.push({ g: g, puntos: puntos });
    });
    encontrados.sort(function (a, b) { return b.puntos - a.puntos; });
    if (encontrados.length) {
      return encontrados.slice(0, 2).map(function (e) {
        return "<strong>" + esc(e.g.t) + ":</strong> " + esc(e.g.d) + (e.g.l ? "<br><span class=\"nota\">Más en " + enlaceClase(e.g.l) + "</span>" : "");
      }).join("<hr>");
    }

    if (/(va a subir|va a bajar|subira|bajara|predic|senal|compro o vendo|que compro|manana)/.test(q)) {
      return "No doy señales ni predicciones de mercado: es un asistente educativo. Te puedo explicar conceptos, ayudarte a calcular el riesgo o indicarte qué clase repasar para que analices tú el gráfico (por ejemplo, la <a href=\"#/clase/n3-1\">clase 3.1 de análisis multitemporal</a>).";
    }

    // Búsqueda en títulos y objetivos de las clases
    const palabras = q.split(" ").filter(function (w) { return w.length > 4; });
    const hits = lecciones().map(function (l) {
      const texto = normalizar(l.titulo + " " + l.objetivos.join(" ") + " " + (l.claves || []).join(" "));
      return { l: l, n: palabras.filter(function (w) { return texto.indexOf(w) !== -1; }).length };
    }).filter(function (h) { return h.n > 0; }).sort(function (a, b) { return b.n - a.n; });
    if (hits.length) {
      return "Esto se trata en: <br>" + hits.slice(0, 3).map(function (h) { return "• " + enlaceClase(h.l.id); }).join("<br>");
    }

    return "No he encontrado una respuesta en los contenidos de la academia. Prueba con un término concreto (por ejemplo: <em>VWAP</em>, <em>trailing drawdown</em>, <em>barrida de liquidez</em>) o con un cálculo como <em>\"3 contratos 15 puntos\"</em>. Las respuestas abiertas con IA requieren la conexión adicional descrita abajo.";
  }

  function mensaje(rol, html) {
    const box = $("chat-mensajes");
    const div = document.createElement("div");
    div.className = "msg " + rol;
    div.innerHTML = html;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
    return div;
  }

  function enviarPregunta(texto) {
    texto = texto.trim();
    if (!texto) return;
    mensaje("usuario", esc(texto));
    historial.push({ rol: "usuario", texto: texto });
    const cfg = (window.ADRIUX_CONFIG && window.ADRIUX_CONFIG.ia) || {};
    if (cfg.endpoint) {
      const pend = mensaje("asistente", "<em>Pensando…</em>");
      fetch(cfg.endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mensajes: historial.slice(-10) }) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (d) {
          pend.innerHTML = esc(d.respuesta || "").replace(/\n/g, "<br>");
          historial.push({ rol: "asistente", texto: d.respuesta || "" });
        })
        .catch(function () {
          pend.innerHTML = "<span class=\"nota\">No se pudo conectar con el servidor de IA. Respuesta sin conexión:</span><br>" + respuestaLocal(texto);
        });
    } else {
      const r = respuestaLocal(texto);
      mensaje("asistente", r);
      historial.push({ rol: "asistente", texto: r.replace(/<[^>]+>/g, "") });
    }
  }

  function iniciarAsistente() {
    const form = $("chat-form");
    if (!form) return;
    const conectado = window.ADRIUX_CONFIG && window.ADRIUX_CONFIG.ia && window.ADRIUX_CONFIG.ia.endpoint;
    $("chat-estado").innerHTML = conectado
      ? '<span class="badge ok">IA conectada</span>'
      : '<span class="badge">Modo sin conexión</span>';
    mensaje("asistente", "Hola, soy el asistente educativo de ADRIUX. Pregúntame por un concepto (<em>¿qué es el VWAP?</em>), una regla de cuentas fondeadas o un cálculo (<em>2 contratos 18 puntos</em>). No doy señales de compra o venta.");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = $("chat-input");
      enviarPregunta(input.value);
      input.value = "";
    });
    document.querySelectorAll("[data-pregunta]").forEach(function (b) {
      b.addEventListener("click", function () { enviarPregunta(b.getAttribute("data-pregunta")); });
    });
  }

  /* ─────────────── Inicio ─────────────── */

  document.addEventListener("DOMContentLoaded", function () {
    if ($("calc-instrumento")) {
      $("calc-instrumento").addEventListener("change", function () { actualizarInfoInstrumento(); calculateRisk(); calcularTamano(); });
      actualizarInfoInstrumento();
      calculateRisk();
      calcularTamano();
      $("btn-riesgo").addEventListener("click", calculateRisk);
      $("btn-tamano").addEventListener("click", calcularTamano);
      document.querySelectorAll("[data-modo]").forEach(function (b) {
        b.addEventListener("click", function () {
          document.querySelectorAll("[data-modo]").forEach(function (x) { x.setAttribute("aria-selected", x === b ? "true" : "false"); });
          document.querySelectorAll(".calc-panel").forEach(function (p) { p.hidden = p.id !== b.getAttribute("data-modo"); });
        });
      });
    }
    if ($("f-calcular")) { $("f-calcular").addEventListener("click", simularFondeo); simularFondeo(); }
    pintarIndicadores();
    iniciarAsistente();
  });

  // Compatibilidad con la versión anterior (onclick="calculateRisk()")
  window.calculateRisk = calculateRisk;
})();
