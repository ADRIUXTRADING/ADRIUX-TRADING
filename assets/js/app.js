/* ADRIUX TRADING — Aplicación: navegación, academia, progreso y acceso */
(function () {
  "use strict";

  const CFG = window.ADRIUX_CONFIG || { acceso: { modo: "gratis" } };
  const G = window.ADRIUX_G;
  const CURSO = (window.ADRIUX_CURSO || []).slice().sort(function (a, b) { return a.numero - b.numero; });
  const $ = function (id) { return document.getElementById(id); };
  const esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  };

  /* ─────────────── Progreso (localStorage, con tolerancia a fallos) ─────────────── */

  const CLAVE = "adriux_progreso_v1";
  let progreso = { lecciones: {}, quizzes: {}, examenes: {} };
  try {
    const raw = localStorage.getItem(CLAVE);
    if (raw) progreso = Object.assign(progreso, JSON.parse(raw));
  } catch (e) { /* navegador sin almacenamiento: el progreso dura solo esta visita */ }
  function guardar() { try { localStorage.setItem(CLAVE, JSON.stringify(progreso)); } catch (e) { /* ignorar */ } }

  /* ─────────────── Usuarios y acceso (preparado para el futuro) ─────────────── */

  // Punto único de integración: cuando haya proveedor de autenticación, se rellena aquí.
  window.ADRIUX_AUTH = window.ADRIUX_AUTH || { usuario: null, suscrito: false };

  function puedeVer(leccion) {
    const modo = (CFG.acceso && CFG.acceso.modo) || "gratis";
    const auth = window.ADRIUX_AUTH;
    if (modo === "gratis") return true;
    if (modo === "registro") return !!auth.usuario;
    if (modo === "suscripcion") return leccion.acceso === "gratis" || (!!auth.usuario && auth.suscrito);
    return true;
  }

  /* ─────────────── Utilidades del curso ─────────────── */

  function todas() {
    const out = [];
    CURSO.forEach(function (n) { n.lecciones.forEach(function (l) { out.push({ nivel: n, leccion: l }); }); });
    return out;
  }
  function buscar(id) { return todas().find(function (x) { return x.leccion.id === id; }); }
  function numClase(id) { return id.replace("n", "").replace("-", "."); }
  function completadas(nivel) { return nivel.lecciones.filter(function (l) { return progreso.lecciones[l.id]; }).length; }

  /* ─────────────── Inicio: tarjetas de la academia ─────────────── */

  function pintarAcademia() {
    const cont = $("academia-niveles");
    if (!cont) return;
    cont.innerHTML = CURSO.map(function (n) {
      const hechas = completadas(n), total = n.lecciones.length;
      const ex = progreso.examenes[n.id];
      return '<article class="card nivel">' +
        '<div class="nivel-cabecera"><span class="etiqueta">Nivel ' + n.numero + "</span>" +
        (ex && ex.aprobado ? '<span class="badge ok">Examen aprobado</span>' : "") + "</div>" +
        "<h3>" + esc(n.titulo) + "</h3><p>" + esc(n.descripcion) + "</p>" +
        '<div class="barra" role="progressbar" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + hechas + '" aria-label="Progreso del nivel ' + n.numero + '"><span style="width:' + (hechas / total * 100) + '%"></span></div>' +
        '<p class="nota">' + hechas + " de " + total + " clases completadas</p>" +
        '<ol class="lista-clases">' + n.lecciones.map(function (l) {
          return '<li class="' + (progreso.lecciones[l.id] ? "hecha" : "") + '"><a href="#/clase/' + l.id + '"><span class="num">' + numClase(l.id) + "</span>" + esc(l.titulo) + '<span class="dur">' + esc(l.duracion) + "</span></a></li>";
        }).join("") + "</ol>" +
        '<div class="acciones"><a class="button" href="#/clase/' + (n.lecciones.find(function (l) { return !progreso.lecciones[l.id]; }) || n.lecciones[0]).id + '">' + (hechas ? (hechas === total ? "Repasar" : "Continuar") : "Empezar") + '</a>' +
        '<a class="button outline" href="#/examen/' + n.id + '">Examen del nivel</a></div>' +
        "</article>";
    }).join("");
  }

  /* ─────────────── Vista: clase ─────────────── */

  function video(l) {
    const v = l.video;
    if (v && v.id && (v.proveedor || (CFG.videos && CFG.videos.proveedor)) === "youtube") {
      return '<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id) + '" title="' + esc(l.titulo) + '" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>';
    }
    if (v && v.id && v.proveedor === "vimeo") {
      return '<div class="video"><iframe src="https://player.vimeo.com/video/' + encodeURIComponent(v.id) + '" title="' + esc(l.titulo) + '" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>';
    }
    return '<div class="video video-pendiente"><div><span class="icono-play" aria-hidden="true"></span><p><strong>Video de la clase: próximamente</strong></p><p class="nota">Mientras tanto, la clase está completa en texto, gráficos y ejercicios.</p></div></div>';
  }

  function vistaClase(id) {
    const x = buscar(id);
    if (!x) return vistaNoEncontrada();
    const n = x.nivel, l = x.leccion;
    if (!puedeVer(l)) return vistaBloqueada(l);
    const lista = todas(), idx = lista.findIndex(function (y) { return y.leccion.id === id; });
    const prev = lista[idx - 1], next = lista[idx + 1];
    const hecha = !!progreso.lecciones[l.id];
    let contenido;
    try { contenido = l.contenido(G); } catch (e) { contenido = '<p class="error">No se pudo cargar el contenido de esta clase.</p>'; console.error(e); }

    const html =
      '<div class="leccion-layout">' +
      '<aside class="indice" aria-label="Clases del nivel"><p class="etiqueta">Nivel ' + n.numero + " · " + esc(n.titulo) + "</p><ol>" +
      n.lecciones.map(function (y) {
        return '<li class="' + (y.id === l.id ? "actual " : "") + (progreso.lecciones[y.id] ? "hecha" : "") + '"><a href="#/clase/' + y.id + '">' + numClase(y.id) + " · " + esc(y.titulo) + "</a></li>";
      }).join("") + '<li><a href="#/examen/' + n.id + '">Examen del nivel</a></li></ol></aside>' +
      '<article class="leccion">' +
      '<nav class="migas" aria-label="Ruta"><a href="#academy">Academia</a> <span aria-hidden="true">›</span> Nivel ' + n.numero + ' <span aria-hidden="true">›</span> Clase ' + numClase(l.id) + "</nav>" +
      "<h1>" + esc(l.titulo) + "</h1>" +
      '<p class="meta"><span>' + esc(l.duracion) + "</span><span>Nivel " + esc(n.titulo) + "</span>" + (hecha ? '<span class="badge ok">Completada</span>' : "") + "</p>" +
      video(l) +
      '<section class="bloque objetivos"><h2>Objetivos de la clase</h2><ul>' + l.objetivos.map(function (o) { return "<li>" + esc(o) + "</li>"; }).join("") + "</ul></section>" +
      '<div class="contenido">' + contenido + "</div>" +
      '<section class="bloque claves"><h2>Puntos clave</h2><ul>' + l.claves.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul></section>" +
      '<section class="bloque"><h2>Ejercicios prácticos</h2>' + l.ejercicios.map(ejercicio).join("") + "</section>" +
      '<section class="bloque"><h2>Cuestionario de la clase</h2>' + cuestionario("quiz-" + l.id, l.quiz) + "</section>" +
      '<div class="leccion-fin">' +
      '<button class="button" id="btn-completar">' + (hecha ? "Marcar como pendiente" : "Marcar clase como completada") + "</button>" +
      '<div class="nav-clases">' +
      (prev ? '<a class="button outline" href="#/clase/' + prev.leccion.id + '"><span aria-hidden="true">‹</span> ' + numClase(prev.leccion.id) + "</a>" : "") +
      (next ? '<a class="button outline" href="#/clase/' + next.leccion.id + '">' + numClase(next.leccion.id) + ' <span aria-hidden="true">›</span></a>' : "") +
      "</div></div>" +
      '<p class="aviso-legal">Contenido exclusivamente educativo. Los gráficos son ilustrativos y no representan datos reales de mercado. No constituye asesoría financiera.</p>' +
      "</article></div>";

    mostrarVista(html, l.titulo);
    $("btn-completar").addEventListener("click", function () {
      if (progreso.lecciones[l.id]) delete progreso.lecciones[l.id]; else progreso.lecciones[l.id] = Date.now();
      guardar(); pintarAcademia(); vistaClase(id);
    });
    activarCuestionario("quiz-" + l.id, l.quiz, function (pct) {
      progreso.quizzes[l.id] = Math.max(progreso.quizzes[l.id] || 0, pct);
      if (pct >= 75 && !progreso.lecciones[l.id]) { progreso.lecciones[l.id] = Date.now(); pintarAcademia(); }
      guardar();
    });
    activarEjercicios();
  }

  function ejercicio(e, i) {
    const numerico = typeof e.respuesta === "number";
    return '<div class="ejercicio"' + (numerico ? ' data-respuesta="' + e.respuesta + '" data-tol="' + (e.tolerancia != null ? e.tolerancia : 0.01) + '"' : "") + ">" +
      '<p><strong>Ejercicio ' + (i + 1) + ".</strong> " + e.enunciado + "</p>" +
      (numerico ? '<div class="fila-respuesta"><input type="text" inputmode="decimal" aria-label="Tu respuesta" placeholder="Tu respuesta' + (e.unidad ? " (" + esc(e.unidad) + ")" : "") + '"><button class="button pequeno" type="button">Comprobar</button><span class="feedback" aria-live="polite"></span></div>' : "") +
      "<details><summary>Ver solución</summary><div>" + e.solucion + "</div></details></div>";
  }

  function activarEjercicios() {
    document.querySelectorAll(".ejercicio[data-respuesta]").forEach(function (box) {
      const btn = box.querySelector("button"), inp = box.querySelector("input"), fb = box.querySelector(".feedback");
      const comprobar = function () {
        let txt = String(inp.value).trim().replace(/\s|\$|%|−/g, function (c) { return c === "−" ? "-" : ""; });
        // Admite "99.200" o "99,200" como miles y "6,30" como decimal
        if (/^-?\d{1,3}([.,]\d{3})+$/.test(txt) && Math.abs(Number(box.getAttribute("data-respuesta"))) >= 1000) txt = txt.replace(/[.,]/g, "");
        const v = Number(txt.replace(",", "."));
        const r = Number(box.getAttribute("data-respuesta")), tol = Number(box.getAttribute("data-tol"));
        if (!Number.isFinite(v) || inp.value.trim() === "") { fb.textContent = "Escribe un número."; fb.className = "feedback"; return; }
        const ok = Math.abs(v - r) <= tol;
        fb.textContent = ok ? "¡Correcto!" : "No es correcto. Revisa el cálculo o mira la solución.";
        fb.className = "feedback " + (ok ? "ok-txt" : "error");
      };
      btn.addEventListener("click", comprobar);
      inp.addEventListener("keydown", function (ev) { if (ev.key === "Enter") comprobar(); });
    });
  }

  /* ─────────────── Cuestionarios y exámenes ─────────────── */

  function cuestionario(id, preguntas) {
    return '<form class="quiz" id="' + id + '">' + preguntas.map(function (p, i) {
      return '<fieldset class="pregunta" data-i="' + i + '"><legend>' + (i + 1) + ". " + esc(p.p) + "</legend>" +
        p.o.map(function (o, j) {
          return '<label class="opcion"><input type="radio" name="' + id + "-" + i + '" value="' + j + '"><span>' + esc(o) + "</span></label>";
        }).join("") + '<p class="explicacion" hidden></p></fieldset>';
    }).join("") +
      '<div class="quiz-pie"><button class="button" type="submit">Corregir</button><button class="button outline" type="reset">Reintentar</button><p class="quiz-resultado" aria-live="polite"></p></div></form>';
  }

  function activarCuestionario(id, preguntas, alTerminar, aprobado) {
    const form = $(id);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let ok = 0, sin = 0;
      preguntas.forEach(function (p, i) {
        const fs = form.querySelector('[data-i="' + i + '"]');
        const sel = form.querySelector('input[name="' + id + "-" + i + '"]:checked');
        const exp = fs.querySelector(".explicacion");
        fs.classList.remove("correcta", "incorrecta");
        fs.querySelectorAll(".opcion").forEach(function (lab, j) { lab.classList.toggle("es-correcta", j === p.c); });
        if (!sel) { sin++; fs.classList.add("incorrecta"); exp.textContent = "Sin responder. Respuesta correcta: " + p.o[p.c] + ". " + p.e; }
        else if (Number(sel.value) === p.c) { ok++; fs.classList.add("correcta"); exp.textContent = "Correcto. " + p.e; }
        else { fs.classList.add("incorrecta"); exp.textContent = "Incorrecto. Respuesta correcta: " + p.o[p.c] + ". " + p.e; }
        exp.hidden = false;
      });
      const pct = Math.round(ok / preguntas.length * 100);
      const res = form.querySelector(".quiz-resultado");
      const umbral = aprobado || 75;
      res.innerHTML = "<strong>" + ok + " / " + preguntas.length + " (" + pct + " %)</strong> — " +
        (pct >= umbral ? '<span class="ok-txt">¡Aprobado!</span>' : '<span class="error">Repasa la clase y vuelve a intentarlo (mínimo ' + umbral + " %).</span>") +
        (sin ? ' <span class="nota">(' + sin + " sin responder)</span>" : "");
      alTerminar(pct);
    });
    form.addEventListener("reset", function () {
      setTimeout(function () {
        form.querySelectorAll(".pregunta").forEach(function (fs) {
          fs.classList.remove("correcta", "incorrecta");
          fs.querySelectorAll(".opcion").forEach(function (lab) { lab.classList.remove("es-correcta"); });
          fs.querySelector(".explicacion").hidden = true;
        });
        form.querySelector(".quiz-resultado").textContent = "";
      }, 0);
    });
  }

  function vistaExamen(nivelId) {
    const n = CURSO.find(function (x) { return x.id === nivelId; });
    if (!n) return vistaNoEncontrada();
    if (!n.lecciones.every(puedeVer)) return vistaBloqueada(n.lecciones[0]);
    const ex = progreso.examenes[n.id];
    const hechas = completadas(n);
    const html = '<article class="leccion examen">' +
      '<nav class="migas" aria-label="Ruta"><a href="#academy">Academia</a> <span aria-hidden="true">›</span> Nivel ' + n.numero + ' <span aria-hidden="true">›</span> Examen</nav>' +
      "<h1>Examen del Nivel " + n.numero + ": " + esc(n.titulo) + "</h1>" +
      '<p class="meta"><span>' + n.examen.preguntas.length + " preguntas</span><span>Aprobado con " + n.examen.aprobado + " %</span>" +
      (ex ? "<span>Mejor resultado: " + ex.mejor + " %</span>" : "") + (ex && ex.aprobado ? '<span class="badge ok">Aprobado</span>' : "") + "</p>" +
      (hechas < n.lecciones.length ? '<div class="callout aviso">Has completado ' + hechas + " de " + n.lecciones.length + " clases de este nivel. Puedes hacer el examen igualmente, pero te recomendamos terminar las clases antes.</div>" : "") +
      cuestionario("examen-" + n.id, n.examen.preguntas) +
      '<div class="leccion-fin"><a class="button outline" href="#academy"><span aria-hidden="true">‹</span> Volver a la academia</a>' +
      (CURSO[CURSO.indexOf(n) + 1] ? '<a class="button" href="#/clase/' + CURSO[CURSO.indexOf(n) + 1].lecciones[0].id + '">Siguiente nivel <span aria-hidden="true">›</span></a>' : "") + "</div></article>";
    mostrarVista(html, "Examen Nivel " + n.numero);
    activarCuestionario("examen-" + n.id, n.examen.preguntas, function (pct) {
      const prev = progreso.examenes[n.id] || { mejor: 0, aprobado: false };
      progreso.examenes[n.id] = { mejor: Math.max(prev.mejor, pct), aprobado: prev.aprobado || pct >= n.examen.aprobado, fecha: Date.now() };
      guardar(); pintarAcademia(); pintarProgresoCabecera();
    }, n.examen.aprobado);
  }

  /* ─────────────── Vista: progreso ─────────────── */

  function vistaProgreso() {
    const total = todas().length, hechas = Object.keys(progreso.lecciones).filter(buscar).length;
    const html = '<article class="leccion"><h1>Mi progreso</h1>' +
      '<p class="nota">Tu progreso se guarda en este navegador. Cuando se activen las cuentas de usuario podrás sincronizarlo entre dispositivos.</p>' +
      '<div class="barra grande"><span style="width:' + (hechas / total * 100) + '%"></span></div><p><strong>' + hechas + " de " + total + " clases completadas</strong></p>" +
      '<table class="tabla"><thead><tr><th>Nivel</th><th>Clases</th><th>Mejor cuestionario medio</th><th>Examen</th></tr></thead><tbody>' +
      CURSO.map(function (n) {
        const qs = n.lecciones.map(function (l) { return progreso.quizzes[l.id]; }).filter(function (x) { return x != null; });
        const media = qs.length ? Math.round(qs.reduce(function (a, b) { return a + b; }, 0) / qs.length) + " %" : "—";
        const ex = progreso.examenes[n.id];
        return "<tr><td>Nivel " + n.numero + " · " + esc(n.titulo) + "</td><td>" + completadas(n) + " / " + n.lecciones.length + "</td><td>" + media + "</td><td>" +
          (ex ? ex.mejor + " % " + (ex.aprobado ? '<span class="badge ok">Aprobado</span>' : "") : '<a href="#/examen/' + n.id + '">Hacer examen</a>') + "</td></tr>";
      }).join("") + "</tbody></table>" +
      '<div class="leccion-fin"><a class="button" href="#academy">Ir a la academia</a><button class="button outline" id="btn-reiniciar">Reiniciar progreso</button></div></article>';
    mostrarVista(html, "Mi progreso");
    $("btn-reiniciar").addEventListener("click", function () {
      if (confirm("¿Seguro que quieres borrar todo tu progreso guardado en este navegador?")) {
        progreso = { lecciones: {}, quizzes: {}, examenes: {} }; guardar(); pintarAcademia(); pintarProgresoCabecera(); vistaProgreso();
      }
    });
  }

  function vistaBloqueada(l) {
    const pagos = CFG.pagos && CFG.pagos.habilitado;
    mostrarVista('<article class="leccion bloqueada"><h1>' + esc(l.titulo) + "</h1>" +
      '<div class="callout"><strong>Contenido para miembros.</strong> ' +
      (pagos ? "Esta clase forma parte de la suscripción mensual de ADRIUX Trading Academy." : "Inicia sesión para acceder a esta clase.") + "</div>" +
      '<button class="button" data-abrir-cuenta>' + (pagos ? "Ver planes" : "Iniciar sesión") + '</button> <a class="button outline" href="#academy">Volver</a></article>', l.titulo);
  }

  function vistaNoEncontrada() {
    mostrarVista('<article class="leccion"><h1>Página no encontrada</h1><p>La dirección no corresponde a ninguna clase.</p><a class="button" href="#academy">Ir a la academia</a></article>', "No encontrada");
  }

  /* ─────────────── Router ─────────────── */

  const TITULO_BASE = "ADRIUX Trading | Trading & AI Academy";

  function mostrarVista(html, titulo) {
    $("inicio").hidden = true;
    const v = $("vista");
    v.hidden = false;
    v.innerHTML = html;
    document.title = titulo + " | ADRIUX Trading";
    window.scrollTo(0, 0);
    v.querySelectorAll("[data-abrir-cuenta]").forEach(function (b) { b.addEventListener("click", abrirCuenta); });
    marcarNav();
  }

  function router() {
    const h = decodeURIComponent(location.hash || "");
    cerrarMenu();
    if (h.indexOf("#/") === 0) {
      const partes = h.slice(2).split("/");
      if (partes[0] === "clase" && partes[1]) return vistaClase(partes[1]);
      if (partes[0] === "examen" && partes[1]) return vistaExamen(partes[1]);
      if (partes[0] === "progreso") return vistaProgreso();
      return vistaNoEncontrada();
    }
    // Secciones de la página principal (anclas clásicas: #academy, #tools, #risk…)
    const estabaOculto = $("inicio").hidden;
    $("vista").hidden = true;
    $("vista").innerHTML = "";
    $("inicio").hidden = false;
    document.title = TITULO_BASE;
    const destino = h.length > 1 ? document.getElementById(h.slice(1)) : null;
    if (destino) {
      // Si venimos de una clase, el ancla debe desplazarse tras volver a mostrar el inicio
      if (estabaOculto) requestAnimationFrame(function () { destino.scrollIntoView(); });
    } else if (estabaOculto) window.scrollTo(0, 0);
    marcarNav();
  }

  function marcarNav() {
    const h = location.hash || "#inicio";
    document.querySelectorAll(".nav-principal a").forEach(function (a) {
      const href = a.getAttribute("href");
      const activo = href === h || (href === "#academy" && (h.indexOf("#/clase") === 0 || h.indexOf("#/examen") === 0)) || (href === "#/progreso" && h === "#/progreso");
      if (activo) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }

  /* ─────────────── Menú móvil y modal de cuenta ─────────────── */

  function cerrarMenu() {
    const b = $("menu-boton");
    if (b) { b.setAttribute("aria-expanded", "false"); document.body.classList.remove("menu-abierto"); }
  }

  function abrirCuenta() {
    const d = $("modal-cuenta");
    if (d && typeof d.showModal === "function") d.showModal();
    else alert("Las cuentas de usuario estarán disponibles próximamente. Tu progreso se guarda en este navegador.");
  }

  function pintarProgresoCabecera() {
    const el = $("progreso-mini");
    if (!el) return;
    const total = todas().length, hechas = Object.keys(progreso.lecciones).filter(buscar).length;
    el.textContent = hechas + "/" + total;
  }

  document.addEventListener("DOMContentLoaded", function () {
    pintarAcademia();
    pintarProgresoCabecera();
    const mb = $("menu-boton");
    if (mb) mb.addEventListener("click", function () {
      const abierto = mb.getAttribute("aria-expanded") === "true";
      mb.setAttribute("aria-expanded", abierto ? "false" : "true");
      document.body.classList.toggle("menu-abierto", !abierto);
    });
    document.querySelectorAll("[data-abrir-cuenta]").forEach(function (b) { b.addEventListener("click", abrirCuenta); });
    const cerrar = $("modal-cerrar");
    if (cerrar) cerrar.addEventListener("click", function () { $("modal-cuenta").close(); });
    $("anio").textContent = new Date().getFullYear();
    window.addEventListener("hashchange", router);
    router();
  });
})();
