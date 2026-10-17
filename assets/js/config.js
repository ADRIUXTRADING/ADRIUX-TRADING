/*
 * ADRIUX TRADING — Configuración central
 * ---------------------------------------
 * Aquí se activan, en el futuro, las funciones que necesitan un servidor.
 * Mientras estén en false / null, la web funciona 100 % como sitio estático
 * (GitHub Pages, Netlify, o abriendo index.html en el navegador).
 */
window.ADRIUX_CONFIG = {
  version: "2.0.0",

  /*
   * Acceso a las clases:
   *   "gratis"      → todas las clases abiertas (modo actual).
   *   "registro"    → requiere cuenta (necesita auth.habilitado = true).
   *   "suscripcion" → las clases marcadas como "premium" requieren mensualidad
   *                   (necesita auth + pagos).
   * IMPORTANTE: en un sitio estático cualquier bloqueo hecho solo con
   * JavaScript se puede saltar. El contenido de pago debe servirse desde
   * un servidor que verifique la suscripción.
   */
  acceso: {
    modo: "gratis"
  },

  /* Usuarios — requiere conexión adicional (Supabase, Firebase, Auth0, etc.) */
  auth: {
    habilitado: false,
    proveedor: null
  },

  /* Pagos — requiere conexión adicional (Stripe, Lemon Squeezy, Hotmart, etc.) */
  pagos: {
    habilitado: false,
    proveedor: null,
    precioMensualUSD: null,
    urlCheckout: null
  },

  /*
   * Asistente de IA conectado — requiere un servidor propio (proxy) que
   * guarde la clave de la API. NUNCA pongas una clave de API en este archivo.
   * Ejemplo: endpoint: "https://tu-servidor.com/api/asistente"
   * El servidor recibe POST { mensajes: [{rol, texto}] } y responde { respuesta }.
   */
  ia: {
    endpoint: null
  },

  /* Videos — cada lección tiene un campo "video". Proveedores previstos: youtube, vimeo */
  videos: {
    proveedor: "youtube"
  }
};
