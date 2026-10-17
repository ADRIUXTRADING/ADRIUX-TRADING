/* ADRIUX TRADING ACADEMY — Nivel 3: Avanzado */
window.ADRIUX_CURSO = window.ADRIUX_CURSO || [];
window.ADRIUX_CURSO.push({
  id: "n3",
  numero: 3,
  titulo: "Avanzado",
  descripcion: "Análisis multitemporal, volumen y perfil de volumen, automatización, inteligencia artificial y disciplina profesional.",
  lecciones: [
    /* ───────────────────────── 3.1 ───────────────────────── */
    {
      id: "n3-1",
      titulo: "Análisis multitemporal",
      duracion: "50 min",
      acceso: "gratis",
      video: null,
      objetivos: [
        "Aplicar un análisis de arriba abajo (top-down): diario → 1 hora → 5 minutos.",
        "Alinear la dirección de la temporalidad alta con la entrada en la baja.",
        "Usar la temporalidad baja para afinar el stop y mejorar el ratio.",
        "Evitar la parálisis por análisis y los conflictos entre temporalidades."
      ],
      contenido: function (G) {
        const h1 = G.velas(G.ruta(19800, [[19950, 8], [19890, 5], [20060, 8], [19990, 5], [20020, 2]], { semilla: 101, ruido: 0.3 }), { semilla: 101, rangoMin: 12 });
        const m5 = G.velas(G.ruta(20030, [[20008, 5], [19996, 4], [19992, 3], [20004, 3], [19998, 2], [20030, 7], [20044, 4]], { semilla: 102, ruido: 0.3 }), { semilla: 102, rangoMin: 2.5 });
        return `
<h3>1. Por qué mirar varias temporalidades</h3>
<p>Cada temporalidad cuenta una parte de la historia. Una caída fuerte en 5 minutos puede ser solo un retroceso normal dentro de una tendencia alcista de 1 hora. Si solo miras la temporalidad baja, venderás justo donde los compradores de la temporalidad alta están esperando. El análisis multitemporal resuelve esto con una regla simple:</p>
<div class="callout"><strong>La temporalidad alta decide la dirección y las zonas. La temporalidad baja decide el momento de entrada y el stop.</strong></div>

<h3>2. El método top-down en tres pasos</h3>
<table class="tabla">
  <thead><tr><th>Temporalidad</th><th>Pregunta</th><th>Qué marcas</th></tr></thead>
  <tbody>
    <tr><td>Diario / 4 horas</td><td>¿Cuál es la tendencia general? ¿Dónde están los grandes niveles?</td><td>Estructura, zonas mayores de soporte/resistencia, máximos y mínimos semanales.</td></tr>
    <tr><td>1 hora / 15 minutos</td><td>¿Qué está haciendo el precio esta semana? ¿Dónde espero reacción hoy?</td><td>Estructura intermedia, PDH/PDL, zonas de demanda/oferta recientes.</td></tr>
    <tr><td>5 minutos / 1 minuto</td><td>¿Hay un gatillo válido en mi zona?</td><td>Barrida, ruptura de estructura local, vela de rechazo, retesteo.</td></tr>
  </tbody>
</table>
<p>Una proporción habitual entre temporalidades es de 4 a 6 veces: diario → 4 h → 1 h, o 1 h → 15 min → 3 min. Elige un trío y no cambies cada día.</p>

${G.velasSVG({
  velas: h1,
  titulo: "Paso 1 — Gráfico de 1 hora: tendencia alcista y zona de compra",
  zonas: [{ y1: 19950, y2: 19985, texto: "Zona: antigua resistencia → soporte", color: "sube", desde: 7 }],
  marcas: [{ i: 7, texto: "Máximo anterior", pos: "arriba", color: "oro" }, { i: 25, texto: "Retroceso a la zona", pos: "abajo", color: "sube" }],
  nota: "En 1 hora la estructura es alcista (HH + HL). El retroceso actual llega a la zona donde antes hubo resistencia: es el lugar donde esperamos compradores."
})}

${G.velasSVG({
  velas: m5,
  titulo: "Paso 2 — Gráfico de 5 minutos dentro de la zona: el gatillo",
  zonas: [{ y1: 19985, y2: 20000, texto: "Zona de 1 hora", color: "sube" }],
  lineas: [{ y: 20004, texto: "Máximo local", color: "azul", discontinua: true, desde: 12, hasta: 19 }],
  marcas: [{ i: 11, texto: "Mínimo en la zona", pos: "abajo", color: "oro" }, { i: 19, texto: "Ruptura local → entrada", pos: "arriba", color: "azul" }],
  nota: "En 5 minutos el retroceso era bajista. Cuando el precio supera el último máximo local dentro de la zona de 1 hora, la temporalidad baja se alinea con la alta. Stop debajo del mínimo de 5 minutos, mucho más ajustado que si usáramos el gráfico de 1 hora."
})}

<h3>3. La ventaja: stops más pequeños, mismo análisis</h3>
<p>Si en el ejemplo usáramos solo el gráfico de 1 hora, el stop lógico estaría debajo de toda la zona, quizá a 60–70 puntos. Con la entrada en 5 minutos el stop puede ir debajo del mínimo local, a unos 15–20 puntos. Con el mismo riesgo en dólares operas más contratos, o con el mismo número de contratos arriesgas menos, y el objetivo (el máximo de 1 hora) sigue siendo el mismo: el ratio mejora mucho.</p>
<p>El precio a pagar: más operaciones fallidas, porque un stop más ajustado salta con más facilidad. Por eso hay que comprobarlo en el backtest.</p>

<h3>4. Cuando las temporalidades no están de acuerdo</h3>
<ul>
  <li><strong>Alta alcista, baja bajista:</strong> es un retroceso. Espera a que llegue a tu zona y gire. No vendas contra la temporalidad alta salvo que tengas un setup específico y probado para ello.</li>
  <li><strong>Alta en rango:</strong> opera los extremos del rango o reduce el tamaño. En el centro del rango no hay ventaja.</li>
  <li><strong>Alta poco clara:</strong> la mejor operación puede ser ninguna. No tener sesgo también es información.</li>
</ul>

<h3>5. Evita la parálisis por análisis</h3>
<p>Mirar 6 temporalidades y 4 mercados no te da más información, te da más contradicciones. Haz el análisis de las temporalidades altas <strong>antes de la apertura</strong>, escríbelo (sesgo, zonas y escenarios) y durante la sesión mira solo la temporalidad de ejecución, consultando la intermedia de vez en cuando.</p>

<h3>6. Plantilla de preparación diaria</h3>
<ol>
  <li><strong>Diario:</strong> tendencia ______. Zonas mayores: ______.</li>
  <li><strong>1 hora:</strong> estructura ______. PDH ______, PDL ______, ONH ______, ONL ______.</li>
  <li><strong>Escenario A (principal):</strong> si el precio llega a ______ y muestra ______, busco ______ con objetivo ______.</li>
  <li><strong>Escenario B (alternativo):</strong> si pierde ______, cambio el sesgo a ______.</li>
  <li><strong>Noticias del día:</strong> ______ a las ______ (no opero 5 minutos antes y después).</li>
</ol>`;
      },
      claves: [
        "Temporalidad alta = dirección y zonas; baja = momento de entrada y stop.",
        "Proporción de 4–6 veces entre temporalidades; elige un trío fijo.",
        "La entrada en temporalidad baja reduce el stop y mejora el ratio.",
        "Prepara el análisis alto antes de la apertura y escríbelo."
      ],
      ejercicios: [
        { enunciado: "Con un stop de 1 hora de 64 puntos, ¿cuántos MNQ puedes operar con $200 de riesgo? ¿Y con un stop de 5 minutos de 16 puntos?", respuesta: 6, unidad: "contratos (con stop de 16)", solucion: "Stop 64: 200 ÷ 128 = 1,56 → <strong>1 contrato</strong>. Stop 16: 200 ÷ 32 = 6,25 → <strong>6 contratos</strong>. Mismo riesgo, seis veces más exposición al movimiento hacia el objetivo." },
        { enunciado: "Rellena la plantilla de preparación diaria para la próxima sesión de MNQ. Al cerrar el mercado, compara lo que pasó con tus escenarios.", solucion: "No se trata de acertar el escenario, sino de tener un plan para cada uno. Con el tiempo, revisa qué tipo de escenario aciertas más: es una pista sobre tu ventaja." },
        { enunciado: "El diario es bajista, la 1 hora está en rango y en 5 minutos ves una ruptura alcista fuerte. ¿Compras? Razona.", solucion: "Con mucha cautela o no. La ruptura de 5 minutos va contra el diario y ocurre dentro de un rango de 1 hora. Si estás en la parte baja del rango y tu setup lo permite, quizá con tamaño reducido y objetivo en la parte alta del rango. En el centro del rango, no." }
      ],
      quiz: [
        { p: "¿Qué decide la temporalidad alta?", o: ["El momento exacto de entrada", "La dirección y las zonas", "El número de contratos", "El broker"], c: 1, e: "La alta da contexto; la baja, el gatillo." },
        { p: "Principal ventaja de entrar en temporalidad baja:", o: ["Más indicadores", "Stops más pequeños y mejor ratio", "Ganar siempre", "Menos comisiones"], c: 1, e: "Con un stop menor el ratio hacia el mismo objetivo mejora." },
        { p: "La 1 hora es alcista y la 5 minutos bajista. Probablemente es…", o: ["Un cambio de tendencia seguro", "Un retroceso dentro de la tendencia", "Un error", "Momento de vender fuerte"], c: 1, e: "Hasta que no rompa la estructura alta, es un retroceso." },
        { p: "¿Cuándo es mejor hacer el análisis de temporalidades altas?", o: ["Durante cada operación", "Antes de la apertura", "Al final del mes", "Nunca"], c: 1, e: "Así no te contaminas con el ruido de la sesión." }
      ]
    },

    /* ───────────────────────── 3.2 ───────────────────────── */
    {
      id: "n3-2",
      titulo: "Volumen y perfil de volumen",
      duracion: "55 min",
      acceso: "gratis",
      video: null,
      objetivos: [
        "Leer el volumen para confirmar o cuestionar los movimientos del precio.",
        "Reconocer el volumen de clímax y el de agotamiento.",
        "Entender el perfil de volumen: POC, área de valor (VAH/VAL), nodos altos y bajos.",
        "Usar el perfil para elegir zonas de entrada y objetivos."
      ],
      contenido: function (G) {
        const vol1 = [];
        for (let i = 0; i < 30; i++) vol1.push(i === 18 ? 2600 : i === 19 ? 2100 : i > 19 ? 1100 + (i % 3) * 150 : 500 + (i % 4) * 90);
        const rup = G.velas(G.ruta(100, [[104, 4], [101, 3], [104.2, 3], [101.3, 3], [104, 3], [102, 2], [108, 2], [110.5, 4], [113, 6]], { semilla: 111, ruido: 0.2 }), { semilla: 111, rangoMin: 0.7, mecha: 0.4, volumen: vol1 });
        const vol2 = [];
        for (let i = 0; i < 26; i++) vol2.push(i < 6 ? 700 : i < 14 ? 800 + i * 20 : i < 18 ? 1300 : i === 18 ? 3200 : i === 19 ? 1600 : 650);
        const cli = G.velas(G.ruta(130, [[124, 6], [118, 8], [112, 4], [107.5, 1], [111, 2], [110, 2], [113, 3]], { semilla: 121, ruido: 0.25 }), { semilla: 121, rangoMin: 0.9, mecha: 0.5, volumen: vol2 });
        const perf = G.velas(G.ruta(200, [[206, 5], [203, 4], [205, 4], [203.5, 4], [205.5, 4], [211, 3], [209, 3], [214, 4], [213, 3]], { semilla: 131, ruido: 0.25 }), { semilla: 131, rangoMin: 1, mecha: 0.5 });
        return `
<h3>1. El volumen es la gasolina del movimiento</h3>
<p>El volumen indica cuántos contratos se negociaron en cada vela. No dice si compraron o vendieron más (cada contrato tiene un comprador y un vendedor), sino <strong>cuánto interés y participación</strong> hubo en ese precio. Su utilidad está en compararlo con el movimiento del precio:</p>
<table class="tabla">
  <thead><tr><th>Precio</th><th>Volumen</th><th>Lectura</th></tr></thead>
  <tbody>
    <tr><td>Rompe un nivel</td><td>Alto</td><td>Participación real: la ruptura tiene más probabilidad de continuar.</td></tr>
    <tr><td>Rompe un nivel</td><td>Bajo</td><td>Poca convicción: riesgo de ruptura falsa.</td></tr>
    <tr><td>Retrocede en tendencia</td><td>Bajo</td><td>Retroceso sano: los contrarios no tienen fuerza.</td></tr>
    <tr><td>Movimiento largo que se acelera</td><td>Muy alto (pico)</td><td>Posible clímax: los últimos en llegar entran y el movimiento se agota.</td></tr>
  </tbody>
</table>

${G.velasSVG({
  velas: rup,
  volumen: true,
  titulo: "Ruptura de rango con volumen",
  zonas: [{ y1: 100.6, y2: 104.6, texto: "Rango (volumen bajo)", color: "gris", hasta: 17 }],
  marcas: [{ i: 18, texto: "Ruptura + volumen", pos: "arriba", color: "sube" }],
  nota: "Durante el rango el volumen es bajo. La ruptura llega con el mayor volumen de la sesión y el precio no vuelve al rango: aceptación de precios más altos."
})}

<h3>2. Clímax y agotamiento</h3>
<p>Al final de una caída larga suele aparecer una vela enorme con un volumen extraordinario: es el momento en que los últimos vendedores se rinden (o sus stops se ejecutan) y los grandes compradores absorben toda esa oferta. Se llama <strong>clímax de venta</strong> o capitulación. No es una señal de compra inmediata, pero sí un aviso de que el movimiento puede estar terminando. La confirmación llega cuando el precio deja de hacer mínimos nuevos y la estructura cambia.</p>

${G.velasSVG({
  velas: cli,
  volumen: true,
  titulo: "Clímax de venta al final de una tendencia bajista",
  marcas: [{ i: 18, texto: "Clímax", pos: "abajo", color: "oro" }],
  nota: "La vela del mínimo tiene más del doble del volumen medio. Después, el volumen se seca y el precio deja de caer."
})}

<h3>3. El perfil de volumen</h3>
<p>El volumen normal se dibuja en el tiempo (barras abajo). El <strong>perfil de volumen</strong> lo dibuja en el precio: un histograma horizontal que muestra cuánto se negoció en cada nivel. Revela dónde el mercado considera que el precio es "justo" y dónde lo rechazó rápidamente.</p>
<ul>
  <li><strong>POC (Point of Control):</strong> el precio con más volumen. Actúa como imán y como zona de equilibrio.</li>
  <li><strong>Área de valor (VA):</strong> rango de precios donde se negoció aproximadamente el 70 % del volumen. Sus límites son el <strong>VAH</strong> (alto) y el <strong>VAL</strong> (bajo).</li>
  <li><strong>Nodos de alto volumen (HVN):</strong> zonas de aceptación; el precio tiende a frenarse y moverse lateral.</li>
  <li><strong>Nodos de bajo volumen (LVN):</strong> zonas de rechazo; el precio tiende a atravesarlas rápido.</li>
</ul>

${G.velasSVG({
  velas: perf,
  perfil: true,
  titulo: "Perfil de volumen de la sesión",
  nota: "El histograma de la derecha muestra el volumen por precio. Dorado: POC. Azul: área de valor (70 %). La parte superior, con poco volumen, se atravesó rápido."
})}

<h3>4. Cómo usar el perfil en el trading diario</h3>
<ol>
  <li><strong>Apertura dentro del área de valor del día anterior:</strong> alta probabilidad de día de rango; el precio tiende a moverse entre VAH y VAL.</li>
  <li><strong>Apertura fuera del área de valor:</strong> si el precio vuelve a entrar y se mantiene dentro durante dos periodos de 30 minutos, a menudo recorre toda el área hasta el otro extremo (la "regla del 80 %" que citan muchos traders de perfil; tómala como hipótesis a comprobar en tu backtest, no como ley).</li>
  <li><strong>POC del día anterior no visitado (naked POC):</strong> buen objetivo; el precio tiende a volver a él.</li>
  <li><strong>LVN como zona de entrada:</strong> en un retroceso, un nodo de bajo volumen entre dos zonas de aceptación suele dar reacciones rápidas y stops pequeños.</li>
</ol>

<h3>5. Herramientas</h3>
<p>En TradingView existen herramientas de perfil como <em>Volume Profile Visible Range</em>, <em>Session Volume Profile</em> y <em>Fixed Range</em>. Su disponibilidad depende del plan contratado. Plataformas de futuros como NinjaTrader, Sierra Chart, Quantower o ATAS ofrecen perfiles y datos de order flow (delta, footprint) más detallados.</p>

<h3>6. Order flow: una introducción</h3>
<p>El <strong>delta</strong> es la diferencia entre el volumen negociado contra el precio de venta (compradores agresivos) y contra el de compra (vendedores agresivos). Un delta muy negativo en un soporte sin que el precio caiga indica <em>absorción</em>: alguien está comprando todo lo que venden los agresivos. Es un tema avanzado que necesita datos de calidad y práctica; trátalo como una confirmación adicional, no como punto de partida.</p>`;
      },
      claves: [
        "El volumen mide participación; compáralo siempre con el movimiento del precio.",
        "Ruptura con volumen alto = más fiable. Retroceso con volumen bajo = sano.",
        "POC = precio con más volumen; área de valor = 70 % del volumen (VAH/VAL).",
        "Los nodos de bajo volumen se atraviesan rápido; los de alto volumen frenan el precio."
      ],
      ejercicios: [
        { enunciado: "El precio rompe la resistencia del rango de apertura, pero el volumen de la vela de ruptura es la mitad del volumen medio de las 10 velas anteriores. ¿Qué haces?", solucion: "Desconfiar. Una ruptura con poco volumen tiene más riesgo de ser falsa. Opciones: esperar un retesteo con mejor volumen, reducir el tamaño, o considerar la posible barrida si el precio vuelve dentro del rango." },
        { enunciado: "Activa un perfil de volumen de sesión en MNQ1! y anota durante 5 días: POC, VAH y VAL del día anterior, y si la apertura fue dentro o fuera del área de valor. ¿Qué tipo de día siguió en cada caso?", solucion: "Con 5 días no puedes sacar conclusiones estadísticas, pero empezarás a reconocer la relación entre la apertura y el área de valor. Sigue hasta 30–40 días y tendrás datos reales." },
        { enunciado: "VAH = 20.180, VAL = 20.110. El precio abre en 20.090 y durante una hora se mantiene dentro del área de valor. Si se cumple la idea de recorrer el área, ¿cuántos puntos hay desde el VAL hasta el VAH?", respuesta: 70, unidad: "pts", solucion: "20.180 − 20.110 = <strong>70 puntos</strong> (con 2 MNQ, $280 de recorrido potencial)." }
      ],
      quiz: [
        { p: "¿Qué indica una ruptura con volumen muy bajo?", o: ["Gran fuerza", "Poca convicción, riesgo de falsa ruptura", "Clímax", "Nada"], c: 1, e: "Sin participación, la ruptura es frágil." },
        { p: "¿Qué es el POC?", o: ["El precio de cierre", "El precio con más volumen negociado", "El máximo del día", "Un indicador de medias"], c: 1, e: "Point of Control: el nivel de mayor volumen." },
        { p: "El área de valor contiene aproximadamente…", o: ["El 30 % del volumen", "El 50 %", "El 70 %", "El 100 %"], c: 2, e: "Por convención, alrededor del 70 % del volumen." },
        { p: "¿Cómo suele comportarse el precio en un nodo de bajo volumen?", o: ["Se frena mucho", "Lo atraviesa rápido", "Se detiene la sesión", "Siempre rebota"], c: 1, e: "Son zonas de rechazo con poca negociación." }
      ]
    },

    /* ───────────────────────── 3.3 ───────────────────────── */
    {
      id: "n3-3",
      titulo: "Automatización: alertas, Pine Script y webhooks",
      duracion: "55 min",
      acceso: "gratis",
      video: null,
      objetivos: [
        "Distinguir entre automatizar el análisis, las alertas y la ejecución.",
        "Escribir y leer un script básico de Pine Script en TradingView.",
        "Entender cómo funcionan las alertas con webhook y qué infraestructura requieren.",
        "Conocer los riesgos reales de los bots y cómo controlarlos."
      ],
      contenido: function (G) {
        const v = G.velas(G.ruta(20100, [[20080, 7], [20072, 3], [20120, 10], [20108, 4], [20140, 6]], { semilla: 141, ruido: 0.3 }), { semilla: 141, rangoMin: 3 });
        const e9 = G.ema(v, 9), e21 = G.ema(v, 21);
        let cruce = 12;
        for (let i = 2; i < v.length; i++) { if (e9[i - 1] <= e21[i - 1] && e9[i] > e21[i]) { cruce = i; break; } }
        return `
<h3>1. Tres niveles de automatización</h3>
<table class="tabla">
  <thead><tr><th>Nivel</th><th>Qué automatizas</th><th>Riesgo</th><th>Recomendado para</th></tr></thead>
  <tbody>
    <tr><td>1. Análisis</td><td>Indicadores que dibujan niveles, VWAP, sesiones, tamaño de posición.</td><td>Muy bajo</td><td>Todos</td></tr>
    <tr><td>2. Alertas</td><td>Avisos cuando se cumplen condiciones de tu setup.</td><td>Bajo</td><td>Todos</td></tr>
    <tr><td>3. Ejecución</td><td>Órdenes enviadas al broker sin intervención humana.</td><td>Alto</td><td>Solo con estrategia probada y supervisión</td></tr>
  </tbody>
</table>
<p>La mayor parte del valor está en los niveles 1 y 2: te ahorran tiempo, eliminan errores de cálculo y te permiten esperar a tus zonas sin estar pegado a la pantalla.</p>

<h3>2. Pine Script en 10 minutos</h3>
<p>Pine Script es el lenguaje de TradingView. Se escribe en el <em>Editor Pine</em> (parte inferior del gráfico). Un script puede ser un <code>indicator</code> (dibuja cosas) o una <code>strategy</code> (simula operaciones y calcula resultados). Este es un indicador mínimo que marca cruces de medias y crea condiciones de alerta:</p>
<pre><code>//@version=6
indicator("Cruce de EMAs - ADRIUX", overlay = true)

rapida = input.int(9, "EMA rápida")
lenta  = input.int(21, "EMA lenta")

emaR = ta.ema(close, rapida)
emaL = ta.ema(close, lenta)

plot(emaR, "EMA rápida", color.new(color.aqua, 0))
plot(emaL, "EMA lenta",  color.new(color.orange, 0))

alcista = ta.crossover(emaR, emaL)
bajista = ta.crossunder(emaR, emaL)

plotshape(alcista, "Cruce alcista", shape.triangleup, location.belowbar, color.green)
plotshape(bajista, "Cruce bajista", shape.triangledown, location.abovebar, color.red)

alertcondition(alcista, "Cruce alcista", "EMA rápida cruza por encima de la lenta")
alertcondition(bajista, "Cruce bajista", "EMA rápida cruza por debajo de la lenta")</code></pre>
<p>Línea a línea: <code>input.int</code> crea parámetros editables; <code>ta.ema</code> calcula la media; <code>ta.crossover</code> devuelve verdadero en la vela en la que la primera serie cruza por encima de la segunda; <code>plotshape</code> dibuja un triángulo; <code>alertcondition</code> crea una condición que podrás seleccionar al crear una alerta.</p>

${G.velasSVG({
  velas: v,
  titulo: "Resultado del script: EMAs y señal de cruce",
  series: [{ valores: e9, texto: "EMA 9", color: "azul" }, { valores: e21, texto: "EMA 21", color: "oro" }],
  marcas: [{ i: cruce, texto: "Alerta", pos: "abajo", color: "sube" }],
  nota: "La alerta avisa; tú decides si el contexto (estructura, VWAP, niveles) justifica la operación. Un cruce de medias solo no es una estrategia."
})}

<h3>3. Alertas con webhook</h3>
<p>Al crear una alerta en TradingView puedes activar la opción <strong>Webhook URL</strong>: cuando salta la alerta, TradingView envía un mensaje (normalmente JSON) a una dirección de internet que tú controlas. Requisitos:</p>
<ul>
  <li>Un plan de TradingView que incluya webhooks (revisa las condiciones actuales).</li>
  <li>Un <strong>servidor propio</strong> o un servicio intermediario que reciba el mensaje.</li>
  <li>Si quieres ejecución, que ese servidor se conecte a la API de tu broker o plataforma.</li>
</ul>
<p>Ejemplo de mensaje de alerta (en el campo "Mensaje"):</p>
<pre><code>{
  "simbolo": "{{ticker}}",
  "accion": "compra",
  "precio": "{{close}}",
  "estrategia": "retroceso-vwap",
  "clave": "TU_CLAVE_SECRETA"
}</code></pre>
<p>Las palabras entre llaves dobles son variables que TradingView sustituye al enviar la alerta. El servidor debe comprobar la clave secreta antes de hacer nada, para que nadie más pueda enviarle órdenes.</p>
<div class="callout aviso"><strong>En esta web:</strong> los webhooks y la ejecución automática <strong>requieren conexión adicional</strong> (servidor y API del broker). No están activos. Los indicadores de la sección Herramientas sí funcionan directamente en TradingView.</div>

<h3>4. Riesgos de los bots de ejecución</h3>
<ul>
  <li><strong>Fallos técnicos:</strong> alerta duplicada, servidor caído, orden enviada dos veces, posición sin stop.</li>
  <li><strong>Diferencias entre backtest y real:</strong> slippage, rellenos parciales, velas que repintan.</li>
  <li><strong>Sobreoptimización:</strong> parámetros ajustados al pasado que no funcionan en el futuro (clase 3.4).</li>
  <li><strong>Reglas de las cuentas fondeadas:</strong> muchas empresas restringen o prohíben ciertos tipos de automatización. Consulta sus reglas.</li>
  <li><strong>Bots "garantizados" que se venden por internet:</strong> si un sistema ganara de forma segura, no se vendería por una cuota mensual.</li>
</ul>
<p>Controles mínimos si algún día automatizas la ejecución: límite de contratos por orden, límite de pérdida diaria en el servidor, stop siempre enviado junto con la entrada, registro de cada mensaje recibido y un "interruptor de emergencia" que cierre todo.</p>

<h3>5. Repintado: el enemigo silencioso</h3>
<p>Un indicador <strong>repinta</strong> cuando sus señales pasadas cambian al llegar nuevas velas. En el gráfico histórico parece perfecto, pero en tiempo real las señales aparecen y desaparecen. Causas típicas: usar datos de temporalidades superiores sin el tratamiento correcto, o generar señales en la vela que aún no ha cerrado. Para evitarlo, confirma las señales con <code>barstate.isconfirmed</code> o configura las alertas "una vez por cierre de barra".</p>`;
      },
      claves: [
        "Automatiza primero el análisis y las alertas; la ejecución, solo con estrategia probada.",
        "Pine Script: input, cálculos, plot, plotshape y alertcondition.",
        "Los webhooks necesitan un servidor propio y, para ejecutar, la API del broker.",
        "Desconfía de los indicadores que repintan y de los bots 'garantizados'."
      ],
      ejercicios: [
        { enunciado: "Copia el script de la clase en el Editor Pine de TradingView, añádelo a MNQ1! en 5 minutos y crea una alerta con la condición 'Cruce alcista' configurada 'una vez por cierre de barra'.", solucion: "Si aparece un error, revisa que la primera línea sea //@version=6 y que no se haya perdido ningún paréntesis al copiar. Tras crear la alerta, la verás en el panel de alertas (icono del reloj)." },
        { enunciado: "Modifica el script para que la EMA lenta sea de 50 y añade una tercera EMA de 200 que solo se dibuje (sin alertas).", solucion: "Añade: <code>larga = ta.ema(close, 200)</code> y <code>plot(larga, \"EMA 200\", color.new(color.gray, 0))</code>. Cambia el valor por defecto de <code>lenta</code> a 50." },
        { enunciado: "Haz una lista de 5 controles de seguridad que exigirías a cualquier sistema de ejecución automática antes de conectarlo a una cuenta real.", solucion: "Ejemplos: límite de contratos por orden, pérdida máxima diaria en el servidor, stop obligatorio con cada entrada, verificación de clave secreta, registro de mensajes, protección contra órdenes duplicadas, interruptor de emergencia y prueba previa en simulador." }
      ],
      quiz: [
        { p: "¿Qué nivel de automatización tiene más riesgo?", o: ["Análisis", "Alertas", "Ejecución", "Todos igual"], c: 2, e: "La ejecución automática puede abrir y cerrar posiciones sin supervisión." },
        { p: "¿Qué hace ta.crossover(a, b)?", o: ["Suma a y b", "Es verdadero cuando a cruza por encima de b", "Dibuja una línea", "Envía una orden"], c: 1, e: "Detecta el cruce alcista de la primera serie sobre la segunda." },
        { p: "¿Qué necesita una alerta con webhook para ejecutar órdenes?", o: ["Nada más", "Un servidor propio conectado a la API del broker", "Solo TradingView gratis", "Un indicador repintado"], c: 1, e: "TradingView envía el mensaje; alguien tiene que recibirlo y actuar." },
        { p: "¿Qué es un indicador que repinta?", o: ["Uno con colores", "Uno cuyas señales pasadas cambian con nuevas velas", "Uno lento", "Uno de pago"], c: 1, e: "Parece perfecto en el histórico pero no en tiempo real." }
      ]
    },

    /* ───────────────────────── 3.4 ───────────────────────── */
    {
      id: "n3-4",
      titulo: "Inteligencia artificial aplicada al trading",
      duracion: "45 min",
      acceso: "gratis",
      video: null,
      objetivos: [
        "Saber para qué sirve realmente la IA en el trading y para qué no.",
        "Usar asistentes de IA para estudiar, revisar el diario y programar.",
        "Entender la sobreoptimización y el sesgo de anticipación.",
        "Escribir buenas instrucciones (prompts) para tareas de trading."
      ],
      contenido: function (G) {
        const rnd = G.prng(77);
        const dentro = [0], fuera = [0];
        let a = 0, b = 0;
        for (let i = 0; i < 40; i++) { a += rnd() < 0.72 ? 1.6 : -1; dentro.push(a); }
        for (let i = 0; i < 40; i++) { b += rnd() < 0.36 ? 1.6 : -1; fuera.push(b); }
        return `
<h3>1. Qué puede hacer la IA por ti (y qué no)</h3>
<table class="tabla">
  <thead><tr><th>Usos útiles</th><th>Usos peligrosos</th></tr></thead>
  <tbody>
    <tr><td>Explicar conceptos y resolver dudas mientras estudias.</td><td>Pedirle que "prediga" hacia dónde irá el precio mañana.</td></tr>
    <tr><td>Analizar tu diario de trading y encontrar patrones en tus errores.</td><td>Seguir señales de un "bot de IA" sin entender la lógica.</td></tr>
    <tr><td>Escribir y depurar código de Pine Script o Python.</td><td>Optimizar parámetros hasta que el backtest sea perfecto.</td></tr>
    <tr><td>Resumir noticias y el calendario económico.</td><td>Confiar en datos de mercado que el modelo podría inventar.</td></tr>
    <tr><td>Crear checklists, planes y plantillas.</td><td>Delegarle decisiones de riesgo.</td></tr>
  </tbody>
</table>
<p>Los modelos de lenguaje generan texto plausible a partir de patrones; <strong>no tienen acceso a datos de mercado en tiempo real</strong> salvo que se conecten a una fuente específica, y pueden equivocarse con total seguridad. Verifica siempre cifras, reglas y código.</p>

<h3>2. Revisar tu diario con IA</h3>
<p>Uno de los usos más potentes: exporta tu diario de trading (CSV o tabla) y pídele un análisis. Ejemplo de instrucción:</p>
<pre><code>Eres un mentor de trading de futuros. Te adjunto mi diario de las últimas
60 operaciones en MNQ con: fecha, hora, setup, resultado en R, si seguí el plan
y emoción. Analiza:
1. Esperanza en R por setup y por franja horaria.
2. Diferencia de resultados entre operaciones que siguieron el plan y las que no.
3. Patrones después de una pérdida (¿opero peor?).
4. Tres cambios concretos para el próximo mes.
No me des predicciones de mercado. Si faltan datos para concluir algo, dilo.</code></pre>
<p>Fíjate en los elementos de una buena instrucción: <strong>rol</strong>, <strong>datos</strong>, <strong>tareas concretas numeradas</strong>, <strong>formato esperado</strong> y <strong>límites</strong> ("si faltan datos, dilo").</p>

<h3>3. Programar con IA</h3>
<p>La IA acelera muchísimo escribir indicadores. Para obtener buen código: indica la versión de Pine Script, describe exactamente qué debe dibujar y cuándo, pide comentarios en el código y prueba siempre el resultado en el gráfico. Si da error, pega el mensaje de error completo y pide la corrección.</p>

<h3>4. Sobreoptimización: el gran peligro</h3>
<p>Con suficientes parámetros cualquier estrategia puede ajustarse para que el pasado parezca perfecto. Es la <strong>sobreoptimización</strong> (<em>overfitting</em>): la estrategia ha memorizado el ruido del pasado en lugar de capturar un comportamiento real. Las herramientas automáticas de optimización y la IA lo hacen aún más fácil.</p>

${G.lineaSVG({
  valores: dentro,
  texto: "Datos de optimización",
  color: "sube",
  extra: [{ valores: fuera, texto: "Datos nuevos", color: "baja" }],
  titulo: "Estrategia sobreoptimizada: excelente en el pasado, mala en datos nuevos",
  formato: function (x) { return x.toFixed(0) + "R"; },
  nota: "Ilustración: misma estrategia con los parámetros 'perfectos'. En el periodo usado para optimizar gana mucho; en el periodo siguiente pierde."
})}

<p>Cómo protegerte:</p>
<ul>
  <li><strong>Separa los datos:</strong> optimiza en un periodo (por ejemplo, 70 % de los datos) y valida en otro que no hayas mirado (30 %).</li>
  <li><strong>Pocos parámetros:</strong> una estrategia con 2–3 reglas lógicas es más robusta que una con 12 filtros.</li>
  <li><strong>Robustez:</strong> si cambiar la EMA de 20 a 22 destroza los resultados, la estrategia no es fiable.</li>
  <li><strong>Lógica primero:</strong> cada regla debe tener una razón de mercado (liquidez, valor, tendencia), no solo "mejoraba el backtest".</li>
</ul>

<h3>5. Sesgo de anticipación</h3>
<p>Ocurre cuando un backtest usa, sin darte cuenta, información que no estaba disponible en ese momento: el cierre de la vela antes de que cierre, el máximo del día antes de que termine el día, o datos de temporalidad superior mal sincronizados. Produce resultados espectaculares e imposibles. Si un backtest parece demasiado bueno, probablemente lo sea.</p>

<h3>6. El asistente de ADRIUX</h3>
<p>En la sección <a href="#asistente">Asistente IA</a> tienes un asistente educativo. En su versión actual funciona <strong>sin conexión</strong>: responde con el glosario y los contenidos de esta academia y hace cálculos de riesgo. Las respuestas abiertas con un modelo de IA real <strong>requieren conexión adicional</strong> (un servidor propio con la clave de la API), y se activarán en una fase posterior.</p>`;
      },
      claves: [
        "La IA es excelente para estudiar, revisar el diario y programar; no para predecir precios.",
        "Una buena instrucción tiene rol, datos, tareas concretas, formato y límites.",
        "La sobreoptimización ajusta el ruido del pasado: valida siempre en datos no vistos.",
        "Verifica siempre cifras, reglas y código que genere una IA."
      ],
      ejercicios: [
        { enunciado: "Escribe una instrucción para que una IA te genere un indicador de Pine Script v6 que marque el máximo y el mínimo de los primeros 15 minutos de la sesión de Nueva York. Incluye rol, detalle de lo que debe dibujar, formato y límites.", solucion: "Ejemplo: \"Eres experto en Pine Script v6. Crea un indicador overlay que calcule el máximo y mínimo de 9:30 a 9:45 (America/New_York) y los dibuje como líneas horizontales hasta las 16:00. Inputs: horario editable y colores. Comenta el código. No uses funciones que repinten.\"" },
        { enunciado: "Tu estrategia optimizada obtuvo profit factor 3,1 en 2023. Al probarla en 2024 sin cambiar nada obtiene 0,9. ¿Qué ha pasado y qué haces?", solucion: "Señal clara de <strong>sobreoptimización</strong>. Reduce parámetros, elimina filtros sin lógica de mercado, vuelve a optimizar en un periodo y valida en otro distinto. Si sigue sin funcionar fuera de muestra, descártala." },
        { enunciado: "Exporta tu diario de trading (o uno de prueba con 20 operaciones) y utiliza la instrucción de la clase con un asistente de IA. Anota las 3 recomendaciones y comprueba si son coherentes con tus datos.", solucion: "Verifica cada conclusión con tus propios números. Si la IA afirma algo que no puedes comprobar en la tabla, descártalo." }
      ],
      quiz: [
        { p: "¿Cuál es un uso adecuado de la IA en trading?", o: ["Predecir el precio de mañana", "Analizar tu diario y encontrar patrones de error", "Decidir tu riesgo", "Seguir señales sin entenderlas"], c: 1, e: "Es muy útil para analizar tus propios datos." },
        { p: "¿Qué es la sobreoptimización?", o: ["Usar muchos monitores", "Ajustar una estrategia al ruido del pasado", "Operar mucho", "Usar IA"], c: 1, e: "La estrategia memoriza el pasado y falla en datos nuevos." },
        { p: "Mejor defensa contra la sobreoptimización:", o: ["Más parámetros", "Validar en datos no usados para optimizar", "Backtests más cortos", "Ignorar el drawdown"], c: 1, e: "Fuera de muestra se ve si la ventaja es real." },
        { p: "Un backtest con 90 % de acierto y profit factor 8 probablemente…", o: ["Es una mina de oro", "Tiene algún error o sesgo de anticipación", "Es normal", "Necesita más contratos"], c: 1, e: "Si parece demasiado bueno, revisa el código y los datos." }
      ]
    },

    /* ───────────────────────── 3.5 ───────────────────────── */
    {
      id: "n3-5",
      titulo: "Disciplina y rendimiento profesional",
      duracion: "50 min",
      acceso: "gratis",
      video: null,
      objetivos: [
        "Medir tu rendimiento con métricas de proceso y de resultado.",
        "Hacer una revisión semanal y mensual estructurada.",
        "Aplicar reglas de escalado y de reducción de tamaño según el drawdown.",
        "Construir hábitos sostenibles para operar durante años."
      ],
      contenido: function (G) {
        const rnd = G.prng(303); const r = [];
        for (let i = 0; i < 70; i++) r.push(rnd() < 0.43 ? 2 : -1);
        for (let i = 18; i < 28; i++) r[i] = i % 4 === 0 ? 2 : -1;
        const sin = [10000], con = [10000];
        let s = 10000, c = 10000, pico = 10000;
        r.forEach(function (x) {
          s += x * 100; sin.push(s);
          const dd = (pico - c) / pico;
          const riesgo = dd > 0.06 ? 50 : 100;
          c += x * riesgo; pico = Math.max(pico, c); con.push(c);
        });
        return `
<h3>1. Lo que no se mide no mejora</h3>
<p>El trader profesional se trata a sí mismo como un negocio. Eso significa medir dos tipos de métricas:</p>
<table class="tabla">
  <thead><tr><th>Métricas de proceso (las controlas)</th><th>Métricas de resultado (no las controlas a corto plazo)</th></tr></thead>
  <tbody>
    <tr><td>% de operaciones que siguen el plan</td><td>Beneficio neto</td></tr>
    <tr><td>% de días con preparación completa</td><td>Tasa de acierto</td></tr>
    <tr><td>Nº de días que respetaste el límite diario</td><td>Esperanza en R</td></tr>
    <tr><td>Diario completado (sí/no)</td><td>Profit factor y drawdown</td></tr>
  </tbody>
</table>
<p>A corto plazo los resultados son en gran parte aleatorios. Por eso tus objetivos semanales deben ser de proceso: "100 % de operaciones dentro del plan", no "ganar $1.000". Si el proceso es bueno y la estrategia tiene ventaja, los resultados llegan con el número de operaciones.</p>

<h3>2. Revisión semanal (30–45 minutos)</h3>
<ol>
  <li><strong>Números:</strong> operaciones, resultado en R, esperanza, mejor y peor operación.</li>
  <li><strong>Disciplina:</strong> ¿cuántas operaciones rompieron alguna regla? ¿Cuál fue la regla más incumplida?</li>
  <li><strong>Capturas:</strong> revisa cada operación en el gráfico. Clasifícalas: A (setup perfecto), B (aceptable), C (no debía entrar).</li>
  <li><strong>Operaciones perdidas:</strong> setups válidos que no tomaste por miedo. También cuentan.</li>
  <li><strong>Un solo foco</strong> para la semana siguiente. No diez: uno.</li>
</ol>

<h3>3. Revisión mensual</h3>
<p>Una vez al mes, con más perspectiva: esperanza por setup, por franja horaria y por día de la semana. Elimina lo que no funciona, refuerza lo que sí. Pregúntate si los resultados reales siguen siendo coherentes con el backtest. Si después de 100 operaciones reales la esperanza es negativa, vuelve al simulador.</p>

<h3>4. Gestión del drawdown y del tamaño</h3>
<p>Las rachas malas son inevitables. Lo que marca la diferencia es tener reglas <strong>previas</strong> sobre qué hacer durante ellas:</p>
<ul>
  <li><strong>Reducción de tamaño:</strong> si el drawdown supera el 6 % (o 5R–6R), reduce el riesgo a la mitad hasta recuperar el pico.</li>
  <li><strong>Pausa:</strong> si supera el 10 %, para una semana, revisa en el simulador y vuelve con tamaño mínimo.</li>
  <li><strong>Escalado prudente:</strong> sube el tamaño solo tras alcanzar nuevos máximos de la curva y con al menos 30–50 operaciones de muestra. Nunca después de un solo día bueno.</li>
</ul>

${G.lineaSVG({
  valores: sin,
  texto: "Riesgo fijo",
  color: "baja",
  extra: [{ valores: con, texto: "Riesgo reducido en drawdown", color: "sube" }],
  titulo: "Mismas operaciones: riesgo fijo frente a reducción de tamaño",
  formato: function (x) { return "$" + Math.round(x).toLocaleString("es-ES"); },
  nota: "Durante la racha mala (operaciones 18–28), la regla de reducir el riesgo a la mitad suaviza la caída. El precio es una recuperación algo más lenta: a cambio, la cuenta sufre menos y el trader también."
})}

<h3>5. Hábitos de largo plazo</h3>
<ul>
  <li><strong>Horario fijo:</strong> opera las mismas horas cada día. Las mejores oportunidades en índices suelen concentrarse en la apertura de Nueva York.</li>
  <li><strong>Cuerpo y mente:</strong> dormir mal deteriora la toma de decisiones tanto como el alcohol. El ejercicio y las pausas sin pantallas son parte del trabajo.</li>
  <li><strong>Separa trading y vida:</strong> no consultes posiciones en el móvil durante la cena. No operes para pagar facturas urgentes: el dinero con presión se opera mal.</li>
  <li><strong>Retiros:</strong> retira beneficios periódicamente. Convertir resultados en algo tangible refuerza la disciplina.</li>
  <li><strong>Formación continua:</strong> un libro o un tema nuevo al mes, pero sin cambiar de estrategia cada semana.</li>
</ul>

<h3>6. Tu checklist profesional</h3>
<ol>
  <li>¿Tengo un plan escrito con estrategia probada en backtest y simulador?</li>
  <li>¿Mi riesgo por operación me permite soportar 10–15 pérdidas seguidas?</li>
  <li>¿Tengo límite diario, semanal y regla de drawdown por escrito?</li>
  <li>¿Registro y reviso todas las operaciones cada semana?</li>
  <li>¿Mis objetivos son de proceso, no de dinero?</li>
  <li>¿Sé exactamente qué haré cuando llegue la próxima racha de 8 pérdidas?</li>
</ol>
<p>Si respondes "sí" a todo, has terminado la academia con la mentalidad correcta. El siguiente paso es la práctica deliberada: muchas operaciones bien ejecutadas, revisadas y mejoradas, durante meses.</p>`;
      },
      claves: [
        "Mide procesos (que controlas) además de resultados (que no controlas a corto plazo).",
        "Revisión semanal con un solo foco de mejora; revisión mensual por setup y horario.",
        "Reglas previas para el drawdown: reducir tamaño, pausar, escalar solo en máximos.",
        "La disciplina se sostiene con hábitos: horario, descanso y separación vida/trading."
      ],
      ejercicios: [
        { enunciado: "Tu cuenta llegó a un pico de $12.000 y ahora tiene $11.200. Según la regla de la clase (reducir al 50 % si el drawdown supera el 6 %), ¿debes reducir el riesgo? Calcula el drawdown en %.", respuesta: 6.67, tolerancia: 0.05, unidad: "%", solucion: "Drawdown = (12.000 − 11.200) ÷ 12.000 = <strong>6,67 %</strong>. Supera el 6 %: reduce el riesgo a la mitad hasta volver a $12.000." },
        { enunciado: "Diseña tu plantilla de revisión semanal en una hoja de cálculo con los 5 apartados de la clase y úsala este fin de semana.", solucion: "Incluye una columna de clasificación A/B/C y una celda para el \"foco de la semana\". Al cabo de un mes, revisa si los focos se han cumplido." },
        { enunciado: "Escribe tus reglas de drawdown: a partir de qué porcentaje reduces tamaño, a partir de cuál paras y qué condiciones necesitas para volver a escalar.", solucion: "Ejemplo: reducir al 50 % con DD del 5 %; pausa de una semana con DD del 10 %; volver al tamaño normal solo al recuperar el máximo anterior; escalar un 25 % tras cada nuevo máximo con al menos 40 operaciones desde el último cambio." }
      ],
      quiz: [
        { p: "¿Cuál es una métrica de proceso?", o: ["Beneficio neto", "% de operaciones que siguen el plan", "Tasa de acierto", "Profit factor"], c: 1, e: "Es algo que controlas directamente en cada operación." },
        { p: "¿Cuántos focos de mejora conviene elegir cada semana?", o: ["Uno", "Cinco", "Diez", "Ninguno"], c: 0, e: "Un foco claro se puede cumplir y medir." },
        { p: "¿Cuándo es prudente subir el tamaño?", o: ["Después de un gran día", "Tras nuevos máximos de la curva y suficiente muestra", "Para recuperar pérdidas", "Al empezar una cuenta"], c: 1, e: "Escalar desde la fuerza y con datos." },
        { p: "Durante un drawdown fuerte, una buena regla es…", o: ["Duplicar el tamaño", "Reducir el riesgo a la mitad", "Quitar los stops", "Cambiar de estrategia cada día"], c: 1, e: "Reduce el daño mientras confirmas si es una racha normal." }
      ]
    }
  ],
  examen: {
    aprobado: 70,
    preguntas: [
      { p: "En el análisis multitemporal, la temporalidad baja sirve para…", o: ["Decidir la tendencia", "Afinar la entrada y el stop", "Elegir el broker", "Nada"], c: 1, e: "La alta da dirección; la baja, el momento." },
      { p: "Stop de 1 hora 80 puntos vs stop de 5 minutos 20 puntos, mismo objetivo de 80 puntos. Ratio con el de 5 minutos:", o: ["1:1", "1:2", "1:4", "1:8"], c: 2, e: "80 ÷ 20 = 4R." },
      { p: "Una ruptura con volumen muy superior a la media indica…", o: ["Más probabilidad de continuación", "Ruptura falsa segura", "Fin de sesión", "Nada"], c: 0, e: "Hay participación real." },
      { p: "El POC es…", o: ["El precio con más volumen", "El cierre", "Una media móvil", "El máximo del día"], c: 0, e: "Point of Control." },
      { p: "¿Qué requiere una alerta con webhook para ejecutar órdenes?", o: ["Solo un indicador", "Servidor propio y API del broker", "Nada", "Una cuenta fondeada"], c: 1, e: "Alguien tiene que recibir el mensaje y enviar la orden." },
      { p: "En Pine Script, alertcondition() sirve para…", o: ["Enviar órdenes", "Crear condiciones seleccionables para alertas", "Dibujar velas", "Calcular el VWAP"], c: 1, e: "Define condiciones que luego eliges al crear la alerta." },
      { p: "Una estrategia optimizada gana mucho en datos de 2023 y pierde en 2024. Es probablemente…", o: ["Mala suerte", "Sobreoptimización", "Un éxito", "Culpa del broker"], c: 1, e: "No generaliza fuera de la muestra usada para ajustar." },
      { p: "¿Qué NO debes pedirle a una IA?", o: ["Revisar tu diario", "Explicar un concepto", "Predecir el precio exacto de mañana", "Depurar un script"], c: 2, e: "No tiene capacidad de predecir el mercado." },
      { p: "Pico $20.000, saldo $18.600. ¿Drawdown?", o: ["5 %", "7 %", "10 %", "14 %"], c: 1, e: "1.400 ÷ 20.000 = 7 %." },
      { p: "Objetivo semanal más adecuado:", o: ["Ganar $1.000", "Seguir el plan en el 100 % de las operaciones", "Operar 50 veces", "Duplicar la cuenta"], c: 1, e: "Los objetivos de proceso son controlables." }
    ]
  }
});
