# PERTENECES — Instrucciones para Claude Code

Proyecto de tesis (TICU, Diseño Gráfico, Universidad de Cuenca): sitio web estático (HTML/CSS/JS, GitHub Pages) sobre el patrimonio de las cinco parroquias del cantón Biblián para jóvenes de 16 a 23 años.

## Regla principal
`DESIGN_SYSTEM.md` es la fuente única de verdad del diseño. Antes de tocar cualquier estilo, léelo y respétalo. Si algo del código contradice el documento, gana el documento. Si el documento no cubre un caso, pregunta antes de inventar.

## Estructura
- `assets/css/variables.css` → tokens (color, tipografía, espaciado, forma, elevación). Todos los valores salen de aquí.
- `assets/css/components.css` → header, navegación, botones, footer.
- `assets/css/parroquia.css` → secciones de las páginas de parroquia.
- `pages/parroquias/` → una página por parroquia (Jerusalén es la referencia).

## Cómo trabajar
- No uses valores sueltos en CSS (colores hex, font-size, espacios): siempre tokens de `variables.css`.
- Mantén los nombres de variables actuales como alias para no romper nada.
- Mobile-first. Áreas táctiles de mínimo 48 × 48 px.
- No cambies textos del sitio sin mi aprobación: propón y espera.
- Trabaja por partes y explícame en corto qué cambiaste.
- Responde en español, directo y sin rodeos.
