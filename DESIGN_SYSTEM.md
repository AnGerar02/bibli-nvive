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

Paleta de marca conservada, organizada en roles M3. Todo texto cumple WCAG AA (mínimo 4.5:1), salvo el texto chico azul sobre amarillo (ver Reglas).

| Rol M3 | Color | Hex | Texto encima ("on") | Contraste | Uso |
|---|---|---|---|---|---|
| Primary | Azul pizarra | `#3B5F73` | `#FFFFFF` | 6.8:1 | Navegación, títulos, secciones destacadas |
| Secondary | Verde oliva | `#627742` | `#FFFFFF` | 5.0:1 | Tarjetas de naturaleza/actividades |
| Tertiary | Terracota | `#AC4B10` | `#FFFFFF` | 5.5:1 | Tarjetas y acentos cálidos |
| Acento (color extendido) | Amarillo | `#F99F3F` | `#3B5F73` | 3.3:1 (solo texto grande o íconos cumple AA) | Estado activo, resaltados, CTA |
| Surface | Crema | `#FFF9ED` | `#3B5F73` | 6.5:1 | Fondo general |
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
- Un solo azul para todo el texto: `#3B5F73` (decisión de diseño, sep-2026; `#0A3447` se veía casi negro).
- Sobre amarillo, el azul da 3.3:1: cumple AA en texto grande (≥ 24 px, o ≥ 19 px en negrita) e íconos. Los textos chicos sobre amarillo (párrafos de tarjetas amarillas, copyright) quedan bajo 4.5:1: excepción asumida.
- La terracota original `#CC6228` solo para decoración o textos grandes; con texto usar `#AC4B10`.
- Máximo dos colores de acento por pantalla.

---

## 3. Tipografía

- Títulos: **Please** Bold (Adobe Fonts, kit `hjp6vej`). Es una fuente variable (eje de grosor 300–900); el Bold (700) se fija con `font-variation-settings` porque el kit la declara como si fuera solo 300. Historial: Poppins → Gala → Please (oct-2026, tras probar Comba, Chaloops, Marvin, Brim Narrow, Sisters, Variex, Tomarik y Temeraire).
- Texto: **Montserrat** 400 / 500

| Rol M3 | Fuente | Móvil | Escritorio | Uso |
|---|---|---|---|---|
| Display Large | Please Bold | 52 px | 72 px | Nombre del lugar en el hero |
| Display Medium | Please Bold | 44 px | 56 px | Palabras gráficas (VIDA, AIRE, PAZ, LUZ) |
| Display Small | Please Bold | 36 px | 48 px | Títulos de sección |
| Headline Medium | Please Bold | 28 px | 28 px | Ítems del menú móvil |
| Headline Small | Please Bold | 24 px | 24 px | Títulos del footer |
| Title Large | Please Bold | 22 px | 22 px | Títulos de tarjeta |
| Body Large | Montserrat 400 | 16 px | 16 px | Párrafos |
| Body Medium | Montserrat 400 | 14 px | 14 px | Texto de tarjetas |
| Body Small | Montserrat 400 | 12 px | 12 px | Copyright |
| Label Large | Please Bold | 14 px | 14 px | Menú, botones |
| Label Medium | Montserrat 500 | 12 px | 12 px | Hashtags, etiquetas |

Los tamaños Display están ampliados respecto a M3 (se calibraron para Gala, condensada) y funcionan igual con Please, también condensada.

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
| 1 | Sombra teñida de azul: `0 6px 16px rgba(10,52,71,.25)` | Tarjetas y fotos en reposo |
| 2 | Sombra marcada: `0 12px 28px rgba(10,52,71,.35)` | Hover de tarjetas; header con scroll |
| 3 | Sombra marcada o fondo sólido | Menú móvil abierto |

**Reglas**
- Sombras teñidas de azul, nunca negro puro. Deben apreciarse claramente (ajuste de la revisión de tesis, sep-2026).
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
- Logo: círculo amarillo de 48 px, "B" en `#3B5F73`.
- En el tope: sin fondo, tipografía blanca sobre la foto con degradado `#0A3447` al 50 % desde arriba (referencia: armenia.travel).
- Al bajar se esconde; al subir reaparece en crema translúcido + elevación 2, con texto azul.
- Fijo arriba. Nunca se esconde con el menú móvil abierto ni cuando algo del header tiene foco.

### 7.2 Navegación
**Escritorio y tablet (≥ 600 px):** logo a la izquierda alineado con el margen del contenido (1200 px) y menú centrado. Cinco ítems: Inicio, Parroquias, Datos, Voces, Actívate (sección deportiva: caminatas, ciclismo, senderismo). Ítems Label Large con interletrado de 0.08 em (la fuente de títulos es condensada y a 14 px las letras se juntan), padding 12 × 24 px en escritorio y 12 × 16 px en tablet, hover con capa 8 %. En el tope: ítems blancos sin fondo, activo subrayado. Al reaparecer (sobre la barra crema): ítems azules `#3B5F73`, activo en pastilla azul con texto blanco.

**Móvil:** botón "Menú" arriba a la derecha, alineado con el logo: pastilla crema (alto 48 px, elevación 2) con tres rayas en los colores de la marca (azul, amarillo, terracota; de distinto largo) y la palabra "Menú" en Label Large azul. Al abrir, la raya del medio desaparece y las otras dos se cruzan formando una X. Se esconde y reaparece con el header. Menú de pantalla completa con cinco tarjetas escalonadas (azul, amarillo, terracota, azul, amarillo) que alternan de lado; cada una lleva su ícono Material Symbols Rounded (48 px) en un círculo de 64 px del mismo color con aro crema de 8 px que sobresale del borde. Texto Headline Medium con su color "on" (azul sobre amarillo, blanco sobre azul y terracota). Toda la tarjeta es tocable. Entrada en cascada desde el lado de cada tarjeta (0.35 s). Cierra con el botón, al tocar un ítem o con Esc.

### 7.3 Botón
- Filled (principal): pastilla amarilla, texto `#3B5F73`, Label Large, alto mínimo 48 px, padding horizontal 24 px. Pressed: escala 0.97.
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
- Entrada en abanico (referencia: landonorris.com): al entrar en pantalla aparece primero la foto del centro (0,6 s, crece de 90 % a 100 %) y luego las laterales salen desde detrás de ella hacia su lugar (0,9 s, 0,3 s después; las más lejanas salen más tarde). Los puntos aparecen al final. Tokens `--dur-fan-center`, `--delay-fan`, `--dur-fan`. Con "reducir movimiento" no se anima.

### 7.6 Tarjeta de información
- Anatomía: ícono 48 px + título (Title Large) + línea divisoria de 4 px + texto (Body Medium).
- Variantes en orden fijo: verde (texto blanco), amarillo (texto `#3B5F73`), terracota `#AC4B10` (texto blanco).
- Padding 16 px móvil / 24 px escritorio; radio 28 px; elevación 1.
- Máximo 25 palabras de texto.
- Grupos de tres: 1 columna en móvil, 3 en escritorio.

### 7.7 Bloque texto + imagen
- Título con una palabra resaltada en pastilla amarilla (texto `#3B5F73`), una sola por sección.
- Párrafo de máximo 60 palabras.
- Escritorio: dos columnas. Móvil: texto arriba, imagen abajo.

### 7.8 Video
- Disposición: franja azul a todo el ancho con el video a la izquierda y, a la derecha, título (Display Small, crema) y párrafo (Body Large, crema, máx. 60 palabras), en 7/12 y 5/12 columnas, solo desde 1120 px: con menos ancho la columna de texto queda muy angosta para el título largo. Por debajo de 1120 px: texto arriba, video abajo.
- El video (radio 28 px, elevación 2; 4:3 en dos columnas, 16:9 apilado) sobresale 64 px por debajo de la franja, sobre el fondo crema. En dos columnas, el video arranca alineado con el título (mismo tope) y la franja crece hasta lo que sea más alto. El texto siempre queda dentro de la parte azul.
- Franja holgada: 1.5 veces el espacio entre secciones sobre el título, y al menos 32 px bajo el texto antes del borde de la franja.
- Título largo y párrafo corto: el título carga el mensaje, el párrafo lo complementa en una o dos frases.
- Se reproduce solo, silenciado y en bucle, cuando se ve al menos la mitad del video; se pausa al salir de pantalla y se reanuda al volver (decisión de diseño, sep-2026).
- El archivo se descarga recién al llegar a la sección (preload none), no al abrir la página.
- Si la persona lo pausa, no vuelve a arrancar solo. Controles visibles mientras se reproduce (WCAG 2.2.2: poder pausar lo que se mueve más de 5 s).
- Con "reducir movimiento", ahorro de datos o autoplay bloqueado por el navegador: portada con botón play (mínimo 48 px).
- Nunca autoplay con sonido.

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
- Panel amarillo: collage de 3 fotos (2 arriba + 1 ancha) y copyright en Body Small `#3B5F73`.
- Panel azul: logo, título (Headline Small), frase, redes, navegación, línea amarilla y #MásBiblián (Display Small).
- La navegación del footer lleva su propio título "Sobre nosotros" (Headline Small, igual que "¡Escríbenos!"). Las dos columnas (contacto | Sobre nosotros) van juntas con 64 px de separación, no repartidas a los extremos.
- Íconos de redes: círculo amarillo de 48 px con ícono de 24 px.
- En móvil se apilan: primero azul, luego amarillo.
- Aparición al hacer scroll: fotos del collage en cascada; en el panel azul, logo, texto con redes, línea y #MásBiblián en cascada; copyright con fundido. Se animan apenas el footer se asoma (está al final de la página y no sube lo suficiente para la regla general).

### 7.12 Esquina que se despega (foto del bloque texto + imagen)
- La esquina superior derecha de la foto aparece doblada (solapa crema de 56 px con elevación 2). La punta de la solapa es redondeada, como el resto de esquinas del sitio (hasta 28 px).
- Al pasar el mouse, con foco de teclado o al tocar en móvil, se despega en diagonal (62 % del ancho en escritorio, 70 % en móvil y tablet: siempre menos del 75 % para que la punta quede dentro de la foto 4:3) y deja ver una frase sobre fondo azul.
- Tamaño de la frase: 16 px en móvil, 22 px en tablet, 24 px en escritorio.
- Frase: Please Bold en crema, alineada a la derecha, en líneas que acortan siguiendo la diagonal. Actual: "3.800 msnm y una sola pregunta: ¿quién las talló?".
- La frase es un complemento: nunca información importante solo detrás de la foto.
- Evoca la piedra tallada de Padre Rumi (esquina cortada en diagonal).

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
- [x] Todo texto en un solo azul `#3B5F73`, también sobre amarillo (franja del menú móvil, copyright, badges, redes).
- [ ] Aplicar la escala tipográfica M3 y eliminar tamaños sueltos (hero 120 → 57 px, títulos 74 → 36 px, palabras 83 → 45 px, menú móvil 35 → 28 px).
- [ ] Espaciado en múltiplos de 4 y mismo espacio vertical entre secciones.
- [ ] Radios unificados: hero y footer 48 px, tarjetas 28 px.
- [ ] Logo 56 → 48 px. Íconos de redes 40 → 48 px.
- [ ] Marquee y carrusel con pausa y soporte para `prefers-reduced-motion`.
- [ ] Focus visible en todos los elementos interactivos.
- [ ] Textos `alt` descriptivos.
- [ ] Footer: "¡Contactarse!" → "¡Escríbenos!".
- [x] Recortar el párrafo de "Donde la piedra impone" a 60 palabras máx. (aprobado: versión de 51 palabras).
