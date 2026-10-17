/* ADRIUX TRADING ACADEMY — Nivel 1: Principiante */
window.ADRIUX_CURSO = window.ADRIUX_CURSO || [];
window.ADRIUX_CURSO.push({
  id: "n1",
  numero: 1,
  titulo: "Principiante",
  descripcion: "Mercados financieros, futuros, velas japonesas, TradingView, gestión de riesgo y psicología.",
  lecciones: [
    /* ───────────────────────── 1.1 ───────────────────────── */
    {
      id: "n1-1",
      titulo: "Mercados financieros y futuros",
      duracion: "40 min",
      acceso: "gratis",
      video: null,
      objetivos: [
        "Entender qué es un mercado financiero y quién participa en él.",
        "Saber qué es un contrato de futuros y por qué se usa para hacer trading intradía.",
        "Conocer las especificaciones del MNQ (Micro E-mini Nasdaq-100): punto, tick y valor.",
        "Comprender el apalancamiento y el margen sin caer en sus trampas."
      ],
      contenido: function (G) {
        const v = G.velas(G.ruta(20100, [[20088, 6], [20126, 12], [20120, 4]], { semilla: 3 }), { semilla: 3, rangoMin: 3 });
        return `
<h3>1. ¿Qué es un mercado financiero?</h3>
<p>Un mercado financiero es un lugar (hoy casi siempre electrónico) donde compradores y vendedores intercambian activos: acciones, divisas, materias primas, bonos o contratos derivados como los futuros. El precio que ves en la pantalla es simplemente <strong>el último precio al que alguien compró y otro vendió</strong>. Si hay más urgencia por comprar que por vender, el precio sube; si hay más urgencia por vender, baja.</p>
<p>Los principales tipos de mercado que vas a escuchar son:</p>
<ul>
  <li><strong>Acciones:</strong> pequeñas partes de una empresa (Apple, Tesla, Nvidia…).</li>
  <li><strong>Forex:</strong> divisas en pares, por ejemplo EUR/USD.</li>
  <li><strong>Materias primas:</strong> oro, petróleo, gas, granos.</li>
  <li><strong>Índices:</strong> una cesta de acciones. El <em>Nasdaq-100</em> agrupa las 100 mayores empresas no financieras del Nasdaq.</li>
  <li><strong>Futuros:</strong> contratos estandarizados sobre cualquiera de los anteriores. En esta academia nos centramos en los futuros de índices, especialmente el MNQ.</li>
</ul>

<h3>2. ¿Quién mueve el precio?</h3>
<p>En el mercado conviven participantes muy distintos: bancos y fondos institucionales (mueven grandes volúmenes), creadores de mercado (ponen precios de compra y venta constantemente), fondos algorítmicos, empresas que se cubren de riesgos y traders minoristas como tú. Entender esto es importante: <strong>tú no mueves el precio</strong>, te subes a movimientos que generan otros. Por eso el trabajo del trader es leer el contexto, no adivinar.</p>

<h3>3. ¿Qué es un contrato de futuros?</h3>
<p>Un futuro es un acuerdo estandarizado para comprar o vender un activo a un precio determinado en una fecha futura. En la práctica, casi ningún trader intradía espera a la fecha de vencimiento: <strong>abre y cierra la posición el mismo día</strong> y se queda con la diferencia de precio.</p>
<p>Ventajas que hacen populares los futuros de índices:</p>
<ul>
  <li><strong>Mercado centralizado y regulado:</strong> se negocian en CME Group (Chicago), con precios y volumen transparentes.</li>
  <li><strong>Puedes ganar en subidas y en bajadas:</strong> comprar (ir <em>largo</em>) o vender (ir <em>corto</em>) es igual de sencillo.</li>
  <li><strong>Horario casi continuo:</strong> el mercado electrónico (CME Globex) abre de domingo a viernes de 18:00 a 17:00 hora de Nueva York, con una pausa diaria de una hora (17:00 a 18:00). La sesión principal o "regular" (RTH) va de 9:30 a 16:00 hora de Nueva York, que es cuando hay más volumen.</li>
  <li><strong>Tamaños pequeños:</strong> los contratos "micro" permiten empezar con poco riesgo por operación.</li>
</ul>

<h3>4. Vencimientos y el símbolo continuo</h3>
<p>Los futuros de índices vencen cada trimestre: marzo (H), junio (M), septiembre (U) y diciembre (Z). Por eso verás símbolos como <code>MNQZ2026</code> (MNQ de diciembre de 2026). Unos días antes del vencimiento el volumen se pasa al siguiente contrato: eso se llama <em>rollover</em>. En TradingView puedes usar el símbolo continuo <code>MNQ1!</code>, que siempre muestra el contrato principal.</p>

<h3>5. Especificaciones del MNQ</h3>
<table class="tabla">
  <thead><tr><th>Contrato</th><th>Valor por punto</th><th>Tick mínimo</th><th>Valor del tick</th></tr></thead>
  <tbody>
    <tr><td><strong>MNQ</strong> — Micro E-mini Nasdaq-100</td><td>$2</td><td>0,25 puntos</td><td>$0,50</td></tr>
    <tr><td>NQ — E-mini Nasdaq-100</td><td>$20</td><td>0,25 puntos</td><td>$5,00</td></tr>
    <tr><td>MES — Micro E-mini S&amp;P 500</td><td>$5</td><td>0,25 puntos</td><td>$1,25</td></tr>
    <tr><td>ES — E-mini S&amp;P 500</td><td>$50</td><td>0,25 puntos</td><td>$12,50</td></tr>
  </tbody>
</table>
<p>Un punto tiene 4 ticks. En MNQ, si el precio se mueve 1 punto a tu favor ganas $2 por contrato; si se mueve 1 punto en contra, pierdes $2. Fíjate en que <strong>10 MNQ equivalen a 1 NQ</strong> en riesgo.</p>

<div class="callout"><strong>Fórmula clave:</strong> Resultado = puntos × valor del punto × número de contratos.<br>Ejemplo: 20 puntos × $2 × 3 contratos = <strong>$120</strong>.</div>

${G.velasSVG({
  velas: v,
  titulo: "MNQ 5 min — compra en 20.100, venta en 20.120",
  lineas: [
    { y: 20100, texto: "Entrada 20.100", color: "azul", discontinua: true },
    { y: 20120, texto: "Salida 20.120 (+20 pts)", color: "sube", discontinua: true }
  ],
  marcas: [{ i: 6, texto: "Compra", pos: "abajo", color: "azul" }, { i: 18, texto: "Venta", pos: "arriba", color: "sube" }],
  nota: "Ejemplo ilustrativo. +20 puntos con 1 MNQ = +$40. Con 1 NQ serían +$400. Mismo movimiento, riesgo 10 veces mayor."
})}

<h3>6. Margen y apalancamiento</h3>
<p>Para abrir un futuro no pagas el valor total del contrato, sino un depósito de garantía llamado <strong>margen</strong>. Con el Nasdaq-100 cerca de 20.000 puntos, un MNQ controla unos 20.000 × $2 = $40.000 de exposición, pero el broker solo te pide una fracción como margen. Eso es <strong>apalancamiento</strong>.</p>
<p>El apalancamiento no aumenta tu probabilidad de acertar; solo multiplica el resultado, tanto las ganancias como las pérdidas. El margen intradía lo fija cada broker y puede cambiar sin aviso en momentos de volatilidad. <strong>Que el broker te permita abrir 10 contratos no significa que debas hacerlo.</strong> Tu tamaño lo decide tu gestión de riesgo (clase 1.4), nunca el margen disponible.</p>

<h3>7. Coste real de operar</h3>
<p>Cada operación tiene costes: comisión del broker, tasas del exchange y de la NFA, y el <em>slippage</em> (diferencia entre el precio que esperabas y el que te dan). Con contratos micro estos costes pesan proporcionalmente más, así que si haces muchas operaciones pequeñas los costes pueden comerse tu ventaja.</p>`;
      },
      claves: [
        "El precio se mueve por el desequilibrio entre compradores y vendedores.",
        "Un futuro es un contrato estandarizado; el trader intradía lo abre y cierra el mismo día.",
        "MNQ: $2 por punto, tick de 0,25 = $0,50. 10 MNQ = 1 NQ.",
        "El margen es un depósito, no tu riesgo. El apalancamiento multiplica en ambas direcciones."
      ],
      ejercicios: [
        { enunciado: "Compras 2 MNQ en 18.500 y vendes en 18.537,50. ¿Cuánto ganas (sin comisiones)?", respuesta: 150, unidad: "$", solucion: "37,5 puntos × $2 × 2 contratos = <strong>$150</strong>." },
        { enunciado: "Vendes en corto 1 MNQ en 21.000 y el precio sube hasta 21.012,25, donde cierras. ¿Cuál es el resultado? (Escribe el número con signo negativo si es pérdida)", respuesta: -24.5, unidad: "$", solucion: "En corto ganas si baja. Subió 12,25 puntos en contra: 12,25 × $2 = <strong>−$24,50</strong>." },
        { enunciado: "¿Cuántos ticks hay en un movimiento de 15 puntos?", respuesta: 60, unidad: "ticks", solucion: "Cada punto tiene 4 ticks: 15 × 4 = <strong>60 ticks</strong> (60 × $0,50 = $30 en MNQ)." }
      ],
      quiz: [
        { p: "¿Cuánto vale 1 punto en el MNQ?", o: ["$0,50", "$2", "$5", "$20"], c: 1, e: "1 punto de MNQ = $2. El tick (0,25) vale $0,50." },
        { p: "¿Qué significa ir 'corto'?", o: ["Operar poco tiempo", "Vender esperando que el precio baje", "Usar pocos contratos", "Cerrar antes del stop"], c: 1, e: "Ir corto es vender primero para recomprar más barato después." },
        { p: "Un trader con 1 NQ asume el mismo riesgo por punto que…", o: ["1 MNQ", "5 MNQ", "10 MNQ", "20 MNQ"], c: 2, e: "NQ = $20/punto y MNQ = $2/punto: 10 MNQ = 1 NQ." },
        { p: "¿Qué decide cuántos contratos deberías operar?", o: ["El margen disponible", "Tu gestión de riesgo", "Lo que opera la comunidad", "El apalancamiento máximo"], c: 1, e: "El tamaño lo marca cuánto estás dispuesto a perder si salta el stop." }
      ]
    },

    /* ───────────────────────── 1.2 ───────────────────────── */
    {
      id: "n1-2",
      titulo: "Velas japonesas y lectura del gráfico",
      duracion: "45 min",
      acceso: "gratis",
      video: null,
      objetivos: [
        "Leer una vela japonesa: apertura, máximo, mínimo y cierre.",
        "Interpretar cuerpo y mechas como una batalla entre compradores y vendedores.",
        "Reconocer los patrones más útiles: doji, martillo, estrella fugaz y envolventes.",
        "Entender por qué una vela solo tiene sentido dentro de su contexto."
      ],
      contenido: function (G) {
        const anatomia = G.velas([
          [100, 108, 98, 106], [106, 107, 98.5, 99.5], [100, 103, 97, 100.1],
          [104, 104.6, 96, 103.8], [98, 106, 97.6, 98.4], [101, 101.6, 98.8, 99.2], [99, 105.5, 98.6, 105.2]
        ]);
        const contexto = G.velas(G.ruta(130, [[112, 14]], { semilla: 21 }).concat([[112.4, 112.9, 106.5, 112.6]]).concat(G.ruta(112.6, [[124, 9]], { semilla: 22 })), { semilla: 21, rangoMin: 1.2 });
        return `
<h3>1. Anatomía de una vela</h3>
<p>Cada vela resume lo que pasó en un periodo de tiempo (1 minuto, 5 minutos, 1 hora, 1 día…). Contiene cuatro datos, conocidos como <strong>OHLC</strong>:</p>
<ul>
  <li><strong>Apertura (Open):</strong> primer precio del periodo.</li>
  <li><strong>Máximo (High):</strong> precio más alto alcanzado.</li>
  <li><strong>Mínimo (Low):</strong> precio más bajo alcanzado.</li>
  <li><strong>Cierre (Close):</strong> último precio del periodo.</li>
</ul>
<p>El <strong>cuerpo</strong> es el rectángulo entre apertura y cierre. Si el cierre es mayor que la apertura la vela es alcista (verde); si es menor, bajista (roja). Las <strong>mechas</strong> (o sombras) son las líneas finas que llegan al máximo y al mínimo: muestran precios que se visitaron pero <em>no se pudieron sostener</em>.</p>

<div class="callout"><strong>Idea central:</strong> el cuerpo dice quién ganó el periodo; las mechas dicen dónde fue rechazado el precio.</div>

${G.velasSVG({
  velas: anatomia,
  titulo: "Tipos de vela más comunes",
  marcas: [
    { i: 0, texto: "Alcista", pos: "arriba", color: "sube" },
    { i: 1, texto: "Bajista", pos: "abajo", color: "baja" },
    { i: 2, texto: "Doji", pos: "arriba", color: "oro" },
    { i: 3, texto: "Martillo", pos: "abajo", color: "oro" },
    { i: 4, texto: "Estrella fugaz", pos: "arriba", color: "oro" },
    { i: 6, texto: "Envolvente alcista", pos: "abajo", color: "sube" }
  ],
  nota: "La envolvente alcista (última vela) abre por debajo y cierra por encima de todo el cuerpo de la vela roja anterior."
})}

<h3>2. Patrones de una vela</h3>
<p><strong>Doji:</strong> apertura y cierre casi iguales. Indica indecisión: ni compradores ni vendedores tomaron el control. Tras una tendencia larga puede avisar de agotamiento, pero por sí solo no es una señal de entrada.</p>
<p><strong>Martillo:</strong> cuerpo pequeño arriba y mecha inferior larga (al menos el doble del cuerpo). Los vendedores empujaron fuerte hacia abajo, pero los compradores recuperaron casi todo antes del cierre. Es relevante cuando aparece <em>en un soporte</em> tras una caída.</p>
<p><strong>Estrella fugaz:</strong> lo contrario al martillo: mecha superior larga y cuerpo pequeño abajo. Muestra rechazo de precios altos; es relevante en una resistencia tras una subida.</p>
<p><strong>Vela de rango amplio (marubozu):</strong> cuerpo grande y casi sin mechas. Indica fuerza clara de un lado. Suele aparecer en rupturas o tras noticias.</p>

<h3>3. Patrones de dos velas</h3>
<p><strong>Envolvente alcista:</strong> una vela verde cuyo cuerpo cubre por completo el cuerpo de la vela roja anterior. Los compradores no solo frenaron la caída, sino que la revirtieron. <strong>Envolvente bajista:</strong> el caso contrario.</p>
<p><strong>Inside bar (vela interior):</strong> una vela cuyo máximo y mínimo quedan dentro de la vela anterior. Indica compresión; la ruptura de su rango suele dar dirección.</p>

<h3>4. El contexto lo es todo</h3>
<p>Un martillo en mitad de la nada no significa casi nada. El mismo martillo justo en un soporte importante, después de una caída prolongada y con volumen alto, sí cuenta una historia: los vendedores intentaron romper el nivel y fueron absorbidos.</p>

${G.velasSVG({
  velas: contexto,
  titulo: "Martillo en soporte tras una caída",
  zonas: [{ y1: 106.5, y2: 109, texto: "Zona de soporte", color: "sube" }],
  marcas: [{ i: 14, texto: "Martillo", pos: "abajo", color: "oro" }],
  nota: "El patrón gana valor porque aparece donde esperábamos compradores. La confirmación es que la vela siguiente supere el máximo del martillo."
})}

<h3>5. Temporalidades</h3>
<p>La misma sesión se ve distinta en un gráfico de 1 minuto que en uno de 1 hora. Las temporalidades altas (diario, 4 horas, 1 hora) muestran la dirección general y los niveles importantes; las bajas (5 minutos, 1 minuto) sirven para ajustar la entrada. Un error típico del principiante es operar solo en 1 minuto, donde casi todo es ruido. En el Nivel 3 estudiaremos el análisis multitemporal a fondo.</p>

<h3>6. Errores comunes</h3>
<ul>
  <li>Memorizar decenas de patrones con nombres exóticos en lugar de entender la lógica de cuerpos y mechas.</li>
  <li>Operar un patrón sin mirar dónde aparece.</li>
  <li>Entrar antes de que la vela cierre: hasta que no cierra, un martillo puede convertirse en una vela bajista enorme.</li>
</ul>`;
      },
      claves: [
        "Cada vela contiene apertura, máximo, mínimo y cierre (OHLC).",
        "Cuerpo = quién ganó. Mecha = precios rechazados.",
        "Martillo y estrella fugaz son patrones de rechazo; importan en soportes y resistencias.",
        "Espera siempre al cierre de la vela antes de interpretarla."
      ],
      ejercicios: [
        { enunciado: "Una vela de 5 minutos abre en 20.050, sube a 20.058, baja a 20.030 y cierra en 20.055. ¿Qué tipo de vela es y qué indica?", solucion: "Es un <strong>martillo alcista</strong>: cuerpo pequeño (5 puntos) en la parte alta y mecha inferior larga (20 puntos). Los vendedores llevaron el precio a 20.030 pero los compradores recuperaron casi todo. Es significativo si aparece en un soporte." },
        { enunciado: "¿Cuánto mide en puntos la mecha inferior del ejercicio anterior?", respuesta: 20, unidad: "pts", solucion: "Desde el mínimo (20.030) hasta el inicio del cuerpo (apertura 20.050): <strong>20 puntos</strong>." },
        { enunciado: "Abre TradingView, carga MNQ1! en 15 minutos y busca 3 martillos y 3 estrellas fugaces de la última semana. Anota si aparecieron en un nivel relevante y qué hizo el precio en las 5 velas siguientes.", solucion: "Ejercicio de observación. Lo normal es descubrir que los patrones en niveles claros funcionan mucho mejor que los que aparecen en mitad de un movimiento. Guarda capturas: serán la base de tu diario." }
      ],
      quiz: [
        { p: "¿Qué representa la mecha superior de una vela?", o: ["El volumen", "Precios alcanzados pero rechazados", "La apertura", "El cierre anterior"], c: 1, e: "La mecha muestra hasta dónde llegó el precio sin poder sostenerse." },
        { p: "Un martillo es más significativo cuando aparece…", o: ["En cualquier sitio", "En una resistencia tras subir", "En un soporte tras una caída", "Solo en gráficos de 1 minuto"], c: 2, e: "El martillo es un rechazo de precios bajos: cobra sentido en soportes." },
        { p: "¿Qué indica un doji?", o: ["Fuerza compradora", "Fuerza vendedora", "Indecisión", "Fin de la sesión"], c: 2, e: "Apertura ≈ cierre: ningún lado ganó el periodo." },
        { p: "¿Cuándo debes interpretar una vela?", o: ["En cuanto se forma", "Cuando ha cerrado", "A mitad del periodo", "Da igual"], c: 1, e: "Hasta que cierra, la vela puede cambiar por completo." }
      ]
    },

    /* ───────────────────────── 1.3 ───────────────────────── */
    {
      id: "n1-3",
      titulo: "TradingView paso a paso",
      duracion: "40 min",
      acceso: "gratis",
      video: null,
      objetivos: [
        "Configurar un gráfico limpio del MNQ en TradingView.",
        "Usar las herramientas de dibujo esenciales: líneas, rectángulos y posición larga/corta.",
        "Crear alertas de precio y usar el modo Replay para practicar.",
        "Organizar tu espacio de trabajo para analizar sin distracciones."
      ],
      contenido: function (G) {
        const v = G.velas(G.ruta(20200, [[20185, 5], [20192, 3], [20240, 14], [20232, 4]], { semilla: 9 }), { semilla: 9, rangoMin: 3 });
        return `
<h3>1. Primeros pasos</h3>
<ol>
  <li>Crea una cuenta en <strong>tradingview.com</strong>. El plan gratuito es suficiente para empezar.</li>
  <li>Abre el gráfico (<em>Productos → Supercharts</em>).</li>
  <li>En el buscador de símbolos escribe <code>MNQ1!</code> (contrato continuo del Micro Nasdaq). También puedes usar <code>NQ1!</code>, que tiene el mismo gráfico y más historial.</li>
  <li>Elige la temporalidad en la barra superior: empieza con <strong>5 minutos</strong> para intradía y <strong>1 hora</strong> o <strong>diario</strong> para contexto.</li>
</ol>
<div class="callout aviso"><strong>Datos en tiempo real:</strong> los futuros de CME pueden mostrarse con retraso en TradingView si no tienes contratada la suscripción de datos en tiempo real. Para estudiar es suficiente; para operar necesitas los datos de tu broker o la suscripción.</div>

<h3>2. Configura un gráfico limpio</h3>
<ul>
  <li><strong>Colores de vela:</strong> clic derecho → <em>Configuración</em> → <em>Símbolo</em>. Usa verde/rojo con buen contraste.</li>
  <li><strong>Zona horaria:</strong> en <em>Configuración → Escalas</em>, pon <em>(UTC-4/-5) Nueva York</em>. Así los horarios de apertura (9:30) coinciden con los de las clases.</li>
  <li><strong>Sesiones:</strong> activa <em>Mostrar cambio de sesión</em> para ver dónde empieza cada día.</li>
  <li><strong>Menos es más:</strong> no cargues 10 indicadores. Para este nivel basta con el precio, el volumen y tus niveles dibujados.</li>
</ul>

<h3>3. Herramientas de dibujo esenciales</h3>
<table class="tabla">
  <thead><tr><th>Herramienta</th><th>Atajo (Windows)</th><th>Para qué sirve</th></tr></thead>
  <tbody>
    <tr><td>Línea horizontal</td><td>Alt + H</td><td>Marcar máximos y mínimos clave (del día anterior, apertura, etc.).</td></tr>
    <tr><td>Línea de tendencia</td><td>Alt + T</td><td>Unir mínimos crecientes o máximos decrecientes.</td></tr>
    <tr><td>Rectángulo</td><td>Alt + Shift + R</td><td>Dibujar zonas de soporte y resistencia (son zonas, no líneas exactas).</td></tr>
    <tr><td>Posición larga / corta</td><td>Panel lateral de herramientas</td><td>Planificar entrada, stop y objetivo y ver el ratio riesgo/beneficio.</td></tr>
    <tr><td>Regla de medir</td><td>Shift + clic</td><td>Medir puntos, ticks y tiempo entre dos precios.</td></tr>
  </tbody>
</table>
<p>En Mac se usa <em>Option</em> en lugar de <em>Alt</em>. Los atajos pueden cambiar con las actualizaciones de TradingView; si alguno no responde, búscalo en el panel lateral de herramientas.</p>

<h3>4. La herramienta de posición larga</h3>
<p>Es la herramienta más importante para un principiante, porque te obliga a definir <strong>antes de entrar</strong> dónde te equivocas (stop) y dónde cobras (objetivo). La zona roja es tu riesgo y la verde tu beneficio potencial. TradingView te muestra el ratio automáticamente.</p>

${G.velasSVG({
  velas: v,
  titulo: "Planificación con la herramienta 'Posición larga'",
  zonas: [
    { y1: 20192, y2: 20237, texto: "Objetivo +45 pts (+$90)", color: "sube", desde: 8 },
    { y1: 20177, y2: 20192, texto: "Stop −15 pts (−$30)", color: "baja", desde: 8 }
  ],
  lineas: [{ y: 20192, texto: "Entrada 20.192", color: "azul", desde: 8 }],
  marcas: [{ i: 8, texto: "Entrada", pos: "abajo", color: "azul" }],
  nota: "Ratio riesgo/beneficio 1:3 con 1 MNQ: arriesgas $30 para intentar ganar $90."
})}

<p>Cómo configurarla: selecciona la herramienta, haz clic en el precio de entrada y arrastra los bordes para ajustar stop y objetivo. Haz doble clic para abrir sus ajustes y escribe el tamaño de tu cuenta y el riesgo: TradingView calculará la cantidad. Para futuros, revisa que el valor del punto sea correcto, o usa la calculadora MNQ de esta web.</p>

<h3>5. Alertas</h3>
<p>No necesitas mirar la pantalla todo el día. Clic derecho sobre un nivel → <em>Añadir alerta</em>. Configura la condición (por ejemplo, "MNQ1! cruza 20.250") y la notificación (app, correo o ventana emergente). Las alertas te ayudan a esperar a que el precio llegue a <em>tu</em> zona en lugar de perseguirlo.</p>

<h3>6. Modo Replay: tu simulador de vuelo</h3>
<p>El botón <strong>Replay</strong> de la barra superior te permite volver a un día pasado y reproducir las velas una a una sin ver el futuro. Es la mejor forma de practicar: eliges un día, marcas tus niveles antes de la apertura, avanzas vela a vela y anotas cada operación como si fuera real. Disponibilidad: el Replay en temporalidades intradía puede requerir un plan de pago; revisa las condiciones actuales de TradingView.</p>

<h3>7. Diseños y listas de seguimiento</h3>
<p>Guarda tu diseño (nube con flecha arriba a la derecha) para no perder los dibujos. Crea una lista de seguimiento con los símbolos que vas a vigilar: MNQ1!, NQ1!, ES1! (para comparar con el S&amp;P 500) y, si quieres, el índice de volatilidad VIX.</p>`;
      },
      claves: [
        "Usa MNQ1! o NQ1! y pon la zona horaria de Nueva York.",
        "Dibuja zonas con rectángulos y planifica cada operación con la herramienta de posición.",
        "Las alertas te permiten esperar al precio en lugar de perseguirlo.",
        "El modo Replay es el simulador para practicar sin arriesgar dinero."
      ],
      ejercicios: [
        { enunciado: "Con la herramienta de posición larga planificas una entrada en 20.300, stop en 20.288 y objetivo en 20.336. ¿Cuál es el ratio riesgo/beneficio? (escribe solo el número de R, por ejemplo 2 para 1:2)", respuesta: 3, unidad: "R", solucion: "Riesgo = 12 puntos; beneficio = 36 puntos. 36 / 12 = <strong>3</strong>, es decir, 1:3." },
        { enunciado: "Configura tu gráfico: MNQ1! en 5 min, zona horaria de Nueva York, cambio de sesión visible. Marca con líneas horizontales el máximo y el mínimo del día anterior. Guarda el diseño.", solucion: "Comprueba que la línea vertical de cambio de sesión aparece a las 18:00 de Nueva York y que tus líneas siguen ahí al recargar la página." },
        { enunciado: "Usa el modo Replay en un día de la semana pasada. Desde la apertura (9:30) avanza vela a vela durante una hora y anota 2 operaciones hipotéticas con entrada, stop y objetivo.", solucion: "Lo importante no es si ganan, sino que definas stop y objetivo antes de avanzar la siguiente vela. Guarda capturas para tu diario." }
      ],
      quiz: [
        { p: "¿Qué símbolo de TradingView muestra el contrato continuo del Micro Nasdaq?", o: ["NASDAQ", "MNQ1!", "QQQ", "NDX"], c: 1, e: "El sufijo 1! indica el contrato continuo principal." },
        { p: "¿Para qué sirve la herramienta de posición larga?", o: ["Para abrir órdenes reales", "Para planificar entrada, stop, objetivo y ratio", "Para dibujar tendencias", "Para cambiar la temporalidad"], c: 1, e: "Es una herramienta de planificación visual del riesgo y el beneficio." },
        { p: "¿Cuál es la mejor forma de practicar sin dinero real?", o: ["Operar en 1 minuto", "El modo Replay", "Copiar señales", "Cargar más indicadores"], c: 1, e: "El Replay reproduce el mercado vela a vela sin mostrar el futuro." },
        { p: "Los soportes y resistencias se dibujan mejor como…", o: ["Líneas exactas", "Zonas (rectángulos)", "Círculos", "No se dibujan"], c: 1, e: "El precio reacciona en zonas, no en un tick exacto." }
      ]
    },

    /* ───────────────────────── 1.4 ───────────────────────── */
    {
      id: "n1-4",
      titulo: "Gestión de riesgo",
      duracion: "50 min",
      acceso: "gratis",
      video: null,
      objetivos: [
        "Definir cuánto arriesgar por operación y por día.",
        "Calcular el tamaño de posición en MNQ a partir del stop.",
        "Entender el ratio riesgo/beneficio, la tasa de acierto y la esperanza matemática.",
        "Ver con números por qué arriesgar demasiado destruye cualquier cuenta."
      ],
      contenido: function (G) {
        // Misma secuencia de operaciones (R) con riesgo del 1 % y del 10 %
        const rnd = G.prng(42), res = [];
        for (let i = 0; i < 60; i++) res.push(rnd() < 0.42 ? 2 : -1);
        // Racha de pérdidas al inicio para ilustrar el peligro
        res.splice(5, 0, -1, -1, -1, -1, -1, -1);
        const curva = function (pct) { let c = 10000; return [c].concat(res.map(function (r) { c = c * (1 + r * pct); return c; })); };
        const v = G.velas(G.ruta(20400, [[20380, 6], [20388, 3], [20425, 10]], { semilla: 5 }), { semilla: 5, rangoMin: 3 });
        return `
<h3>1. La regla número uno: sobrevivir</h3>
<p>El objetivo del principiante no es ganar mucho, es <strong>seguir en el juego</strong> el tiempo suficiente para aprender. Todos los traders profesionales tienen rachas de pérdidas. La diferencia es que su gestión de riesgo hace que esas rachas sean incómodas, no catastróficas.</p>

<h3>2. Riesgo por operación</h3>
<p>Una regla muy extendida es arriesgar entre el <strong>0,5 % y el 1 %</strong> de la cuenta por operación. Con $10.000, eso son entre $50 y $100 de pérdida máxima si salta el stop. Parece poco, pero mira lo que pasa con una racha de 10 pérdidas seguidas (algo que ocurre más de lo que crees):</p>
<table class="tabla">
  <thead><tr><th>Riesgo por operación</th><th>Cuenta tras 10 pérdidas seguidas</th><th>Ganancia necesaria para recuperar</th></tr></thead>
  <tbody>
    <tr><td>1 %</td><td>$9.044 (−9,6 %)</td><td>+10,6 %</td></tr>
    <tr><td>2 %</td><td>$8.171 (−18,3 %)</td><td>+22,4 %</td></tr>
    <tr><td>5 %</td><td>$5.987 (−40,1 %)</td><td>+67,0 %</td></tr>
    <tr><td>10 %</td><td>$3.487 (−65,1 %)</td><td>+186,8 %</td></tr>
  </tbody>
</table>
<p>Las pérdidas y las ganancias no son simétricas: si pierdes el 50 % necesitas ganar un <strong>100 %</strong> solo para volver al punto de partida.</p>

${G.lineaSVG({
  valores: curva(0.01),
  texto: "Riesgo 1 %",
  color: "sube",
  extra: [{ valores: curva(0.10), texto: "Riesgo 10 %", color: "baja" }],
  titulo: "Las mismas 66 operaciones, distinto riesgo por operación",
  formato: function (x) { return "$" + Math.round(x).toLocaleString("es-ES"); },
  nota: "Mismo sistema (42 % de acierto, ratio 1:2) y misma secuencia de resultados. Con el 10 % la racha inicial de 6 pérdidas deja la cuenta casi a la mitad y la volatilidad es insoportable. Con el 1 % la racha apenas se nota."
})}

<h3>3. El stop loss</h3>
<p>El stop es el precio en el que tu idea queda invalidada. No se pone "a 10 puntos porque sí", sino <strong>donde el mercado demuestra que te equivocaste</strong>: por debajo del mínimo que defiende tu compra, por encima del máximo que defiende tu venta. Primero se decide el stop técnico y después se calcula cuántos contratos caben.</p>
<p>Reglas no negociables:</p>
<ul>
  <li>El stop se coloca <strong>en el momento de entrar</strong>, como orden real en la plataforma.</li>
  <li>Nunca se aleja para "darle más espacio". Se puede acercar para proteger beneficios, nunca alejar.</li>
  <li>Si el stop técnico es tan grande que ni con 1 MNQ respetas tu riesgo máximo, <strong>no hay operación</strong>.</li>
</ul>

<h3>4. Calcular el tamaño de posición</h3>
<div class="callout"><strong>Contratos = Riesgo en $ ÷ (Stop en puntos × Valor del punto)</strong><br>Siempre se redondea <strong>hacia abajo</strong>.</div>
<p>Ejemplo: cuenta de $10.000, riesgo del 1 % = $100. Tu stop técnico está a 18 puntos. En MNQ: 100 ÷ (18 × 2) = 2,78 → <strong>2 contratos</strong>. Riesgo real: 18 × 2 × 2 = $72. Con un stop de 60 puntos: 100 ÷ 120 = 0,83 → <strong>0 contratos</strong>: esa operación no cabe en tu plan.</p>
<p>Puedes hacer estos cálculos al instante con la <a href="#risk">Calculadora de Riesgo MNQ</a>.</p>

<h3>5. Ratio riesgo/beneficio (R)</h3>
<p>Llamamos <strong>1R</strong> a la cantidad que arriesgas. Si arriesgas $50 y ganas $100, ganaste 2R. Pensar en R en lugar de en dólares te ayuda a evaluar tus operaciones independientemente del tamaño.</p>

${G.velasSVG({
  velas: v,
  titulo: "Operación 1:2 — riesgo 10 pts, objetivo 20 pts",
  zonas: [
    { y1: 20388, y2: 20408, texto: "Objetivo +2R", color: "sube", desde: 9 },
    { y1: 20378, y2: 20388, texto: "Stop −1R", color: "baja", desde: 9 }
  ],
  marcas: [{ i: 9, texto: "Entrada 20.388", pos: "abajo", color: "azul" }],
  nota: "Con 1 MNQ: riesgo $20, objetivo $40. El stop va debajo del mínimo que defendió el precio."
})}

<h3>6. Tasa de acierto y esperanza matemática</h3>
<p>Tu tasa de acierto mínima para no perder dinero depende del ratio:</p>
<table class="tabla">
  <thead><tr><th>Ratio R:B</th><th>Acierto mínimo para no perder</th></tr></thead>
  <tbody>
    <tr><td>1:1</td><td>50 %</td></tr><tr><td>1:1,5</td><td>40 %</td></tr>
    <tr><td>1:2</td><td>33,3 %</td></tr><tr><td>1:3</td><td>25 %</td></tr>
  </tbody>
</table>
<p>La <strong>esperanza matemática</strong> te dice cuánto ganas de media por operación:</p>
<div class="callout"><strong>E = (% acierto × ganancia media) − (% fallo × pérdida media)</strong><br>Ejemplo: 45 % de acierto, ganancia media $80, pérdida media $40 → E = 0,45 × 80 − 0,55 × 40 = 36 − 22 = <strong>+$14 por operación</strong> (antes de comisiones).</div>
<p>Un sistema con esperanza positiva puede perder 6 veces seguidas y seguir siendo rentable a largo plazo. Por eso la gestión de riesgo existe: para que sobrevivas a la parte mala de la estadística.</p>

<h3>7. Límites diarios</h3>
<ul>
  <li><strong>Pérdida máxima diaria:</strong> por ejemplo 2R o 3R. Si la alcanzas, cierras la plataforma. Sin excepciones.</li>
  <li><strong>Número máximo de operaciones:</strong> 3 o 4 al día evita el sobretrading.</li>
  <li><strong>Objetivo diario (opcional):</strong> algunos traders paran al ganar 3R para no devolver el beneficio.</li>
</ul>`;
      },
      claves: [
        "Arriesga entre el 0,5 % y el 1 % de la cuenta por operación.",
        "Contratos = Riesgo $ ÷ (Stop pts × $ por punto), redondeando hacia abajo.",
        "El stop va donde la idea queda invalidada, se coloca al entrar y nunca se aleja.",
        "Con ratio 1:2 basta con acertar más del 33,3 % para no perder."
      ],
      ejercicios: [
        { enunciado: "Cuenta de $25.000, riesgo 0,5 %, stop de 25 puntos. ¿Cuántos MNQ puedes operar?", respuesta: 2, unidad: "contratos", solucion: "Riesgo = $125. Riesgo por contrato = 25 × $2 = $50. 125 ÷ 50 = 2,5 → <strong>2 contratos</strong> (riesgo real $100)." },
        { enunciado: "Tu sistema acierta el 38 % con ganancia media de $90 y pérdida media de $45. ¿Cuál es la esperanza por operación?", respuesta: 6.3, tolerancia: 0.05, unidad: "$", solucion: "E = 0,38 × 90 − 0,62 × 45 = 34,2 − 27,9 = <strong>+$6,30</strong>. Positiva, aunque las comisiones podrían anularla." },
        { enunciado: "Pierdes el 25 % de tu cuenta. ¿Qué porcentaje necesitas ganar para recuperarlo?", respuesta: 33.33, tolerancia: 0.2, unidad: "%", solucion: "Te queda el 75 %. Para volver al 100 %: 100 / 75 − 1 = <strong>33,3 %</strong>." }
      ],
      quiz: [
        { p: "¿Qué riesgo por operación se recomienda a un principiante?", o: ["5–10 %", "0,5–1 %", "Lo que permita el margen", "20 %"], c: 1, e: "Entre 0,5 % y 1 % permite sobrevivir a rachas largas." },
        { p: "Stop de 30 puntos, riesgo máximo $100. ¿Cuántos MNQ?", o: ["0", "1", "2", "3"], c: 1, e: "100 ÷ (30 × 2) = 1,67 → 1 contrato." },
        { p: "Con ratio 1:3, ¿qué acierto mínimo necesitas para no perder?", o: ["50 %", "33 %", "25 %", "10 %"], c: 2, e: "1 / (1 + 3) = 25 %." },
        { p: "El precio se acerca a tu stop. ¿Qué haces?", o: ["Lo alejo", "Lo quito", "Lo respeto", "Añado contratos"], c: 2, e: "El stop nunca se aleja. Si salta, la idea era incorrecta." }
      ]
    },

    /* ───────────────────────── 1.5 ───────────────────────── */
    {
      id: "n1-5",
      titulo: "Psicología del trading y plan de trading",
      duracion: "40 min",
      acceso: "gratis",
      video: null,
      objetivos: [
        "Reconocer las emociones que sabotean las decisiones: miedo, codicia, FOMO y revancha.",
        "Construir un plan de trading escrito con reglas claras.",
        "Empezar un diario de trading útil.",
        "Crear una rutina antes, durante y después de la sesión."
      ],
      contenido: function (G) {
        const eq = [0, 40, 25, 70, 50, 95, 80, 120, 100, 60, 20, -40, -130, -260, -420, -380, -500];
        return `
<h3>1. Por qué la psicología importa tanto</h3>
<p>Puedes saber todo sobre velas, niveles y riesgo, y aun así perder dinero si no ejecutas tu plan. El mercado está diseñado para provocar reacciones: velas rápidas que generan miedo a quedarte fuera, retrocesos que te hacen dudar, rachas de pérdidas que piden revancha. El trading consistente es, en gran parte, <strong>la capacidad de hacer lo mismo una y otra vez</strong> aunque te sientas incómodo.</p>

<h3>2. Las cuatro emociones peligrosas</h3>
<p><strong>Miedo:</strong> te hace cerrar ganadoras demasiado pronto o no entrar en operaciones válidas. Suele venir de arriesgar demasiado: si una pérdida te duele de verdad, tu tamaño es excesivo.</p>
<p><strong>Codicia / euforia:</strong> tras varias ganancias te sientes invencible y subes el tamaño o relajas tus reglas. Es justo cuando llegan las peores pérdidas.</p>
<p><strong>FOMO (miedo a quedarte fuera):</strong> el precio sale disparado sin ti y entras tarde, lejos de tu nivel, con un stop malo. El mercado siempre ofrece otra oportunidad.</p>
<p><strong>Revancha (revenge trading):</strong> después de una pérdida, abres otra operación inmediatamente, más grande, para "recuperar". Es la forma más rápida de convertir un mal día en un desastre.</p>

${G.lineaSVG({
  valores: eq,
  texto: "Resultado del día ($)",
  color: "oro",
  titulo: "Anatomía de un día de revancha",
  etiquetas: [{ i: 7, texto: "+$120: objetivo cumplido" }, { i: 11, texto: "Revancha" }, { i: 14, texto: "Tamaño x3" }],
  formato: function (x) { return "$" + Math.round(x); },
  nota: "El día iba bien. Una pérdida normal provoca operaciones impulsivas y cada vez más grandes. Con una regla de \"parar al devolver la mitad del beneficio\" o una pérdida máxima diaria, el día habría terminado en positivo en lugar de en −$500."
})}

<h3>3. El plan de trading</h3>
<p>Un plan de trading es un documento escrito que responde a todas las preguntas <strong>antes</strong> de que el mercado abra, para que durante la sesión no tengas que improvisar. Un plan mínimo incluye:</p>
<ol>
  <li><strong>Mercado y horario:</strong> "Opero MNQ de 9:30 a 11:30 hora de Nueva York".</li>
  <li><strong>Setup:</strong> qué condiciones exactas deben darse para entrar (lo construirás en el Nivel 2).</li>
  <li><strong>Riesgo:</strong> "1 % por operación, máximo 3 operaciones, pérdida máxima diaria 2R".</li>
  <li><strong>Gestión:</strong> dónde va el stop, dónde el objetivo, cuándo muevo el stop a breakeven.</li>
  <li><strong>Cuándo NO opero:</strong> noticias de alto impacto (por ejemplo, decisiones de tipos de la Reserva Federal o el dato de empleo), cansancio, enfado o falta de sueño.</li>
</ol>

<h3>4. El diario de trading</h3>
<p>Sin diario no hay mejora: solo recuerdos sesgados. Registra cada operación con:</p>
<table class="tabla">
  <thead><tr><th>Campo</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>Fecha y hora</td><td>14/10, 9:47</td></tr>
    <tr><td>Setup</td><td>Rebote en mínimo del día anterior</td></tr>
    <tr><td>Entrada / stop / objetivo</td><td>20.150 / 20.138 / 20.174</td></tr>
    <tr><td>Resultado en R</td><td>+2R</td></tr>
    <tr><td>¿Seguí el plan?</td><td>Sí</td></tr>
    <tr><td>Emoción antes / durante</td><td>Tranquilo / impaciente al final</td></tr>
    <tr><td>Captura del gráfico</td><td>Enlace o imagen</td></tr>
  </tbody>
</table>
<p>La columna más importante es <strong>"¿Seguí el plan?"</strong>. Una operación perdedora que siguió el plan es una buena operación. Una ganadora que rompió las reglas es una mala operación con suerte, y refuerza malos hábitos.</p>

<h3>5. Rutina diaria</h3>
<p><strong>Antes (30 min):</strong> revisar el calendario económico, marcar máximos y mínimos del día anterior y del overnight, definir 2 o 3 escenarios. <strong>Durante:</strong> esperar a tus zonas, ejecutar, no mirar el saldo en cada tick. <strong>Después (15 min):</strong> rellenar el diario, guardar capturas, puntuar tu disciplina del 1 al 10.</p>

<h3>6. Técnicas prácticas</h3>
<ul>
  <li><strong>Regla de los 10 minutos:</strong> después de una pérdida, levántate de la silla 10 minutos.</li>
  <li><strong>Checklist física:</strong> no entras si no puedes marcar todas las casillas.</li>
  <li><strong>Reduce el tamaño:</strong> si sientes ansiedad, opera menos contratos. El miedo suele ser un problema de tamaño.</li>
  <li><strong>Mide procesos, no dinero:</strong> tu objetivo de la semana es "seguir el plan en el 100 % de las operaciones", no "ganar $500".</li>
</ul>`;
      },
      claves: [
        "Miedo, codicia, FOMO y revancha son los grandes saboteadores.",
        "Un plan escrito elimina la improvisación durante la sesión.",
        "El diario mide si seguiste el plan, no solo si ganaste.",
        "La pérdida máxima diaria protege tu cuenta de tus propios impulsos."
      ],
      ejercicios: [
        { enunciado: "Escribe tu primer plan de trading de una página con los 5 apartados de la clase. Pégalo junto a tu monitor.", solucion: "Un buen plan es específico: \"1 % por operación\" en lugar de \"poco riesgo\"; \"de 9:30 a 11:30\" en lugar de \"por la mañana\". Si una regla no se puede comprobar con un sí o un no, reescríbela." },
        { enunciado: "Tu regla es pérdida máxima diaria de 2R con R = $40. Llevas −$60 y ves una entrada. ¿Cuánto puedes arriesgar como máximo en ella?", respuesta: 20, unidad: "$", solucion: "Límite diario = 2 × 40 = $80. Llevas −$60, así que quedan <strong>$20</strong>. Si tu setup necesita más riesgo, el día se ha terminado." },
        { enunciado: "Revisa tus últimas 10 operaciones (reales o en simulador). ¿Cuántas siguieron el plan al 100 %? Clasifícalas en: buena ganadora, buena perdedora, mala ganadora y mala perdedora.", solucion: "Las \"malas ganadoras\" son las más peligrosas porque premian la indisciplina. El objetivo es que solo existan las dos categorías \"buenas\"." }
      ],
      quiz: [
        { p: "¿Qué es el 'revenge trading'?", o: ["Operar noticias", "Operar impulsivamente para recuperar una pérdida", "Operar en corto", "Usar un stop amplio"], c: 1, e: "Es intentar recuperar rápido lo perdido, normalmente con más tamaño y peores entradas." },
        { p: "Una operación perdedora que siguió el plan es…", o: ["Una mala operación", "Una buena operación", "Un error grave", "Motivo para cambiar de estrategia"], c: 1, e: "El resultado individual es aleatorio; seguir el plan es lo que controla el trader." },
        { p: "Si sientes mucho miedo en cada operación, probablemente…", o: ["Tu tamaño es excesivo", "Necesitas más indicadores", "Debes operar más", "Debes quitar el stop"], c: 0, e: "Reducir el tamaño suele reducir el miedo." },
        { p: "¿Qué campo del diario es el más importante?", o: ["El beneficio", "¿Seguí el plan?", "La hora", "El broker"], c: 1, e: "La disciplina es lo que determina los resultados a largo plazo." }
      ]
    }
  ],
  examen: {
    aprobado: 70,
    preguntas: [
      { p: "¿Cuánto ganas con 3 MNQ si el precio sube 10 puntos a tu favor?", o: ["$20", "$30", "$60", "$600"], c: 2, e: "10 × $2 × 3 = $60." },
      { p: "¿Cuál es el tick mínimo del MNQ y su valor?", o: ["1 punto = $2", "0,25 puntos = $0,50", "0,5 puntos = $1", "0,25 puntos = $5"], c: 1, e: "El tick es 0,25 puntos, que en MNQ vale $0,50." },
      { p: "¿En qué horario es la sesión regular (RTH) de los futuros de índices de EE. UU.?", o: ["8:00–17:00 Madrid", "9:30–16:00 Nueva York", "18:00–17:00 Nueva York", "24 horas"], c: 1, e: "La sesión regular coincide con la bolsa de Nueva York, de 9:30 a 16:00." },
      { p: "Una vela con mecha inferior larga y cuerpo pequeño arriba se llama…", o: ["Estrella fugaz", "Doji", "Martillo", "Marubozu"], c: 2, e: "El martillo muestra rechazo de precios bajos." },
      { p: "Entrada 20.000, stop 19.990, objetivo 20.025. ¿Ratio?", o: ["1:1", "1:2", "1:2,5", "1:3"], c: 2, e: "Riesgo 10, beneficio 25 → 1:2,5." },
      { p: "Cuenta $10.000, riesgo 1 %, stop 20 puntos. ¿Cuántos MNQ?", o: ["1", "2", "5", "0"], c: 1, e: "100 ÷ (20 × 2) = 2,5 → 2 contratos." },
      { p: "Si pierdes el 50 % de la cuenta, ¿cuánto necesitas ganar para recuperarlo?", o: ["50 %", "75 %", "100 %", "150 %"], c: 2, e: "De 50 a 100 hay que duplicar: +100 %." },
      { p: "Acierto 40 %, ganancia media $60, pérdida media $30. ¿Esperanza?", o: ["+$6", "+$12", "−$6", "$0"], c: 0, e: "0,4 × 60 − 0,6 × 30 = 24 − 18 = +$6." },
      { p: "¿Qué herramienta de TradingView permite practicar con días pasados sin ver el futuro?", o: ["Pine Editor", "Replay", "Screener", "Alertas"], c: 1, e: "El modo Replay reproduce las velas una a una." },
      { p: "Alcanzas tu pérdida máxima diaria. ¿Qué haces?", o: ["Una última operación para recuperar", "Duplicar el tamaño", "Cerrar la plataforma hasta mañana", "Cambiar de mercado"], c: 2, e: "La regla existe precisamente para ese momento." }
    ]
  }
});
