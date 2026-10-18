/* ============================================================
   main.js — Interacciones del sitio Biblián Vive
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 0) PASTILLAS DE LOS TÍTULOS: centrado óptico ----------
     La caja de la palabra está recortada a la altura de las mayúsculas
     (base.css). Aquí se mide la tinta real de cada palabra (minúsculas,
     mayúsculas, letras que suben o bajan) y se reparte el aire para que
     quede igual arriba y abajo, con el mismo alto en todas las pastillas
     de un tamaño. Si una palabra baja (p, g, y), la pastilla crece lo justo.
     Además, en los títulos de varias líneas, la separación entre la
     pastilla y la línea de arriba o de abajo es la misma en todos (igual
     al aire de la pastilla): antes a veces se tocaban y a veces no. */
  const pills = document.querySelectorAll(".pill");
  if (pills.length && CSS.supports("text-box: trim-both cap alphabetic")) {
    const lienzo = document.createElement("canvas").getContext("2d");
    const medir = (el, texto) => {
      const cs = getComputedStyle(el);
      lienzo.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      return lienzo.measureText(texto);
    };
    // Tinta (arriba y abajo) de cada línea de texto del título, sin la pastilla
    const tintaLineas = (bloque, p) => {
      const lineas = [];
      const recorrido = document.createTreeWalker(bloque, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = recorrido.nextNode())) {
        const texto = n.textContent.trim();
        if (!texto || p.contains(n)) continue;
        const m = medir(n.parentElement, texto);
        const rango = document.createRange();
        rango.selectNodeContents(n);
        for (const r of rango.getClientRects()) {
          if (r.width < 1) continue;
          const base = r.top + m.fontBoundingBoxAscent;
          lineas.push({ arriba: base - m.actualBoundingBoxAscent, abajo: base + m.actualBoundingBoxDescent });
        }
      }
      return lineas;
    };
    const centrarPastillas = () => {
      const aires = new Map();
      // 1) aire interno: misma tinta arriba y abajo
      pills.forEach((p) => {
        // alto de las mayúsculas según la fuente y aire base (--pill-aire-y)
        const sonda = document.createElement("span");
        sonda.style.cssText = "position:absolute;visibility:hidden;height:1cap;padding-top:var(--pill-aire-y)";
        p.appendChild(sonda);
        const cap = parseFloat(getComputedStyle(sonda).height);
        const aire = parseFloat(getComputedStyle(sonda).paddingTop);
        sonda.remove();
        aires.set(p, aire);
        const m = medir(p, p.textContent.trim());
        const sube = m.actualBoundingBoxAscent; // tinta sobre la línea base
        const baja = m.actualBoundingBoxDescent; // tinta bajo la línea base
        // alto: el de las mayúsculas + aire; si la palabra baja, lo justo para que quepa
        const alto = Math.max(cap + aire * 2, sube + baja + aire * 1.6); // 1,6: el mismo aire que una palabra sin colas
        const margen = (alto - sube - baja) / 2; // aire igual arriba y abajo de la tinta
        // la caja va de la altura de las mayúsculas a la línea base
        p.style.setProperty("--pill-arriba", `${Math.max(0, margen - (cap - sube))}px`);
        p.style.setProperty("--pill-abajo", `${margen + baja}px`);
        p.style.marginTop = "";
        p.style.marginBottom = "";
      });
      // 2) separación con las líneas de arriba y de abajo del título
      pills.forEach((p) => {
        const aire = aires.get(p);
        const P = p.getBoundingClientRect();
        if (!P.height) return;
        const lineas = tintaLineas(p.closest("h1, h2, h3, h4, p") || p.parentElement, p);
        const encima = lineas.filter((l) => l.abajo <= P.top + aire * 1.5).map((l) => l.abajo);
        const debajo = lineas.filter((l) => l.arriba >= P.bottom - aire * 1.5).map((l) => l.arriba);
        // se suma a su margen actual (algunas pastillas ya traen uno desde el CSS)
        const mt = parseFloat(getComputedStyle(p).marginTop) || 0;
        const mb = parseFloat(getComputedStyle(p).marginBottom) || 0;
        if (encima.length) p.style.marginTop = `${mt + aire - (P.top - Math.max(...encima))}px`;
        if (debajo.length) p.style.marginBottom = `${mb + aire - (Math.min(...debajo) - P.bottom)}px`;
      });
    };
    document.fonts.ready.then(centrarPastillas);
    let pillTimer;
    window.addEventListener("resize", () => {
      clearTimeout(pillTimer);
      pillTimer = setTimeout(centrarPastillas, 150); // el tamaño de letra cambia según la pantalla
    });
  }

  /* ---------- 1) HEADER: tipo armenia.travel ----------
     En el tope: transparente con texto blanco.
     Al bajar: se esconde. Al subir: reaparece con fondo crema. */
  const header = document.getElementById("site-header");
  if (header) {
    // entrada desde los lados (pequeña pausa para que la animación se aprecie)
    setTimeout(() => header.classList.add("is-ready"), 350);

    const TOP_ZONE = 40;   // px desde arriba que cuentan como "tope"
    const MIN_DELTA = 6;   // ignora micro-movimientos del scroll
    let lastY = window.scrollY;
    let headerTicking = false;

    const updateHeader = () => {
      const y = window.scrollY;
      const menuOpen = document.body.classList.contains("menu-open");
      // data-solid (inicio): siempre en crema, porque en el tope no hay foto debajo
      header.classList.toggle("scrolled", header.hasAttribute("data-solid") || y > TOP_ZONE);

      if (menuOpen || y <= TOP_ZONE) {
        header.classList.remove("is-hidden");
      } else if (Math.abs(y - lastY) >= MIN_DELTA) {
        // bajando y ya pasó la altura del header → esconder; subiendo → mostrar
        header.classList.toggle("is-hidden", y > lastY && y > header.offsetHeight);
      }
      if (Math.abs(y - lastY) >= MIN_DELTA) lastY = y;
      headerTicking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!headerTicking) {
          headerTicking = true;
          requestAnimationFrame(updateHeader);
        }
      },
      { passive: true }
    );
    // Si un elemento del header recibe foco con teclado, mostrarlo
    header.addEventListener("focusin", () => header.classList.remove("is-hidden"));
    updateHeader();
  }

  /* ---------- 2) MENÚ MÓVIL: hamburguesa ↔ X, cierra con X, ítem o Esc ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");
  const desktop = window.matchMedia("(min-width: 600px)");

  /* (oct-2026: se quitó el submenú de "Parroquias"; ahora es un enlace a
     la sección de parroquias del inicio) */
  if (navToggle && nav) {
    const setMenu = (open) => {
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    };
    navToggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
    // Los enlaces cierran el menú
    nav.querySelectorAll("a.nav__link").forEach((link) =>
      link.addEventListener("click", () => setMenu(false))
    );
    // Si se agranda la pantalla con el menú abierto, se cierra
    desktop.addEventListener("change", (e) => {
      if (e.matches) setMenu(false);
    });
  }

  // Esc cierra el menú
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (nav && navToggle && nav.classList.contains("is-open")) {
      navToggle.click();
      navToggle.focus();
    }
  });

  /* Entrada "en cartas" (§7.0b, referencia: neutomni.com): la foto sube
     desde más abajo, girada en 3D e inclinada hacia su lado, y se asienta
     derecha. lado: -1 izquierda, 0 centro, 1 derecha. Usa los tiempos del
     abanico (--dur-fan) para no sumar otro ritmo al sitio. La usan
     "Desde la raíz" (3) y la foto de las voces locales (3f). */
  const entrarCarta = (el, lado, delay = 0) => {
    const css = getComputedStyle(document.documentElement);
    const token = (nombre) => css.getPropertyValue(nombre).trim();
    const grados = (nombre) => parseFloat(token(nombre));
    const inclina = lado ? lado * grados("--carta-inclina") : grados("--carta-inclina") * -0.5;
    const vuelta = lado ? -lado * grados("--carta-vuelta") : grados("--carta-vuelta") * 0.6;
    const lejos = `${Math.round(el.offsetWidth * 4)}px`; // perspectiva según su tamaño
    return el.animate(
      [
        {
          opacity: 0,
          transform: `perspective(${lejos}) translateY(${token("--carta-sube")}) rotateY(${vuelta}deg) rotate(${inclina}deg)`,
        },
        { opacity: 1, offset: 0.25 },
        { opacity: 1, transform: `perspective(${lejos}) translateY(0) rotateY(0deg) rotate(0deg)` },
      ],
      { duration: parseFloat(token("--dur-fan")) * 1000, delay, easing: token("--ease-out"), fill: "backwards" }
    );
  };

  /* ---------- 3) "Desde la raíz": 3 fotos que entran como cartas ----------
     Oct-2026 (referencia: neutomni.com, pero sin depender del scroll): ya no
     es un carrusel. Al llegar a la sección, cada foto entra como carta
     (las de los lados inclinadas hacia afuera), una tras otra de izquierda
     a derecha. Una sola vez. En móvil van una debajo de otra y cada una
     entra al llegar a ella. */
  const cartas = Array.from(document.querySelectorAll("[data-cartas] .raiz-carta"));
  if (cartas.length && !reduceMotion && "IntersectionObserver" in window && cartas[0].animate) {
    cartas.forEach((c) => c.classList.add("is-carta-pendiente"));
    const verCartas = new IntersectionObserver(
      (entries, obs) => {
        const llegan = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target)
          .sort((a, b) => cartas.indexOf(a) - cartas.indexOf(b));
        if (!llegan.length) return;
        const espera = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--delay-fan")) * 1000;
        llegan.forEach((carta, orden) => {
          obs.unobserve(carta);
          // lado respecto de su lista
          const lista = carta.parentElement.getBoundingClientRect();
          const r = carta.getBoundingClientRect();
          const desvio = r.left + r.width / 2 - (lista.left + lista.width / 2);
          const lado = Math.abs(desvio) < r.width * 0.25 ? 0 : Math.sign(desvio);
          carta.classList.remove("is-carta-pendiente");
          entrarCarta(carta, lado, espera * orden);
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -15% 0px" } // igual que los demás reveals
    );
    cartas.forEach((c) => verCartas.observe(c));
  }

  /* ---------- 3a) HERO scroll-driven ----------
     Calcula el progreso 0→1 mientras se atraviesa el hero y lo pasa
     al CSS por la variable --p (el CSS hace el resto). La animación dura
     siempre 3/4 de pantalla de scroll; si el hero es más alto (el del
     inicio, --hero-reposo), lo que sobra es un reposo con el título quieto. */
  const heroWrap = document.getElementById("hero-wrap");
  if (heroWrap) {
    let heroTicking = false;
    const updateHero = () => {
      const range = Math.min(heroWrap.offsetHeight - window.innerHeight, window.innerHeight * 0.75);
      const p = Math.min(1, Math.max(0, -heroWrap.getBoundingClientRect().top / range));
      heroWrap.style.setProperty("--p", p.toFixed(4));
      heroTicking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!heroTicking) {
          heroTicking = true;
          requestAnimationFrame(updateHero);
        }
      },
      { passive: true }
    );
    window.addEventListener("resize", updateHero);
    updateHero();
  }

  /* ---------- 3a2) INICIO: NIEBLA entre el video y la escena de RAÍCES ----------
     Como white-desert.com. Primero termina la animación del video y el
     título queda quieto un tramo para leerse (--hero-reposo). Después:
     1) dos bandas de niebla suben desde debajo de la pantalla (con un
     fundido) y tapan el video; 2) cuando el video empieza a irse, la parte
     densa de la banda de adelante va sobre su borde de abajo todo el
     trayecto (tapa el corte con la escena); 3) cuando el borde llega casi
     arriba, la niebla se adelanta y se disipa (fundido) y la escena aparece
     desde ella.
     Para que se vea natural y no como un bloque pegado a la página: cada
     banda va a su ritmo (la de adelante un poco más rápida que la página y
     la de atrás más lenta, como con la profundidad), derivan hacia lados
     contrarios y crecen un poco mientras se baja (al cruzarse parece que la
     niebla cambia de forma), y el CSS les da un vaivén lento mientras están
     en pantalla. Para que sea fluido: todo se desliza hacia su valor con
     inercia (la rueda del mouse avanza a saltos), solo se usa "transform" y
     "opacity", y las medidas se toman una vez (y al cambiar el tamaño). */
  const niebla = document.querySelector(".niebla");
  if (niebla && heroWrap && !reduceMotion) {
    const bandas = Array.from(niebla.querySelectorAll(".niebla__capa"));
    // ancla: dónde queda su centro respecto del borde (0,5 = justo encima);
    // curva: cómo sube al principio; ritmo: desfase (en pantallas) al empezar
    // y al terminar el trayecto del borde (negativo = más arriba);
    // deriva: desplazamiento lateral total (fracción del ancho de pantalla);
    // crece: cuánto crece en todo el recorrido
    const BANDAS = [
      { ancla: 0.62, curva: 0.8, ritmo: [-0.1, 0.12], deriva: -0.05, crece: 0.06 }, // atrás: más lenta
      { ancla: 0.5, curva: 1.2, ritmo: [0.06, -0.06], deriva: 0.06, crece: 0.12 }, //  adelante: más rápida
    ];
    const LECTURA = 0.25; // pantallas de scroll con el título quieto antes de la niebla
    const INERCIA = 0.16; // fracción del camino que recorre cada cuadro (más bajo = más suave)
    const SALIDA_INICIO = 0.15; // la niebla empieza a irse con el borde a este alto de la pantalla
    const SALIDA_TRAMO = 0.5; // y termina de irse tras este tramo (en pantallas de scroll)
    const entre01 = (v) => Math.min(1, Math.max(0, v));
    const mezcla = ([a, b], t) => a + (b - a) * t;
    let altos = [];
    const actual = []; // valores dibujados de cada banda (se acercan al objetivo con inercia)
    let nieblaRaf = 0;
    const medirNiebla = () => { altos = bandas.map((b) => b.offsetHeight); };
    const objetivos = (r, vh, vw) => {
      const anim = Math.min(r.height - vh, vh * 0.75); // lo que dura la animación del video (3a)
      const inicio = anim + vh * LECTURA;
      const finFijo = r.height - vh; // fin del tramo en que el video queda fijo
      const total = r.height - inicio + vh * (SALIDA_TRAMO - SALIDA_INICIO); // vida completa de la niebla
      const g = entre01((-r.top - inicio) / total); // avance general 0..1
      const subida = entre01((-r.top - inicio) / Math.max(1, finFijo - inicio));
      const borde = Math.min(r.bottom, vh); // mientras está fijo, el borde de la pantalla
      const trayecto = entre01((vh - r.bottom) / (vh * (1 - SALIDA_INICIO))); // borde de abajo → casi arriba
      const salida = entre01((vh * SALIDA_INICIO - r.bottom) / (vh * SALIDA_TRAMO)) ** 2;
      const aparece = entre01(subida / 0.35);
      return bandas.map((b, i) => {
        const { ancla, curva, ritmo, deriva, crece } = BANDAS[i] || BANDAS[1];
        const y = borde
          - altos[i] * (ancla + (1 - ancla) * salida) * Math.pow(subida, curva)
          + mezcla(ritmo, trayecto) * vh;
        return {
          y,
          x: deriva * vw * g,
          s: 1 + crece * g,
          o: subida > 0 ? aparece * (1 - salida) : 0,
        };
      });
    };
    const acercar = (a, b, umbral) => (Math.abs(b - a) < umbral ? b : a + (b - a) * INERCIA);
    const pintarNiebla = () => {
      const vh = window.innerHeight;
      const metas = objetivos(heroWrap.getBoundingClientRect(), vh, window.innerWidth);
      let moviendo = false;
      let visible = false;
      bandas.forEach((b, i) => {
        const m = metas[i];
        const v = actual[i] || (actual[i] = { ...m });
        v.y = acercar(v.y, m.y, 0.5);
        v.x = acercar(v.x, m.x, 0.5);
        v.s = acercar(v.s, m.s, 0.0005);
        v.o = acercar(v.o, m.o, 0.005);
        if (v.y !== m.y || v.x !== m.x || v.s !== m.s || v.o !== m.o) moviendo = true;
        b.style.transform = `translate3d(${v.x.toFixed(1)}px, ${v.y.toFixed(1)}px, 0) scale(${v.s.toFixed(4)})`;
        b.style.opacity = v.o.toFixed(3);
        if (v.o > 0.01 && v.y < vh && v.y + altos[i] > 0) visible = true;
      });
      niebla.classList.toggle("is-activa", visible);
      nieblaRaf = moviendo ? requestAnimationFrame(pintarNiebla) : 0;
    };
    const pedirNiebla = () => { if (!nieblaRaf) nieblaRaf = requestAnimationFrame(pintarNiebla); };
    window.addEventListener("scroll", pedirNiebla, { passive: true });
    window.addEventListener("resize", () => { medirNiebla(); pedirNiebla(); });
    medirNiebla();
    pintarNiebla();
  }

  /* ---------- 3b) PARALLAX en títulos (se desactiva con "reducir movimiento") ---------- */
  const parallaxItems = reduceMotion
    ? []
    : Array.from(document.querySelectorAll("[data-parallax]")).map((el) => ({
        el,
        speed: parseFloat(el.dataset.parallax) || 0.25,
        top: el.getBoundingClientRect().top + window.scrollY,
        height: el.offsetHeight,
      }));
  if (parallaxItems.length) {
    let ticking = false;
    const updateParallax = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      parallaxItems.forEach(({ el, speed, top, height }) => {
        // distancia del centro del elemento al centro de la pantalla
        const delta = y + vh / 2 - (top + height / 2);
        el.style.transform = `translateY(${delta * speed}px)`;
      });
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateParallax);
        }
      },
      { passive: true }
    );
    // Recalcular posiciones cuando carguen las imágenes o cambie el tamaño
    const remeasure = () => {
      parallaxItems.forEach((item) => {
        item.el.style.transform = "";
        item.top = item.el.getBoundingClientRect().top + window.scrollY;
        item.height = item.el.offsetHeight;
      });
      updateParallax();
    };
    window.addEventListener("load", remeasure);
    window.addEventListener("resize", remeasure);
    // la fuente de títulos cambia la altura de los bloques al terminar de cargar
    if (document.fonts) document.fonts.ready.then(remeasure);
    updateParallax();
  }

  /* ---------- 3c) INICIO: PARALLAX POR CAPAS ----------
     El escenario queda fijo (sticky) mientras se baja la escena. p va de 0
     (el escenario recién llega arriba) a 1 (termina el tramo fijo); antes
     de llegar, las capas esperan en su posición inicial. Cada capa va de
     "desde" a "hasta" (data-y / data-x, en % de su propio recuadro); en
     p = 1 todas quedan en 0, alineadas como en el diseño. */
  const scene = document.querySelector("[data-capas]");
  if (scene && !reduceMotion) {
    const pair = (v) => (v || "0 0").trim().split(/\s+/).map(Number);
    const layers = Array.from(scene.querySelectorAll(".capa")).map((el) => ({
      el,
      y: pair(el.dataset.y),
      x: pair(el.dataset.x),
    }));
    const lerp = ([a, b], t) => a + (b - a) * t;
    let capasTicking = false;
    let lastP = -1;
    const updateCapas = () => {
      const r = scene.getBoundingClientRect();
      const vh = window.innerHeight;
      const fixedSpan = Math.max(1, r.height - vh); // tramo en que el escenario está fijo
      const p = Math.min(1, Math.max(0, -r.top / fixedSpan));
      if (p !== lastP) {
        layers.forEach(({ el, x, y }) => {
          el.style.transform = `translate3d(${lerp(x, p)}%, ${lerp(y, p)}%, 0)`;
        });
        lastP = p;
      }
      capasTicking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!capasTicking) {
          capasTicking = true;
          requestAnimationFrame(updateCapas);
        }
      },
      { passive: true }
    );
    window.addEventListener("resize", updateCapas);
    updateCapas();
  }

  /* ---------- 3d) INICIO: VIDEO ----------
     Sin botones: arranca solo (silenciado, en bucle) mientras se ve y se
     pausa al salir de pantalla. Con "reducir movimiento" o ahorro de datos
     no arranca y queda la portada. */
  const inicioVideo = document.getElementById("inicio-video");
  if (inicioVideo) {
    const video = inicioVideo.querySelector("video");
    const saveData = navigator.connection && navigator.connection.saveData;
    if (!reduceMotion && !saveData && "IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {}); // si el navegador lo bloquea, queda la portada
        else if (!video.paused) video.pause();
      }, { threshold: 0.25 }).observe(inicioVideo);
    }
  }

  /* ---------- 3e) INICIO: PARROQUIAS — cambio de color y aparición ----------
     Cuando una parroquia cruza la línea media de la pantalla, la sección
     toma su color de fondo y de texto (definidos en .pq--azul, etc.; la
     transición de CSS los funde con los anteriores) y, a la vez, aparece
     su contenido: el nombre con la aparición de siempre (sube con un
     fundido, como todos los títulos) y las fotos en abanico (como el
     carrusel de las parroquias: primero la del centro y luego las
     laterales salen desde detrás de ella; el botón al final).
     Oct-2026 (homologación del movimiento): cada parroquia aparece una sola
     vez, como todo el sitio; ya no se desvanece al salir ni se repite al
     volver, y las fotos ya no flotan. Los nombres llevan data-reveal-manual
     para que la aparición general (4) no los maneje. */
  const parroquias = document.querySelector("[data-parroquias]");
  if (parroquias && "IntersectionObserver" in window) {
    const bloques = parroquias.querySelectorAll(".pq");
    const css = getComputedStyle(document.documentElement);
    const ms = (token) => parseFloat(css.getPropertyValue(token)) * 1000; // tokens en segundos
    const easing = css.getPropertyValue("--ease-out").trim();
    const conAbanico = !reduceMotion && !!document.body.animate;
    if (conAbanico) parroquias.querySelectorAll("[data-abanico]").forEach((g) => g.classList.add("is-fan-pending"));
    let activo = null;

    const lanzarAbanico = (g) => {
      if (!g || !g.classList.contains("is-fan-pending")) return; // una sola vez
      const [izq, centro, der] = g.querySelectorAll(".pq__foto");
      const c = centro.getBoundingClientRect();
      const cx = c.left + c.width / 2;
      const cy = c.top + c.height / 2;
      g.classList.remove("is-fan-pending");
      centro.animate([{ opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }], {
        duration: ms("--dur-fan-center"),
        easing,
        fill: "backwards",
      });
      [izq, der].forEach((foto) => {
        const r = foto.getBoundingClientRect();
        const dx = cx - (r.left + r.width / 2); // arranca escondida detrás del centro
        const dy = cy - (r.top + r.height / 2);
        foto.animate(
          [
            { opacity: 0, translate: `${dx}px ${dy}px` },
            { opacity: 1, offset: 0.15 },
            { opacity: 1, translate: "0 0" },
          ],
          { duration: ms("--dur-fan"), delay: ms("--delay-fan"), easing, fill: "backwards" }
        );
      });
      const btn = g.querySelector(".pq__btn");
      if (btn) {
        btn.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: ms("--dur-fan-center"),
          delay: ms("--delay-fan") + ms("--dur-fan") * 0.5,
          fill: "backwards",
        });
      }
    };

    const aplicarColor = (b) => {
      const cs = getComputedStyle(b);
      parroquias.style.setProperty("--pq-fondo", cs.getPropertyValue("--b-fondo").trim());
      parroquias.style.setProperty("--pq-texto", cs.getPropertyValue("--b-texto").trim());
    };
    const activar = (b) => {
      if (b === activo) return;
      activo = b;
      aplicarColor(b);
      const titulo = b.querySelector(".pq__titulo");
      if (titulo) titulo.classList.add("is-visible");
      if (conAbanico) lanzarAbanico(b.querySelector("[data-abanico]"));
    };

    parroquias.classList.add("is-dinamico");
    if (bloques.length) aplicarColor(bloques[0]); // color de partida (sin mostrar nada todavía)
    const pqIO = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && activar(e.target)),
      { rootMargin: "-50% 0px -50% 0px" } // solo cuenta la línea media de la pantalla
    );
    bloques.forEach((b) => pqIO.observe(b));
  }

  /* ---------- 3f) INICIO: VOCES LOCALES ----------
     Pestañas (patrón WAI-ARIA): clic, o flechas / Inicio / Fin con el
     teclado, cambian de persona. En pantallas táctiles no hay hover:
     tocar la foto muestra u oculta la cita (.is-abierta).
     La foto entra como carta (oct-2026, igual que "Desde la raíz"): al
     llegar a la sección desde el centro, y al cambiar de persona desde el
     lado hacia el que se avanza (a la derecha si la persona está después
     en la barra, a la izquierda si está antes). */
  const voces = document.querySelector("[data-voces]");
  if (voces) {
    const tabs = Array.from(voces.querySelectorAll('[role="tab"]'));
    const paneles = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls")));
    const fotoDe = (i) => paneles[i] && paneles[i].querySelector(".voz");
    const conCartas = !reduceMotion && "IntersectionObserver" in window && !!document.body.animate;
    let actual = Math.max(0, tabs.findIndex((t) => t.getAttribute("aria-selected") === "true"));
    let verVoces = null; // espera la primera llegada a la sección
    const primeraEntrada = () => {
      if (!verVoces) return false;
      verVoces.disconnect();
      verVoces = null;
      voces.querySelectorAll(".voz.is-carta-pendiente").forEach((v) => v.classList.remove("is-carta-pendiente"));
      return true;
    };
    if (conCartas && fotoDe(actual)) {
      fotoDe(actual).classList.add("is-carta-pendiente");
      verVoces = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          if (primeraEntrada()) entrarCarta(fotoDe(actual), 0);
        },
        { threshold: 0.3, rootMargin: "0px 0px -15% 0px" } // igual que los demás reveals
      );
      verVoces.observe(paneles[actual]);
    }
    const elegir = (i, conFoco) => {
      const antes = actual;
      actual = i;
      tabs.forEach((t, j) => {
        const activa = i === j;
        t.setAttribute("aria-selected", String(activa));
        t.tabIndex = activa ? 0 : -1;
        if (paneles[j]) paneles[j].hidden = !activa;
      });
      voces.querySelectorAll(".voz.is-abierta").forEach((v) => v.classList.remove("is-abierta"));
      if (conFoco) tabs[i].focus();
      if (conCartas && i !== antes && fotoDe(i)) {
        primeraEntrada(); // si se elige otra persona antes de llegar, ya no espera
        fotoDe(i).getAnimations().forEach((a) => a.cancel());
        entrarCarta(fotoDe(i), Math.sign(i - antes));
      }
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => elegir(i));
      t.addEventListener("keydown", (e) => {
        const n = tabs.length;
        const destino = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
        if (destino !== undefined) {
          e.preventDefault();
          elegir(destino, true);
        }
      });
    });
    const tactil = window.matchMedia("(hover: none)");
    voces.querySelectorAll(".voz").forEach((v) =>
      v.addEventListener("click", (e) => {
        if (e.target.closest("a")) return; // el panel de la cita es un enlace: navega sin cerrarse
        if (tactil.matches) v.classList.toggle("is-abierta");
      })
    );
  }

  /* ---------- 3g) INICIO: DATOS INTERESANTES — cartas que suben con el scroll ----------
     Oct-2026 (como dontboardme.com). La pista es alta (--datos-pantallas) y
     la escena se queda fija adentro (sticky). Mientras se recorre la pista,
     cada carta sube desde abajo de la pantalla hasta su lugar, una tras
     otra: la carta i se mueve en el tramo [i·PASO, i·PASO + TRAMO] del
     avance (0 a 1) y frena al llegar (--ease-out). Lo que pinta va hacia
     el avance real con inercia (la rueda del mouse avanza a saltos), igual
     que la niebla. Solo cambia "translate" y "rotate".
     En pantallas táctiles, tocar una carta la pone al frente para leerla
     entera (con mouse lo hace el CSS al pasar por encima).
     Con "reducir movimiento" no hay escena: las cartas quedan en grilla. */
  const pistaDatos = document.querySelector("[data-datos-pista]");
  const cartasDato = pistaDatos ? Array.from(pistaDatos.querySelectorAll(".dato-carta")) : [];
  if (pistaDatos && cartasDato.length && !reduceMotion) {
    const PASO = 0.22; // cada carta empieza a subir este avance después de la anterior
    const TRAMO = 0.3; // avance que tarda cada carta en llegar (la última llega al 96 %)
    const INERCIA = 0.16;
    const salirSuave = (t) => 1 - Math.pow(1 - t, 3); // cerca de --ease-out
    const entre01 = (v) => Math.min(1, Math.max(0, v));
    let objetivo = 0;
    let actual = null;
    let rafDatos = 0;
    pistaDatos.classList.add("is-escena");
    const leerAvance = () => {
      const recorrido = pistaDatos.offsetHeight - window.innerHeight;
      objetivo = recorrido > 0 ? entre01(-pistaDatos.getBoundingClientRect().top / recorrido) : 0;
    };
    const pintarDatos = () => {
      actual = actual === null || Math.abs(objetivo - actual) < 0.0005 ? objetivo : actual + (objetivo - actual) * INERCIA;
      cartasDato.forEach((carta, i) => {
        const llegada = salirSuave(entre01((actual - i * PASO) / TRAMO));
        carta.style.setProperty("--subida", (1 - llegada).toFixed(4));
      });
      rafDatos = actual !== objetivo ? requestAnimationFrame(pintarDatos) : 0;
    };
    const pedirDatos = () => {
      leerAvance();
      if (!rafDatos) rafDatos = requestAnimationFrame(pintarDatos);
    };
    // Lo que sobra de la escena debajo de las cartas ya ubicadas (menos un
    // margen para la inclinación y la sombra): el CSS lo descuenta.
    const escenaDatos = pistaDatos.querySelector(".datos__escena");
    const medirSobra = () => {
      const fondo = Math.max(...cartasDato.map((c) => c.offsetTop + c.offsetHeight));
      const margen = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--space-l")) || 0;
      const sobra = Math.max(0, escenaDatos.clientHeight - fondo - margen);
      pistaDatos.style.setProperty("--datos-sobra", `${Math.round(sobra)}px`);
    };
    window.addEventListener("scroll", pedirDatos, { passive: true });
    window.addEventListener("resize", () => {
      medirSobra();
      pedirDatos();
    });
    if (document.fonts) document.fonts.ready.then(medirSobra); // el alto del texto depende de la fuente
    medirSobra();
    leerAvance();
    pintarDatos();

    if (window.matchMedia("(hover: none)").matches) {
      cartasDato.forEach((carta) =>
        carta.addEventListener("click", () => {
          const yaEstaba = carta.classList.contains("is-al-frente");
          cartasDato.forEach((c) => c.classList.remove("is-al-frente"));
          if (!yaEstaba) carta.classList.add("is-al-frente");
        })
      );
    }
  }

  /* ---------- 4) APARICIÓN AL HACER SCROLL (fade-in) ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    const makeObserver = (options) =>
      new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      }, options);
    // Contenido: el elemento debe haber entrado un 30% y superado el 15%
    // inferior de la pantalla antes de animarse → se aprecia completo.
    const io = makeObserver({ threshold: 0.3, rootMargin: "0px 0px -15% 0px" });
    // Footer: está al final de la página y nunca sube tanto; se anima
    // apenas se asoma (si no, el copyright y el hashtag no aparecerían).
    const ioFooter = makeObserver({ threshold: 0.1 });
    revealEls.forEach((el) => {
      if (el.hasAttribute("data-reveal-manual")) return; // los muestra su propia sección (p. ej. 3e)
      (el.closest(".site-footer") ? ioFooter : io).observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- 5) TARJETAS GIRATORIAS: tap/clic y teclado (Enter o Espacio) ---------- */
  document.querySelectorAll(".flip").forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-pressed", "false");
    card.setAttribute("aria-label", `${card.querySelector(".flip__front").textContent.trim().replace(/\s+/g, " ") || card.querySelector("img")?.alt || "Tarjeta"}. Girar para ver #MásBiblián`);
  });

  /* ---------- 6) MARQUEE: bucle continuo sin huecos y a velocidad constante ----------
     1. Repite el set original hasta cubrir al menos una pantalla.
     2. Duplica el conjunto exacto → la animación a -50% empalma perfecto.
     3. Las copias se ocultan a lectores de pantalla y al teclado.
     Con "reducir movimiento" no se duplica: la fila queda quieta y se desliza a mano. */
  const MARQUEE_PX_PER_SECOND = 40;
  document.querySelectorAll("[data-marquee]").forEach((track) => {
    if (reduceMotion) return;
    const originals = Array.from(track.children);
    const original = track.innerHTML;
    let guard = 0;
    while (track.scrollWidth < window.innerWidth && guard < 10) {
      track.insertAdjacentHTML("beforeend", original);
      guard++;
    }
    track.insertAdjacentHTML("beforeend", track.innerHTML);
    Array.from(track.children).forEach((el) => {
      if (!originals.includes(el)) {
        el.setAttribute("aria-hidden", "true");
        el.setAttribute("tabindex", "-1");
      }
    });
    track.style.setProperty("--marquee-speed", `${track.scrollWidth / 2 / MARQUEE_PX_PER_SECOND}s`);
  });

  // Pausa al tocar la fila (en escritorio ya pausa con hover)
  document.querySelectorAll(".marquee").forEach((row) => {
    row.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "touch") row.classList.toggle("is-paused");
    });
  });

  // Giro por tap/clic y teclado (delegado: también funciona en las copias)
  const toggleFlip = (card) => {
    const flipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(flipped));
  };
  document.querySelectorAll(".marquee__track").forEach((track) => {
    track.addEventListener("click", (e) => {
      const card = e.target.closest(".flip");
      if (card) toggleFlip(card);
    });
    track.addEventListener("keydown", (e) => {
      const card = e.target.closest(".flip");
      if (card && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        toggleFlip(card);
      }
    });
  });

  /* ---------- 6b) ESQUINA QUE SE DESPEGA: abrir/cerrar al tocar ----------
     En escritorio se abre con hover o con foco de teclado (CSS);
     en táctil, cada toque la abre o la cierra. */
  const peel = document.getElementById("peel");
  if (peel) {
    peel.addEventListener("pointerup", (e) => {
      if (e.pointerType !== "mouse") peel.classList.toggle("is-open");
    });
    peel.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        peel.classList.toggle("is-open");
      }
    });
  }

  /* ---------- 7) VIDEO DE LAS PARROQUIAS ----------
     Sin botón de play: se reproduce solo (silenciado, en bucle) cuando se
     ve al menos la mitad, y se pausa al salir de pantalla. Una vez que
     arranca muestra los controles del navegador (para pausarlo); si la
     persona lo pausa, no vuelve a arrancar solo. Con "reducir movimiento"
     o ahorro de datos, o si el navegador bloquea el autoplay, aparecen los
     controles del navegador para reproducirlo a mano. */
  const videoMedia = document.getElementById("video-media");
  if (videoMedia) {
    const video = videoMedia.querySelector("video");
    const saveData = navigator.connection && navigator.connection.saveData;
    const showControls = () => video.setAttribute("controls", "");

    const startVideo = () =>
      video.play().then(() => {
        videoMedia.classList.add("is-playing");
        showControls();
      });

    if (reduceMotion || saveData || !("IntersectionObserver" in window)) {
      showControls();
    } else {
      let userPaused = false;
      let autoPausing = false;
      video.addEventListener("pause", () => {
        if (!autoPausing) userPaused = true; // pausa hecha por la persona
        autoPausing = false;
      });
      video.addEventListener("play", () => { userPaused = false; });

      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (!userPaused) startVideo().catch(showControls); // si se bloquea, controles del navegador
          } else if (!video.paused) {
            autoPausing = true;
            video.pause();
          }
        },
        { threshold: 0.5 }
      ).observe(videoMedia);
    }
  }
});
