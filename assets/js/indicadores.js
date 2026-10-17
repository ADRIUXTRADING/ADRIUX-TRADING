/* ADRIUX TRADING — Indicadores de TradingView (Pine Script v6) */
window.ADRIUX_INDICADORES = [
  {
    id: "vwap-bandas",
    nombre: "ADRIUX VWAP + Bandas",
    descripcion: "VWAP de sesión que cambia de color según su pendiente, con bandas de 1 y 2 desviaciones. Ideal para definir el sesgo del día (clase 2.3).",
    leccion: "n2-3",
    codigo: `//@version=6
indicator("ADRIUX VWAP + Bandas", shorttitle = "ADRIUX VWAP", overlay = true)

// Parámetros
fuente = input.source(hlc3, "Fuente")
mult1  = input.float(1.0, "Banda 1 (desviaciones)", minval = 0.1, step = 0.5)
mult2  = input.float(2.0, "Banda 2 (desviaciones)", minval = 0.1, step = 0.5)
verB2  = input.bool(true, "Mostrar banda 2")

// El VWAP se reinicia al comenzar cada sesión diaria
nuevaSesion = timeframe.change("D")
[vw, sup1, inf1]  = ta.vwap(fuente, nuevaSesion, mult1)
[vw2, sup2, inf2] = ta.vwap(fuente, nuevaSesion, mult2)

// Verde si el VWAP sube, rojo si baja
colorVW = vw >= vw[1] ? color.new(#26a69a, 0) : color.new(#ef5350, 0)
plot(vw, "VWAP", colorVW, 2)

p1 = plot(sup1, "Banda +1", color.new(#e8b84b, 40))
p2 = plot(inf1, "Banda -1", color.new(#e8b84b, 40))
fill(p1, p2, color.new(#e8b84b, 92), "Relleno ±1")
plot(verB2 ? sup2 : na, "Banda +2", color.new(#e8b84b, 70))
plot(verB2 ? inf2 : na, "Banda -2", color.new(#e8b84b, 70))
`
  },
  {
    id: "niveles-clave",
    nombre: "ADRIUX Niveles Clave",
    descripcion: "Dibuja automáticamente el máximo y mínimo del día anterior (PDH/PDL), de la sesión nocturna (ONH/ONL) y del rango de apertura de Nueva York. Para gráficos intradía (clases 2.1 y 2.2).",
    leccion: "n2-2",
    codigo: `//@version=6
indicator("ADRIUX Niveles Clave", shorttitle = "ADRIUX Niveles", overlay = true)

verPD  = input.bool(true, "Día anterior (PDH / PDL)")
verON  = input.bool(true, "Sesión nocturna (ONH / ONL)")
verOR  = input.bool(true, "Rango de apertura (ORH / ORL)")
sesRTH = input.session("0930-1600", "Sesión regular")
sesON  = input.session("1800-0930", "Sesión nocturna")
sesOR  = input.session("0930-0945", "Rango de apertura")
zona   = "America/New_York"

// Día anterior sin repintado: datos de la vela diaria ya cerrada
pdh = request.security(syminfo.tickerid, "D", high[1], lookahead = barmerge.lookahead_on)
pdl = request.security(syminfo.tickerid, "D", low[1], lookahead = barmerge.lookahead_on)

enRTH = not na(time(timeframe.period, sesRTH, zona))
enON  = not na(time(timeframe.period, sesON, zona))
enOR  = not na(time(timeframe.period, sesOR, zona))

// Máximo y mínimo de la sesión nocturna
var float onh = na
var float onl = na
if enON and not enON[1]
    onh := high
    onl := low
else if enON
    onh := math.max(onh, high)
    onl := math.min(onl, low)

// Máximo y mínimo del rango de apertura
var float orh = na
var float orl = na
if enOR and not enOR[1]
    orh := high
    orl := low
else if enOR
    orh := math.max(orh, high)
    orl := math.min(orl, low)

intradia = timeframe.isintraday

plot(verPD and intradia ? pdh : na, "PDH", color.new(#ef5350, 0), 2, plot.style_linebr)
plot(verPD and intradia ? pdl : na, "PDL", color.new(#26a69a, 0), 2, plot.style_linebr)
plot(verON and intradia and enRTH ? onh : na, "ONH", color.new(#ef5350, 50), 1, plot.style_linebr)
plot(verON and intradia and enRTH ? onl : na, "ONL", color.new(#26a69a, 50), 1, plot.style_linebr)
plot(verOR and intradia and enRTH and not enOR ? orh : na, "ORH", color.new(#e8b84b, 0), 1, plot.style_linebr)
plot(verOR and intradia and enRTH and not enOR ? orl : na, "ORL", color.new(#e8b84b, 0), 1, plot.style_linebr)
`
  },
  {
    id: "tamano-posicion",
    nombre: "ADRIUX Tamaño de Posición",
    descripcion: "Tabla en el gráfico que calcula cuántos contratos puedes operar según tu riesgo máximo y la distancia del stop. Detecta automáticamente el valor del punto del símbolo (MNQ = $2, NQ = $20, MES = $5…).",
    leccion: "n1-4",
    codigo: `//@version=6
indicator("ADRIUX Tamaño de Posición", shorttitle = "ADRIUX Riesgo", overlay = true)

riesgoUSD = input.float(200, "Riesgo máximo por operación ($)", minval = 1)
stopPts   = input.float(20, "Distancia del stop (puntos)", minval = 0.25, step = 0.25)
ratio     = input.float(2, "Ratio objetivo (R)", minval = 0.5, step = 0.5)
comision  = input.float(1.0, "Comisión ida y vuelta por contrato ($)", minval = 0, step = 0.1)
lugar     = input.string("Arriba derecha", "Posición de la tabla", options = ["Arriba derecha", "Abajo derecha", "Arriba izquierda"])

pv             = syminfo.pointvalue
riesgoContrato = stopPts * pv + comision
contratos      = riesgoContrato > 0 ? math.floor(riesgoUSD / riesgoContrato) : 0
riesgoReal     = contratos * riesgoContrato
objetivoPts    = stopPts * ratio
beneficio      = contratos * (objetivoPts * pv - comision)

pos = lugar == "Arriba derecha" ? position.top_right : lugar == "Abajo derecha" ? position.bottom_right : position.top_left
var table t = table.new(pos, 2, 6, bgcolor = color.new(#151b27, 5), border_color = color.new(#e8b84b, 60), border_width = 1)

if barstate.islast
    table.cell(t, 0, 0, "ADRIUX · " + syminfo.ticker, text_color = #e8b84b)
    table.cell(t, 1, 0, "", text_color = color.white)
    table.cell(t, 0, 1, "Valor por punto", text_color = color.white)
    table.cell(t, 1, 1, "$" + str.tostring(pv, "#.##"), text_color = color.white)
    table.cell(t, 0, 2, "Riesgo por contrato", text_color = color.white)
    table.cell(t, 1, 2, "$" + str.tostring(riesgoContrato, "#.##"), text_color = color.white)
    table.cell(t, 0, 3, "Contratos máximos", text_color = color.white)
    table.cell(t, 1, 3, str.tostring(contratos), text_color = contratos > 0 ? color.lime : color.red)
    table.cell(t, 0, 4, "Riesgo real", text_color = color.white)
    table.cell(t, 1, 4, "$" + str.tostring(riesgoReal, "#.##"), text_color = color.white)
    table.cell(t, 0, 5, "Objetivo " + str.tostring(ratio) + "R (" + str.tostring(objetivoPts) + " pts)", text_color = color.white)
    table.cell(t, 1, 5, "$" + str.tostring(beneficio, "#.##"), text_color = color.white)
`
  },
  {
    id: "cruce-emas",
    nombre: "ADRIUX Cruce de EMAs con alertas",
    descripcion: "Dos EMAs configurables con marcas de cruce y condiciones de alerta. Es el script que se explica línea a línea en la clase 3.3; úsalo como filtro, no como estrategia completa.",
    leccion: "n3-3",
    codigo: `//@version=6
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
alertcondition(bajista, "Cruce bajista", "EMA rápida cruza por debajo de la lenta")
`
  }
];

/* Glosario: lo usa el asistente sin conexión */
window.ADRIUX_GLOSARIO = [
  { t: "MNQ", k: ["mnq", "micro nasdaq", "micro e-mini"], d: "Micro E-mini Nasdaq-100. Futuro de CME: $2 por punto, tick de 0,25 = $0,50. 10 MNQ equivalen a 1 NQ.", l: "n1-1" },
  { t: "NQ", k: ["nq", "e-mini nasdaq"], d: "E-mini Nasdaq-100: $20 por punto, tick de 0,25 = $5.", l: "n1-1" },
  { t: "MES / ES", k: ["micro s&p", "e-mini s&p", "s&p", "sp500", "mes1", "es1"], d: "Futuros del S&P 500. MES (micro): $5 por punto. ES (e-mini): $50 por punto.", l: "n1-1" },
  { t: "Tick", k: ["tick"], d: "Movimiento mínimo del precio. En futuros de índices es 0,25 puntos; un punto tiene 4 ticks.", l: "n1-1" },
  { t: "Futuro", k: ["futuro", "futuros", "contrato"], d: "Contrato estandarizado para comprar o vender un activo a un precio en una fecha futura. El trader intradía lo abre y lo cierra el mismo día.", l: "n1-1" },
  { t: "Margen", k: ["margen", "garantia"], d: "Depósito de garantía que exige el broker para abrir un futuro. No es tu riesgo: tu riesgo lo define el stop.", l: "n1-1" },
  { t: "Apalancamiento", k: ["apalancamiento", "leverage"], d: "Controlar una exposición mayor que tu capital. Multiplica ganancias y pérdidas por igual.", l: "n1-1" },
  { t: "Rollover", k: ["rollover", "vencimiento", "roll"], d: "Paso del volumen al siguiente contrato trimestral (H, M, U, Z) unos días antes del vencimiento.", l: "n1-1" },
  { t: "Vela japonesa", k: ["vela", "velas", "ohlc"], d: "Representa apertura, máximo, mínimo y cierre de un periodo. El cuerpo muestra quién ganó; las mechas, los precios rechazados.", l: "n1-2" },
  { t: "Martillo", k: ["martillo", "hammer"], d: "Vela con cuerpo pequeño arriba y mecha inferior larga. Rechazo de precios bajos; relevante en soportes.", l: "n1-2" },
  { t: "Doji", k: ["doji"], d: "Vela con apertura y cierre casi iguales. Indica indecisión.", l: "n1-2" },
  { t: "Envolvente", k: ["envolvente", "engulfing"], d: "Vela cuyo cuerpo cubre por completo el cuerpo de la anterior, en sentido contrario. Señal de giro en zonas clave.", l: "n1-2" },
  { t: "Replay", k: ["replay", "simulador", "practicar"], d: "Modo de TradingView que reproduce días pasados vela a vela, sin ver el futuro. Ideal para practicar y hacer backtesting.", l: "n1-3" },
  { t: "Stop loss", k: ["stop", "stop loss", "sl"], d: "Precio donde tu idea queda invalidada y cierras con pérdida. Se coloca al entrar y nunca se aleja.", l: "n1-4" },
  { t: "Ratio riesgo/beneficio", k: ["ratio", "riesgo beneficio", "r:b", "rr", "risk reward"], d: "Relación entre lo que arriesgas y lo que buscas ganar. Con 1:2 basta acertar más del 33,3 % para no perder.", l: "n1-4" },
  { t: "R", k: ["1r", "2r", "multiplo r", "en r"], d: "Unidad de riesgo. 1R es lo que arriesgas en una operación; ganar 2R es ganar el doble de lo arriesgado.", l: "n1-4" },
  { t: "Tamaño de posición", k: ["tamaño", "cuantos contratos", "position size"], d: "Contratos = Riesgo $ ÷ (Stop en puntos × valor del punto), redondeando hacia abajo.", l: "n1-4" },
  { t: "Esperanza matemática", k: ["esperanza", "expectativa", "expectancy"], d: "E = (% acierto × ganancia media) − (% fallo × pérdida media). Debe ser positiva tras costes.", l: "n1-4" },
  { t: "Drawdown", k: ["drawdown", "dd", "caida"], d: "Caída desde el máximo de la cuenta. Perder un 50 % exige ganar un 100 % para recuperarlo.", l: "n3-5" },
  { t: "FOMO", k: ["fomo", "miedo a quedarme fuera"], d: "Miedo a perderse un movimiento. Lleva a entrar tarde, lejos del nivel y con mal stop.", l: "n1-5" },
  { t: "Revenge trading", k: ["revancha", "revenge", "recuperar perdidas"], d: "Operar impulsivamente tras una pérdida para recuperarla. Se evita con un límite de pérdida diaria.", l: "n1-5" },
  { t: "Plan de trading", k: ["plan de trading", "plan"], d: "Documento escrito con mercado, horario, setup, riesgo, gestión y condiciones para no operar.", l: "n1-5" },
  { t: "Diario de trading", k: ["diario", "journal", "bitacora"], d: "Registro de cada operación: setup, entrada, stop, objetivo, resultado en R, si seguiste el plan y emoción.", l: "n1-5" },
  { t: "Estructura de mercado", k: ["estructura", "hh", "hl", "lh", "ll", "tendencia"], d: "Alcista: máximos y mínimos más altos (HH/HL). Bajista: más bajos (LH/LL). Rango: similares.", l: "n2-1" },
  { t: "Soporte y resistencia", k: ["soporte", "resistencia", "nivel", "zona"], d: "Zonas donde antes aparecieron compradores (soporte) o vendedores (resistencia). Se dibujan como zonas, no líneas.", l: "n2-1" },
  { t: "PDH / PDL", k: ["pdh", "pdl", "dia anterior"], d: "Máximo y mínimo del día anterior. Niveles muy vigilados donde se acumulan stops.", l: "n2-1" },
  { t: "Liquidez", k: ["liquidez", "liquidity", "stops"], d: "Órdenes disponibles en un precio. Se acumulan encima de máximos y debajo de mínimos obvios (stops y órdenes de ruptura).", l: "n2-2" },
  { t: "Barrida de liquidez", k: ["barrida", "sweep", "stop hunt", "caza de stops"], d: "El precio supera un máximo/mínimo obvio, activa los stops y cierra de nuevo dentro del nivel.", l: "n2-2" },
  { t: "VWAP", k: ["vwap"], d: "Precio medio ponderado por volumen de la sesión. Precio encima y VWAP subiendo = sesgo comprador.", l: "n2-3" },
  { t: "EMA", k: ["ema", "media movil", "media exponencial"], d: "Media móvil exponencial: pondera más las velas recientes. Úsala como filtro de tendencia.", l: "n2-3" },
  { t: "Backtesting", k: ["backtest", "backtesting", "probar estrategia"], d: "Probar una estrategia con datos pasados. Mínimo 50–100 operaciones, reglas fijas y honestidad.", l: "n2-4" },
  { t: "Profit factor", k: ["profit factor", "factor de beneficio"], d: "Beneficio bruto ÷ pérdida bruta. Por encima de 1,3 es interesante.", l: "n2-4" },
  { t: "Cuenta fondeada", k: ["fondeada", "fondeo", "prop firm", "funded", "evaluacion"], d: "Empresa que te deja operar su capital tras aprobar una evaluación. Tu capital real es el drawdown permitido. Las reglas cambian: lee siempre las oficiales.", l: "n2-5" },
  { t: "Trailing drawdown", k: ["trailing drawdown", "trailing", "drawdown dinamico", "umbral"], d: "Umbral de pérdida que sube con cada nuevo saldo máximo y no baja. Intradía cuenta beneficios no realizados; EOD solo el cierre del día.", l: "n2-5" },
  { t: "Regla de consistencia", k: ["consistencia"], d: "Regla de algunas cuentas fondeadas: ningún día puede representar más de cierto % del beneficio total.", l: "n2-5" },
  { t: "Análisis multitemporal", k: ["multitemporal", "temporalidad", "top-down", "top down", "timeframe"], d: "La temporalidad alta decide dirección y zonas; la baja, el momento de entrada y el stop.", l: "n3-1" },
  { t: "Volumen", k: ["volumen", "volume"], d: "Contratos negociados. Ruptura con volumen alto = más fiable; retroceso con volumen bajo = sano.", l: "n3-2" },
  { t: "Perfil de volumen / POC", k: ["perfil", "poc", "vah", "val", "area de valor", "value area"], d: "Volumen por precio. POC = precio con más volumen. Área de valor = 70 % del volumen (VAH–VAL).", l: "n3-2" },
  { t: "Pine Script", k: ["pine", "script", "indicador", "codigo"], d: "Lenguaje de TradingView para crear indicadores y estrategias. Tienes 4 indicadores listos en la sección Indicadores.", l: "n3-3" },
  { t: "Webhook", k: ["webhook", "bot", "automatizar", "automatizacion"], d: "Mensaje que TradingView envía a un servidor cuando salta una alerta. Para ejecutar órdenes requiere un servidor propio y la API del broker.", l: "n3-3" },
  { t: "Repintado", k: ["repinta", "repintado", "repaint"], d: "Indicador cuyas señales pasadas cambian con nuevas velas. Parece perfecto en el histórico, pero no en real.", l: "n3-3" },
  { t: "Sobreoptimización", k: ["sobreoptim", "overfitting", "optimizar"], d: "Ajustar una estrategia al ruido del pasado. Se detecta validando en datos no usados para optimizar.", l: "n3-4" },
  { t: "Horario de futuros", k: ["horario", "hora", "abre", "sesion"], d: "CME Globex: domingo a viernes de 18:00 a 17:00 (Nueva York), pausa diaria de 17:00 a 18:00. Sesión regular: 9:30–16:00.", l: "n1-1" }
];
