# biveme — Instrucciones para Claude Code

Proyecto de tesis (TICU, Diseño Gráfico, Universidad de Cuenca): sitio web estático (HTML/CSS/JS, GitHub Pages) sobre el patrimonio de las cinco parroquias del cantón Biblián para jóvenes de 16 a 23 años.

## Regla principal

`DESIGN_SYSTEM.md` es la fuente única de verdad del diseño. Antes de tocar cualquier estilo, léelo y respétalo. Si algo del código contradice el documento, gana el documento. Si el documento no cubre un caso, pregunta antes de inventar.

## Estructura

- `assets/css/variables.css` → tokens (color, tipografía, espaciado, forma, elevación, movimiento). Todos los valores salen de aquí.
- `assets/css/reset.css` y `base.css` → normalización y estilos globales.
- `assets/css/components.css` → header, hero, navegación, botones, footer y página 404.
- `assets/css/inicio.css`, `parroquia.css`, `voz.css` y `evento.css` → secciones de cada tipo de página.
- `assets/js/main.js` → todas las interacciones.
- `index.html`, `pages/parroquias/`, `pages/voces/` y `pages/eventos/` → las 16 páginas (Jerusalén es la referencia de las parroquias).
- `404.html` → página de error (sus rutas empiezan en `/bibli-nvive/`).
- `sitemap.xml` y `_config.yml` → mapa del sitio y documentos que GitHub Pages no publica.
- `assets/img/og/` → fotos de la vista previa al compartir (una por página).
- `AUDITORIA.md` → registro de la auditoría del sitio (nov-2026).

## Cómo trabajar

- No uses valores sueltos en CSS (colores hex, font-size, espacios): siempre tokens de `variables.css`.
- Mantén los nombres de variables actuales como alias para no romper nada.
- Mobile-first. Áreas táctiles de mínimo 48 × 48 px.
- No cambies textos del sitio sin mi aprobación: propón y espera.
- Trabaja por partes y explícame en corto qué cambiaste.
- Responde en español, directo y sin rodeos.
