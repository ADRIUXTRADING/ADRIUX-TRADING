/* ADRIUX TRADING ACADEMY — Nivel 2: Intermedio */
window.ADRIUX_CURSO = window.ADRIUX_CURSO || [];
window.ADRIUX_CURSO.push({
  id: "n2",
  numero: 2,
  titulo: "Intermedio",
  descripcion: "Estructura de mercado, soportes y resistencias, liquidez, VWAP, estrategias con backtesting y cuentas fondeadas.",
  lecciones: [
    /* ───────────────────────── 2.1 ───────────────────────── */
    {
      id: "n2-1",
      titulo: "Estructura de mercado, soportes y resistencias",
      duracion: "50 min",
      acceso: "gratis",
      video: null,
      objetivos: [
        "Identificar tendencias alcistas, bajistas y rangos por su estructura de máximos y mínimos.",
        "Detectar una ruptura de estructura que avisa de un posible cambio de tendencia.",
        "Dibujar soportes y resistencias como zonas y priorizar los niveles importantes.",
        "Entender el cambio de polaridad: la resistencia rota que pasa a ser soporte."
      ],
      contenido: function (G) {
        const est = G.velas(G.ruta(100, [[110, 6], [105, 4], [116, 6], [110, 4], [122, 6], [115, 4], [107, 7]], { semilla: 31, ruido: 0.25 }), { semilla: 31, rangoMin: 0.9, mecha: 0.4 });
        const pol = G.velas(G.ruta(110, [[119.5, 6], [113, 4], [119.5, 4], [114, 4], [125, 5], [120.6, 4], [130, 6]], { semilla: 44, ruido: 0.25 }), { semilla: 44, rangoMin: 0.9, mecha: 0.35 });
        return `
<h3>1. Qué es la estructura de mercado</h3>
<p>El precio no se mueve en línea recta: avanza en impulsos y retrocesos. Si unes los máximos y mínimos de esos movimientos obtienes la <strong>estructura de mercado</strong>, la herramienta más sencilla y fiable para saber quién tiene el control.</p>
<ul>
  <li><strong>Tendencia alcista:</strong> máximos más altos (HH, <em>higher high</em>) y mínimos más altos (HL, <em>higher low</em>).</li>
  <li><strong>Tendencia bajista:</strong> máximos más bajos (LH) y mínimos más bajos (LL).</li>
  <li><strong>Rango:</strong> máximos y mínimos aproximadamente iguales; el precio rebota entre dos zonas.</li>
</ul>

${G.velasSVG({
  velas: est,
  titulo: "Tendencia alcista y ruptura de estructura",
  lineas: [{ y: 115, texto: "Último mínimo más alto (HL)", color: "baja", discontinua: true, desde: 29 }],
  marcas: [
    { i: 15, texto: "HH", pos: "arriba", color: "sube" }, { i: 19, texto: "HL", pos: "abajo", color: "sube" },
    { i: 25, texto: "HH", pos: "arriba", color: "sube" }, { i: 29, texto: "HL", pos: "abajo", color: "sube" },
    { i: 33, texto: "Ruptura", pos: "abajo", color: "baja" }
  ],
  nota: "Mientras se respeten los HL, la tendencia sigue viva. Cuando el precio cierra por debajo del último HL, la estructura alcista se rompe: no es momento de comprar."
})}

<h3>2. La ruptura de estructura</h3>
<p>En una tendencia alcista, el último mínimo más alto es el nivel que "defienden" los compradores. Si el precio cierra por debajo, se produce una <strong>ruptura de estructura</strong> (también llamada <em>BOS</em> o <em>cambio de carácter</em>). No garantiza que empiece una tendencia bajista, pero sí indica que la alcista ha perdido fuerza. Reglas prácticas:</p>
<ul>
  <li>Compra solo en tendencia alcista (o rango, en la parte baja), vende solo en bajista (o rango, en la parte alta).</li>
  <li>Tras una ruptura, espera a que se forme una nueva estructura antes de operar en la nueva dirección.</li>
  <li>Usa el cierre de vela, no la mecha, para confirmar la ruptura.</li>
</ul>

<h3>3. Soportes y resistencias</h3>
<p>Un <strong>soporte</strong> es una zona donde en el pasado aparecieron compradores suficientes para frenar la caída. Una <strong>resistencia</strong> es una zona donde aparecieron vendedores que frenaron la subida. Funcionan porque muchos participantes recuerdan esos precios: hay órdenes pendientes, stops y decisiones basadas en ellos.</p>
<p>Cómo dibujarlos bien:</p>
<ol>
  <li>Empieza en temporalidades altas (diario, 4 h, 1 h). Los niveles de 1 minuto apenas importan.</li>
  <li>Busca zonas con <strong>varios rechazos claros</strong> o con una reacción muy fuerte.</li>
  <li>Dibuja un rectángulo que cubra cuerpos y mechas de la reacción: es una zona, no una línea.</li>
  <li>Limita el gráfico a 3–5 niveles relevantes. Si todo es un nivel, nada es un nivel.</li>
</ol>
<p>Niveles intradía con mucha relevancia en futuros de índices:</p>
<table class="tabla">
  <thead><tr><th>Nivel</th><th>Por qué importa</th></tr></thead>
  <tbody>
    <tr><td>Máximo y mínimo del día anterior (PDH / PDL)</td><td>Referencia universal; ahí se acumulan stops.</td></tr>
    <tr><td>Máximo y mínimo de la sesión nocturna (ONH / ONL)</td><td>Marcan lo que hizo el mercado antes de la apertura de Nueva York.</td></tr>
    <tr><td>Apertura del día (9:30) y rango de apertura</td><td>Los primeros 15–30 minutos definen a menudo el sesgo del día.</td></tr>
    <tr><td>Números redondos (20.000, 20.500…)</td><td>Concentran órdenes por psicología.</td></tr>
    <tr><td>VWAP</td><td>Precio medio ponderado por volumen (clase 2.3).</td></tr>
  </tbody>
</table>

<h3>4. Cambio de polaridad</h3>
<p>Cuando una resistencia se rompe con fuerza, a menudo pasa a actuar como soporte en el retroceso. Los que vendieron allí ahora pierden y quieren salir "a la par"; los que compraron la ruptura añaden. Este <strong>retesteo</strong> es una de las entradas más claras del análisis técnico.</p>

${G.velasSVG({
  velas: pol,
  titulo: "La resistencia rota se convierte en soporte",
  zonas: [{ y1: 119, y2: 120.6, texto: "Resistencia → soporte", color: "oro" }],
  marcas: [
    { i: 5, texto: "Rechazo", pos: "arriba", color: "baja" }, { i: 13, texto: "Rechazo", pos: "arriba", color: "baja" },
    { i: 22, texto: "Ruptura", pos: "arriba", color: "sube" }, { i: 26, texto: "Retesteo", pos: "abajo", color: "sube" }
  ],
  nota: "Dos rechazos definen la resistencia. Tras la ruptura, el retroceso a la zona ofrece una compra con stop debajo de ella."
})}

<h3>5. Rupturas falsas</h3>
<p>No todas las rupturas funcionan. Una <strong>ruptura falsa</strong> ocurre cuando el precio supera el nivel, activa órdenes y stops, y vuelve rápidamente dentro del rango. Señales de alerta: ruptura con poco volumen, vela que cierra de nuevo dentro del rango, ruptura justo antes de una noticia. En la clase 2.2 verás que muchas rupturas falsas son, en realidad, barridas de liquidez.</p>`;
      },
      claves: [
        "Alcista = HH + HL. Bajista = LH + LL. Rango = máximos y mínimos similares.",
        "El cierre por debajo del último HL rompe la estructura alcista.",
        "Soportes y resistencias son zonas; empieza por temporalidades altas.",
        "La resistencia rota suele actuar como soporte en el retesteo."
      ],
      ejercicios: [
        { enunciado: "Mínimos: 20.100, 20.140, 20.180. Máximos: 20.160, 20.210, 20.250. ¿Qué estructura es y qué nivel debe mantenerse para que siga vigente?", solucion: "Es una <strong>tendencia alcista</strong> (HH y HL). El nivel clave es el último HL, <strong>20.180</strong>: un cierre por debajo rompería la estructura." },
        { enunciado: "Marca en el gráfico diario de NQ1! los 4 niveles más relevantes del último mes. Después baja a 1 hora y añade PDH, PDL, ONH y ONL del día de hoy.", solucion: "Comprueba que tus niveles diarios tienen varios toques o una reacción fuerte. Si tienes más de 8 líneas en pantalla, elimina las menos claras." },
        { enunciado: "Una resistencia en 20.400 se rompe y el precio sube a 20.460. Planeas comprar el retesteo en 20.405 con stop en 20.385 y objetivo en el máximo (20.460). ¿Cuál es el ratio?", respuesta: 2.75, tolerancia: 0.01, unidad: "R", solucion: "Riesgo = 20 puntos. Beneficio = 55 puntos. 55 / 20 = <strong>2,75R</strong>." }
      ],
      quiz: [
        { p: "Una tendencia bajista se define por…", o: ["HH y HL", "LH y LL", "Velas rojas", "Precio bajo la media"], c: 1, e: "Máximos más bajos y mínimos más bajos." },
        { p: "¿Qué confirma mejor una ruptura de estructura?", o: ["Una mecha", "El cierre de la vela", "El color de la vela", "Un indicador"], c: 1, e: "Las mechas pueden ser barridas; el cierre muestra aceptación." },
        { p: "¿Cuántos niveles es razonable tener en el gráfico?", o: ["Todos los posibles", "3–5 relevantes", "Ninguno", "Uno por vela"], c: 1, e: "Demasiados niveles generan confusión." },
        { p: "¿Qué es el cambio de polaridad?", o: ["Cambiar de broker", "Una resistencia rota que actúa como soporte", "Un patrón de vela", "Cambiar la zona horaria"], c: 1, e: "Los niveles rotos suelen cambiar de función." }
      ]
    },

    /* ───────────────────────── 2.2 ───────────────────────── */
    {
      id: "n2-2",
      titulo: "Liquidez: dónde están las órdenes",
      duracion: "45 min",
      acceso: "gratis",
      video: null,
      objetivos: [
        "Entender qué es la liquidez y por qué el precio la busca.",
        "Localizar zonas de liquidez: máximos y mínimos iguales, PDH/PDL, extremos de rango.",
        "Reconocer una barrida de liquidez y diferenciarla de una ruptura real.",
        "Colocar tus stops evitando las zonas más obvias."
      ],
      contenido: function (G) {
        const sw = G.velas(
          G.ruta(140, [[149.8, 6], [145, 4], [149.9, 4], [146, 3], [149, 2]], { semilla: 51, ruido: 0.2 })
            .concat([[149, 152, 148.6, 148.2]])
            .concat(G.ruta(148.2, [[139, 8]], { semilla: 52, ruido: 0.25 })),
          { semilla: 51, mecha: 0.25, rangoMin: 0.8 });
        const ruptura = G.velas(
          G.ruta(140, [[149.8, 6], [145, 4], [149.9, 4], [146, 3], [149.5, 2]], { semilla: 61, ruido: 0.2 })
            .concat([[149.5, 153.4, 149.2, 153.1]])
            .concat(G.ruta(153.1, [[151, 3], [158, 7]], { semilla: 62, ruido: 0.25 })),
          { semilla: 61, mecha: 0.25, rangoMin: 0.8, volumen: null });
        return `
<h3>1. ¿Qué es la liquidez?</h3>
<p>Para que alguien compre una gran cantidad de contratos, otro tiene que vendérselos. La <strong>liquidez</strong> es la disponibilidad de órdenes contrarias a un precio determinado. Los grandes participantes necesitan mucha liquidez para entrar y salir sin mover demasiado el precio, y la encuentran donde se acumulan órdenes pendientes:</p>
<ul>
  <li><strong>Stops de los vendedores</strong> justo por encima de máximos visibles (un stop de un corto es una orden de compra).</li>
  <li><strong>Stops de los compradores</strong> justo por debajo de mínimos visibles (un stop de un largo es una orden de venta).</li>
  <li><strong>Órdenes de ruptura:</strong> traders que compran al superar un máximo o venden al perder un mínimo.</li>
</ul>
<p>Por eso el precio tiende a visitar los máximos y mínimos obvios: allí hay combustible.</p>

<h3>2. Zonas típicas de liquidez</h3>
<table class="tabla">
  <thead><tr><th>Zona</th><th>Qué hay ahí</th></tr></thead>
  <tbody>
    <tr><td>Máximos o mínimos iguales (doble techo/suelo)</td><td>Muchísimos stops alineados en el mismo precio.</td></tr>
    <tr><td>Máximo y mínimo del día anterior</td><td>Stops de traders intradía y de swing.</td></tr>
    <tr><td>Máximo y mínimo de la sesión asiática / nocturna</td><td>Stops de quienes operaron antes de Nueva York.</td></tr>
    <tr><td>Líneas de tendencia muy evidentes</td><td>Stops colocados "justo debajo de la línea".</td></tr>
    <tr><td>Extremos del rango de apertura</td><td>Órdenes de ruptura del rango.</td></tr>
  </tbody>
</table>

<h3>3. La barrida de liquidez</h3>
<p>Una <strong>barrida</strong> (<em>sweep</em> o <em>stop hunt</em>) ocurre cuando el precio supera brevemente un máximo o mínimo obvio, activa los stops que había allí y regresa rápidamente al otro lado del nivel. Quien necesitaba vender mucho ha usado las compras forzadas de esos stops como contrapartida.</p>

${G.velasSVG({
  velas: sw,
  titulo: "Barrida de liquidez sobre máximos iguales",
  zonas: [{ y1: 149.6, y2: 150.4, texto: "Máximos iguales = stops arriba", color: "oro" }],
  marcas: [{ i: 5, texto: "Máx. 1", pos: "arriba", color: "oro" }, { i: 13, texto: "Máx. 2", pos: "arriba", color: "oro" }, { i: 19, texto: "Barrida", pos: "arriba", color: "baja" }],
  nota: "La vela supera los máximos con una mecha larga pero cierra de nuevo debajo. Los compradores que entraron en la ruptura quedan atrapados y alimentan la caída."
})}

<h3>4. ¿Barrida o ruptura real?</h3>
<p>La diferencia está en lo que ocurre <strong>después</strong> de superar el nivel:</p>
<table class="tabla">
  <thead><tr><th></th><th>Barrida</th><th>Ruptura real</th></tr></thead>
  <tbody>
    <tr><td>Cierre de la vela</td><td>Vuelve dentro del rango</td><td>Cierra claramente fuera</td></tr>
    <tr><td>Mecha</td><td>Larga, de rechazo</td><td>Pequeña, cuerpo grande</td></tr>
    <tr><td>Siguientes velas</td><td>Se alejan del nivel en dirección contraria</td><td>Retestean el nivel y continúan</td></tr>
    <tr><td>Contexto</td><td>Contra la tendencia mayor o en un nivel de temporalidad alta</td><td>A favor de la tendencia mayor</td></tr>
  </tbody>
</table>

${G.velasSVG({
  velas: ruptura,
  titulo: "Ruptura real: cierre fuera, retesteo y continuación",
  zonas: [{ y1: 149.6, y2: 150.4, texto: "Antiguos máximos", color: "oro" }],
  marcas: [{ i: 19, texto: "Cierre fuera", pos: "arriba", color: "sube" }, { i: 22, texto: "Retesteo", pos: "abajo", color: "sube" }],
  nota: "Mismo nivel, comportamiento opuesto: el precio acepta precios más altos y el antiguo máximo pasa a ser soporte."
})}

<h3>5. Cómo operar una barrida (modelo básico)</h3>
<ol>
  <li>Identifica un nivel de liquidez evidente (por ejemplo, el PDH) en dirección contraria a la tendencia mayor o en una zona de resistencia de temporalidad alta.</li>
  <li>Espera a que el precio lo supere y <strong>cierre de nuevo dentro</strong>. Sin cierre, no hay señal.</li>
  <li>Entrada en el cierre de la vela de rechazo o en un pequeño retroceso.</li>
  <li>Stop por encima del extremo de la barrida (la mecha), con unos ticks de margen.</li>
  <li>Objetivo: la siguiente zona de liquidez del lado contrario (VWAP, mínimo del rango, PDL).</li>
</ol>

<h3>6. Protege tus propios stops</h3>
<p>Si los stops obvios son el objetivo de las barridas, no pongas el tuyo exactamente en el mismo sitio que todos. Coloca el stop <strong>donde tu idea queda invalidada</strong>, con un pequeño margen más allá del nivel obvio, y ajusta los contratos para que el riesgo total no cambie. Mejor 1 contrato con un stop lógico que 3 con un stop que cualquiera puede cazar.</p>`;
      },
      claves: [
        "Encima de máximos y debajo de mínimos obvios hay stops: es liquidez.",
        "Una barrida supera el nivel y cierra de nuevo dentro; una ruptura real acepta el nuevo precio.",
        "Opera la barrida solo tras el cierre de rechazo, con stop más allá de la mecha.",
        "No pongas tu stop en el mismo lugar obvio que todos; ajusta el tamaño."
      ],
      ejercicios: [
        { enunciado: "El PDH está en 20.480. El precio sube a 20.491, la vela de 5 minutos cierra en 20.472 con mecha superior larga y la tendencia diaria es bajista. Describe una posible operación.", solucion: "Es una posible <strong>barrida del PDH</strong>. Venta en ~20.472, stop por encima de la mecha (por ejemplo 20.494, 22 puntos), objetivo en la siguiente liquidez inferior (VWAP o mínimo del día). Con 22 puntos de stop y riesgo de $100: 100 ÷ 44 = 2 MNQ." },
        { enunciado: "En el ejercicio anterior, si el objetivo está en 20.428, ¿qué ratio obtienes con stop en 20.494 y entrada en 20.472?", respuesta: 2, unidad: "R", solucion: "Riesgo = 22 puntos. Beneficio = 44 puntos. <strong>2R</strong>." },
        { enunciado: "Busca en el gráfico de 5 minutos de MNQ de la última semana 5 barridas del PDH o PDL. Anota cuántas dieron un movimiento de al menos 2R en dirección contraria.", solucion: "Verás que muchas barridas funcionan y otras se convierten en rupturas reales. Fíjate en qué tenían en común las que funcionaron (contexto, hora, cierre de vela): esa es la base de tu futuro setup." }
      ],
      quiz: [
        { p: "¿Qué hay normalmente justo por encima de un máximo evidente?", o: ["Nada", "Stops de compra (de los cortos) y órdenes de ruptura", "Solo vendedores", "El VWAP"], c: 1, e: "El stop de un corto es una orden de compra." },
        { p: "¿Qué caracteriza a una barrida?", o: ["Cierre fuera del nivel", "Supera el nivel y cierra de nuevo dentro", "Volumen nulo", "Velas sin mechas"], c: 1, e: "La mecha supera el nivel pero el cierre vuelve dentro." },
        { p: "Al operar una barrida, ¿dónde va el stop?", o: ["En el nivel barrido exacto", "Más allá del extremo de la mecha", "Sin stop", "En el VWAP"], c: 1, e: "Si el precio supera la mecha, la barrida falló." },
        { p: "Los máximos iguales son interesantes porque…", o: ["Son resistencias imposibles de romper", "Acumulan muchos stops en el mismo precio", "Indican fin de tendencia", "Son una noticia"], c: 1, e: "Muchos traders colocan sus stops justo encima." }
      ]
    },

    /* ───────────────────────── 2.3 ───────────────────────── */
    {
      id: "n2-3",
      titulo: "VWAP y medias móviles",
      duracion: "45 min",
      acceso: "gratis",
      video: null,
      objetivos: [
        "Entender cómo se calcula el VWAP y por qué lo vigilan los institucionales.",
        "Usar el VWAP para definir el sesgo intradía y zonas de entrada.",
        "Conocer las bandas de desviación del VWAP.",
        "Usar las medias móviles exponenciales como filtro de tendencia, no como señal mágica."
      ],
      contenido: function (G) {
        const tend = G.velas(G.ruta(20000, [[20030, 6], [20018, 4], [20060, 6], [20046, 4], [20090, 6], [20078, 4], [20110, 5]], { semilla: 71, ruido: 0.3 }), { semilla: 71, rangoMin: 3 });
        const rango = G.velas(G.ruta(20000, [[20022, 5], [19985, 6], [20018, 5], [19982, 6], [20015, 5], [19995, 4]], { semilla: 81, ruido: 0.3 }), { semilla: 81, rangoMin: 3 });
        return `
<h3>1. ¿Qué es el VWAP?</h3>
<p>El <strong>VWAP</strong> (<em>Volume Weighted Average Price</em>, precio medio ponderado por volumen) es el precio medio al que se ha negociado el activo durante la sesión, dando más peso a los precios donde hubo más volumen. Se reinicia cada sesión.</p>
<div class="callout"><strong>VWAP = Σ (precio típico × volumen) ÷ Σ volumen</strong><br>Precio típico = (máximo + mínimo + cierre) ÷ 3 de cada vela.</div>
<p>¿Por qué importa? Muchos fondos y mesas de ejecución miden la calidad de sus compras y ventas frente al VWAP. Un comprador institucional quiere comprar <em>por debajo</em> del VWAP; un vendedor, <em>por encima</em>. Esa actividad hace que el VWAP actúe como un imán y como una referencia de valor justo para el día.</p>

<h3>2. El VWAP como brújula del día</h3>
<ul>
  <li><strong>Precio por encima del VWAP y VWAP con pendiente positiva:</strong> los compradores controlan el día. Busca compras en retrocesos hacia el VWAP.</li>
  <li><strong>Precio por debajo y pendiente negativa:</strong> control vendedor. Busca ventas en rebotes hacia el VWAP.</li>
  <li><strong>Precio cruzando el VWAP una y otra vez, VWAP plano:</strong> día de rango. Reduce el tamaño o espera a los extremos.</li>
</ul>

${G.velasSVG({
  velas: tend,
  titulo: "Día de tendencia: el precio respeta el VWAP",
  series: [{ valores: G.vwap(tend), texto: "VWAP", color: "oro" }, { valores: G.ema(tend, 9), texto: "EMA 9", color: "azul", discontinua: true }],
  marcas: [{ i: 10, texto: "Retroceso", pos: "abajo", color: "sube" }, { i: 20, texto: "Retroceso", pos: "abajo", color: "sube" }, { i: 30, texto: "Retroceso", pos: "abajo", color: "sube" }],
  nota: "En días de tendencia el precio se mantiene a un lado del VWAP y los retrocesos hacia él o hacia la EMA 9 ofrecen entradas a favor."
})}

${G.velasSVG({
  velas: rango,
  titulo: "Día de rango: el VWAP plano y cruzado constantemente",
  series: [{ valores: G.vwap(rango), texto: "VWAP", color: "oro" }],
  nota: "Cuando el precio cruza el VWAP en ambas direcciones, no hay control claro. Las estrategias de tendencia sufren; las de rango (comprar abajo, vender arriba) funcionan mejor."
})}

<h3>3. Bandas de desviación</h3>
<p>Las <strong>bandas del VWAP</strong> se dibujan a 1, 2 y a veces 3 desviaciones estándar por encima y por debajo. Indican cuánto se ha alejado el precio de su valor medio:</p>
<ul>
  <li>En un día de rango, tocar la banda de +2σ o −2σ suele indicar precio estirado y posible regreso al VWAP.</li>
  <li>En un día de tendencia fuerte, el precio puede "caminar" pegado a la banda de +1σ durante horas. No vendas solo porque está lejos.</li>
</ul>
<p>Tienes un indicador listo con VWAP y bandas en la sección <a href="#indicadores">Indicadores de TradingView</a>.</p>

<h3>4. Medias móviles exponenciales (EMA)</h3>
<p>Una media móvil suaviza el precio para ver la dirección. La <strong>EMA</strong> da más peso a las velas recientes, por eso reacciona antes que la media simple. Configuraciones habituales:</p>
<table class="tabla">
  <thead><tr><th>Media</th><th>Uso típico</th></tr></thead>
  <tbody>
    <tr><td>EMA 9 / EMA 21</td><td>Impulso de corto plazo en 1–5 minutos. Retrocesos a la EMA 9 en tendencias fuertes.</td></tr>
    <tr><td>EMA 50</td><td>Tendencia intermedia en 5–15 minutos.</td></tr>
    <tr><td>EMA 200</td><td>Filtro de tendencia mayor: por encima, prioriza compras; por debajo, ventas.</td></tr>
  </tbody>
</table>

<h3>5. Errores con indicadores</h3>
<ul>
  <li><strong>Operar cruces de medias a ciegas:</strong> en rangos generan una señal falsa tras otra.</li>
  <li><strong>Acumular indicadores que dicen lo mismo:</strong> RSI, estocástico y MACD están todos calculados con el mismo precio. Más indicadores no es más información.</li>
  <li><strong>Olvidar que van con retraso:</strong> todos los indicadores se calculan con precios pasados. El precio y los niveles van primero; los indicadores, como filtro.</li>
</ul>

<h3>6. Combinación práctica</h3>
<p>Un enfoque sencillo y robusto: <strong>(1)</strong> sesgo del día con el VWAP, <strong>(2)</strong> zona de entrada en un nivel (PDH/PDL, retesteo, VWAP), <strong>(3)</strong> gatillo con una vela de rechazo, <strong>(4)</strong> stop más allá del nivel. En la próxima clase convertiremos esto en una estrategia completa.</p>`;
      },
      claves: [
        "VWAP = precio medio ponderado por volumen, se reinicia cada sesión.",
        "Precio encima y VWAP subiendo = sesgo comprador; debajo y bajando = vendedor.",
        "VWAP plano y cruces constantes = día de rango.",
        "Las EMA son filtros de tendencia; los indicadores siempre van con retraso."
      ],
      ejercicios: [
        { enunciado: "Tres velas: (máx 102, mín 98, cierre 100, vol 100), (máx 104, mín 100, cierre 103, vol 300), (máx 103, mín 99, cierre 101, vol 100). Calcula el VWAP al cierre de la tercera vela (redondea a 2 decimales).", respuesta: 101.6, tolerancia: 0.02, solucion: "Precios típicos: (102+98+100)/3 = 100; (104+100+103)/3 = 102,333; (103+99+101)/3 = 101.<br>VWAP = (100×100 + 102,333×300 + 101×100) ÷ 500 = (10.000 + 30.700 + 10.100) ÷ 500 = <strong>101,60</strong>. La vela con más volumen tira del VWAP hacia su precio." },
        { enunciado: "Añade el indicador VWAP de TradingView (o el ADRIUX VWAP + Bandas) a MNQ1! en 5 minutos. Clasifica los últimos 10 días como 'tendencia' o 'rango' según el comportamiento del precio respecto al VWAP.", solucion: "Lo habitual es encontrar más días de rango que de tendencia. Saber distinguirlos pronto (primera hora) es una de las habilidades más rentables del trading intradía." },
        { enunciado: "Son las 10:15. El precio está 40 puntos por encima del VWAP, que sube con fuerza, y acaba de tocar la banda de +2σ. ¿Vendes? Justifica.", solucion: "Probablemente <strong>no</strong>. El contexto es de tendencia alcista clara (precio encima y VWAP subiendo). En tendencia, el precio puede caminar por las bandas. Mejor esperar un retroceso hacia el VWAP o la banda de +1σ para comprar." }
      ],
      quiz: [
        { p: "¿Cada cuánto se reinicia el VWAP de sesión?", o: ["Nunca", "Cada sesión", "Cada hora", "Cada semana"], c: 1, e: "El VWAP intradía se calcula desde el inicio de cada sesión." },
        { p: "Precio encima del VWAP con pendiente positiva sugiere…", o: ["Buscar ventas", "Buscar compras en retrocesos", "No operar", "Día de rango"], c: 1, e: "Los compradores controlan el día." },
        { p: "¿Qué indica un VWAP plano que el precio cruza constantemente?", o: ["Tendencia fuerte", "Día de rango", "Noticia", "Error del indicador"], c: 1, e: "No hay control claro de ningún lado." },
        { p: "Diferencia principal entre EMA y media simple:", o: ["La EMA usa volumen", "La EMA pondera más las velas recientes", "La simple es más rápida", "Ninguna"], c: 1, e: "Por eso la EMA reacciona antes." }
      ]
    },

    /* ───────────────────────── 2.4 ───────────────────────── */
    {
      id: "n2-4",
      titulo: "Construir una estrategia y hacer backtesting",
      duracion: "55 min",
      acceso: "gratis",
      video: null,
      objetivos: [
        "Construir una estrategia con reglas objetivas: contexto, zona, gatillo y gestión.",
        "Hacer backtesting manual con el modo Replay de forma honesta.",
        "Calcular las métricas clave: tasa de acierto, R medio, profit factor, esperanza y drawdown.",
        "Saber cuándo una estrategia está lista para operar con dinero real."
      ],
      contenido: function (G) {
        const v = G.velas(G.ruta(20200, [[20232, 7], [20214, 5], [20212, 2], [20250, 9], [20262, 4]], { semilla: 91, ruido: 0.3 }), { semilla: 91, rangoMin: 3 });
        const vw = G.vwap(v);
        const rnd = G.prng(2024); let eq = 0; const curva = [0];
        for (let i = 0; i < 50; i++) { eq += rnd() < 0.44 ? 2 : -1; curva.push(eq); }
        return `
<h3>1. Las cuatro piezas de una estrategia</h3>
<p>Una estrategia no es "compro cuando lo veo claro". Es un conjunto de reglas tan precisas que otra persona podría ejecutarlas igual que tú. Toda estrategia tiene cuatro piezas:</p>
<ol>
  <li><strong>Contexto:</strong> ¿en qué condiciones de mercado se aplica? (tendencia, rango, horario, noticias).</li>
  <li><strong>Zona:</strong> ¿dónde se busca la entrada? (VWAP, PDH/PDL, retesteo, zona de liquidez).</li>
  <li><strong>Gatillo:</strong> ¿qué tiene que pasar exactamente para entrar? (vela de rechazo, cierre por encima de un máximo…).</li>
  <li><strong>Gestión:</strong> stop, objetivo, tamaño, cuándo mover a breakeven, cuándo no operar.</li>
</ol>

<h3>2. Ejemplo completo: "Retroceso al VWAP en tendencia"</h3>
<table class="tabla">
  <tbody>
    <tr><th>Mercado y horario</th><td>MNQ, 5 minutos, de 9:45 a 11:30 (Nueva York). Sin noticias de alto impacto en los próximos 15 minutos.</td></tr>
    <tr><th>Contexto</th><td>Precio por encima del VWAP durante al menos 30 minutos y VWAP con pendiente positiva. Estructura alcista (HH + HL) en 5 minutos.</td></tr>
    <tr><th>Zona</th><td>Retroceso que toca el VWAP o queda a menos de 5 puntos de él.</td></tr>
    <tr><th>Gatillo</th><td>Vela alcista que cierra por encima del máximo de la vela anterior, estando en la zona.</td></tr>
    <tr><th>Stop</th><td>2 ticks por debajo del mínimo del retroceso. Si el stop supera 25 puntos, no hay operación.</td></tr>
    <tr><th>Objetivo</th><td>2R. A 1R el stop se mueve a breakeven.</td></tr>
    <tr><th>Riesgo</th><td>1 % de la cuenta por operación, máximo 3 operaciones, pérdida máxima diaria 2R.</td></tr>
    <tr><th>Invalidación</th><td>Dos cierres de 5 minutos por debajo del VWAP anulan el contexto para el resto de la mañana.</td></tr>
  </tbody>
</table>

${G.velasSVG({
  velas: v,
  titulo: "Ejemplo: retroceso al VWAP con gatillo",
  series: [{ valores: vw, texto: "VWAP", color: "oro" }],
  zonas: [
    { y1: 20216, y2: 20250, texto: "Objetivo 2R", color: "sube", desde: 14 },
    { y1: 20199, y2: 20216, texto: "Stop 1R", color: "baja", desde: 14 }
  ],
  marcas: [{ i: 13, texto: "Toca VWAP", pos: "abajo", color: "oro" }, { i: 14, texto: "Gatillo", pos: "arriba", color: "azul" }],
  nota: "Ejemplo ilustrativo. Contexto alcista, retroceso a la zona del VWAP, vela de gatillo que supera el máximo anterior, stop bajo el mínimo del retroceso."
})}

<h3>3. Backtesting manual paso a paso</h3>
<ol>
  <li>Escribe las reglas <strong>antes</strong> de empezar. No las cambies a mitad del test.</li>
  <li>Abre el modo Replay en TradingView y elige una fecha al azar (de hace al menos 2–3 meses).</li>
  <li>Avanza vela a vela. Cuando se cumplan todas las reglas, registra la operación en una hoja de cálculo: fecha, hora, entrada, stop, objetivo, resultado en R.</li>
  <li>Repite hasta tener <strong>al menos 50–100 operaciones</strong>, en distintos meses y condiciones de mercado.</li>
  <li>Calcula las métricas y decide.</li>
</ol>
<div class="callout aviso"><strong>Honestidad ante todo:</strong> el sesgo más común es "saltarse" las operaciones que habrían perdido porque "no estaban claras". Si cumplía las reglas, cuenta. Si no sabes si las cumplía, tus reglas no son lo bastante precisas.</div>

<h3>4. Métricas que importan</h3>
<table class="tabla">
  <thead><tr><th>Métrica</th><th>Fórmula</th><th>Referencia</th></tr></thead>
  <tbody>
    <tr><td>Tasa de acierto</td><td>Ganadoras ÷ total</td><td>Depende del ratio; sola no dice nada.</td></tr>
    <tr><td>Esperanza (en R)</td><td>Suma de R ÷ nº de operaciones</td><td>&gt; 0,2R por operación es un buen punto de partida.</td></tr>
    <tr><td>Profit factor</td><td>Beneficio bruto ÷ pérdida bruta</td><td>&gt; 1,3 interesante; &gt; 2 excelente (y sospechoso con pocas operaciones).</td></tr>
    <tr><td>Drawdown máximo</td><td>Mayor caída desde un pico de la curva</td><td>Te dice cuánto dolor debes soportar.</td></tr>
    <tr><td>Racha máxima de pérdidas</td><td>Pérdidas consecutivas</td><td>Prepárate para el doble en real.</td></tr>
  </tbody>
</table>

${G.lineaSVG({
  valores: curva,
  texto: "Resultado acumulado (R)",
  color: "sube",
  titulo: "Curva de un backtest de 50 operaciones (acierto 44 %, ratio 1:2)",
  formato: function (x) { return x.toFixed(0) + "R"; },
  nota: "Incluso con esperanza positiva hay tramos planos y caídas. Si con 1 % por operación la curva acaba en +" + curva[curva.length - 1] + "R, eso serían aproximadamente +" + curva[curva.length - 1] + " % de la cuenta antes de costes."
})}

<h3>5. De backtest a cuenta real</h3>
<ol>
  <li><strong>Backtest</strong> con 50–100 operaciones y esperanza positiva tras restar comisiones.</li>
  <li><strong>Forward test en simulador</strong> durante 2–4 semanas en tiempo real. El objetivo es comprobar que puedes ejecutarlo con el mercado en vivo.</li>
  <li><strong>Real con tamaño mínimo</strong> (1 MNQ) hasta tener otras 30–50 operaciones con resultados parecidos.</li>
  <li><strong>Escalar</strong> el tamaño poco a poco, solo si la disciplina se mantiene.</li>
</ol>
<p>Si los resultados en real son mucho peores que en el backtest, casi siempre el problema es de ejecución (entradas tardías, stops movidos, operaciones fuera del plan), no de la estrategia.</p>`;
      },
      claves: [
        "Estrategia = contexto + zona + gatillo + gestión, todo por escrito.",
        "Backtest honesto de al menos 50–100 operaciones, sin cambiar las reglas.",
        "La tasa de acierto sola no dice nada: mira esperanza, profit factor y drawdown.",
        "Backtest → simulador → real mínimo → escalar."
      ],
      ejercicios: [
        { enunciado: "Resultados de 10 operaciones en R: +2, −1, −1, +2, −1, +2, −1, −1, +2, −1. Calcula la esperanza en R por operación.", respuesta: 0.2, tolerancia: 0.001, unidad: "R", solucion: "Suma = 4 × 2 − 6 × 1 = 8 − 6 = 2R. 2 ÷ 10 = <strong>0,2R por operación</strong>." },
        { enunciado: "Con los mismos datos, ¿cuál es el profit factor?", respuesta: 1.33, tolerancia: 0.01, solucion: "Beneficio bruto = 8R. Pérdida bruta = 6R. 8 ÷ 6 = <strong>1,33</strong>." },
        { enunciado: "Escribe tu propia estrategia con la tabla de la clase (contexto, zona, gatillo, stop, objetivo, riesgo, invalidación) y haz un backtest de 30 operaciones en Replay.", solucion: "Al terminar, revisa: ¿hubo operaciones en las que dudaste si cumplían las reglas? Reescribe esas reglas para que no haya dudas y continúa hasta 100 operaciones." }
      ],
      quiz: [
        { p: "¿Cuáles son las cuatro piezas de una estrategia?", o: ["Indicadores, señal, broker, suerte", "Contexto, zona, gatillo y gestión", "Entrada, salida, noticias, volumen", "Tendencia, rango, VWAP, EMA"], c: 1, e: "Sin cualquiera de ellas, la estrategia no es completa." },
        { p: "¿Cuántas operaciones mínimo para que un backtest diga algo?", o: ["5", "10", "50–100", "1.000.000"], c: 2, e: "Con pocas operaciones el azar domina los resultados." },
        { p: "Profit factor = …", o: ["Ganadoras ÷ total", "Beneficio bruto ÷ pérdida bruta", "Beneficio ÷ días", "R medio × 100"], c: 1, e: "Mide cuántos dólares ganas por cada dólar perdido." },
        { p: "Tus resultados reales son mucho peores que el backtest. ¿Causa más probable?", o: ["La estrategia dejó de funcionar", "Problemas de ejecución y disciplina", "El broker", "El VWAP"], c: 1, e: "Casi siempre es ejecución: entradas tardías, stops movidos, operaciones fuera del plan." }
      ]
    },

    /* ───────────────────────── 2.5 ───────────────────────── */
    {
      id: "n2-5",
      titulo: "Cuentas fondeadas: reglas y cómo aprobarlas",
      duracion: "50 min",
      acceso: "gratis",
      video: null,
      objetivos: [
        "Entender cómo funciona el modelo de las empresas de fondeo (prop firms) de futuros.",
        "Dominar las reglas típicas: objetivo, pérdida máxima, trailing drawdown, límite diario y consistencia.",
        "Calcular un tamaño de riesgo compatible con el drawdown de la cuenta.",
        "Conocer los costes reales y los errores que hacen fallar a la mayoría."
      ],
      contenido: function (G) {
        const saldo = [50000, 50350, 50700, 51100, 51400, 51250, 50900, 50500, 50050, 49700, 49380];
        let pico = 0;
        const umbral = saldo.map(function (s) { pico = Math.max(pico, s); return pico - 2000; });
        return `
<h3>1. ¿Qué es una cuenta fondeada?</h3>
<p>Una empresa de fondeo te ofrece operar con su capital (normalmente en una cuenta simulada que replica el mercado real) a cambio de una cuota. Primero pasas una <strong>evaluación</strong>: tienes que alcanzar un objetivo de beneficio sin romper ninguna regla de pérdida. Si lo consigues, accedes a una cuenta "financiada" y te pagan un porcentaje de los beneficios que generes.</p>
<div class="callout aviso"><strong>Importante:</strong> las reglas, precios y porcentajes cambian con frecuencia y son distintos en cada empresa. Los números de esta clase son <strong>ejemplos ilustrativos</strong>. Lee siempre las reglas oficiales actuales antes de pagar una evaluación.</div>

<h3>2. Las reglas típicas</h3>
<table class="tabla">
  <thead><tr><th>Regla</th><th>Qué significa</th><th>Ejemplo ilustrativo (cuenta de $50.000)</th></tr></thead>
  <tbody>
    <tr><td>Objetivo de beneficio</td><td>Lo que debes ganar para aprobar.</td><td>+$3.000</td></tr>
    <tr><td>Pérdida máxima (drawdown)</td><td>Si el saldo cae por debajo del umbral, la cuenta se pierde.</td><td>$2.000</td></tr>
    <tr><td>Límite de pérdida diaria</td><td>Pérdida máxima en un solo día (no todas lo tienen).</td><td>$1.000</td></tr>
    <tr><td>Contratos máximos</td><td>Tamaño máximo permitido.</td><td>5 NQ o 50 MNQ</td></tr>
    <tr><td>Regla de consistencia</td><td>Ningún día puede representar más de un % del beneficio total.</td><td>Mejor día ≤ 30–50 % del total</td></tr>
    <tr><td>Días mínimos</td><td>Número mínimo de días operados.</td><td>Variable según empresa</td></tr>
    <tr><td>Noticias y horarios</td><td>Restricciones en noticias o cierre obligatorio antes de cierto horario.</td><td>Cerrar posiciones antes del cierre de sesión</td></tr>
  </tbody>
</table>

<h3>3. El trailing drawdown: la regla que más cuentas destruye</h3>
<p>En muchas cuentas de futuros el umbral de pérdida <strong>no es fijo</strong>: sigue al saldo máximo alcanzado. Si empiezas con $50.000 y un drawdown de $2.000, tu umbral está en $48.000. Si subes a $51.400, el umbral sube a $49.400. Si después vuelves a caer a $49.380, <strong>pierdes la cuenta aunque solo estés $620 por debajo del saldo inicial</strong>.</p>

${G.lineaSVG({
  valores: saldo,
  texto: "Saldo",
  color: "azul",
  extra: [{ valores: umbral, texto: "Umbral de liquidación", color: "baja" }],
  titulo: "Trailing drawdown de $2.000 en una cuenta de $50.000",
  formato: function (x) { return "$" + Math.round(x).toLocaleString("es-ES"); },
  etiquetas: [{ i: 4, texto: "Pico $51.400" }, { i: 10, texto: "Cuenta perdida" }],
  nota: "El umbral sube con cada nuevo máximo y nunca baja. Ganar primero y devolver después es la forma más habitual de suspender."
})}

<p>Variantes que debes distinguir:</p>
<ul>
  <li><strong>Trailing intradía:</strong> el umbral sigue al saldo máximo <em>incluyendo beneficios no realizados</em>. Si una operación llega a +$800 y la cierras en +$100, el umbral ya subió $800. Es la versión más exigente.</li>
  <li><strong>Trailing al cierre del día (EOD):</strong> el umbral solo se actualiza con el saldo al final de cada sesión. Más permisivo durante el día.</li>
  <li><strong>Drawdown estático:</strong> el umbral es fijo desde el principio.</li>
  <li>En muchas empresas el trailing <strong>se congela</strong> cuando el umbral alcanza el saldo inicial (o el saldo inicial más una pequeña cantidad).</li>
</ul>

<h3>4. Calcula tu riesgo en función del drawdown</h3>
<p>El dato que importa no es el tamaño de la cuenta ($50.000), sino el <strong>drawdown</strong> ($2.000): ese es tu capital real. Una regla prudente es que el riesgo por operación te permita encadenar <strong>al menos 8–10 pérdidas</strong> antes de perder la cuenta.</p>
<div class="callout">Drawdown $2.000 ÷ 10 pérdidas = <strong>$200 de riesgo máximo por operación</strong>.<br>Con stop de 20 puntos en MNQ: 200 ÷ 40 = 5 MNQ. Con 1 NQ y el mismo stop arriesgarías $400: solo 5 pérdidas seguidas te eliminan.</div>
<p>Usa el <a href="#fondeo">simulador de cuentas fondeadas</a> de esta web para hacer estos cálculos con tus números.</p>

<h3>5. Plan para aprobar una evaluación</h3>
<ol>
  <li><strong>No tengas prisa.</strong> Si no hay límite de tiempo, un objetivo de $3.000 con $200 de riesgo y 2R por operación se consigue con una ventaja pequeña y tiempo.</li>
  <li><strong>Límite diario personal</strong> más estricto que el de la empresa: por ejemplo, $400 (2 pérdidas).</li>
  <li><strong>Protege el colchón:</strong> cuando tengas +$1.000, no subas el tamaño. Muchos traders aprueban y suspenden la misma semana por euforia.</li>
  <li><strong>Cuidado con la consistencia:</strong> un día enorme puede obligarte a seguir operando para "diluirlo".</li>
  <li><strong>Opera tu estrategia, no la evaluación:</strong> si tu backtest no es positivo, ninguna cuenta fondeada lo arreglará.</li>
</ol>

<h3>6. Costes y realidad</h3>
<p>Las evaluaciones tienen cuota (a menudo mensual) y muchas cuentas financiadas tienen además una cuota de activación o mensual. La mayoría de los participantes no aprueba, y de los que aprueban, muchos pierden la cuenta financiada antes de cobrar. Antes de pagar:</p>
<ul>
  <li>Lee las reglas completas, incluidas las de pagos (mínimos, frecuencia, colchón obligatorio, porcentaje de reparto).</li>
  <li>Comprueba la reputación de la empresa y su historial de pagos en fuentes independientes.</li>
  <li>Calcula cuánto te cuesta al año si fallas varias veces. Trátalo como un gasto de formación, no como una inversión garantizada.</li>
</ul>`;
      },
      claves: [
        "Tu capital real en una cuenta fondeada es el drawdown, no el tamaño nominal.",
        "El trailing drawdown sube con cada máximo y nunca baja (hasta que se congela, si la empresa lo prevé).",
        "Arriesga como máximo lo que te permita 8–10 pérdidas seguidas.",
        "Las reglas cambian: lee siempre las condiciones oficiales actuales."
      ],
      ejercicios: [
        { enunciado: "Cuenta de $100.000 con trailing drawdown de $3.000. Saldo máximo alcanzado: $102.200. ¿En qué saldo se pierde la cuenta (si el trailing no se ha congelado)?", respuesta: 99200, unidad: "$", solucion: "Umbral = 102.200 − 3.000 = <strong>$99.200</strong>. Por debajo del saldo inicial, aunque llegaste a ganar $2.200." },
        { enunciado: "Drawdown de $2.500 y quieres soportar 10 pérdidas seguidas. Stop de 25 puntos. ¿Cuántos MNQ como máximo?", respuesta: 5, unidad: "contratos", solucion: "Riesgo máximo = 2.500 ÷ 10 = $250. Riesgo por MNQ = 25 × 2 = $50. 250 ÷ 50 = <strong>5 MNQ</strong>." },
        { enunciado: "Trailing intradía de $2.000 desde $50.000. Abres una operación que llega a +$900 sin cerrar y finalmente la cierras en +$200. ¿Dónde queda el umbral?", respuesta: 48900, unidad: "$", solucion: "Con trailing intradía cuenta el máximo no realizado: 50.900 − 2.000 = <strong>$48.900</strong>. Tu saldo real es $50.200: solo tienes $1.300 de margen, no $2.200." }
      ],
      quiz: [
        { p: "En una cuenta fondeada de $50.000 con $2.000 de drawdown, tu capital 'real' de riesgo es…", o: ["$50.000", "$2.000", "$48.000", "$52.000"], c: 1, e: "Solo puedes perder $2.000 antes de que la cuenta se cierre." },
        { p: "¿Qué hace el trailing drawdown?", o: ["Baja cuando pierdes", "Sube con cada nuevo saldo máximo", "Es siempre fijo", "Solo cuenta en noticias"], c: 1, e: "Sigue al máximo y no retrocede." },
        { p: "¿Cuál es más exigente?", o: ["Trailing intradía", "Trailing al cierre del día", "Drawdown estático", "Todos iguales"], c: 0, e: "El intradía cuenta incluso beneficios no realizados." },
        { p: "Antes de comprar una evaluación debes…", o: ["Pagar la más barata", "Leer las reglas oficiales actuales y calcular tu riesgo", "Operar el máximo de contratos", "Ignorar la consistencia"], c: 1, e: "Las reglas varían entre empresas y cambian con el tiempo." }
      ]
    }
  ],
  examen: {
    aprobado: 70,
    preguntas: [
      { p: "Mínimos 100, 104, 108 y máximos 106, 110, 115. ¿Qué estructura es?", o: ["Bajista", "Alcista", "Rango", "Indefinida"], c: 1, e: "Máximos y mínimos crecientes." },
      { p: "En tendencia alcista, ¿qué rompe la estructura?", o: ["Una vela roja", "Un cierre por debajo del último HL", "Tocar el VWAP", "Un doji"], c: 1, e: "El último mínimo más alto es el nivel que defienden los compradores." },
      { p: "Una resistencia rota que el precio retestea desde arriba suele actuar como…", o: ["Resistencia más fuerte", "Soporte", "Nada", "Objetivo"], c: 1, e: "Cambio de polaridad." },
      { p: "¿Dónde se acumulan los stops de los compradores?", o: ["Encima de máximos", "Debajo de mínimos", "En el VWAP", "En el centro del rango"], c: 1, e: "Un largo pone su stop debajo de un mínimo." },
      { p: "El precio supera el PDH y la vela cierra de nuevo por debajo con mecha larga. Es probablemente…", o: ["Ruptura confirmada", "Barrida de liquidez", "Cambio de tendencia seguro", "Error del gráfico"], c: 1, e: "Supera el nivel pero no lo acepta." },
      { p: "VWAP plano y el precio lo cruza constantemente:", o: ["Día de tendencia", "Día de rango", "Día festivo", "Señal de compra"], c: 1, e: "No hay control claro." },
      { p: "Resultados: +2, +2, −1, −1, −1. ¿Esperanza en R?", o: ["+0,2R", "+0,4R", "−0,2R", "+1R"], c: 0, e: "(4 − 3) ÷ 5 = 0,2R." },
      { p: "¿Qué métrica divide beneficio bruto entre pérdida bruta?", o: ["Tasa de acierto", "Profit factor", "Drawdown", "Esperanza"], c: 1, e: "Profit factor." },
      { p: "Cuenta fondeada: drawdown $2.000, quieres aguantar 10 pérdidas. Riesgo máximo por operación:", o: ["$100", "$200", "$500", "$1.000"], c: 1, e: "2.000 ÷ 10 = $200." },
      { p: "Trailing de $2.000 desde $50.000. Pico de $51.000, ahora $49.100. ¿Estado de la cuenta?", o: ["Perdida", "Activa, pero con solo $100 de margen", "Activa con $1.100 de margen", "Aprobada"], c: 1, e: "Umbral = 51.000 − 2.000 = 49.000. Con $49.100 sigue activa por solo $100." }
    ]
  }
});
