# Design System — PERTENECES (v2 · base Material Design 3)

Sitio web sobre el patrimonio de las cinco parroquias del cantón Biblián (Biblián, Nazón, Turupamba, Sageo, Jerusalén) para jóvenes de 16 a 23 años.
Este documento es la **fuente única de verdad**. Todo cambio de código debe respetarlo.

---

## 1. Principios

| Principio          | Qué significa                                     | Respaldo (encuesta n=27)                                        |
| ------------------ | ------------------------------------------------- | --------------------------------------------------------------- |
| Primero la imagen  | La foto/video lleva el mensaje; el texto acompaña | 59.3 % prefiere imágenes/video; 37 % rechaza texto sin imágenes |
| Corto y directo    | Bloques breves, una idea por bloque               | 48.1 % prefiere textos medios, 44.4 % cortos                    |
| Primero el celular | Se diseña para móvil y se adapta a escritorio     | 85.2 % navega desde el celular                                  |
| Cálido y de aquí   | Paleta e imágenes que remiten al territorio       | 48.1 % prefiere tonos cálidos/tierra                            |
| Ligero             | Nada que haga lenta la carga                      | 37 % se queja de lentitud                                       |

---

## 2. Color

Paleta de marca conservada, organizada en roles M3. Todo texto cumple WCAG AA (mínimo 4.5:1), salvo el texto chico azul sobre amarillo (ver Reglas).

| Rol M3                   | Color        | Hex       | Texto encima ("on") | Contraste                                    | Uso                                       |
| ------------------------ | ------------ | --------- | ------------------- | -------------------------------------------- | ----------------------------------------- |
| Primary                  | Azul pizarra | `#3B5F73` | `#FFFFFF`           | 6.8:1                                        | Navegación, títulos, secciones destacadas |
| Secondary                | Verde oliva  | `#627742` | `#FFFFFF`           | 5.0:1                                        | Tarjetas de naturaleza/actividades        |
| Tertiary                 | Terracota    | `#AC4B10` | `#FFFFFF`           | 5.5:1                                        | Tarjetas y acentos cálidos                |
| Acento (color extendido) | Amarillo     | `#F99F3F` | `#3B5F73`           | 3.3:1 (solo texto grande o íconos cumple AA) | Estado activo, resaltados, CTA            |
| Surface                  | Crema        | `#FFF9ED` | `#3B5F73`           | 6.5:1                                        | Fondo general                             |
| On-surface-variant       | Gris cálido  | `#4A473D` | —                   | 8.9:1                                        | Texto secundario                          |

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

| Rol M3          | Fuente         | Móvil | Escritorio | Uso                                      |
| --------------- | -------------- | ----- | ---------- | ---------------------------------------- |
| Display Large   | Please Bold    | 52 px | 72 px      | Nombre del lugar en el hero              |
| Display Medium  | Please Bold    | 44 px | 56 px      | Palabras gráficas (VIDA, AIRE, PAZ, LUZ) |
| Display Small   | Please Bold    | 36 px | 48 px      | Títulos de sección                       |
| Headline Medium | Please Bold    | 28 px | 28 px      | Ítems del menú móvil                     |
| Headline Small  | Please Bold    | 24 px | 24 px      | Títulos del footer                       |
| Title Large     | Please Bold    | 22 px | 22 px      | Títulos de tarjeta, botones              |
| Body Large      | Montserrat 400 | 16 px | 16 px      | Párrafos                                 |
| Body Medium     | Montserrat 400 | 14 px | 14 px      | Texto de tarjetas                        |
| Body Small      | Montserrat 400 | 12 px | 12 px      | Copyright                                |
| Label Large     | Please Bold    | 14 px | 14 px      | Menú                                     |
| Label Medium    | Montserrat 500 | 12 px | 12 px      | Hashtags, etiquetas                      |

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

| Token | Valor | Uso                                               |
| ----- | ----- | ------------------------------------------------- |
| XXS   | 4 px  | Ícono ↔ texto                                     |
| XS    | 8 px  | Padding de chips/etiquetas                        |
| S     | 12 px | Título ↔ texto dentro de tarjeta                  |
| M     | 16 px | Padding de tarjetas en móvil; gap entre tarjetas  |
| L     | 24 px | Padding de tarjetas en escritorio; gap de grillas |
| XL    | 32 px | Título de sección ↔ contenido                     |
| 2XL   | 48 px | Entre secciones (móvil)                           |
| 3XL   | 64 px | Entre secciones (escritorio)                      |

**Reglas**

- Espacio dentro de componente < espacio entre componentes < espacio entre secciones.
- Todas las secciones usan el mismo espacio vertical.
- **Entre dos bloques va un solo espacio de sección (64 px escritorio / 48 px móvil), no dos** (oct-2026). Si dos secciones seguidas comparten fondo, una de ellas no lleva margen de ese lado (antes se sumaban y quedaban 128–136 px vacíos). En el inicio: las parroquias llevan medio espacio arriba y abajo (la primera, completo arriba) y "Voces" no lleva margen abajo. En las parroquias, las tres tarjetas no llevan margen abajo.
- Eliminar valores sueltos (14, 22, 28 px, etc.).

### Grilla y márgenes

| Pantalla   | Ancho      | Columnas | Margen | Gutter |
| ---------- | ---------- | -------- | ------ | ------ |
| Móvil      | < 600 px   | 4        | 16 px  | 16 px  |
| Tablet     | 600–839 px | 8        | 24 px  | 24 px  |
| Escritorio | ≥ 840 px   | 12       | 24 px  | 24 px  |

- Ancho máximo de contenido: 1200 px, centrado.
- Fotos del hero y carruseles pueden ir a sangre; el texto nunca.

### Áreas táctiles

Todo elemento tocable: mínimo **48 × 48 px**.

---

## 5. Forma (esquinas)

**Dos reglas (oct-2026):**

1. **Superficies** (fotos, tarjetas, cartas, paneles, ítems del menú móvil, curvas de las secciones): una sola curvatura de **16 px** (`--radius`).
2. **Piezas con forma de botón** (botones, pastillas de los títulos, la fecha de los eventos, la pestaña elegida en "Voces", el botón "Menú"): la curva es **un tercio de su alto** (`--radius-proporcion: 3`). Un botón de 48 px queda con 16 px, la pestaña de 32 px con ≈ 11 px, la fecha de 46 px con ≈ 15 px y una pastilla de título de 78 px con ≈ 26 px. Con un radio fijo, las grandes se veían cuadradas y las chicas redondas; con la proporción, todas tienen la misma redondez.

| Token                 | Radio                  | Uso                                                                                                                |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `--radius`            | 16 px                  | Superficies. Los nombres antiguos (`--radius-m`, `--radius-xl`, `--radius-2xl`) quedan como alias del mismo valor. |
| `--radius-proporcion` | alto ÷ 3               | Piezas con forma de botón (ver arriba).                                                                            |
| `--radius-chico`      | 2/3 de 16 px (≈ 11 px) | La pestaña de 32 px de "Voces" (es lo mismo que su alto ÷ 3).                                                      |
| `--radius-full`       | círculo                | Solo lo que es un círculo: íconos de redes, puntos del carrusel, y las puntas de las líneas divisorias.            |

**Pastilla de los títulos** (`.pill`, una palabra por sección): aire proporcional a la letra, **0,17 em arriba y abajo** (`--pill-aire-y`) y **0,3 em a los lados** (`--pill-aire-x`), así se ve igual de holgada en 36, 44, 48, 52 o 72 px. La palabra se centra ópticamente: `main.js` mide la tinta real (mayúsculas, minúsculas como "voces", letras que bajan como la "g" de "Segundo") y deja el mismo aire arriba y abajo; las palabras con letras que bajan crecen lo justo. En los títulos de varias líneas, la separación entre la pastilla y la línea de arriba o de abajo es igual al aire de la pastilla (antes iba de 0 a 14 px). Reemplaza al ajuste manual `.pill--cola` (la clase queda en el HTML sin efecto).

Antes había cuatro: 12 px (botones), 28 px (tarjetas y fotos), 48 px (secciones y cartas de eventos) y pastilla completa (menú, pastillas). Se unificaron porque se veían distintas. Por eso tampoco se aplica ya la regla de "radio interior menor que el del contenedor": todo usa el mismo.

---

## 6. Elevación

| Nivel | Recurso                                                | Uso                                  |
| ----- | ------------------------------------------------------ | ------------------------------------ |
| 0     | Sin sombra                                             | Fondo, secciones                     |
| 1     | Sombra teñida de azul: `0 6px 16px rgba(10,52,71,.25)` | Tarjetas y fotos en reposo           |
| 2     | Sombra marcada: `0 12px 28px rgba(10,52,71,.35)`       | Hover de tarjetas; header con scroll |
| 3     | Sombra marcada o fondo sólido                          | Menú móvil abierto                   |

**Reglas**

- Sombras teñidas de azul, nunca negro puro. Deben apreciarse claramente (ajuste de la revisión de tesis, sep-2026).
- Solo se sube de nivel con interacción.
- Máximo dos niveles visibles a la vez.

---

## 7. Componentes

### 7.0 Estados (todos los componentes)

| Estado  | Capa sobre el componente        |
| ------- | ------------------------------- |
| Hover   | 8 % del color "on"              |
| Focus   | 10 % + contorno visible de 2 px |
| Pressed | 10 %                            |
| Activo  | Cambio de color de rol          |

El estado nunca se comunica solo con color: acompañar con forma, peso o contorno.

### 7.0b Movimiento (oct-2026, homologación por revisión de tesis)

El sitio se mueve con un vocabulario corto y siempre igual. Todo usa los mismos tokens (`--ease-out`, `--dur-reveal`, `--dur-fan-center`, `--delay-fan`, `--dur-fan`, `--dur-btn`):

1. **Aparecer:** sube 56 px con un fundido (0,9 s), en cascada de 120 ms, una sola vez al llegar (`data-reveal`). Para títulos, textos y tarjetas.
2. **Abanico:** primero la foto o carta del centro (0,6 s, de 90 % a 100 %) y luego las laterales salen desde detrás de ella (0,9 s, 0,3 s después); el botón o los puntos al final. Una sola vez. Lo usan las galerías de parroquias del inicio.
   2b. **Cartas** (oct-2026, referencia: neutomni.com): cada foto sube desde más abajo, girada en 3D e inclinada, y se asienta derecha en su lugar, una tras otra de izquierda a derecha (con los mismos tiempos del abanico: 0,9 s cada una, 0,3 s entre una y otra). Una sola vez al llegar. Lo usan las 3 fotos de "Desde la raíz" en las páginas de parroquia (§7.5) y la foto de las voces locales del inicio (§7.13), que además entra así cada vez que se cambia de persona (es una acción de quien navega).
3. **Hover de los botones:** sube 4 px y crece un 4 % (§7.3).
4. **Escenas del inicio:** el hero que crece, la escena de capas de RAÍCES y las cartas de Datos que suben (§7.14), ligadas al scroll. Entre las dos, **niebla** (oct-2026, referencia: white-desert.com):
   - Primero termina la animación del video (3/4 de pantalla de scroll) y el título "El patrimonio de Biblián" queda quieto un tramo para leerse: el hero del inicio es más alto que el de las parroquias (`--hero-reposo`, 50 vh).
   - Después, dos bandas de niebla (`assets/img/inicio/capas/niebla-atras.webp` y `niebla-delante.webp`, textura de ruido generada, no foto ni IA) suben desde abajo de la pantalla a distinta velocidad y tapan el video.
   - Cuando el video empieza a irse, la parte densa viaja sobre su borde de abajo **todo el trayecto**, así nunca se ve el corte entre el video y la escena. Recién cuando el borde llega casi arriba (15 % de la pantalla), la niebla se adelanta y termina de irse media pantalla de scroll después de que el borde salió: la escena de RAÍCES aparece saliendo de la niebla (los primeros momentos de su animación ocurren entre las últimas nubes). Oct-2026: antes se iba desde la mitad de la pantalla y dejaba ver la línea arriba.
   - Naturalidad (oct-2026, "se veía forzado y como un bloque"): cada banda va a su ritmo (la de adelante un poco más rápida que la página, la de atrás más lenta, como con la profundidad; la de adelante igual se mantiene a menos de 50 px del borde), derivan hacia lados contrarios y crecen hasta un 12 % mientras se baja (al cruzarse, la niebla parece cambiar de forma), aparecen y se disipan con un fundido, y tienen un vaivén lateral muy lento (14 s) **solo mientras están en pantalla**, para que no se vean congeladas si se deja de hacer scroll en medio. Es la única excepción a "nada se mueve solo": dura lo que dura la transición. Las bandas son más anchas que la pantalla (`--niebla-margen`, 12 vw a cada lado) para que nunca se vea su borde al derivar.
   - Sin líneas rectas (oct-2026): las texturas terminan en transparente total arriba y abajo (el 14 % de cada borde se desvanece a 0), y la banda nunca se recorta arriba ni abajo: en pantallas anchas toma el alto que le corresponde a su ancho (`--niebla-proporcion` 0,75) y en angostas el de `--niebla-alto`, recortándose solo a los lados, fuera de la vista.
   - Fluidez: todo se desliza hacia su valor con inercia (la rueda del mouse avanza a saltos), solo se usan `transform` y `opacity`, y las medidas se toman una vez. Sin desenfoques animados (son pesados).
   - Fija sobre la pantalla, por debajo del header; solo existe durante ese tramo; con "reducir movimiento" no aparece. Si se consigue una foto de niebla real (por ejemplo del páramo), se reemplazan los dos archivos sin tocar el código.
   - Historial: primero se probó al final de la escena de RAÍCES (antes de las parroquias); el autor la prefirió entre el video y RAÍCES.

**Reglas:** nada se mueve solo y sin parar; lo interactivo (las pestañas de Voces, poner al frente una carta de Datos) se mueve solo cuando la persona lo hace; cada cosa aparece una sola vez (no se repite al volver); con "reducir movimiento" no hay desplazamientos. Se quitaron por no seguir este vocabulario: la flotación de las fotos de las parroquias del inicio, el desplazamiento con scroll de sus nombres, el desvanecer y repetir de sus fotos al salir y volver, y en Datos el » que seguía al mouse, su latido y el amague automático de la rueda. Se conservan el cambio de color de fondo de las parroquias del inicio (firma de la sección) y el parallax de los títulos en las páginas de parroquia.

### 7.1 Header

- Logo (oct-2026): símbolo cuadrado + "biveme" (`assets/img/ui/logo.svg`, recortado de `logo_final.svg`), 32 px de alto (128 px de ancho), área táctil de 48 px. Toma el color del texto del header: blanco en el tope sobre la foto, crema sobre la barra azul y azul con el menú móvil abierto (fondo crema). En tablet (600–1023 px) se ve solo el símbolo, porque el logo completo no cabe junto al menú centrado. Antes: círculo amarillo con "B" provisional.
- En el tope: sin fondo, tipografía blanca sobre la foto con degradado `#0A3447` al 50 % desde arriba (referencia: armenia.travel).
- Al bajar se esconde; al subir reaparece como barra azul translúcida (92 %) + elevación 2, con logo y texto en crema (oct-2026: colores invertidos; antes barra crema con texto azul). En el inicio la barra está siempre así.
- Fijo arriba. Nunca se esconde con el menú móvil abierto ni cuando algo del header tiene foco.

### 7.2 Navegación

**Escritorio y tablet (≥ 600 px):** logo a la izquierda alineado con el margen del contenido (1200 px) y menú centrado. Cinco ítems: Inicio, Parroquias, Datos, Voces, Actívate (sección deportiva: caminatas, ciclismo, senderismo). Ítems Label Large con interletrado de 0.08 em (la fuente de títulos es condensada y a 14 px las letras se juntan), padding 12 × 24 px en escritorio y 12 × 12 px en tablet, hover con capa 8 %. En el tope: ítems blancos sin fondo, activo subrayado. Al reaparecer (sobre la barra azul): ítems en crema, activo en pastilla crema suavizada (crema con un 15 % del azul de la barra, para que no resalte tanto; contraste con el texto azul 5,1:1) con texto azul. Oct-2026: se probó el activo solo en amarillo, sin pastilla, y se descartó.

**Móvil:** botón "Menú" arriba a la derecha, alineado con el logo: pastilla crema (alto 48 px, elevación 2) con la palabra "Menú" en Label Large azul, solo texto. Se esconde y reaparece con el header. Menú de pantalla completa con cinco tarjetas escalonadas (azul, amarillo, terracota, azul, amarillo) que alternan de lado, solo con texto: Headline Medium con su color "on" (azul sobre amarillo, blanco sobre azul y terracota). Oct-2026: se quitaron las tres rayas de colores del botón (que se volvían X) y los íconos en círculo de las tarjetas. Toda la tarjeta es tocable. Entrada en cascada desde el lado de cada tarjeta (0.35 s). Cierra con el botón, al tocar un ítem o con Esc.

**"Parroquias" (oct-2026):** es un enlace, sin submenú: lleva a la sección de parroquias del inicio (`index.html#parroquias`), que empieza en Turupamba. En las páginas de parroquia va marcado como activo. Antes abría un submenú desplegable con las cinco parroquias; se quitó.

- En tablet el padding de los ítems es de 12 × 12 px para que quepan los cinco.
- Toda página nueva de parroquia debe copiar el header de `jerusalen.html` (con "Parroquias" activo).
- Saltos a una sección (menú, footer, volver al inicio con `index.html#voces`…): directos, sin desplazamiento animado (oct-2026: se quitó `scroll-behavior: smooth`; bajar animado por toda la página del inicio mareaba).

### 7.3 Botón

- Principal, oct-2026: relleno de color, esquinas de 16 px (como todo el sitio), fuente de títulos en Title Large (22 px), alto 48 px, 40 px a cada lado del texto, elevación 1. Texto centrado ópticamente a la altura de las mayúsculas (como la pastilla). Por defecto amarillo con texto azul. Historial: pastilla rellena en Label Large → contorno grueso de 4 px → relleno (actual).
- **Hover común de todos los botones** (oct-2026; el menú de navegación no lo usa): sube 4 px y crece un 4 % con un leve rebote, pasa a elevación 2 y se le suma una capa del color del texto al 8 % (0,25 s). Presionado: 97 %. Con "reducir movimiento" solo cambian sombra y color. Lo comparten: los botones (Visitar, Cómo llegar, Conoce…), las redes del footer y el WhatsApp de la ficha de eventos. Tokens `--btn-sube`, `--btn-crece`, `--btn-presion`, `--ease-rebote`.
- En el inicio, cada "Visitar" toma el color según el fondo de su parroquia: sobre azul, crema con texto azul; sobre terracota (Nazón), crema con texto terracota; sobre amarillo o crema, azul con texto crema.
- Outlined (secundario): sin relleno ni sombra, contorno azul de 2 px y texto azul.
- Máximo un botón principal por pantalla.

### 7.4 Hero de parroquia

- Foto a sangre, curva inferior de 48 px, nombre del lugar en Display Large.
- Si la foto es clara: degradado `#0A3447` al 40–60 % bajo el texto.
- Única imagen sin lazy loading.

### 7.5 Tres fotos en cartas ("Desde la raíz")

- Fondo azul, título crema `#FFF9ED` (Display Small).
- Fotos 3:4 con radio 16 px y elevación 1, todas a la vista (no se deslizan).
- Escritorio y tablet (≥ 600 px): las tres en fila, hasta 1024 px de ancho (`--raiz-ancho`). Móvil: una debajo de otra en zigzag, cada una al 80 % del ancho (`--raiz-carta-movil`).
- Entrada en cartas (§7.0b, referencia: neutomni.com, pero como animación y no ligada al scroll): al llegar a la sección cada foto sube desde más abajo (`--carta-sube`, 45 % de su alto), girada en 3D (`--carta-vuelta`, 50°) e inclinada (`--carta-inclina`, 10°; las de los lados hacia afuera, la del centro la mitad), y se asienta derecha; una tras otra de izquierda a derecha (`--dur-fan` 0,9 s, `--delay-fan` 0,3 s entre una y otra, `--ease-out`). En móvil cada una entra al llegar a ella. Una sola vez. Con "reducir movimiento" no se anima.
- Oct-2026: se probaron versiones más lentas y con más giro (1,6 s y vuelta completa de 180° con reverso crema: muy exagerada; luego el punto medio, 1,25 s y 115°). El autor se quedó con la primera, la actual.
- Historial: carrusel Swiper (coverflow) para deslizar, con puntos de paginación y entrada en abanico (referencia: landonorris.com). Oct-2026: el autor lo cambió por las tres fotos fijas que entran como cartas; se quitó Swiper de las páginas de parroquia.

### 7.6 Tarjeta de información

- Anatomía: ícono 48 px + título (Title Large) + línea divisoria de 4 px + texto (Body Medium).
- Variantes en orden fijo: verde (texto blanco), amarillo (texto `#3B5F73`), terracota `#AC4B10` (texto blanco).
- Padding 16 px móvil / 24 px escritorio; radio 16 px; elevación 1.
- Máximo 25 palabras de texto.
- Grupos de tres: 1 columna en móvil, 3 en escritorio.

### 7.7 Bloque texto + imagen

- Título con una palabra resaltada en pastilla amarilla (texto `#3B5F73`), una sola por sección.
- Párrafo de máximo 60 palabras.
- Escritorio: dos columnas. Móvil: texto arriba, imagen abajo.

### 7.8 Video

- Disposición: franja azul a todo el ancho con el video a la izquierda y, a la derecha, título (Display Small, crema) y párrafo (Body Large, crema, máx. 60 palabras), en 7/12 y 5/12 columnas, solo desde 1120 px: con menos ancho la columna de texto queda muy angosta para el título largo. Por debajo de 1120 px: texto arriba, video abajo.
- El video (radio 16 px, elevación 2; 4:3 en dos columnas, 16:9 apilado) sobresale 64 px por debajo de la franja, sobre el fondo crema. En dos columnas, el video arranca alineado con el título (mismo tope) y la franja crece hasta lo que sea más alto. El texto siempre queda dentro de la parte azul.
- Franja holgada: 1.5 veces el espacio entre secciones sobre el título, y al menos 32 px bajo el texto antes del borde de la franja.
- Título largo y párrafo corto: el título carga el mensaje, el párrafo lo complementa en una o dos frases.
- Se reproduce solo, silenciado y en bucle, cuando se ve al menos la mitad del video; se pausa al salir de pantalla y se reanuda al volver (decisión de diseño, sep-2026).
- El archivo se descarga recién al llegar a la sección (preload none), no al abrir la página.
- Si la persona lo pausa, no vuelve a arrancar solo. Controles visibles mientras se reproduce (WCAG 2.2.2: poder pausar lo que se mueve más de 5 s).
- Sin botón de play propio (oct-2026). Con "reducir movimiento", ahorro de datos o autoplay bloqueado por el navegador: portada con los controles nativos del navegador para reproducirlo a mano. El video del inicio (hero) tampoco lleva botones: arranca solo y se pausa fuera de pantalla.
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

- Dos paneles con radio superior de 16 px.
- Panel amarillo: collage de 3 fotos (2 arriba + 1 ancha) y copyright en Body Small `#3B5F73`.
- Panel azul: logo en crema (40 px de alto), título (Headline Small), frase, redes, navegación, línea amarilla y #MásBiblián (Display Small).
- La navegación del footer lleva su propio título "Sobre nosotros" (Headline Small, igual que "¡Escríbenos!"). Las dos columnas (contacto | Sobre nosotros) van juntas con 64 px de separación, no repartidas a los extremos.
- Íconos de redes: círculo amarillo de 48 px con ícono de 24 px.
- En móvil se apilan: primero azul, luego amarillo.
- Aparición al hacer scroll: fotos del collage en cascada; en el panel azul, logo, texto con redes, línea y #MásBiblián en cascada; copyright con fundido. Se animan apenas el footer se asoma (está al final de la página y no sube lo suficiente para la regla general).

### 7.12 Esquina que se despega (foto del bloque texto + imagen)

- La esquina superior derecha de la foto aparece doblada (solapa crema de 56 px con elevación 2). La punta de la solapa es redondeada, como el resto de esquinas del sitio (hasta 16 px).
- Al pasar el mouse, con foco de teclado o al tocar en móvil, se despega en diagonal (62 % del ancho en escritorio, 70 % en móvil y tablet: siempre menos del 75 % para que la punta quede dentro de la foto 4:3) y deja ver una frase sobre fondo azul.
- Tamaño de la frase: 12 px en móvil y 16 px desde tablet (más grande chocaba con la solapa en las frases largas).
- Frase: fuente de títulos en crema, alineada a la derecha, en líneas que acortan siguiendo la diagonal. Padre Rumi: "3.800 msnm y una sola pregunta: ¿quién las talló?".
- Variante amarilla (`peel--amarillo`, usada en Sageo): fondo amarillo y frase en azul.
- La frase es un complemento: nunca información importante solo detrás de la foto.
- Evoca la piedra tallada de Padre Rumi (esquina cortada en diagonal).

### 7.13 Voces locales (inicio, oct-2026)

- Título "Voces locales" con "Voces" en pastilla amarilla, en dos líneas, en Display Large (el mismo tamaño que los nombres de las parroquias).
- Barra de pestañas azul de hasta 864 px de ancho (radio 16 px, elevación 2; margen interior 8 px desde tablet, 4 px en móvil) con el nombre de cada persona en la fuente de títulos, blanco: 14 px en móvil y 16 px desde tablet. Cada pestaña ocupa toda su celda de 48 px de alto (área táctil), pero la pastilla crema de la elegida es más chica: 32 px de alto (8 px de aire arriba y abajo) y, desde tablet, 16 px de aire a los lados; radio ≈ 11 px (--radius-chico, para que se vea igual que los botones), elevación 1, texto azul. Desde tablet todas las pestañas del mismo ancho. En móvil, si no caben, la barra se desliza.
- Orden: John, Milton, Micaela, Segundo, Fredy. Al cargar se muestra Milton. John (Nazón) ya tiene foto y cita (oct-2026: "Todavía se rescatan algunos saberes ancestrales."). La tarjeta en espera (silueta clara sobre crema oscuro, `.voz--pendiente`) queda en el código para una voz futura que llegue sin foto.
- Foto 3:4 de 280 px de ancho, radio 16 px, elevación 2.
- Entrada en cartas (§7.0b, oct-2026; antes un fundido): al llegar a la sección la foto sube desde abajo girada e inclinada y se asienta derecha (como la carta del centro de "Desde la raíz"). Al cambiar de persona, la nueva foto entra igual pero desde el lado hacia el que se avanza: inclinada como la carta de la derecha si la persona está después en la barra, como la de la izquierda si está antes. 0,9 s, `--ease-out`. Con "reducir movimiento" el cambio es directo.
- Al pasar el mouse, con foco de teclado o al tocar la foto en el celular (tocar otra vez la cierra), la foto se desenfoca (12 px) y sube desde abajo un panel con la cita: esquinas superiores de 16 px, cita en la fuente de títulos a 22 px y el lugar en Body Large. Panel azul con texto blanco o amarillo con texto azul, según la persona (Milton y Fredy amarillo; John, Micaela y Segundo azul).
- La cita siempre está en el código, así que los lectores de pantalla la leen aunque no se vea.
- Todo el panel de la cita es un enlace a la subpágina de la persona (§7.17). Abajo a la derecha, junto al lugar, una flecha en círculo de 48 px (`assets/img/ui/flecha.svg`, Material Symbols, volteada para apuntar a la derecha) del color del texto del panel: azul sobre amarillo, blanco sobre azul. Con el mouse, la flecha se corre 4 px a la derecha. En el celular, el primer toque en la foto abre la cita y tocar el panel lleva a la página. Si el foco del teclado llega al enlace, el panel sigue abierto. Oct-2026: reemplaza al botón "Conoce su historia".

### 7.14 Datos interesantes (inicio, oct-2026): cartas que suben con el scroll

- Título "Datos interesantes" en una línea (dos en móvil), "Datos" en pastilla amarilla, en Display Large. Va antes de la escena (no queda fijo).
- **Referencia:** dontboardme.com, sección "Process" (pedido del autor). La sección se queda fija en pantalla (sticky, `100svh`) durante 3 pantallas de scroll (`--datos-pantallas`: 4 = 1 que se ve + 3) y, con cada tramo, una carta sube desde abajo de la pantalla y se acomoda sobre la anterior. Cuando llegan las cuatro, la sección sigue. La escena mide una pantalla pero las cartas terminan antes: lo que sobra debajo de ellas (menos 24 px) se descuenta (`--datos-sobra`, lo mide `main.js`), así después queda solo el espacio normal entre secciones (oct-2026: antes quedaba un hueco grande).
- **Ritmo:** la carta N empieza a subir al 22 % de avance después de la anterior y tarda un 30 % en llegar (la última llega al 96 %); frena al llegar (como `--ease-out`). Mientras sube va 8° más inclinada (`--dato-giro-extra`) y se endereza hasta su inclinación al llegar. Lo que se pinta sigue al scroll con inercia (la rueda del mouse avanza a saltos), igual que la niebla; solo cambian `translate` y `rotate`.
- **Cascada:** escritorio (≥ 840 px): en diagonal, de izquierda a derecha y bajando 32 px por carta (`--dato-baja`), encimadas; móvil: apiladas al centro, cada una 16 px más abajo y 8 px al costado, como un mazo que se reparte. Inclinación final: 2,5° (`--dato-inclina`) × −0,8, 0,4, −1,2 y 0,8.
- **Carta:** hasta 416 px de ancho (85 % de la pantalla en móvil, `--dato-escena`), radio 16 px, elevación 1, todo centrado: el título del dato (Headline Medium, 28 px), el número grande "01." a "04." (Display Large), el texto (Body Medium) y la foto 2:1 abajo (radio ≈ 11 px). Colores: 1 azul y 2 terracota con texto crema; 3 amarillo y 4 crema con texto azul.
- **Al frente:** como las cartas se tapan entre sí, al pasar el mouse (o al tocarla en el celular) una carta pasa por encima de las demás, crece un 5 % (`--dato-crece`) y pasa a elevación 2, para leerla entera.
- Sin JavaScript o con "reducir movimiento": no hay escena; las cartas van en una grilla (1 columna; 2 desde 840 px), derechas y quietas.
- Texto nuevo (propuesto, pendiente de aprobación del autor): los números "01." a "04.". Los datos (título, texto y foto) son los de siempre.
- Historial (oct-2026, revisión de tesis): 1) rueda de cartas como armenia.travel: el tutor pidió quitar ese movimiento. 2) "Raspa y descubre": costaba entender que había que raspar. 3) Chat con Biblián: se descartó. 4) Cartas sobre la mesa (aardvarkbookclub.com): se cambió por esta. 5) Cartas que suben con el scroll (actual). Los íconos de los datos (`assets/img/inicio/datos/iconos/`) quedaron sin uso.

### 7.15 Próximos eventos (inicio, sección "Actívate", oct-2026)

- Título "Próximos eventos", "eventos" en pastilla amarilla, en Display Large. Es el destino del enlace "Actívate" del menú.
- Cartas ordenadas por fecha. Escritorio: arriba una ancha y una angosta (3 : 2), abajo tres iguales; tablet: dos columnas (la última, a lo ancho); móvil: una columna.
- Carta: radio 16 px (como todo el sitio), elevación 1. Arriba, franja de imagen de 160 px de alto (se elige qué parte del afiche se ve). Abajo, sobre azul y en crema: título en Title Large (22 px), descripción en Body Medium (14 px) y, al pie, la fecha en pastilla crema (texto azul, radio un tercio del alto ≈ 15 px) junto al lugar.
- Textos nivelados (desde tablet): en las cartas de una misma fila, los títulos, las descripciones y las fechas empiezan a la misma altura, aunque un título ocupe una línea y otro dos. El lugar va al lado de la fecha y, si es largo, baja a dos líneas.
- Hover (mouse): la parte azul se vuelve amarilla y el texto azul (0,25 s).
- Las imágenes son decorativas (alt vacío) porque la carta ya dice lo mismo.
- Toda la carta es tocable: el enlace del título la cubre entera y lleva a su subpágina (§7.16). Con el teclado, el contorno de foco se dibuja alrededor de toda la carta.

### 7.16 Subpágina de evento (`pages/eventos/`, oct-2026, en revisión)

Diseño del autor (oct-2026), hecho en Illustrator. Estilos en `evento.css`; las cartas se reutilizan de `inicio.css`. En el menú queda activo "Actívate". Sin hero: el header va siempre como barra azul (igual que el inicio) y la página empieza bajo él. Contenido de 1024 px de ancho máximo (`--evento-ancho`). El nombre del evento va como título oculto para lectores de pantalla (h1). Versiones anteriores descartadas: hero + ficha + "¿Qué incluye?" (parecía catálogo) y hero + franja de la voz + "Lo que te espera" (la voz pasó a su propia página, §7.17).

1. **¿De qué se trata?** (Display Large, en dos líneas, "trata?" en pastilla amarilla) + párrafo + foto 4:3 del evento (radio 16 px, elevación 1; `assets/img/eventos/<evento>/portada.jpg`). A la derecha en escritorio (8 : 5), debajo en móvil:
   - **Ficha azul** con los datos (dato en Label Medium, valor en Title Large, separados por líneas crema al 24 %) y al pie el WhatsApp: círculo crema de 40 px con el ícono azul + el número, que abre el chat.
   - Etiqueta crema **"¿Te gustaría ir por tu cuenta?"** (Title Large azul, centrada, elevación 1). No es un botón.
   - **Ficha azul del objetivo** ("Objetivo" + qué hacer allá) con el botón amarillo "Cómo llegar" centrado, que abre Google Maps.
2. **Antes de ir**: franja azul a todo el ancho, título en Display Large crema con "ir" en pastilla **terracota** (texto crema). Tres consejos en tarjetas crema (radio 16 px, elevación 1, texto azul Body Medium) con su ícono en un cuadro azul de 40 px (radio ≈ 11 px) y el dibujo en crema de 24 px. Los íconos son SVG (Material Symbols) en `assets/img/eventos/<evento>/iconos/`, usados como máscara: toman el color del código, no el del archivo. Escritorio: dos arriba y uno centrado abajo; móvil: una columna.
3. **Otros eventos**: título en Display Large y las mismas cartas del inicio con los otros cuatro eventos, en el orden del diseño: Pregón, Zonas frías, Tuñi Sagre, Shuriray (el de la página se cambia por el Camping). Una columna en móvil, dos en tablet y cuatro desde 1120 px.

- **Otros eventos** (oct-2026, "muy largos"): las mismas cartas del inicio pero compactas: imagen 2:1, título, fecha y lugar; la descripción no se muestra en esta lista (está en la página de cada evento). Cuatro en fila desde 1120 px, dos desde 840 px, una en móvil. El afiche del Pregón se acomoda para que la franja termine antes de su fecha vieja, y el de la Ruta a las zonas frías se muestra desde arriba (su fecha vieja empieza al 71 %). Antes, en cartas angostas el afiche del Pregón se bajaba y dejaba ver el fondo azul.

### 7.17 Subpágina de voz local (`pages/voces/`, oct-2026, en revisión)

Una por persona (john, milton, micaela, segundo, fredy), armada como una **entrevista**: las preguntas salen del guion de la tesis y las respuestas, de su transcripción. Estilos en `voz.css` (la silueta para una voz sin foto viene de `inicio.css`). En el menú queda activo "Voces". Sin foto arriba: el header va siempre como barra azul (igual que el inicio). Versión anterior (franja + "Su historia" + "En sus palabras" + "Su lugar" + "Vívelo aquí") descartada: el autor prefirió todo en la parte azul.

1. **La entrevista** (una sola franja azul, empieza bajo el header):
   - **Cabecera:** nombre en Display Large (Display Medium en móvil, para que "Murudumbay" quepa en 360 px), con el nombre en pastilla amarilla y el apellido en crema, y su frase principal en la fuente de títulos a 28 px.
   - **Perfil:** foto 3:4 de 360 px (`--voz-foto-grande`; sin foto, la silueta), radio 16 px, elevación 2; debajo "Parroquia" (dato en Label Medium, valor en Body Large negrita; oct-2026: se quitó "Cargo") y el botón crema "Conoce [parroquia]" (si tiene página).
   - **Relato:** un párrafo con su historia (máx. 65 caracteres por línea) y 4 preguntas con su respuesta entre comillas. Pregunta en la fuente de títulos (Body Large) con una rayita amarilla de 32 × 4 px encima; respuesta en Body Large. Separadas por líneas crema al 24 %.
   - **Escritorio (≥ 840 px):** perfil a la izquierda en las dos filas, y fijo al bajar mientras alcance el relato; cabecera y relato a la derecha. **Móvil:** cabecera, perfil y relato, en ese orden.
2. **Otras voces**: las otras cuatro personas, foto 3:4 + nombre (Title Large) + parroquia (Body Medium); dos columnas en móvil, cuatro desde 840 px. Toda la tarjeta es enlace; con el mouse la foto sube 4 px y pasa a elevación 2.

---

## 8. Imagen

- Fotos reales y locales (no stock ni IA), con gente cuando sea posible, luz natural cálida y edición consistente.
- Formato WebP con respaldo JPG. Lazy loading en todo salvo el hero.

| Uso            | Proporción                  | Ancho máx. | Peso máx. |
| -------------- | --------------------------- | ---------- | --------- |
| Hero           | 4:5 móvil / 16:9 escritorio | 1920 px    | 300 KB    |
| Carrusel       | 3:4                         | 1080 px    | 150 KB    |
| Texto + imagen | 4:3                         | 1200 px    | 150 KB    |
| Tarjetas foto  | Alto fijo                   | 800 px     | 100 KB    |
| Collage footer | 1:1 y 2:1                   | 800 px     | 100 KB    |

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

Alguien joven de aquí que te cuenta con orgullo lo que tienes cerca. Insight: _"Nunca fue desinterés: fue no saber todo lo que tenían cerca."_

| Sí                              | No                                        |
| ------------------------------- | ----------------------------------------- |
| Tutear                          | Tercera persona o usted                   |
| Frases cortas                   | Párrafos largos con muchas comas          |
| Invitar a hacer                 | Describir como catálogo                   |
| Datos concretos (3.800 msnm)    | Adjetivos vacíos (impresionante, colosal) |
| Palabras gráficas en mayúsculas | Oraciones en mayúsculas                   |
| Cerrar con #MásBiblián          | Varios hashtags                           |

**Reglas de escritura:** tildes también en mayúsculas · títulos en formato de oración · signos de apertura ¿ ¡ · cifras para datos, letras para expresiones · nombre completo del lugar la primera vez.

---

## 11. Correcciones pendientes en el sitio actual

- [ ] Reorganizar `variables.css` en roles M3 (manteniendo alias de compatibilidad para no romper el código existente).
- [ ] Terracota con texto: `#CC6228` → `#AC4B10`.
- [x] Todo texto en un solo azul `#3B5F73`, también sobre amarillo (franja del menú móvil, copyright, badges, redes).
- [ ] Aplicar la escala tipográfica M3 y eliminar tamaños sueltos (hero 120 → 57 px, títulos 74 → 36 px, palabras 83 → 45 px, menú móvil 35 → 28 px).
- [ ] Espaciado en múltiplos de 4 y mismo espacio vertical entre secciones.
- [x] Radios unificados: 16 px en todo el sitio (oct-2026).
- [x] Logo definitivo (oct-2026). Íconos de redes 40 → 48 px.
- [ ] Marquee y carrusel con pausa y soporte para `prefers-reduced-motion`.
- [ ] Focus visible en todos los elementos interactivos.
- [ ] Textos `alt` descriptivos.
- [ ] Footer: "¡Contactarse!" → "¡Escríbenos!".
- [x] Recortar el párrafo de "Donde la piedra impone" a 60 palabras máx. (aprobado: versión de 51 palabras).
