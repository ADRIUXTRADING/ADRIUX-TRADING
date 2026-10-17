# ADRIUX-TRADING
Plataforma de trading impulsada por inteligencia artificial, análisis de mercados financieros y automatización de estrategias.

## ADRIUX Trading Academy

Sitio estático (HTML + CSS + JavaScript, sin dependencias ni compilación). Funciona en GitHub Pages o abriendo `index.html` directamente en el navegador.

### Contenido
- **Academia:** 3 niveles × 5 clases, con explicación, gráficos ilustrativos, 3 ejercicios con solución y un cuestionario por clase, y un examen de 10 preguntas por nivel. El progreso se guarda en el navegador (`localStorage`).
- **Calculadora de riesgo:** riesgo por operación y tamaño de posición para MNQ, NQ, MES y ES.
- **Indicadores de TradingView:** 4 scripts en Pine Script v6 (copiar o descargar `.pine`).
- **Cuentas fondeadas:** guía y simulador de trailing drawdown.
- **Asistente IA:** modo sin conexión (glosario, búsqueda en las clases y cálculos). El modo IA requiere un servidor propio.

### Estructura
```
index.html                 Página principal y secciones (#academy, #tools, #risk, #indicadores, #fondeo, #asistente, #community)
assets/css/estilos.css     Estilos
assets/js/config.js        Configuración: acceso, usuarios, pagos, IA y videos
assets/js/graficos.js      Motor de gráficos SVG (velas, VWAP, volumen, perfil)
assets/js/curso/nivel1-3.js Contenido de las clases y exámenes
assets/js/indicadores.js   Código Pine Script y glosario del asistente
assets/js/herramientas.js  Calculadora, simulador de fondeo, indicadores y asistente
assets/js/app.js           Navegación (#/clase/n1-1, #/examen/n1, #/progreso), progreso y acceso
_respaldo/                 Copia de la versión anterior de index.html
```

### Añadir un video a una clase
En `assets/js/curso/nivelX.js`, cambia `video: null` por `video: { proveedor: "youtube", id: "ID_DEL_VIDEO" }` (o `"vimeo"`).

### Funciones que requieren conexión adicional (preparadas, no activas)
| Función | Qué se necesita | Dónde se activa |
|---|---|---|
| Usuarios | Servicio de autenticación (Supabase, Firebase, Auth0…) | `config.js → auth` y `window.ADRIUX_AUTH` en `app.js` |
| Pagos / mensualidad | Pasarela (Stripe, Lemon Squeezy, Hotmart…) | `config.js → pagos` y `acceso.modo = "suscripcion"`; cada clase tiene `acceso: "gratis" \| "premium"` |
| Asistente con IA real | Servidor proxy que guarde la clave de la API | `config.js → ia.endpoint` |
| Alertas / ejecución | Webhooks de TradingView + API del broker | Externo |

> En un sitio estático, cualquier bloqueo hecho solo con JavaScript se puede saltar. El contenido de pago debe servirse desde un servidor que verifique la suscripción.

Contenido exclusivamente educativo. No constituye asesoría financiera.
