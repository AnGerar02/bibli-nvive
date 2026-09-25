# 🎓 Guía de defensa técnica — Biblián Vive (4 min de preguntas)

## 1. ¿Con qué está construida la página?

> "Con **HTML, CSS y JavaScript puros**, sin frameworks. Lo decidí así porque el
> proyecto es una pieza de **diseño editorial interactivo**: necesito control total
> del resultado visual, carga rápida, y que funcione en cualquier navegador sin
> instalaciones ni dependencias."

- Única librería externa: **Swiper** (el carrusel), **autoalojada** en el proyecto
  para no depender de internet de terceros.
- Todo lo demás (animaciones, parallax, menú, giros 3D) es **código nativo**.

## 2. ¿Cómo está organizado el proyecto?

> "Con separación de responsabilidades: el contenido en HTML, la presentación en
> CSS dividido por función, y el comportamiento en JavaScript."

- `variables.css` = **tokens de diseño**: los 5 colores y 2 tipografías de mi
  sistema visual en Figma viven en UN solo archivo. Cambio un valor ahí y se
  actualiza todo el sitio → coherencia garantizada.
- Las 5 parroquias compartirán **una plantilla**; solo cambia el contenido.
  (Por eso presento una: al aprobarse, las demás se producen rápido.)

## 3. El efecto del hero (la portada que crece)

> "Es un efecto **scroll-driven**: mido con JavaScript cuánto ha avanzado el
> usuario y paso ese progreso (0 a 1) al CSS, que interpola la curva, el tamaño
> de la foto y el color del título de azul a blanco. Está inspirado en
> armenia.travel, referente de portales turísticos."

## 4. Las animaciones de aparición (fade-in)

> "Uso **Intersection Observer**, la API nativa del navegador que detecta cuándo
> un elemento entra en pantalla. Es más eficiente que escuchar el scroll
> continuamente, y los elementos se animan una sola vez para no fatigar al
> usuario."

## 5. Rendimiento (si preguntan por qué carga rápido)

- Imágenes **optimizadas**: pasé fotos de 7-8 MB a ~400 KB (redimensionadas y
  comprimidas) → la página pesa una fracción y carga bien en celular.
- Video en **autoplay silencioso y en bucle** (estándar web: los navegadores solo
  permiten autoplay sin sonido).
- Animaciones con `transform` y `opacity`, que usan la **GPU** (no recalculan el
  layout) → movimiento fluido.

## 6. Accesibilidad (punto fuerte para mencionar)

- Todas las imágenes tienen **texto alternativo** (`alt`).
- Botones e íconos con **aria-label** para lectores de pantalla.
- Respeta la preferencia del sistema **"reducir movimiento"** (las animaciones se
  desactivan para personas sensibles al movimiento).
- Contraste de color verificado sobre la paleta.

## 7. Responsive

> "Enfoque adaptativo con CSS Grid, Flexbox y unidades fluidas (`clamp`). En
> pantallas pequeñas la interfaz se reorganiza: el menú se convierte en franjas
> de color a pantalla completa y el footer prioriza el contacto."

## 8. Publicación y control de versiones

> "El proyecto está versionado con **Git** (GitKraken + GitHub) y publicado con
> **GitHub Pages**: cada cambio queda registrado en el historial y el sitio se
> despliega directamente del repositorio."

- Link: `https://angerar02.github.io/bibli-nvive/`

## 9. Seguridad (si preguntan)

> "Es un sitio estático: no maneja datos de usuario ni formularios, así que la
> superficie de ataque es mínima. Los enlaces externos usan `rel='noopener'` y la
> única librería está autoalojada, sin dependencias de terceros en tiempo real."

---

# ⚡ Posibles preguntas trampa y respuestas cortas

**"¿Por qué no usaste WordPress/Wix?"**
→ "Porque el valor del proyecto está en el diseño a medida. Un gestor de plantillas
me limitaría la propuesta visual; con código propio cada decisión gráfica del
sistema se respeta al pixel."

**"¿Por qué no React u otro framework?"**
→ "React resuelve aplicaciones con estados complejos. Esto es un sitio editorial:
un framework agregaría peso y complejidad sin beneficio. La mejor herramienta es
la más simple que cumple el objetivo."

**"¿Cómo escalas esto a las 10 subpáginas?"**
→ "Las subpáginas comparten plantilla y sistema de diseño (tokens). Producir cada
una es reemplazar contenido: textos, fotos y video. La arquitectura ya está
pensada para eso."

**"¿Funciona en celular?"**
→ "Sí, es responsive y está publicada: puede escanearla ahora mismo." _(ten a mano
un QR del link 😉)_

**"¿Qué mejorarías a futuro?"**
→ "Terminar la landing y las demás subpáginas, autoalojar las tipografías,
convertir imágenes a WebP, y sumar analítica para medir qué parroquias generan
más interés turístico."
