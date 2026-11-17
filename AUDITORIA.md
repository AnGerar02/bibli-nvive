# Auditoría del sitio biveme

Registro de la auditoría del sitio terminado: qué se revisó, contra qué norma, qué se encontró, qué se corrigió y cómo se comprobó. Se llena por áreas, a medida que avanza.

## Ficha

| Dato               | Valor                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| Inicio             | 13 de noviembre de 2026                                                                                 |
| Versión auditada   | Commit `73aea5e`, publicada en GitHub Pages (versión base)                                              |
| Alcance            | 16 páginas (inicio, 5 parroquias, 5 voces y 5 eventos), 8 hojas de estilo y 1 script                    |
| Norma de diseño    | Material Design 3 (color, tipografía, forma, elevación y estados) con retícula de columnas de Material Design 2 |
| Norma de accesibilidad | WCAG 2.1, nivel AA                                                                                  |
| Referencia interna | `DESIGN_SYSTEM.md`, la fuente única de verdad del diseño                                                |

**Criterio.** Una adaptación de Material anotada en `DESIGN_SYSTEM.md` con su motivo no cuenta como falla (por ejemplo, los títulos más grandes que la escala). Cuenta como falla lo que el documento no explica o lo que el código hace distinto del documento.

**Gravedad.** Alta: contradice una regla escrita del sistema y afecta a todo el sitio. Media: desorden que complica mantener el sistema o hace más lenta la carga. Baja: pulido.

**Método.** Lectura estática del HTML, el CSS y el JavaScript con guiones propios (inventario de tokens, valores sueltos, componentes compartidos); un comparador que resuelve los tokens y compara cada valor final del CSS publicado con el corregido; `node --check` para la sintaxis del script; y revisión de las 16 páginas en el navegador, en escritorio (1280 px) y celular (375 px).

## Plan

| Área | Qué revisa                                                            | Estado    |
| ---- | --------------------------------------------------------------------- | --------- |
| 1    | Design system: que el código y el documento digan lo mismo            | Hecha     |
| 2    | Material Design: retícula, espaciado, tipografía, color, forma, estados, áreas táctiles | Hecha                              |
| 3    | Accesibilidad (WCAG 2.1 AA)                                           | Hecha     |
| 4    | Fundamentos web: HTML válido, metadatos, vista previa al compartir, página 404 | Hecha     |
| 5    | Rendimiento: peso, imágenes, video                                    | Hecha     |
| 6    | Responsive: 360, 768 y 1920 px; navegadores y un celular real         | Hecha     |

## Preparación (13-nov-2026)

Antes de auditar se fijó contra qué se audita:

- **Norma única.** El documento y el código seguían Material Design 3, pero la retícula de diseño usaba las columnas de Material Design 2. Decisión del autor: M3 para el sistema y M2 para la retícula.
- **Fuente de títulos.** Momo Trust Display queda como definitiva (estaba marcada como prueba).
- **Documento al día.** `DESIGN_SYSTEM.md` listaba la paleta y la fuente anteriores. Se actualizó: paleta vigente con sus contrastes recalculados, fuente y lista de pendientes.
- **Páginas viejas.** Se borraron 5 plantillas vacías de voces que seguían publicadas (commit `bceb72a`).

## Área 1. Design system contra código

### Hallazgos y correcciones

| #   | Hallazgo                                                                                                                                                              | Gravedad | Corrección aplicada                                                                                                   |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| 1   | Movimiento con valores sueltos: 20 declaraciones con tiempos y 13 con curvas escritos a mano. El documento dice que todo el movimiento usa tokens (§7.0b).            | Alta     | Se usaron los tokens existentes y se crearon cinco: `--dur-estado`, `--ease-estado`, `--delay-cascada`, `--delay-menu` y `--delay-menu-paso`. |
| 2   | Código de componentes retirados (franja en movimiento, tarjeta giratoria y filas conectadas): ninguna página los usa, pero quedaban en el CSS y en `main.js`.         | Media    | Se borró: 129 declaraciones de CSS y 193 líneas del script.                                                           |
| 3   | 57 de 192 tokens sin uso: 25 alias antiguos, 20 de componentes retirados y 12 roles de Material.                                                                      | Media    | Se borraron los alias y los retirados. Los roles de Material sin uso se conservan como referencia del sistema de color. |
| 4   | Medidas en px sueltas en código vivo: 56 y 64 px de la aparición; 480, 480 y 600 px del footer.                                                                       | Media    | Pasaron a tokens: `--reveal-sube`, `--space-3xl`, `--footer-fotos` y `--footer-contacto`.                             |
| 5   | Fuentes: las 16 páginas pedían 3 familias de prueba y Montserrat completa (100 a 900, con cursivas), y enlazaban el kit de Adobe de Please, que bloqueaba la carga.   | Media    | Las páginas piden solo Momo Trust Display y Montserrat 400, 500 y 700. Salió el kit de Adobe.                         |
| 6   | El documento no coincidía en 3 puntos: ícono de 48 px en la tarjeta de información, Montserrat solo en 400 y 500, y una capa del 10 % en el foco.                     | Media    | Se ajustó el documento a lo que hace el sitio (§3, §7.0, §7.6 y §9).                                                  |
| 7   | Comentarios que decían "PRUEBA" para la paleta y la fuente, en `variables.css` y en las 16 páginas.                                                                   | Baja     | Reescritos como definitivos.                                                                                          |
| 8   | La clase `.info-card--verde` pintaba azul (5 páginas).                                                                                                                | Baja     | Renombrada a `.info-card--azul`.                                                                                      |
| 9   | Plantillas vacías de julio: `landing.css`, `components/`, `data/` y `PENDIENTES.md`.                                                                                  | Baja     | Borradas.                                                                                                             |
| 10  | Las 5 páginas de voces cargaban `inicio.css` (31 KB) sin usar ninguna de sus reglas.                                                                                  | Media    | Se quitó el enlace. El CSS que carga cada página de voz bajó un 40 %.                                                 |
| 11  | Variantes y ajustes sin uso: botón outlined, voz en espera (silueta), fotos pendientes, la clase `.pill--cola` y el ajuste de grosor para fuentes variables, que solo servía a Please. | Baja     | Borrados (pedido del autor: quitar todo lo que no se use). Al CSS no le queda ninguna clase sin uso.                  |
| 12  | `README.md` describía el proyecto de julio y la lista de archivos de `CLAUDE.md` estaba incompleta.                                                                   | Baja     | `README.md` se borró. `CLAUDE.md` se conserva (guarda las reglas de trabajo) con la lista corregida.                  |

### Lo que ya cumplía

- Ningún color, tamaño de letra, peso, radio, sombra ni interletrado fuera de `variables.css`.
- Los tokens que nombra el documento existen, y ninguno se usa sin estar definido.
- Header, footer y cabecera son iguales en las 16 páginas: solo cambian el enlace activo y las anclas.
- Los cortes son 600 y 840 px en todo el sitio, más 1023 y 1120 px, ambos documentados.

### Resultado en cifras

| Medida                                  | Antes      | Después    |
| --------------------------------------- | ---------- | ---------- |
| Tokens en `variables.css`               | 192        | 155        |
| Tokens sin uso                          | 57         | 13 (los roles de Material de referencia) |
| Clases del CSS sin uso                  | 13         | 0          |
| Declaraciones de CSS                    | 1825       | 1638       |
| Peso del CSS propio                     | 128 156 B  | 117 414 B  |
| CSS que carga una página de voz         | 95 271 B   | 57 310 B   |
| `main.js`                               | 1338 líneas, 64 943 B | 1145 líneas, 55 804 B |
| Tiempos escritos a mano                 | 20         | 0          |
| Curvas escritas a mano                  | 13         | 1 (anotada en §7.0b) |
| Medidas en px sueltas                   | 18         | 2 (el 1 px del texto para lectores de pantalla) |
| Hoja de fuentes de Google               | 120 533 B, 136 `@font-face` | 6 993 B, 18 `@font-face` |
| Hojas de estilo externas por página     | 2          | 1          |

### Verificación

- **Mismo resultado visual.** El comparador no encontró ningún valor final distinto entre el CSS publicado y el corregido, salvo la lista de fuentes de los títulos, que ya no nombra a Please (18 reglas, cambio buscado). Los archivos de letra que descarga el navegador son los mismos que antes.
- **Script.** `node --check assets/js/main.js` sin errores. Ningún nombre declarado en el código borrado se usa fuera de él.
- **Navegador.** Las 16 páginas cargan sin errores de consola, sin imágenes rotas y sin desborde lateral, en 1280 y 375 px. Todo lo que debe aparecer al bajar aparece, y el menú del celular abre y cierra con sus cinco tarjetas. Montserrat carga en 400, 500 y 700.
- **Páginas de voces sin `inicio.css`.** Antes de quitar el enlace se desactivó la hoja en el navegador y se compararon las 480 propiedades calculadas de cada elemento, en 1280 y 375 px: ninguna cambió.

### Queda abierto

- `reset.css` tiene dos interlineados escritos a mano (1.6 y 1.1).
- Las capas (`z-index`) usan 6 valores sin una escala documentada.
- Para el área 2: la retícula (§4). El documento y el código usan márgenes de 16, 24 y 24 px, medianiles de 16, 24 y 24 px y un ancho máximo de 1200 px; la retícula de diseño usa márgenes de 16, 32 y 304 px y medianiles de 16, 24 y 32 px.
- Para el área 5: las imágenes (§8). El documento pide WebP con respaldo JPG y el sitio sirve JPG.

## Área 2. Material Design

Revisada el 13 de noviembre de 2026 sobre el sitio ya corregido del área 1. Se midió en el navegador a 360, 768, 1280 y 1920 px, en una página de cada tipo (inicio, parroquia, voz y evento).

### Resultado por categoría

| Categoría            | Estado  | Evidencia                                                                                                                              |
| -------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Color                | Cumple  | Todos los pares de texto y fondo son roles emparejados. Contraste: 6.45:1 (crema y azul), 4.57:1 (crema y terracota), 3.22:1 (azul sobre amarillo, excepción documentada). |
| Tipografía           | Parcial | La escala sale de tokens. Hay usos sin documentar y líneas de más de 70 caracteres (hallazgos 3 y 5).                                  |
| Forma                | Cumple  | Solo tres curvas en todo el sitio: 16 px, un tercio del alto y círculo. Un uso sin documentar (hallazgo 6).                            |
| Elevación            | Cumple  | Solo los tres niveles definidos por token.                                                                                             |
| Movimiento           | Cumple  | Tiempos y curvas por token; regla global de "reducir movimiento" y 12 comprobaciones en el script.                                     |
| Retícula             | Parcial | 4, 8 y 12 columnas con cortes en 600 y 840 px, pero con tres juegos de medidas y bloques fuera de columna (hallazgos 1 y 2).           |
| Componentes e íconos | Cumple  | Barra superior de 64 px al bajar, botones de 48 px, íconos de Material Symbols Rounded a 24 px (24 archivos y 31 en línea).            |
| Estados              | Parcial | Hover y foco completos. Falta el estado presionado en 6 componentes (hallazgo 4).                                                      |
| Áreas táctiles       | Cumple  | 72 elementos interactivos medidos a 360 px, más el menú abierto y su submenú: ninguno mide menos de 48 × 48 px.                        |
| Foco                 | Cumple  | Contorno de 2 px separado 2 px en todos los elementos al recorrer la página con el teclado; cambia de color según el fondo.            |

### La retícula, medida

| Ancho de pantalla | En el código (medido)                                   | En la lámina de diseño                              | Material Design 2                    |
| ----------------- | ------------------------------------------------------- | --------------------------------------------------- | ------------------------------------ |
| 360 px            | 4 columnas de 70, medianil 16, margen 16                | 4 columnas de 70, medianil 16, margen 16            | 4 columnas, margen 16                |
| 768 px            | 8 columnas de 69, medianil 24, margen 24                | 8 columnas de 67, medianil 24, margen 32            | 8 columnas, margen 32                |
| 1920 px           | 12 columnas de 74, medianil 24, contenido 1152, margen 384 | 12 columnas de 80, medianil 32, contenido 1312, margen 304 | 12 columnas, contenido 1040 centrado |

### Hallazgos

| #   | Hallazgo                                                                                                                                                                                                 | Gravedad |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | Hay tres juegos de medidas para la retícula. El código y la lámina coinciden en el celular y difieren en tablet (margen 24 contra 32) y en escritorio (contenido 1152 contra 1312, medianil 24 contra 32). | Alta     |
| 2   | Varios bloques no caen en columnas: anchos propios de 896 px (ficha de Voces) y 1024 px (eventos y "Desde la raíz"), y repartos en fracciones (2/3 en Voces, 8/5 en eventos, 15 partes en la lista de eventos). | Media    |
| 3   | Líneas de 82 a 87 caracteres en escritorio, contra la regla de 60 a 70: la historia y las respuestas de Voces, el texto de los eventos del inicio y "Donde la piedra impone" (73). El ancho `65ch` equivale a unos 85 caracteres reales. | Media    |
| 4   | Falta el estado presionado en 6 componentes: parroquias del menú, carta de evento, "Otras voces", pestañas de Voces, botón del mapa y logo. Los logos tampoco responden al pasar el mouse.               | Media    |
| 5   | Tipografía sin documentar: la fuente de títulos a 16 px (pestañas de Voces, preguntas, fecha de evento) y a 12 px (botón del mapa en el celular); "RAÍCES" fuera de la escala; `65ch` y `30ch` escritos a mano; y la regla "máximo tres tamaños por pantalla" no se cumple al pie de la letra. | Baja     |
| 6   | `--radius-chico` (10,7 px) se usa en la foto de las cartas de Datos y en el ícono de "Antes de ir", no en la pestaña de Voces que nombra el documento.                                                   | Baja     |
| 7   | El sitio tiene un solo tema (claro) y no lo declara. Material Design 3 espera claro y oscuro: falta anotarlo como adaptación y declarar `color-scheme`.                                                  | Baja     |
| 8   | 7 reglas usan el crema de superficie como color de texto sobre azul en vez del rol `on-primary` (el valor es el mismo).                                                                                  | Baja     |
| 9   | Un ícono dibujado a mano (`nomoto.svg`) entre los de Material Symbols.                                                                                                                                   | Baja     |
| 10  | En tablet, "Desde la raíz" pone 3 fotos en fila sobre una retícula de 8 columnas.                                                                                                                        | Baja     |

### Correcciones aplicadas

| Hallazgo | Qué se hizo                                                                                                                                                                                                 |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1        | Decisión final del autor: se conservan las dos. La lámina queda como retícula de diseño y el sitio mantiene sus medidas. `DESIGN_SYSTEM.md` §4 lleva las dos y anota la diferencia. No cambió ni el sitio ni la lámina. |
| 2 y 10   | Los anchos de lectura, los repartos en fracciones y las filas de 3 en tablet quedaron anotados en §4 como adaptaciones. No se movió nada.                                                                   |
| 3        | El ancho máximo de los párrafos pasó de `65ch` a un token, `--medida-texto`, de `52ch`. Se aplicó también al texto de los eventos del inicio, que no tenía tope.                                            |
| 4        | Se agregó el estado presionado en los seis componentes. Las superficies llevan una capa del 10 % (parroquias del menú y carta de evento) y las piezas con forma de botón bajan al 97 % (logo, "Cómo llegar", fotos de "Otras voces" y de las pestañas de Voces). |
| 5 y 6    | Documentado en §3 y §5: la fuente de títulos a 16 y 12 px, "RAÍCES" fuera de escala, los usos reales de `--radius-chico` y el alcance de la regla de los tres tamaños. `30ch` pasó al token `--medida-cita`. |
| 7        | El CSS declara `color-scheme: only light` y §2 anota el tema único como adaptación frente a Material Design 3.                                                                                              |
| 8        | Doce reglas con texto crema sobre azul usan ahora el rol `on-primary`. El valor es el mismo: no cambia ningún color.                                                                                        |
| 9        | Sin cambio: el ícono `nomoto.svg` queda para que el autor lo rehaga con el estilo de Material Symbols.                                                                                                      |

### Antes y después

| Medida                                         | Antes                | Después            |
| ---------------------------------------------- | -------------------- | ------------------ |
| Letras por línea, historia y respuestas de Voces | 86 a 87 (688 px)   | 70 a 71 (551 px)   |
| Letras por línea, texto de eventos del inicio  | 82 (618 px)          | 69 (482 px)        |
| Letras por línea, "Donde la piedra impone"     | 73 (552 px)          | 69 (551 px)        |
| Componentes sin estado presionado              | 6                    | 0                  |
| Medidas en `ch` escritas a mano                | 6                    | 0                  |

### Verificación

- El comparador de estilos mostró solo lo previsto: 10 declaraciones nuevas (los seis estados presionados, `color-scheme`, el tope del texto de eventos y dos tokens) y 8 cambiadas (cinco anchos de `65ch` a `52ch` y tres transiciones que ahora incluyen la escala). Los cambios de rol de color no alteran ningún valor.
- En el navegador, con los estilos recargados sin caché: las líneas más largas de cada tipo de página quedan entre 67 y 71 letras a 768 y 1280 px; las 4 páginas revisadas cargan sin errores, sin desborde lateral y con todo lo que debe aparecer al bajar.
- El estado presionado no se puede simular desde el navegador automatizado: se comprobó que las seis reglas existen y se aplican a los elementos correctos. Falta probarlo con el dedo o el mouse.

### Queda abierto

- La lámina de diseño y el sitio usan medidas distintas en tablet y en escritorio (ver la tabla de la retícula). El autor decidió conservar las dos; la diferencia queda documentada en `DESIGN_SYSTEM.md` §4.
- Rehacer el ícono `nomoto.svg` (opcional).
- Los logos del header y del footer no cambian al pasar el mouse; solo responden al presionarlos.

## Área 3. Accesibilidad (WCAG 2.1, nivel AA)

Revisada el 13 y 14 de noviembre de 2026 sobre el sitio ya corregido de las áreas 1 y 2. Se revisó el HTML de las 16 páginas y se midió en el navegador una página de cada tipo a 320, 360, 640, 768 y 1280 px. El contraste del texto que va sobre fotos se calculó leyendo los píxeles reales de cada foto. El teclado se probó con pulsaciones reales (Tab, Enter, Espacio, Escape y flechas).

**Límite de esta revisión:** no se probó con un lector de pantalla real (NVDA, VoiceOver o TalkBack) ni se pudo simular la opción "reducir movimiento" del sistema. Esas dos pruebas quedan para hacerse a mano.

### Hallazgos

| #   | Hallazgo                                                                                                                                                                                                       | Criterio           | Gravedad |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------- |
| 1   | Texto chico azul sobre amarillo: 3.22:1 (mínimo 4.5:1). Pasa en el copyright de las 16 páginas, en la tarjeta amarilla y las etiquetas de actividades de las parroquias, y en la carta y la ficha amarillas del inicio. | 1.4.3 Contraste    | Alta     |
| 2   | Menú sobre la foto de portada, en el tope de las páginas de parroquia: en la peor zona da 2.16:1 en Jerusalén, 2.57:1 en Nazón, 1.95:1 en Turupamba y 3.17:1 en Biblián (mínimo 4.5:1). Sageo cumple. El logo tampoco llega a 3:1 en Jerusalén ni en Nazón. | 1.4.3 y 1.4.11     | Alta     |
| 3   | El video de portada del inicio (36 s, en bucle) arranca solo y no tiene forma de pausarse.                                                                                                                     | 2.2.2 Pausar       | Alta     |
| 4   | Menú del celular: al abrirlo, la tecla Tab lleva el foco a lo que queda tapado detrás. Los enlaces del menú quedan antes del botón y la página de atrás sigue disponible para los lectores de pantalla.        | 2.4.3 y 2.4.7      | Alta     |
| 5   | Nombres de las pestañas no elegidas de Voces: 3.10:1 (mínimo 4.5:1).                                                                                                                                           | 1.4.3 Contraste    | Media    |
| 6   | En el inicio, el encabezado principal (`h1`) es "RAÍCES" y va después de un `h2` ("El patrimonio de Biblián").                                                                                                 | 1.3.1 y 2.4.6      | Media    |
| 7   | Cartas de Datos en escritorio: al final, el 38 % del texto de tres cartas queda tapado y solo el mouse o el dedo pueden traerlas al frente.                                                                    | 2.1.1 Teclado      | Media    |
| 8   | La esquina que se despega recibe el foco sin decir qué es y suma una parada de teclado que sobra: el enlace "Cómo llegar" ya la abre al recibir el foco.                                                       | 4.1.2 Nombre y rol | Media    |
| 9   | 48 íconos de redes en línea sin `aria-hidden`.                                                                                                                                                                 | 1.1.1              | Baja     |
| 10  | 53 enlaces abren otra pestaña sin avisarlo (redes y WhatsApp).                                                                                                                                                 | 3.2.5 (nivel AAA)  | Baja     |
| 11  | "Trail running" y "Trail" no están marcados como inglés.                                                                                                                                                       | 3.1.2 Idioma       | Baja     |
| 12  | A 320 px, la ficha de Voces del inicio se sale 26 px de su caja (10 px de la pantalla).                                                                                                                        | 1.4.10 Reflow      | Baja     |
| 13  | No hay enlace "Saltar al contenido". El criterio se cumple con las regiones de la página, pero el enlace es lo habitual.                                                                                       | 2.4.1              | Baja     |

### Contraste medido

| Texto y fondo                                          | Medido                               | Mínimo | Cumple |
| ------------------------------------------------------ | ------------------------------------ | ------ | ------ |
| Azul sobre crema (texto general)                       | 6.45:1                               | 4.5:1  | Sí     |
| Crema sobre azul                                       | 6.45:1                               | 4.5:1  | Sí     |
| Crema sobre terracota                                  | 4.57:1                               | 4.5:1  | Sí     |
| Gris cálido sobre crema                                | 8.86:1                               | 4.5:1  | Sí     |
| Azul sobre amarillo, texto grande (botones, pastillas) | 3.22:1                               | 3:1    | Sí     |
| Azul sobre amarillo, texto chico                       | 3.22:1                               | 4.5:1  | No     |
| Pestañas no elegidas de Voces                          | 3.10:1                               | 4.5:1  | No     |
| Título de portada sobre la foto (5 parroquias)         | 4.07:1 a 10.44:1 en la peor zona     | 3:1    | Sí     |
| Menú sobre la foto, en el tope                         | 1.95:1 a 3.17:1 en 4 de 5 parroquias | 4.5:1  | No     |

### Teclado

| Componente                | Resultado                                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Orden de foco             | Lógico en las cuatro páginas tipo. El contorno de foco se ve en todas las paradas.                             |
| Desplegable de Parroquias | Abre con Enter y Espacio, Tab entra a la lista, Escape cierra y devuelve el foco al botón.                     |
| Pestañas de Voces         | Flechas, Inicio y Fin cambian de persona. Una sola parada de Tab. La ficha visible cambia.                     |
| Visor de fotos            | Ventana modal con nombre. El foco entra y no sale. Las flechas cambian de foto. Escape cierra y devuelve el foco. |
| Esquina que se despega    | Abre con Enter y Espacio. "Cómo llegar" se alcanza con Tab.                                                    |
| Menú del celular          | Abre con Enter y cierra con Escape, pero el foco se va a la página tapada (hallazgo 4).                        |

### Lo que cumple

- Las 265 imágenes tienen `alt`: 128 con descripción y 137 vacías, que son decorativas o repiten un texto que ya está al lado.
- Todos los enlaces y botones tienen nombre, y ninguna etiqueta contradice el texto visible.
- Regiones (`header`, `nav`, `main`, `footer`) y niveles de encabezado sin saltos en las 16 páginas; idioma declarado; títulos de página distintos.
- Zoom al 200 %: sin barra lateral ni contenido cortado. A 320 px no hay barra lateral en ninguna página tipo. Con el espaciado de texto ampliado no se corta ningún texto.
- Los videos de las parroquias muestran los controles del navegador al arrancar, así que se pueden pausar. Ningún video tiene sonido.
- Con "reducir movimiento" o ahorro de datos, los videos no arrancan solos y las animaciones se apagan (regla global y 12 comprobaciones en el script).
- Foco visible y áreas táctiles de 48 px o más (comprobados en el área 2).

### Correcciones aplicadas

Aplicadas el 14 de noviembre de 2026, con las opciones que recomendó la auditoría y aprobó el autor. Los hallazgos 1 y 3 se probaron y el autor decidió dejarlos como estaban.

| Hallazgo | Qué se hizo |
| -------- | ----------- |
| 1        | Sin cambio, por decisión del autor. Se probó un azul más oscuro del mismo tono, `#044762` (4.8:1), en todo el texto sobre amarillo, y el autor prefirió conservar el azul de siempre. El texto chico sobre amarillo sigue en 3.22:1: excepción asumida, anotada en `DESIGN_SYSTEM.md` §2. |
| 2        | El velo del header, en el tope de las parroquias, va parejo al 70 % (token `--header-velo`) detrás del logo y el menú, y se desvanece hacia abajo en 96 px. Antes iba del 50 % a 0. Después el autor pasó este velo a todo el sitio y pidió suavizarlo (ver "Cambios pedidos por el autor"). |
| 3        | Sin cambio, por decisión del autor. Se probó un botón redondo crema de 48 px, abajo a la izquierda del video, para pausarlo y volver a reproducirlo; el autor lo retiró. El video del inicio sigue sin forma de pausarse. |
| 4        | Con el menú del celular abierto, el enlace de salto, el contenido y el footer quedan inertes (`inert`): el teclado y los lectores de pantalla solo llegan al header. Al abrir el menú, el foco pasa al primer ítem; Tab recorre los ítems y termina en "Cerrar menú"; Escape lo cierra y devuelve el foco al botón. |
| 5        | El nombre de las pestañas no elegidas pasó de un azul con 35 % de crema a uno con 12 %: 5.01:1. |
| 6        | "El patrimonio de Biblián" pasó a `h1` y "RAÍCES" a `h2`. Se ven igual. |
| 7        | Las cuatro cartas reciben el foco con Tab; su nombre es su título. Con el foco, la carta pasa al frente como con el mouse y la página va al punto en que esa carta ya llegó a su lugar, así se ve entera. La escena recorta con `overflow: clip` para que el navegador no la desplace por dentro. |
| 8        | La foto ya no recibe el foco: se quitó su `tabindex` en las cinco parroquias y sus teclas en el script. Tab va directo a "Cómo llegar" y la esquina se abre sola. |
| 9        | Los 48 íconos de redes llevan `aria-hidden="true"`. |
| 10       | Los 53 enlaces lo dicen en su nombre: "WhatsApp (se abre en otra pestaña)", y así Facebook, Instagram y el WhatsApp de los eventos. |
| 11       | Las 9 apariciones de "trail", "trails" y "Trail running" llevan `lang="en"`. |
| 12       | En el celular, el botón "Conoce su historia" lleva 8 px de aire a los lados (antes 24, que no se veían porque el botón va a lo ancho) y, si no entra en una línea, se parte en dos líneas parejas. Desde 600 px queda igual que antes. |
| 13       | Enlace "Saltar al contenido" al principio de las 16 páginas: una pastilla crema que baja desde arriba solo al llegar a ella con Tab y lleva el foco al contenido (`<main>`). |

**Textos nuevos.** "Saltar al contenido" (se ve solo al usar el teclado) y "(se abre en otra pestaña)" (lo leen los lectores de pantalla). El autor los conservó el 14 de noviembre de 2026.

**Ajuste durante la verificación.** El primer arreglo del hallazgo 13 dejaba `tabindex="-1"` fijo en `<main>`. Con eso, un clic en cualquier texto le pasaba el foco y el siguiente Tab volvía al principio de la página. Ahora el script pone el atributo solo mientras el enlace de salto le pasa el foco.

### Antes y después

| Medida | Antes | Después |
| ------ | ----- | ------- |
| Texto chico sobre amarillo | 3.22:1 | 3.22:1 (sin cambio, decisión del autor) |
| Menú sobre la foto, peor zona de las 4 parroquias que fallaban (1280 px) | 1.95:1 a 3.17:1 | 5.17:1 a 6.74:1 |
| Menú sobre la foto, peor píxel de las 5 portadas (768 y 1280 px) | 1.67:1 | 4.98:1 |
| Logo sobre la foto, peor píxel de las 5 portadas (360, 768 y 1280 px; mínimo 3:1) | 1.68:1 | 4.46:1 |
| Pestañas no elegidas de Voces | 3.10:1 | 5.01:1 |
| Video de portada | sin forma de pausarlo | sin cambio (decisión del autor) |
| Paradas de Tab fuera del menú del celular abierto | toda la página | ninguna |
| Encabezado principal del inicio | "RAÍCES", después de un `h2` | "El patrimonio de Biblián", primero |
| Cartas de Datos que se traen al frente con el teclado | 0 de 4 | 4 de 4 |
| Paradas de teclado de la esquina | 2 (la foto y "Cómo llegar") | 1 ("Cómo llegar") |
| Íconos en línea expuestos a los lectores de pantalla | 48 | 0 de 86 |
| Enlaces a otra pestaña sin aviso | 53 | 0 de 63 |
| Palabras en inglés marcadas | 0 | 9 |
| Ficha de Voces a 320 px | se salía 26 px | dentro de su caja |
| Páginas con "Saltar al contenido" | 0 | 16 |

### Verificación

- El comparador de estilos mostró solo lo previsto: el velo del header, el nombre de las pestañas, el botón de la ficha de Voces en el celular, el recorte de la escena de Datos, las reglas nuevas del enlace de salto y del foco de las cartas, y las reglas de foco de la esquina que se quitaron.
- `node --check`: el script no tiene errores de sintaxis.
- Las 16 páginas cargan sin errores de consola, sin imágenes rotas y sin desborde lateral; cada una tiene su enlace de salto, un solo `h1` y ningún ícono expuesto. La revisión estática del HTML da 0 íconos expuestos, 63 de 63 enlaces a otra pestaña con aviso y 9 partes marcadas en inglés.
- Contraste: el menú y el logo sobre la foto se midieron con los píxeles reales de las cinco portadas, a 360, 768 y 1280 px. El azul más oscuro sobre amarillo se probó en una página de cada tipo (4.8:1 en todos los textos) antes de que el autor decidiera conservar el azul de siempre.
- Teclado, con pulsaciones reales. El enlace de salto aparece con el primer Tab y Enter lleva al contenido; un clic en un texto ya no mueve el foco. En el menú del celular el foco entra al primer ítem, Tab no sale del header y Escape lo cierra. Las cuatro cartas de Datos pasan al frente con Tab y quedan enteras en pantalla, también con Shift+Tab. En Sageo, Tab pasa de la última foto a "Cómo llegar" y la esquina se abre; al seguir, se cierra.
- A 320 px la ficha de Voces queda dentro de su caja. El botón va en dos líneas hasta 337 px de pantalla y en una desde 338 px.

### Hallazgos nuevos

Aparecieron después de las correcciones; no estaban entre los 13.

| #   | Hallazgo | Criterio | Gravedad | Qué se hizo |
| --- | -------- | -------- | -------- | ----------- |
| 14  | A 320 px, la palabra "interesantes" del título "Datos interesantes" (Display Large, 52 px) mide 328 px en una caja de 288 px y se corta 24 px en el borde de la pantalla. Los otros dos títulos de ese tamaño, "Voces locales" y "Próximos eventos", sí entran. | 1.4.10 Reflow | Baja | Sin cambio: el autor decidió dejarlo como está. |
| 15  | Con el menú del celular abierto, el contorno de foco era azul en todo el header, también sobre las tarjetas azules ("Inicio" y "Voces"), donde no se veía. Apareció al cambiar el header. | 2.4.7 Foco visible | Media | Corregido: el logo y el botón "Menú" llevan contorno crema sobre el velo y azul sobre el menú abierto; las tarjetas usan el color de su texto (crema sobre azul y terracota, azul sobre amarillo) y las filas de "Parroquias", el azul de siempre. |

### Cambios pedidos por el autor al cerrar el área (14-nov-2026)

- **Velo en todo el sitio.** El header ya no pasa a barra azul al bajar, ni la lleva fija en el inicio, las voces y los eventos: va siempre transparente, con el velo del hallazgo 2. Se quitaron la barra, su sombra y la pastilla del ítem activo, que ahora va subrayado en todo momento. Al esconderse, el header sube también lo que el velo baja por debajo, para no dejar una franja oscura arriba. El video del inicio empieza en el borde de arriba, como las portadas de las parroquias, y con eso sobró la propiedad `--hdr`.
- **Velo suave.** Al verlo, el autor notó que el desvanecido dejaba ver una línea: el velo iba parejo al 70 % y caía en línea recta, y en el quiebre se notaba el borde. Ahora baja en una sola curva suave (smootherstep en 11 puntos), de 82 % arriba a 0 a 96 px por debajo del header, sin quiebres. Aunque debajo pase algo blanco, el menú da 4.89:1 o más y el logo 4.25:1 o más. Las cifras del menú sobre las fotos en la tabla de antes y después se midieron con la primera versión del velo; con la curva, el menú no baja de 4.89:1 sobre ningún fondo.
- **Sin "RAÍCES" en el celular** (menos de 600 px): la escena de capas queda solo con el paisaje. La palabra sigue en el código como `h2` y da nombre a la sección para los lectores de pantalla.
- **Sin botón de pausa** (hallazgo 3) y **el azul de siempre sobre amarillo** (hallazgo 1).

Verificación: el comparador de estilos muestra solo esos cambios y no quedan restos del botón ni de `--hdr`; el script quedó con la sección del video idéntica a la versión publicada y `node --check` no da errores. En el navegador: el inicio, Jerusalén, un evento y una voz a 1280 px (en el tope, al esconderse y al reaparecer, sin errores de consola), y el inicio a 360 px (sin "RAÍCES", menú con el foco visible en las tarjetas) y a 768 px (con "RAÍCES").

### Queda abierto

- Hallazgo 1: el texto chico sobre amarillo sigue en 3.22:1 (mínimo 4.5:1), por decisión del autor. Si más adelante se quiere cumplir AA ahí, la solución probada es `#044762`.
- Hallazgo 3: el video del inicio sigue sin forma de pausarse (2.2.2, nivel A), por decisión del autor.
- Probar con un lector de pantalla real (NVDA, VoiceOver o TalkBack) y con "reducir movimiento" activado en el sistema.

## Área 4. Fundamentos web

Revisada el 14 de noviembre de 2026 sobre el sitio local, con las correcciones de las áreas 1 a 3, y sobre el sitio publicado en GitHub Pages. Se revisó el `<head>` de las 16 páginas y la estructura de su HTML con un revisor propio. En el sitio publicado se comprobó qué archivos se pueden abrir y qué se ve en una dirección que no existe.

**Límite de esta revisión:** no se usó el validador oficial del W3C (Nu Html Checker). En la computadora no hay Java para correrlo, y enviarle las páginas es mandar el sitio a un servicio externo. Queda para después de subir los cambios, con las direcciones públicas.

### Hallazgos

| #   | Hallazgo | Criterio | Gravedad |
| --- | -------- | -------- | -------- |
| 1   | Ninguna página tiene vista previa al compartir: no hay etiquetas Open Graph ni tarjeta de Twitter. Al pegar un enlace en WhatsApp, Instagram o Facebook no sale imagen. | Open Graph | Alta |
| 2   | Archivos internos publicados: la guía de defensa se puede leer como página del sitio (`DEFENSA.html`) y en el repositorio, que es público. También se publican `CLAUDE.md` y `DESIGN_SYSTEM.md`, y `AUDITORIA.md` se publicará al subir los cambios. | Contenido publicado | Alta |
| 3   | No hay página 404 propia: una dirección que no existe muestra la página genérica de GitHub, en inglés y sin forma de volver al sitio. Ya pasa con las 5 voces de julio que se borraron. | Página de error | Media |
| 4   | No hay dirección canónica: el inicio responde en `/bibli-nvive/` y en `/bibli-nvive/index.html`, y los buscadores pueden tomarlas como dos páginas. | `rel="canonical"` | Media |
| 5   | No hay `sitemap.xml`. | Indexación | Baja |
| 6   | Solo hay favicon en SVG: los iPhone no lo usan al guardar el sitio en la pantalla de inicio (falta un PNG de 180 px). | `apple-touch-icon` | Baja |
| 7   | Dos descripciones pasan de 160 caracteres (Nazón, 182, y la voz de Segundo, 173): Google cortaría el final, que es "#MásBiblián". | Meta descripción | Baja |

**Sobre `robots.txt`:** no se recomienda agregarlo. En un sitio de proyecto de GitHub Pages los buscadores solo leen el `robots.txt` de la raíz del dominio (`angerar02.github.io/robots.txt`), que no pertenece a este repositorio; uno dentro de `/bibli-nvive/` se ignora. Para que los archivos internos no se publiquen hay que excluirlos del sitio (hallazgo 2).

### Lo que cumple

- Las 16 páginas declaran `<!doctype html>`, el idioma (`lang="es"`), la codificación UTF-8 y el viewport, y tienen un título distinto (27 a 49 caracteres), una descripción (88 a 182) y `theme-color`.
- HTML bien formado según el revisor propio: ningún id repetido, ninguna referencia rota (`aria-*`, `for` y enlaces a `#`), ninguna etiqueta mal cerrada o mal anidada y ningún enlace o botón dentro de otro.
- El script carga al final de la página, los enlaces que abren otra pestaña llevan `rel="noopener"` y todos los recursos son relativos o van por https.
- No hay enlaces internos rotos (área 1).

### Correcciones aplicadas

Aplicadas el 14 de noviembre de 2026 con las opciones recomendadas, que aprobó el autor.

| Hallazgo | Qué se hizo |
| -------- | ----------- |
| 1        | Las 16 páginas llevan las etiquetas de vista previa: tipo, nombre del sitio, idioma (`es_EC`), dirección, título y descripción (los mismos de la página), foto con sus medidas y su texto alternativo, y `twitter:card`. Cada página usa su propia foto, recortada a la proporción de 1200 × 630 sin agrandarla (`assets/img/og/`, de 33 a 278 KB, por debajo del límite de 300 KB de WhatsApp). |
| 2        | La guía de defensa salió del proyecto y quedó en la carpeta `P5`, al lado. `_config.yml` deja fuera del sitio publicado `CLAUDE.md`, `DESIGN_SYSTEM.md` y `AUDITORIA.md`, que siguen en el repositorio. |
| 3        | Página 404 propia (`404.html`): el header de siempre, "Te perdiste en el páramo", "Esta página no existe, pero Biblián tiene mucho más por descubrir." y el botón "Volver al inicio" (textos elegidos por el autor). Sus rutas empiezan en `/bibli-nvive/` para que funcione desde cualquier carpeta, y lleva `noindex`. |
| 4        | Las 16 páginas declaran su dirección canónica completa; la del inicio es `https://angerar02.github.io/bibli-nvive/`. |
| 5        | `sitemap.xml` con las 16 direcciones. Para que Google lo use hay que enviarlo desde Search Console (opcional, con la cuenta del autor). |
| 6        | Ícono para iPhone de 180 px (`apple-touch-icon.png`): el símbolo azul del logo sobre crema. |
| 7        | Sin cambio: solo se cortaría el "#MásBiblián" del final. |

Además se corrigió un comentario de las 10 páginas de voces y eventos que todavía hablaba de la barra azul del header.

### Antes y después

| Medida | Antes | Después |
| ------ | ----- | ------- |
| Páginas con vista previa al compartir | 0 | 16 |
| Páginas con dirección canónica | 0 | 16 |
| Dirección que no existe | página genérica de GitHub, en inglés | página 404 del sitio |
| Documentos de trabajo publicados como páginas | 4 (guía de defensa, instrucciones, design system y, al subir, la auditoría) | 0 |
| Mapa del sitio | no había | 16 direcciones |
| Ícono para iPhone | no había | 180 px |

### Verificación

- Revisión estática: las 16 páginas tienen sus 10 etiquetas de vista previa, la tarjeta de Twitter, la dirección canónica (igual a la de la vista previa) y el ícono para iPhone, y cada foto de vista previa existe. Las 27 rutas de la 404 apuntan a archivos que existen y ninguna es relativa. El mapa del sitio es XML válido y sus 16 direcciones existen. El revisor de estructura sigue sin encontrar problemas.
- Encuadres revisados en una hoja de contacto con las 16 fotos; se bajó el recorte de dos retratos para que la cara quedara completa.
- En el navegador: la 404 a 1280 y 360 px, con una copia temporal de rutas locales que después se borró. Sin errores de consola, sin desborde lateral y sin imágenes rotas.

### Queda abierto

- Probar la vista previa real: después de subir los cambios, pegar un enlace del sitio en WhatsApp. Si ese enlace ya se había compartido, la vista previa puede tardar en actualizarse.
- Validar las 16 páginas y la 404 con el validador oficial del W3C, con las direcciones públicas, después de subir los cambios.
- La guía de defensa sigue en el historial de git del repositorio público; sacarla de ahí exige reescribir el historial.
- Enviar el mapa del sitio a Google Search Console (opcional).

## Área 5. Rendimiento

Revisada el 14 de noviembre de 2026 sobre el sitio local, con las correcciones de las áreas 1 a 4. Se inventarió el peso de cada página (HTML, CSS, JS, imágenes al abrir y diferidas, y video), se compararon las 82 fotos con los límites de `DESIGN_SYSTEM.md` §8 y, en el navegador, se midieron los saltos de diseño (CLS) y el elemento principal (LCP) de una página de cada tipo, a 360 y 1280 px.

**Límite de esta revisión:** los tiempos se midieron en la computadora, sin red. Sirven para saber cuál es el elemento principal y si algo salta, no cuánto tarda en un celular real. La medición con PageSpeed Insights (Lighthouse) necesita el sitio publicado y queda para el final.

### Hallazgos

| #   | Hallazgo | Gravedad |
| --- | -------- | -------- |
| 1   | El video de portada del inicio se descarga apenas se abre la página: 11,6 MB en escritorio, 7,9 MB en el celular de costado y 4,4 MB en el celular vertical. Es casi todo lo que pesa el inicio y, con datos móviles, lo más caro del sitio. Con "ahorro de datos" no arranca. | Alta |
| 2   | 22 fotos pasan el peso máximo de §8. Las portadas de Sageo (495 KB), Turupamba (403 KB) y Biblián (361 KB) pasan los 300 KB, y en Sageo esa foto es el elemento principal de la página. Las otras 19 (galerías, tarjetas y bloques de texto con imagen) pesan entre 101 y 243 KB, con límites de 100 a 150 KB. | Media |
| 3   | §8 pide WebP con respaldo JPG; el sitio usa JPG (92 imágenes) y WebP solo en las 8 capas de la escena de RAÍCES y la niebla. | Baja |
| 4   | El inicio descarga al abrir 1,35 MB de las capas de RAÍCES y la niebla, que se ven recién después del video, sin indicar que pueden esperar. | Baja |
| 5   | 25 archivos de `assets/img` que nada usa (1,3 MB): 13 fotos viejas de Biblián, Jerusalén y Sageo y 12 íconos SVG (el menú anterior, los datos y el logo de origen). Ningún visitante los descarga, pero ocupan el repositorio. | Baja |

### Peso por página

| Página | HTML | CSS | JS | Imágenes al abrir | Imágenes diferidas | Video |
| ------ | ---- | --- | -- | ----------------- | ------------------ | ----- |
| Inicio | 46 KB | 86 KB | 58 KB | 1354 KB | 4161 KB | 4,4 a 11,6 MB, al abrir |
| Parroquias | 20 KB | 75 KB | 58 KB | 108 a 495 KB | 1270 a 1433 KB | 2 a 4,6 MB, al llegar al video |
| Voces | 16 KB | 59 KB | 58 KB | 67 a 137 KB | 698 a 769 KB | — |
| Eventos | 21 KB | 93 KB | 58 KB | 143 a 148 KB | 875 a 930 KB | — |

HTML, CSS y JS sin comprimir; GitHub Pages los envía comprimidos.

### Lo que cumple

- Ninguna página salta al cargar: CLS 0 en las cuatro páginas tipo, a 360 y 1280 px. Las 146 imágenes sin `width` y `height` tienen su espacio definido en el CSS (proporción, alto fijo o posición absoluta); se comprobó una por una que su alto no depende de la foto. El diagnóstico inicial las contaba como riesgo; la medición muestra que no lo son.
- La foto principal de cada parroquia, voz y evento lleva `fetchpriority="high"` y carga sin espera; las demás usan carga diferida (`loading="lazy"`) y decodificación asíncrona.
- Los videos de las parroquias no se descargan hasta llegar a ellos (`preload="none"`) y ninguno tiene sonido.
- Las fuentes vienen de una sola hoja de Google de 7 KB, con `display=swap` y conexión anticipada.
- En voces y eventos la foto principal aparece con el fundido de entrada, que dura cerca de 1 s: por eso su LCP medido es de casi 1 s aun sin red. Está dentro de lo recomendado (2,5 s).

### Correcciones aplicadas

Aplicadas el 14 de noviembre de 2026 con lo que decidió el autor.

| Hallazgo | Qué se hizo |
| -------- | ----------- |
| 1        | Sin cambio, por decisión del autor. Se propuso acortar el bucle a 15–20 s (el peso bajaba a la mitad o menos) y el video sigue pesando 11,6 MB en escritorio y 4,4 MB en el celular vertical. |
| 2        | Las fotos ya venían a calidad 60–61, así que recomprimirlas sin achicarlas solo servía en 2 de 21. Con una comparación a tamaño real a la vista, el autor eligió achicar solo las portadas: Sageo a 1440 px, Turupamba y Biblián a 1600 px (295, 295 y 293 KB; antes 495, 402 y 361). La de Jerusalén pasó de 2048 a 1920 px de ancho con el mismo peso (108 KB). Las dos que entraban sin achicar se recomprimieron (96 y 95 KB). Las otras 16 se quedan y §8 anota su peso real. Las originales están en `P5/biveme-respaldo/fotos-originales/`, fuera del proyecto. |
| 3        | Se queda el JPG. §8 dice ahora: JPG optimizado en las fotos y WebP solo en las capas de RAÍCES y la niebla. |
| 4        | Las 8 capas de RAÍCES y la niebla llevan `fetchpriority="low"`: el navegador descarga primero la portada. |
| 5        | Las 13 fotos sin uso y el logo de origen (`logo_final.svg`) pasaron a `P5/biveme-respaldo/fotos-sin-uso/`; se borraron 11 íconos SVG viejos. |

### Antes y después

| Medida | Antes | Después |
| ------ | ----- | ------- |
| Portada de Sageo (elemento principal de la página) | 495 KB | 295 KB |
| Portada de Turupamba | 402 KB | 295 KB |
| Portada de Biblián | 361 KB | 293 KB |
| Fotos que pasan el peso de §8 | 22 | 16 (decisión del autor) |
| Archivos sin uso en `assets/img` | 25 (1,3 MB) | 0 |
| Capas de RAÍCES con prioridad baja | 0 de 8 | 8 de 8 |
| Video de portada del inicio | 4,4 a 11,6 MB | sin cambio (decisión del autor) |

### Verificación

- El inventario repetido da 293 a 296 KB de imágenes al abrir las parroquias de las portadas achicadas, ningún archivo sin uso y solo las 16 fotos que se decidió dejar sobre el límite (más el ancho de las tarjetas de eventos).
- Antes de mover o borrar se comprobó que ningún HTML, CSS o JS del sitio nombraba esos archivos.
- En el navegador, las cuatro portadas cargan con su tamaño nuevo y se ven bien a 1280 px; en el inicio, las 8 capas llevan la prioridad baja. No hay imágenes rotas ni errores de consola.

### Queda abierto

- Medir con PageSpeed Insights (Lighthouse) en el sitio publicado, en celular. Hay que enviarle la dirección pública a ese servicio: con permiso del autor, o lo hace él.
- Hallazgo 1: el video del inicio sigue pesando 4,4 a 11,6 MB, por decisión del autor.
- Hallazgo 2: 16 fotos siguen sobre el límite de §8, por decisión del autor.
- §8 pide una portada 4:5 para el celular; el sitio recorta la misma foto 16:9. Hacerla mejoraría la nitidez y el peso en el celular (opcional).

## Área 6. Responsive

Revisada el 14 de noviembre de 2026. Las 16 páginas se revisaron en el navegador a 320, 360, 412, 600, 768, 1024, 1280, 1920 y 2560 px, y con el celular de costado (740 × 360). El inicio se revisó en los nueve anchos; cada parroquia, voz y evento, al menos a 360 y 1280 px, y una de cada tipo también a 600, 768, 1024 y 1920 px. En cada ancho, con las animaciones de entrada ya terminadas, se buscó contenido que se sale de la pantalla, palabras más anchas que su caja y enlaces o botones con un área táctil menor a 48 px.

**Límite de esta revisión:** solo se probó en Chromium, el navegador del entorno de trabajo. Safari, Firefox y un celular real quedan para el autor, con el sitio publicado.

### Hallazgos

| #   | Hallazgo | Gravedad |
| --- | -------- | -------- |
| 1   | De 600 a 1023 px (tablet), donde se ve solo el símbolo del logo, su enlace medía 32 × 48 px: más angosto que los 48 × 48 que pide la regla del proyecto. | Media |

### Lo que cumple

- Ninguna página se sale de la pantalla ni corta contenido en ninguno de los anchos, salvo la palabra "interesantes" a 320 px, que el autor decidió dejar (área 3, hallazgo 14).
- Las demás áreas táctiles miden 48 px o más. "Cómo llegar" y el enlace de las cartas de eventos parecen chicos, pero una capa invisible los extiende a 48 px de alto y a toda la carta.
- Con el celular de costado, el título de la portada y el header se ven completos.
- A 2560 px el contenido queda centrado en 1200 px. Las portadas achicadas en el área 5 se agrandan en esas pantallas (la de Sageo, 1,8 veces) y se ven algo más suaves.
- Los cortes de 600, 840, 1024 y 1120 px no dejan nada fuera de lugar.

### Compatibilidad

El sitio usa funciones de navegadores de 2023 en adelante. En los más viejos se pierden algunos efectos, no el contenido.

| Función | Para qué se usa | Chrome | Safari | Firefox |
| ------- | --------------- | ------ | ------ | ------- |
| `:has()` | header, menú abierto, foco de la esquina | 105 | 15.4 | 121 |
| `@property` | animación de la portada y de la esquina | 85 | 16.4 | 128 |
| `color-mix()` | velos, estados y color del título de la portada | 111 | 16.2 | 113 |
| `:nth-child(… of …)` | colores de las tarjetas del menú del celular | 111 | 9 | 113 |
| unidades `svh` | escenas fijas de RAÍCES y Datos | 108 | 15.4 | 101 |
| `inert` | menú del celular abierto | 102 | 15.5 | 112 |
| `text-box` | centrado óptico de pastillas y botones (tiene respaldo) | 133 | 18.2 | — |

### Corrección aplicada

| Hallazgo | Qué se hizo |
| -------- | ----------- |
| 1        | El enlace del logo tiene un ancho mínimo de 48 px (`min-width: var(--size-touch)`). El símbolo sigue en el mismo lugar; solo crece el área que se puede tocar. Aprobado por el autor. |

### Verificación

- A 600 y 768 px el enlace del logo mide 48 × 48 px y el símbolo sigue en el mismo lugar; en celular y escritorio no cambia.
- Los errores 404 que mostró la consola venían de abrir `404.html` en la computadora, donde sus rutas desde `/bibli-nvive/` no existen. En las páginas del sitio no hay archivos que falten ni imágenes rotas.

## Resumen final

La auditoría terminó el 14 de noviembre de 2026. Las seis áreas están hechas.

| Área | Medida | Antes | Después |
| ---- | ------ | ----- | ------- |
| 1 | Tokens sin uso | 57 | 13 (roles de Material de referencia) |
| 1 | Hoja de fuentes de Google | 120 KB | 7 KB |
| 1 | CSS que carga una página de voz | 95 KB | 57 KB |
| 2 | Letras por línea en las historias de Voces | 86 a 87 | 70 a 71 |
| 2 | Componentes sin estado presionado | 6 | 0 |
| 3 | Menú sobre la foto de portada, peor zona | 1.95 a 3.17:1 | 4.89:1 o más, sobre cualquier fondo |
| 3 | Pestañas no elegidas de Voces | 3.10:1 | 5.01:1 |
| 3 | Íconos expuestos a los lectores de pantalla | 48 | 0 |
| 3 | Enlaces a otra pestaña sin aviso | 53 | 0 |
| 3 | Páginas con "Saltar al contenido" | 0 | 16 |
| 4 | Páginas con vista previa al compartir | 0 | 16 |
| 4 | Página 404 propia | no | sí |
| 4 | Documentos de trabajo publicados | 4 | 0 |
| 5 | Portada más pesada (Sageo) | 495 KB | 295 KB |
| 5 | Archivos sin uso | 25 (1,3 MB) | 0 |
| 5 | Saltos de diseño al cargar (CLS) | sin medir | 0 |
| 6 | Áreas táctiles de menos de 48 px | 1 (logo en tablet) | 0 |

**Decisiones del autor que dejan algo sin corregir:** el texto chico sobre amarillo sigue en 3.22:1 (área 3, hallazgo 1); el video del inicio no tiene forma de pausarse (área 3, hallazgo 3) y pesa de 4,4 a 11,6 MB (área 5, hallazgo 1); 16 fotos siguen sobre el límite de §8 (área 5); la palabra "interesantes" se corta a 320 px (área 3, hallazgo 14), y la lámina de la retícula y el sitio usan medidas distintas (área 2).

**Cambios de diseño pedidos por el autor durante la auditoría:** el velo del header en todo el sitio, en curva suave y sin barra azul; el video del inicio desde el borde de arriba, y la escena de capas sin "RAÍCES" en el celular.

## Después del cierre

15 de noviembre de 2026. Con el checklist a la vista, el autor resolvió el punto por decidir y tres de los opcionales antes de subir el sitio.

| Punto | Qué se hizo |
| ----- | ----------- |
| Números "01." a "04." de las cartas de Datos | Se quitaron (decisión del autor) y la foto usa ese espacio: pasa de 2:1 a 4:3, un 50 % más alta (de 258 × 129 a 258 × 194 px en el celular y de 368 × 184 a 368 × 276 px en escritorio). La carta mide lo mismo en el celular y 8 px más en escritorio, así que la escena no cambia. |
| Ícono "Nada de motos" (`nomoto.svg`) | Rehecho con Material Symbols: el ícono `motorcycle`, Outlined como sus vecinos de la lista, con la barra de prohibido de Google (la de `no_photography`: 80 unidades de grosor y un hueco de 80 del lado de arriba). Tiene el mismo grosor de línea que los otros íconos. |
| Logos del header y del footer | Al pasar el mouse se vuelven amarillos y crecen un 4 %; presionados bajan al 97 %, como los botones. Con "reducir movimiento" solo cambia el color. |
| Portada vertical (4:5) para el celular | Descartada por el autor: el celular recorta la misma foto 16:9 (§8 actualizado). |
| Franja crema debajo de la escena de RAÍCES (16 de noviembre; el autor la vio en iPhone y iPad) | Al bajar, el navegador del celular y de la tablet esconde su barra y la pantalla crece, pero el escenario medía el alto con la barra visible (100svh). Ahora mide la pantalla grande (100lvh) y la cortina de las parroquias, lo mismo. |
| Márgenes de tablet (16 de noviembre, pedido del autor) | Pasan de 24 a 32 px, como la lámina de la retícula y Material Design 2: a 768 px las columnas miden 67 px, igual que en la lámina. El escritorio sigue con 24 px dentro del contenedor de 1200 px. Revisado en las 16 páginas a 600 y 768 px: nada se sale de la pantalla y el menú no toca el logo. |
| Título y párrafo en el celular (16 de noviembre, pedido del autor) | En los 15 bloques de título y párrafo de las parroquias y los eventos, el celular muestra el título y el texto centrados, con el párrafo en un bloque angosto como un subtítulo (32ch y Body Medium de 14 px, líneas equilibradas; antes ocupaba todo el ancho y "parecía presentación"), y el párrafo con lo esencial: de 200 a 300 letras pasa a unas 50 a 140. No se reescribió nada: se ocultan frases o partes de frase, con los textos aprobados por el autor. En tablet y escritorio, todo como antes. |

**Hallazgo nuevo:** los 15 íconos de "Antes de ir" de los eventos son de Material Symbols Outlined (esquinas rectas) y §9 pide Rounded (esquinas redondeadas). El ícono nuevo se hizo en Outlined para que combine con sus vecinos. Queda por decidir.

**Verificación:** capturas de la escena de Datos a 360 × 640, 360 × 740 y 1280 × 800, de la grilla con "reducir movimiento", del hover de los dos logos y del ícono en su página a 360 y 1280 px. Sin errores de consola ni imágenes rotas.

## Checklist de lo que falta

Para hacer con el sitio publicado:

- [ ] Recorrer el sitio en tu celular, de pie y de costado: el inicio, una parroquia, una voz y un evento como mínimo.
- [ ] Pegar un enlace en WhatsApp y ver la vista previa. Si el enlace ya se había compartido, la vista previa puede tardar en actualizarse.
- [ ] Abrir una dirección que no existe (por ejemplo `…/bibli-nvive/hola`) y ver la página 404.
- [ ] Validar las páginas con el validador del W3C (validator.w3.org), con las direcciones públicas. Lo hace el autor, con la guía de Claude.
- [ ] Medir el inicio y una parroquia con PageSpeed Insights (pagespeed.web.dev), en celular. Lo hace el autor, con la guía de Claude.
- [ ] Probar en Safari (iPhone o Mac) y en Firefox, si hay uno a mano.

Pruebas a mano:

- [ ] Recorrer el sitio con un lector de pantalla: VoiceOver en iPhone o TalkBack en Android.
- [ ] Recorrerlo con "reducir movimiento" activado en el celular.
- [ ] Probar con el dedo los estados presionados: botones, menú y pestañas.

Por decidir:

- [x] Los números "01." a "04." de las cartas de Datos: el autor decidió quitarlos y agrandar la foto (ver "Después del cierre").
- [ ] Íconos de "Antes de ir": pasarlos a Rounded, como pide §9, o dejarlos en Outlined como excepción.

Opcionales:

- [x] Rehacer el ícono `nomoto.svg` con el estilo de Material Symbols.
- [x] ~~Hacer una portada vertical (4:5) para el celular~~: descartada por el autor.
- [x] Darles un estado al pasar el mouse a los logos del header y del footer.
- [ ] Enviar el mapa del sitio a Google Search Console.
- [ ] Sacar la guía de defensa del historial de git (exige reescribir el historial). El autor quiere hacerlo después de subir el sitio.
