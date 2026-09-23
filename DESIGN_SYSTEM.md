# Design System — PERTENECES (v2 · base Material Design 3)

Sitio web sobre el patrimonio de las cinco parroquias del cantón Biblián (Biblián, Nazón, Turupamba, Sageo, Jerusalén) para jóvenes de 16 a 23 años.
Este documento es la **fuente única de verdad**. Todo cambio de código debe respetarlo.

---

## 1. Principios

| Principio | Qué significa | Respaldo (encuesta n=27) |
|---|---|---|
| Primero la imagen | La foto/video lleva el mensaje; el texto acompaña | 59.3 % prefiere imágenes/video; 37 % rechaza texto sin imágenes |
| Corto y directo | Bloques breves, una idea por bloque | 48.1 % prefiere textos medios, 44.4 % cortos |
| Primero el celular | Se diseña para móvil y se adapta a escritorio | 85.2 % navega desde el celular |
| Cálido y de aquí | Paleta e imágenes que remiten al territorio | 48.1 % prefiere tonos cálidos/tierra |
| Ligero | Nada que haga lenta la carga | 37 % se queja de lentitud |

---

## 2. Color

Paleta de marca conservada, organizada en roles M3. Todo texto cumple WCAG AA (mínimo 4.5:1).

| Rol M3 | Color | Hex | Texto encima ("on") | Contraste | Uso |
|---|---|---|---|---|---|
| Primary | Azul pizarra | `#3B5F73` | `#FFFFFF` | 6.8:1 | Navegación, títulos, secciones destacadas |
| Secondary | Verde oliva | `#627742` | `#FFFFFF` | 5.0:1 | Tarjetas de naturaleza/actividades |
| Tertiary | Terracota | `#AC4B10` | `#FFFFFF` | 5.5:1 | Tarjetas y acentos cálidos |
| Acento (color extendido) | Amarillo | `#F99F3F` | `#0A3447` | 6.3:1 | Estado activo, resaltados, CTA |
| Surface | Crema | `#FFF9ED` | `#0A3447` | 13:1 | Fondo general |
| On-surface-variant | Gris cálido | `#4A473D` | — | 8.9:1 | Texto secundario |

Containers (tono 90) y on-containers (tono 10) de referencia:
- Primary container `#C3E8FF` / on `#001E2C`
- Secondary container `#D3EBAB` / on `#121F00`
- Tertiary container `#FFDBCC` / on `#351000`
- Acento container `#FFDCBF` / on `#2D1600`
- Surface containers: low `#F9F3E5`, base `#F3EDE0`, high `#EEE8DA`
- Outline `#7B776C`, outline-variant `#CBC6B9`

**Reglas**
- Proporción 60-30-10: crema 60 % · azul 30 % · verde/terracota/amarillo 10 %.
- NUNCA texto blanco sobre amarillo (2.1:1).
- NUNCA texto `#3B5F73` sobre amarillo (3.3:1) → usar `#0A3447`.
- La terracota original `#CC6228` solo para decoración o textos grandes; con texto usar `#AC4B10`.
- Máximo dos colores de acento por pantalla.

---

## 3. Tipografía

- Títulos: **Poppins** 700 / 800
- Texto: **Montserrat** 400 / 500

| Rol M3 | Fuente | Móvil | Escritorio | Uso |
|---|---|---|---|---|
| Display Large | Poppins 800 | 45 px | 57 px | Nombre del lugar en el hero |
| Display Medium | Poppins 800 | 36 px | 45 px | Palabras gráficas (VIDA, AIRE, PAZ, LUZ) |
| Display Small | Poppins 800 | 32 px | 36 px | Títulos de sección |
| Headline Medium | Poppins 800 | 28 px | 28 px | Ítems del menú móvil |
| Headline Small | Poppins 700 | 24 px | 24 px | Títulos del footer |
| Title Large | Poppins 700 | 22 px | 22 px | Títulos de tarjeta |
| Body Large | Montserrat 400 | 16 px | 16 px | Párrafos |
| Body Medium | Montserrat 400 | 14 px | 14 px | Texto de tarjetas |
| Body Small | Montserrat 400 | 12 px | 12 px | Copyright |
| Label Large | Poppins 700 | 14 px | 14 px | Menú, botones |
| Label Medium | Montserrat 500 | 12 px | 12 px | Hashtags, etiquetas |

**Reglas**
- Máximo tres tamaños por pantalla.
- Texto corrido nunca menor a 14 px en móvil.
- Párrafos de máximo 60–70 caracteres por línea.
- Mayúsculas sostenidas solo para palabras gráficas, nunca oraciones.
- Ningún tamaño fuera de esta escala.

---

## 4. Espaciado

Grilla base de 4 px. Todo espacio es múltiplo de 4.

| Token | Valor | Uso |
|---|---|---|
| XXS | 4 px | Ícono ↔ texto |
| XS | 8 px | Padding de chips/etiquetas |
| S | 12 px | Título ↔ texto dentro de tarjeta |
| M | 16 px | Padding de tarjetas en móvil; gap entre tarjetas |
| L | 24 px | Padding de tarjetas en escritorio; gap de grillas |
| XL | 32 px | Título de sección ↔ contenido |
| 2XL | 48 px | Entre secciones (móvil) |
| 3XL | 64 px | Entre secciones (escritorio) |

**Reglas**
- Espacio dentro de componente < espacio entre componentes < espacio entre secciones.
- Todas las secciones usan el mismo espacio vertical.
- Eliminar valores sueltos (14, 22, 28 px, etc.).

### Grilla y márgenes

| Pantalla | Ancho | Columnas | Margen | Gutter |
|---|---|---|---|---|
| Móvil | < 600 px | 4 | 16 px | 16 px |
| Tablet | 600–839 px | 8 | 24 px | 24 px |
| Escritorio | ≥ 840 px | 12 | 24 px | 24 px |

- Ancho máximo de contenido: 1200 px, centrado.
- Fotos del hero y carruseles pueden ir a sangre; el texto nunca.

### Áreas táctiles
Todo elemento tocable: mínimo **48 × 48 px**.

---

## 5. Forma (esquinas)

| Nivel M3 | Radio | Uso |
|---|---|---|
| Medium | 12 px | Fotos pequeñas, chips, etiquetas |
| Extra Large | 28 px | Tarjetas y fotos del carrusel |
| Extra Extra Large | 48 px | Secciones con fondo propio, hero y footer |
| Full | pastilla / 50 % | Botones, menú, íconos de redes, logo |
| None | 0 | Menú móvil desplegado (franjas rectas) |

**Regla:** un elemento dentro de un contenedor redondeado tiene un radio menor que el contenedor.

---

## 6. Elevación

| Nivel | Recurso | Uso |
|---|---|---|
| 0 | Sin sombra | Fondo, secciones |
| 1 | Sombra suave teñida de azul: `0 4px 12px rgba(10,52,71,.15)` | Tarjetas y fotos en reposo |
| 2 | Sombra media: `0 8px 22px rgba(10,52,71,.20)` | Hover de tarjetas; header con scroll |
| 3 | Sombra marcada o fondo sólido | Menú móvil abierto |

**Reglas**
- Sombras teñidas de azul, nunca negro puro.
- Solo se sube de nivel con interacción.
- Máximo dos niveles visibles a la vez.

---

## 7. Componentes

### 7.0 Estados (todos los componentes)

| Estado | Capa sobre el componente |
|---|---|
| Hover | 8 % del color "on" |
| Focus | 10 % + contorno visible de 2 px |
| Pressed | 10 % |
| Activo | Cambio de color de rol |

El estado nunca se comunica solo con color: acompañar con forma, peso o contorno.

### 7.1 Header
- Logo: círculo amarillo de 48 px, "B" en `#0A3447`.
- En el tope: sin fondo, tipografía blanca sobre la foto con degradado `#0A3447` al 50 % desde arriba (referencia: armenia.travel).
- Al bajar se esconde; al subir reaparece en crema translúcido + elevación 2, con texto azul.
- Fijo arriba. Nunca se esconde con el menú móvil abierto ni cuando algo del header tiene foco.

### 7.2 Navegación
**Escritorio y tablet (≥ 600 px):** logo a la izquierda alineado con el margen del contenido (1200 px) y menú centrado. Ítems Label Large, padding 12 × 24 px, hover con capa 8 %. En el tope: ítems blancos sin fondo, activo subrayado. Al reaparecer (sobre la barra crema): ítems azules `#3B5F73`, activo en pastilla azul con texto blanco.

**Móvil:** hamburguesa circular crema de 48 px (ícono azul, elevación 1) que se vuelve X; menú de pantalla completa con franjas a todo el ancho en Headline Medium (28 px). Franjas azul, amarillo, verde y terracota, cada una con su "on" correcto (**franja amarilla con texto `#0A3447`**). Entrada en cascada de 0.35 s. Cierra con X, al tocar un ítem o con Esc.

### 7.3 Botón
- Filled (principal): pastilla amarilla, texto `#0A3447`, Label Large, alto mínimo 48 px, padding horizontal 24 px. Pressed: escala 0.97.
- Outlined (secundario): borde azul, sin relleno.
- Máximo un botón principal por pantalla.

### 7.4 Hero de parroquia
- Foto a sangre, curva inferior de 48 px, nombre del lugar en Display Large.
- Si la foto es clara: degradado `#0A3447` al 40–60 % bajo el texto.
- Única imagen sin lazy loading.

### 7.5 Carrusel ("Desde la raíz")
- Fondo azul, título crema `#FFF9ED` (Display Small).
- Fotos 3:4 con radio 28 px.
- Paginación: puntos blancos al 45 %, activo amarillo.
- No avanza solo; si lo hace, necesita botón de pausa.

### 7.6 Tarjeta de información
- Anatomía: ícono 48 px + título (Title Large) + línea divisoria de 4 px + texto (Body Medium).
- Variantes en orden fijo: verde (texto blanco), amarillo (texto `#0A3447`), terracota `#AC4B10` (texto blanco).
- Padding 16 px móvil / 24 px escritorio; radio 28 px; elevación 1.
- Máximo 25 palabras de texto.
- Grupos de tres: 1 columna en móvil, 3 en escritorio.

### 7.7 Bloque texto + imagen
- Título con una palabra resaltada en pastilla amarilla (texto `#0A3447`), una sola por sección.
- Párrafo de máximo 60 palabras.
- Escritorio: dos columnas. Móvil: texto arriba, imagen abajo.

### 7.8 Video
- Portada primero; el video solo se carga al tocar play.
- Nunca autoplay con sonido. Controles visibles; botón play mínimo 48 px.

### 7.9 Tarjeta giratoria (flip card)
- Variantes de igual alto: texto (Title Large + Body Medium), palabra (Display Medium), foto.
- Colores verde, amarillo, terracota o azul, cada uno con su "on".
- Giro de 0.6 s en hover (escritorio) o al tocar (móvil).
- El reverso solo muestra #MásBiblián: nunca contenido importante solo en el reverso.

### 7.10 Franja en movimiento (marquee)
- Filas que se desplazan alternando dirección, a velocidad lenta y constante.
- Pausa en hover y al tocar.
- Con `prefers-reduced-motion`: filas quietas y deslizables a mano.

### 7.11 Footer
- Dos paneles con radio superior de 48 px.
- Panel amarillo: collage de 3 fotos (2 arriba + 1 ancha) y copyright en Body Small `#0A3447`.
- Panel azul: logo, título (Headline Small), frase, redes, navegación, línea amarilla y #MásBiblián (Display Small).
- Íconos de redes: círculo amarillo de 48 px con ícono de 24 px.
- En móvil se apilan: primero azul, luego amarillo.

---

## 8. Imagen

- Fotos reales y locales (no stock ni IA), con gente cuando sea posible, luz natural cálida y edición consistente.
- Formato WebP con respaldo JPG. Lazy loading en todo salvo el hero.

| Uso | Proporción | Ancho máx. | Peso máx. |
|---|---|---|---|
| Hero | 4:5 móvil / 16:9 escritorio | 1920 px | 300 KB |
| Carrusel | 3:4 | 1080 px | 150 KB |
| Texto + imagen | 4:3 | 1200 px | 150 KB |
| Tarjetas foto | Alto fijo | 800 px | 100 KB |
| Collage footer | 1:1 y 2:1 | 800 px | 100 KB |

- Texto sobre foto: siempre con degradado `#0A3447` al 40–60 %.
- Todo `alt` describe qué se ve y dónde (no "Actividad 1").

---

## 9. Iconografía

- Sistema: **Material Symbols Rounded**.
- Interfaz: 24 px. Tarjetas de información: 48 px. Redes: 24 px dentro de círculo de 48 px.
- Los íconos heredan el color "on" de su fondo.
- Un solo estilo (no mezclar relleno y línea). Excepción: logos de redes sociales.
- Íconos sin texto llevan `aria-label`.

---

## 10. Voz y tono

Alguien joven de aquí que te cuenta con orgullo lo que tienes cerca. Insight: *"Nunca fue desinterés: fue no saber todo lo que tenían cerca."*

| Sí | No |
|---|---|
| Tutear | Tercera persona o usted |
| Frases cortas | Párrafos largos con muchas comas |
| Invitar a hacer | Describir como catálogo |
| Datos concretos (3.800 msnm) | Adjetivos vacíos (impresionante, colosal) |
| Palabras gráficas en mayúsculas | Oraciones en mayúsculas |
| Cerrar con #MásBiblián | Varios hashtags |

**Reglas de escritura:** tildes también en mayúsculas · títulos en formato de oración · signos de apertura ¿ ¡ · cifras para datos, letras para expresiones · nombre completo del lugar la primera vez.

---

## 11. Correcciones pendientes en el sitio actual

- [ ] Reorganizar `variables.css` en roles M3 (manteniendo alias de compatibilidad para no romper el código existente).
- [ ] Terracota con texto: `#CC6228` → `#AC4B10`.
- [ ] Todo texto sobre amarillo en `#0A3447` (franja amarilla del menú móvil, copyright, badges, redes).
- [ ] Aplicar la escala tipográfica M3 y eliminar tamaños sueltos (hero 120 → 57 px, títulos 74 → 36 px, palabras 83 → 45 px, menú móvil 35 → 28 px).
- [ ] Espaciado en múltiplos de 4 y mismo espacio vertical entre secciones.
- [ ] Radios unificados: hero y footer 48 px, tarjetas 28 px.
- [ ] Logo 56 → 48 px. Íconos de redes 40 → 48 px.
- [ ] Marquee y carrusel con pausa y soporte para `prefers-reduced-motion`.
- [ ] Focus visible en todos los elementos interactivos.
- [ ] Textos `alt` descriptivos.
- [ ] Footer: "¡Contactarse!" → "¡Escríbenos!".
- [ ] Recortar el párrafo de "Donde la piedra impone" a 60 palabras máx. (propuesta de redacción, **pedir aprobación antes de cambiar textos**).
