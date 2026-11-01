/* ============================================================
   main.js — Interacciones del sitio biveme
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

  /* ---------- 2a) "PARROQUIAS": desplegable con las cinco parroquias ----------
     Oct-2026 (test de usabilidad: para volver a una parroquia había que
     recorrer toda la página). El ítem es un botón (aria-expanded) que abre
     la lista. Con mouse (desde 600 px) se abre al pasar por encima y se
     cierra al salir; un clic la deja abierta. También se cierra con Esc,
     al tocar afuera, al sacar el foco o al hacer scroll. En el menú móvil,
     tocar la tarjeta abre o cierra la lista debajo de ella. */
  const desplegar = document.querySelector(".nav__desplegar");
  const listaParroquias = desplegar && document.getElementById(desplegar.getAttribute("aria-controls"));
  let cerrarParroquias = () => {};
  if (desplegar && listaParroquias) {
    const conMouse = window.matchMedia("(hover: hover) and (min-width: 600px)");
    let fijo = false; // abierto con clic o teclado (no se cierra al salir el mouse)
    let cierre = 0;
    const abierto = () => desplegar.getAttribute("aria-expanded") === "true";
    const poner = (abrir) => {
      clearTimeout(cierre);
      if (abrir) listaParroquias.style.setProperty("--desplegable-x", `${desplegar.offsetLeft}px`); // alineado con el botón
      else fijo = false;
      desplegar.setAttribute("aria-expanded", String(abrir));
      listaParroquias.hidden = !abrir;
    };
    cerrarParroquias = () => abierto() && poner(false);
    desplegar.addEventListener("click", () => {
      if (abierto() && fijo) poner(false);
      else {
        fijo = true;
        poner(true);
      }
    });
    [desplegar, listaParroquias].forEach((el) => {
      el.addEventListener("pointerenter", (e) => {
        if (e.pointerType !== "mouse" || !conMouse.matches) return;
        clearTimeout(cierre);
        if (!abierto()) poner(true);
      });
      el.addEventListener("pointerleave", (e) => {
        if (e.pointerType !== "mouse" || !conMouse.matches || fijo) return;
        cierre = setTimeout(() => poner(false), 250); // tiempo para pasar del botón a la lista
      });
      el.addEventListener("focusout", (e) => {
        const destino = e.relatedTarget;
        if (destino && !desplegar.contains(destino) && !listaParroquias.contains(destino)) poner(false);
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && abierto()) {
        poner(false);
        desplegar.focus();
      }
    });
    document.addEventListener("pointerdown", (e) => {
      if (abierto() && !desplegar.contains(e.target) && !listaParroquias.contains(e.target)) poner(false);
    });
    window.addEventListener(
      "scroll",
      () => {
        if (abierto() && !document.body.classList.contains("menu-open")) poner(false);
      },
      { passive: true }
    );
    window.addEventListener("resize", () => {
      if (abierto()) listaParroquias.style.setProperty("--desplegable-x", `${desplegar.offsetLeft}px`);
    });
  }

  /* ---------- 2) MENÚ MÓVIL: hamburguesa ↔ X, cierra con X, ítem o Esc ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");
  const desktop = window.matchMedia("(min-width: 600px)");

  if (navToggle && nav) {
    const setMenu = (open) => {
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      if (!open) cerrarParroquias(); // al cerrar el menú, el desplegable vuelve a cerrarse
    };
    navToggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
    // Los enlaces cierran el menú (también los del desplegable de Parroquias)
    nav.querySelectorAll("a.nav__link, .nav__parroquias a").forEach((link) =>
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
     "Desde la raíz" (3), la foto de las voces locales (3f) y las
     actividades de "¿Qué podemos hacer?" (3). */
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
     entra al llegar a ella. Sirve para toda lista con data-cartas: también
     las actividades de "¿Qué podemos hacer?" (oct-2026). */
  const cartas = Array.from(document.querySelectorAll("[data-cartas] > li"));
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

  /* ---------- 3a) HERO: la foto se abre sola al empezar a bajar ----------
     Oct-2026 (referencia: armenia.travel; "la animación es muy dura y
     tiesa"): ya no sigue al scroll cuadro a cuadro. Al bajar un poco
     (UMBRAL, en pantallas) el hero pasa a .is-abierta y el CSS anima --p de
     0 a 1 en 1 s con una curva suave; al volver arriba, se cierra igual. */
  const heroWrap = document.getElementById("hero-wrap");
  // Alto de pantalla estable: el del escenario fijo del hero (100vh). En el
  // celular window.innerHeight cambia cada vez que la barra del navegador
  // aparece o se esconde al hacer scroll, y eso hacía saltar el avance de
  // las animaciones (oct-2026, test de usabilidad: "se traba y tiembla").
  const heroSticky = heroWrap && heroWrap.querySelector(".hero-sticky");
  const medirPantalla = () => (heroSticky ? heroSticky.offsetHeight : window.innerHeight);
  let altoPantalla = medirPantalla();
  if (heroWrap) {
    const UMBRAL = 0.1; // como armenia.travel: unos 80 px de scroll
    let heroTicking = false;
    const updateHero = () => {
      heroWrap.classList.toggle("is-abierta", -heroWrap.getBoundingClientRect().top > altoPantalla * UMBRAL);
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
    window.addEventListener("resize", () => {
      altoPantalla = medirPantalla();
      updateHero();
    });
    updateHero();
  }

  /* ---------- 3a2) INICIO: NIEBLA entre el video y la escena de RAÍCES ----------
     Como white-desert.com. Primero el video se abre (3a) y el título queda
     quieto un tramo para leerse (--hero-reposo). Después:
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
    // Oct-2026 (pedidos del autor: "tapa mucho y no deja ver el parallax",
    // "se desvanece muy rápido y se ve la línea", "sube muy rápido al final,
    // se siente forzado"): la niebla tapa el borde entero mientras está en
    // pantalla (así nunca se ve la línea entre el video y la escena) y,
    // apenas sale por arriba, se va. Subir y desvanecerse van por separado:
    // sube en media pantalla, suave al empezar y al terminar (antes subía en
    // una décima de pantalla, 7 veces más rápido que la página); y se aclara
    // en un cuarto de pantalla, rápido al principio, para que el parallax se
    // vea pronto (antes tapaba su primer tercio casi entero).
    const SALIDA_INICIO = 0; // la niebla empieza a irse con el borde a este alto de la pantalla
    const SALIDA_TRAMO = 0.5; // termina de subir tras este tramo (en pantallas de scroll)
    const DESVANECE = 0.25; // y de desvanecerse tras este otro
    const entre01 = (v) => Math.min(1, Math.max(0, v));
    const mezcla = ([a, b], t) => a + (b - a) * t;
    let altos = [];
    const actual = []; // valores dibujados de cada banda (se acercan al objetivo con inercia)
    let nieblaRaf = 0;
    const medirNiebla = () => { altos = bandas.map((b) => b.offsetHeight); };
    const objetivos = (r, vh, vw) => {
      const inicio = vh * LECTURA; // la apertura del video (3a) ya no ocupa scroll
      const finFijo = r.height - vh; // fin del tramo en que el video queda fijo
      const total = r.height - inicio + vh * (SALIDA_TRAMO - SALIDA_INICIO); // vida completa de la niebla
      const g = entre01((-r.top - inicio) / total); // avance general 0..1
      const subida = entre01((-r.top - inicio) / Math.max(1, finFijo - inicio));
      const borde = Math.min(r.bottom, vh); // mientras está fijo, el borde de la pantalla
      const trayecto = entre01((vh - r.bottom) / (vh * (1 - SALIDA_INICIO))); // borde de abajo → casi arriba
      const fuera = (vh * SALIDA_INICIO - r.bottom) / vh; // pantallas desde que el borde salió
      const t = entre01(fuera / SALIDA_TRAMO);
      const salida = t * t * (3 - 2 * t); // sube: suave al empezar y al terminar
      const aclara = 1 - (1 - entre01(fuera / DESVANECE)) ** 2; // se desvanece: rápido al principio
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
          o: subida > 0 ? aparece * (1 - aclara) : 0,
        };
      });
    };
    const acercar = (a, b, umbral) => (Math.abs(b - a) < umbral ? b : a + (b - a) * INERCIA);
    const pintarNiebla = () => {
      const vh = altoPantalla; // estable (ver 3a)
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
    // Medidas estables (no window.innerHeight, que en el celular cambia con
    // la barra del navegador): el alto del escenario, el reposo final
    // (--capas-reposo) y la cortina (--capas-cubre), en px.
    const escenario = scene.querySelector(".capas");
    let altoEscenario = 0;
    let reposo = 0;
    let cubre = 0;
    let lastC = -1;
    const medirToken = (token) => {
      const regla = document.createElement("div");
      regla.style.cssText = `position:absolute;visibility:hidden;height:var(${token})`;
      scene.appendChild(regla);
      const alto = regla.offsetHeight;
      regla.remove();
      return alto;
    };
    const medirCapas = () => {
      altoEscenario = escenario.offsetHeight;
      reposo = medirToken("--capas-reposo");
      cubre = medirToken("--capas-cubre");
    };
    medirCapas();
    const updateCapas = () => {
      const r = scene.getBoundingClientRect();
      // La animación ocupa el tramo fijo menos el reposo y la cortina: al
      // terminar, la escena completa queda quieta un momento antes de que
      // lleguen las parroquias (oct-2026, test de usabilidad: llegaban
      // demasiado pronto) y después las parroquias suben encima de ella
      // (oct-2026: antes la escena subía pegada a la página, "tiesa").
      const anim = Math.max(1, r.height - altoEscenario - reposo - cubre);
      const p = Math.min(1, Math.max(0, -r.top / anim));
      if (p !== lastP) {
        layers.forEach(({ el, x, y }) => {
          el.style.transform = `translate3d(${lerp(x, p)}%, ${lerp(y, p)}%, 0)`;
        });
        lastP = p;
      }
      // avance de la cortina: la escena sube despacio y se tiñe (inicio.css)
      const c = cubre ? Math.min(1, Math.max(0, (-r.top - anim - reposo) / cubre)) : 0;
      if (c !== lastC) {
        escenario.style.setProperty("--cubre", c.toFixed(4));
        lastC = c;
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
    window.addEventListener("resize", () => {
      medirCapas();
      updateCapas();
    });
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
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            activar(e.target);
          } else if (e.target === bloques[0] && activo && e.boundingClientRect.top > window.innerHeight / 2) {
            // Al volver a subir por encima de la primera parroquia, vuelve su
            // color (solo el color: lo demás ya apareció). Antes se quedaba el
            // de la última vista y la marea que sube sobre RAÍCES lo llevaba.
            activo = null;
            aplicarColor(bloques[0]);
          }
        }),
      { rootMargin: "-50% 0px -50% 0px" } // solo cuenta la línea media de la pantalla
    );
    bloques.forEach((b) => pqIO.observe(b));
  }

  /* ---------- 3f) INICIO: VOCES LOCALES ----------
     Pestañas (patrón WAI-ARIA): clic, o flechas / Inicio / Fin con el
     teclado, cambian de persona. La ficha está siempre abierta (foto,
     cita y botón; oct-2026): ya no hay nada que mostrar al tocar.
     La ficha entra como carta (oct-2026, igual que "Desde la raíz"): al
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
  }

  /* ---------- 3g) INICIO: DATOS INTERESANTES — cartas que suben con el scroll ----------
     Oct-2026 (como dontboardme.com). La pista es alta (--datos-pantallas) y
     la escena se queda fija adentro (sticky). La primera carta sube
     mientras la sección entra a la pantalla (desde que su borde de arriba
     pasa el 80 % de la pantalla) y llega justo cuando la escena se queda
     fija; mientras se recorre la pista, las demás suben desde abajo de la
     pantalla hasta su lugar, una tras otra: la carta i (desde la segunda)
     se mueve en el tramo [(i − 1)·PASO, (i − 1)·PASO + TRAMO] del avance
     (0 a 1). Todas frenan al llegar (--ease-out). Oct-2026 (test de
     usabilidad: el primer dato tardaba casi una pantalla de scroll en
     aparecer, se veía la sección vacía y una pareja pensó que algo había
     fallado): la primera llega con la sección y el tramo fijo pasó de 3 a
     1,5 pantallas. Lo que pinta va hacia
     el avance real con inercia (la rueda del mouse avanza a saltos), igual
     que la niebla. Solo cambia "translate" y "rotate".
     En pantallas táctiles, tocar una carta la pone al frente para leerla
     entera (con mouse lo hace el CSS al pasar por encima).
     Con "reducir movimiento" no hay escena: las cartas quedan en grilla. */
  const pistaDatos = document.querySelector("[data-datos-pista]");
  const cartasDato = pistaDatos ? Array.from(pistaDatos.querySelectorAll(".dato-carta")) : [];
  if (pistaDatos && cartasDato.length && !reduceMotion) {
    const PASO = 0.28; // cada carta empieza a subir este avance después de la anterior
    const TRAMO = 0.36; // avance que tarda cada carta en llegar (la última llega al 92 %)
    const ENTRADA_INICIO = 0.2; // la primera empieza a subir cuando la sección pasa el 80 % de la pantalla
    const INERCIA = 0.16;
    const salirSuave = (t) => 1 - Math.pow(1 - t, 3); // cerca de --ease-out
    const entre01 = (v) => Math.min(1, Math.max(0, v));
    let objetivo = 0; // avance dentro del tramo fijo (cartas 2 a 4)
    let objetivoEntrada = 0; // avance de la entrada de la sección (carta 1)
    let actual = null;
    let actualEntrada = null;
    let rafDatos = 0;
    pistaDatos.classList.add("is-escena");
    const escenaDatos = pistaDatos.querySelector(".datos__escena");
    const leerAvance = () => {
      // con el alto de la escena (100svh), no window.innerHeight: en el
      // celular este cambia con la barra del navegador y el avance saltaba
      const alto = escenaDatos.offsetHeight;
      const arriba = pistaDatos.getBoundingClientRect().top;
      const recorrido = pistaDatos.offsetHeight - alto;
      objetivo = recorrido > 0 ? entre01(-arriba / recorrido) : 0;
      objetivoEntrada = entre01((1 - arriba / alto - ENTRADA_INICIO) / (1 - ENTRADA_INICIO));
    };
    const acercar = (a, b) => (a === null || Math.abs(b - a) < 0.0005 ? b : a + (b - a) * INERCIA);
    const pintarDatos = () => {
      actual = acercar(actual, objetivo);
      actualEntrada = acercar(actualEntrada, objetivoEntrada);
      cartasDato.forEach((carta, i) => {
        // la primera sube con la entrada de la sección; las demás, por turno en el tramo fijo
        const llegada = i === 0 ? salirSuave(actualEntrada) : salirSuave(entre01((actual - (i - 1) * PASO) / TRAMO));
        carta.style.setProperty("--subida", (1 - llegada).toFixed(4));
      });
      const moviendo = actual !== objetivo || actualEntrada !== objetivoEntrada;
      rafDatos = moviendo ? requestAnimationFrame(pintarDatos) : 0;
    };
    const pedirDatos = () => {
      leerAvance();
      if (!rafDatos) rafDatos = requestAnimationFrame(pintarDatos);
    };
    // Lo que sobra de la escena debajo de las cartas ya ubicadas (menos un
    // margen para la inclinación y la sombra): el CSS lo descuenta.
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
    // En "¿Qué podemos hacer?" ya no giran: cada tarjeta resalta su foto (6c)
    if (card.closest("[data-filas-conectadas]")) {
      card.setAttribute("aria-label", card.querySelector(".flip__front").textContent.trim().replace(/\s+/g, " ") || card.querySelector("img")?.alt || "Foto");
      return;
    }
    card.setAttribute("aria-label", `${card.querySelector(".flip__front").textContent.trim().replace(/\s+/g, " ") || card.querySelector("img")?.alt || "Tarjeta"}. Girar para ver #MásBiblián`);
  });

  /* ---------- 5b) VISOR DE FOTOS (páginas de parroquia) ----------
     Oct-2026 (test de usabilidad: hacían clic en las fotos esperando que
     pasara algo). Las fotos de "Desde la raíz" se abren en grande y, debajo,
     el número de foto (2 / 3). La descripción de cada foto queda como texto
     alternativo. Flechas, teclado (← →) o deslizar para pasar de foto; X,
     Esc o tocar afuera para cerrar. Es un <dialog>: el foco queda dentro
     mientras está abierto y vuelve a la foto al cerrar. (La fila de fotos
     de "¿Qué podemos hacer?" no es galería: sigue girando, 5.) */
  const datosVisor = document.querySelector("[data-visor]");
  if (datosVisor && typeof HTMLDialogElement === "function") {
    const fotosRaiz = Array.from(document.querySelectorAll(".raiz-carta img"));
    const fotos = fotosRaiz.map((img) => ({ src: img.getAttribute("src"), alt: img.alt }));
    const parroquia = datosVisor.dataset.visorParroquia;

    // "Desde la raíz": cada foto pasa a estar dentro de un botón
    const botonesRaiz = fotosRaiz.map((img, i) => {
      const boton = document.createElement("button");
      boton.type = "button";
      boton.className = "visor-foto";
      boton.dataset.visorI = String(i);
      boton.setAttribute("aria-label", `Ver en grande: ${img.alt}`);
      img.replaceWith(boton);
      boton.append(img);
      return boton;
    });

    // Puntos debajo de las fotos (§7.5): avisan que es una galería. El
    // amarillo marca la foto que se mira (con el mouse encima, o la última
    // vista en el visor) y tocar uno abre esa foto. Son un atajo para el
    // mouse y el dedo: el teclado y los lectores de pantalla usan las fotos,
    // que ya son botones.
    const puntos = document.createElement("div");
    puntos.className = "raiz-puntos";
    puntos.setAttribute("aria-hidden", "true");
    puntos.innerHTML = fotosRaiz.map((_, i) => `<button class="raiz-punto" type="button" tabindex="-1" data-visor-i="${i}"></button>`).join("");
    document.querySelector(".raiz-cartas").after(puntos);
    const marcarPunto = (i) => puntos.querySelectorAll(".raiz-punto").forEach((p, k) => p.classList.toggle("is-activo", k === i));
    marcarPunto(0);
    botonesRaiz.forEach((boton, i) => {
      boton.addEventListener("pointerenter", () => marcarPunto(i));
      boton.addEventListener("focus", () => marcarPunto(i));
    });
    // Entran con un fundido después de las cartas (§7.0b: los puntos al final)
    if (!reduceMotion && "IntersectionObserver" in window && puntos.animate) {
      const css = getComputedStyle(document.documentElement);
      const segundos = (nombre) => parseFloat(css.getPropertyValue(nombre)) * 1000;
      puntos.classList.add("is-carta-pendiente");
      new IntersectionObserver(
        (entries, obs) => {
          if (!entries[0].isIntersecting) return;
          obs.disconnect();
          puntos.classList.remove("is-carta-pendiente");
          puntos.animate({ opacity: [0, 1] }, {
            duration: segundos("--dur-fan"),
            delay: segundos("--delay-fan") * fotosRaiz.length,
            easing: css.getPropertyValue("--ease-out").trim(),
            fill: "backwards",
          });
        },
        { threshold: 0.3, rootMargin: "0px 0px -15% 0px" } // igual que las cartas
      ).observe(puntos);
    }

    const svg = (d) => `<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="${d}"/></svg>`;
    const visor = document.createElement("dialog");
    visor.className = "visor";
    visor.setAttribute("aria-label", `Fotos de ${parroquia}`);
    visor.innerHTML = `
      <div class="visor__marco">
        <div class="visor__figura">
          <img class="visor__foto" alt="" />
          <button class="visor__boton visor__anterior" type="button" aria-label="Foto anterior">${svg("M647-440H160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h487L451-716q-12-12-11.5-28t12.5-28q12-11 28-11.5t28 11.5l264 264q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L508-188q-11 11-27.5 11T452-188q-12-12-12-28.5t12-28.5l195-195Z")}</button>
          <button class="visor__boton visor__siguiente" type="button" aria-label="Foto siguiente">${svg("M647-440H160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h487L451-716q-12-12-11.5-28t12.5-28q12-11 28-11.5t28 11.5l264 264q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L508-188q-11 11-27.5 11T452-188q-12-12-12-28.5t12-28.5l195-195Z")}</button>
        </div>
        <p class="visor__cuenta" aria-live="polite"></p>
      </div>
      <button class="visor__boton visor__cerrar" type="button" aria-label="Cerrar">${svg("M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z")}</button>`;
    document.body.append(visor);
    const fotoVisor = visor.querySelector(".visor__foto");
    const cuentaVisor = visor.querySelector(".visor__cuenta");
    let actualVisor = 0;

    const mostrarFoto = (i) => {
      actualVisor = (i + fotos.length) % fotos.length;
      const { src, alt } = fotos[actualVisor];
      fotoVisor.src = src;
      fotoVisor.alt = alt;
      cuentaVisor.textContent = `${actualVisor + 1} / ${fotos.length}`;
      fotoVisor.classList.remove("is-nueva");
      void fotoVisor.offsetWidth; // para que la entrada se repita
      fotoVisor.classList.add("is-nueva");
      marcarPunto(actualVisor);
      // la anterior y la siguiente se piden antes: pasar de foto es inmediato
      [1, -1].forEach((paso) => { new Image().src = fotos[(actualVisor + paso + fotos.length) % fotos.length].src; });
    };
    const abrirVisor = (i) => {
      mostrarFoto(i);
      visor.showModal();
    };

    // Abrir: clic en una foto (es un botón: también con Enter o Espacio) o
    // en su punto. Desde un punto, el foco pasa a la foto: al cerrar vuelve ahí.
    document.addEventListener("click", (e) => {
      const foto = e.target.closest("[data-visor-i]");
      if (!foto || visor.contains(foto)) return;
      const i = Number(foto.dataset.visorI);
      if (foto.classList.contains("raiz-punto")) botonesRaiz[i].focus({ preventScroll: true });
      abrirVisor(i);
    });
    visor.querySelector(".visor__anterior").addEventListener("click", () => mostrarFoto(actualVisor - 1));
    visor.querySelector(".visor__siguiente").addEventListener("click", () => mostrarFoto(actualVisor + 1));
    visor.querySelector(".visor__cerrar").addEventListener("click", () => visor.close());
    visor.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") mostrarFoto(actualVisor - 1);
      if (e.key === "ArrowRight") mostrarFoto(actualVisor + 1);
    });
    // Tocar afuera (el fondo azul, no la foto) cierra
    visor.addEventListener("click", (e) => {
      if (e.target === visor || e.target.classList.contains("visor__marco") || e.target.classList.contains("visor__figura")) visor.close();
    });
    // Deslizar la foto de lado pasa a la anterior o a la siguiente
    let inicioX = null;
    fotoVisor.addEventListener("pointerdown", (e) => { inicioX = e.clientX; });
    fotoVisor.addEventListener("pointerup", (e) => {
      if (inicioX === null) return;
      const dx = e.clientX - inicioX;
      inicioX = null;
      if (Math.abs(dx) > 40) mostrarFoto(actualVisor + (dx < 0 ? 1 : -1));
    });
  }

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
      if (card && !card.closest("[data-filas-conectadas]")) toggleFlip(card);
    });
    track.addEventListener("keydown", (e) => {
      const card = e.target.closest(".flip");
      if (card && !card.closest("[data-filas-conectadas]") && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        toggleFlip(card);
      }
    });
  });

  /* ---------- 6c) FILAS CONECTADAS ("¿Qué podemos hacer?") ----------
     Oct-2026 (test de usabilidad: las tarjetas solo giraban y mostraban
     #MásBiblián; esperaban algo más). Cada tarjeta de arriba (actividad o
     palabra) tiene su foto en la fila de abajo (data-foto). Al tocarla, las
     dos filas se detienen, la de abajo se desliza hasta dejar esa foto
     debajo de la tarjeta y la pareja se resalta (CSS 7b). Tocar una foto hace
     lo mismo al revés. Se suelta tocando otra vez, tocando afuera, con Esc o
     al salir de la sección. */
  const filas = document.querySelector("[data-filas-conectadas]");
  if (filas) {
    const [filaTarjetas, filaFotos] = filas.querySelectorAll(".marquee");
    const archivo = (foto) => foto.querySelector("img").getAttribute("src").split("/").pop();
    const centro = (el) => { const r = el.getBoundingClientRect(); return r.left + r.width / 2; };
    const aviso = document.createElement("p"); // lo que se resalta, para lectores de pantalla
    aviso.className = "sr-only";
    aviso.setAttribute("aria-live", "polite");
    filas.append(aviso);
    let elegida = null;
    let resaltada = null;
    let desliz = 0;

    // Desliza la fila hasta que una de las copias (candidatas) quede centrada
    // en x, y la devuelve. Mueve el tiempo de su animación (no la posición),
    // así el bucle sigue sin cortes. Sirven las copias que llegan sin pasar
    // por el punto donde el bucle vuelve a empezar (ahí la fila salta y
    // quedaría debajo otra copia); de esas, la que menos se mueve.
    const llevar = (fila, candidatas, x) => {
      const track = fila.querySelector(".marquee__track");
      const anim = track.getAnimations()[0];
      if (!anim) { // movimiento reducido: la fila se desliza a mano
        const destino = candidatas.reduce((a, b) => (Math.abs(centro(b) - x) < Math.abs(centro(a) - x) ? b : a));
        fila.scrollLeft -= x - centro(destino);
        return destino;
      }
      const ciclo = anim.effect.getComputedTiming().duration;
      const recorrido = track.getBoundingClientRect().width / 2;
      const sentido = fila.classList.contains("marquee--reverse") ? 1 : -1;
      const desde = anim.currentTime ?? 0;
      const vuelta = Math.floor(desde / ciclo) * ciclo;
      const dentro = (t) => Math.min(Math.max(t, vuelta), vuelta + ciclo - 1);
      const opciones = candidatas.map((el) => {
        const t = desde + ((sentido * (x - centro(el))) / recorrido) * ciclo;
        return { el, hasta: dentro(t), fuera: Math.abs(t - dentro(t)) };
      });
      const mejor = opciones.reduce((a, b) =>
        b.fuera < a.fuera || (b.fuera === a.fuera && Math.abs(b.hasta - desde) < Math.abs(a.hasta - desde)) ? b : a
      );
      const dura = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--dur-flip")) * 1000;
      const t0 = performance.now();
      cancelAnimationFrame(desliz);
      const paso = (t) => {
        const k = Math.min(1, (t - t0) / dura);
        anim.currentTime = desde + (mejor.hasta - desde) * (1 - (1 - k) ** 3);
        if (k < 1) desliz = requestAnimationFrame(paso);
      };
      desliz = requestAnimationFrame(paso);
      return mejor.el;
    };

    // La pareja se resalta con el color de la tarjeta (CSS 7b)
    const marcar = (tarjeta, foto) => {
      const frente = getComputedStyle(tarjeta.querySelector(".qfront"));
      [tarjeta, foto].forEach((el) => {
        el.style.setProperty("--pareja", frente.backgroundColor);
        el.style.setProperty("--pareja-texto", frente.color);
      });
      tarjeta.classList.add("is-elegida");
      foto.classList.add("is-resaltada");
      foto.querySelector(".flip__front").dataset.etiqueta = tarjeta.querySelector(".qfront__title, .qword").textContent.trim();
      elegida = tarjeta;
      resaltada = foto;
    };

    const soltar = () => {
      cancelAnimationFrame(desliz);
      [elegida, resaltada].forEach((el) => {
        if (!el) return;
        el.classList.remove("is-elegida", "is-resaltada");
        el.setAttribute("aria-pressed", "false");
        el.style.removeProperty("--pareja");
        el.style.removeProperty("--pareja-texto");
      });
      resaltada?.querySelector(".flip__front").removeAttribute("data-etiqueta");
      elegida = resaltada = null;
      filas.classList.remove("is-conectando");
      filas.querySelectorAll(".marquee").forEach((fila) => fila.classList.remove("is-paused"));
      aviso.textContent = "";
    };

    const conectar = (origen) => {
      if (origen === elegida || origen === resaltada) return soltar(); // tocarla otra vez la suelta
      soltar();
      const esFoto = origen.classList.contains("q-photo");
      const nombre = esFoto ? archivo(origen) : origen.dataset.foto;
      const candidatas = esFoto
        ? Array.from(filaTarjetas.querySelectorAll(".q-item")).filter((t) => t.dataset.foto === nombre)
        : Array.from(filaFotos.querySelectorAll(".q-photo")).filter((f) => archivo(f) === nombre);
      if (!candidatas.length) return;
      filas.classList.add("is-conectando");
      const destino = llevar(esFoto ? filaTarjetas : filaFotos, candidatas, centro(origen));
      if (esFoto) marcar(destino, origen);
      else marcar(origen, destino);
      origen.setAttribute("aria-pressed", "true");
      aviso.textContent = esFoto ? elegida.getAttribute("aria-label") : resaltada.querySelector("img").alt;
    };

    filas.addEventListener("click", (e) => {
      const pieza = e.target.closest(".q-item[data-foto], .q-photo");
      if (pieza) conectar(pieza);
      else if (elegida) soltar();
    });
    filas.addEventListener("keydown", (e) => {
      const pieza = e.target.closest(".q-item[data-foto], .q-photo");
      if (pieza && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        conectar(pieza);
      }
      if (e.key === "Escape" && elegida) soltar();
    });
    document.addEventListener("click", (e) => {
      if (elegida && !filas.contains(e.target)) soltar();
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entrada]) => {
        if (!entrada.isIntersecting && elegida) soltar();
      }).observe(filas);
    }
  }

  /* ---------- 6f) TÍTULOS PALABRA POR PALABRA (data-palabras: los títulos de sección de todo el sitio) ----------
     Oct-2026 (referencia: juanmora.co, con sus mismos valores): las palabras
     del título empiezan tenues y en el color de acento, y se encienden en
     ola (varias a la vez, cada una arranca rápido y frena suave) mientras el
     título sube del 80 % al 50 % de la pantalla; al soltar el scroll siguen
     deslizándose un momento. La pastilla cuenta como una palabra (sin
     cambiar de color). Reemplaza al fundido del título (data-reveal). Al
     volver a subir se apagan, como en juanmora.co (excepción a "una sola
     vez" de §7.0b, pedido del autor). Con "reducir movimiento", el título
     queda como siempre. Historial: la primera versión era lineal y sin
     deslizamiento ("se ven forzados con el scroll, rectos y lentos") y no
     se apagaba al subir; se probó primero en Nazón. */
  const partirPalabras = (titulo) => {
    const palabras = [];
    Array.from(titulo.childNodes).forEach((nodo) => {
      if (nodo.nodeType === Node.TEXT_NODE) {
        const trozos = document.createDocumentFragment();
        nodo.textContent.split(/(\s+)/).forEach((t) => {
          if (!t) return;
          if (!t.trim()) return trozos.append(t); // los espacios quedan como texto
          const palabra = document.createElement("span");
          palabra.className = "palabra";
          palabra.textContent = t;
          trozos.append(palabra);
          palabras.push(palabra);
        });
        nodo.replaceWith(trozos);
      } else if (nodo.nodeType === Node.ELEMENT_NODE && nodo.tagName !== "BR") {
        palabras.push(nodo); // la pastilla va entera
      }
    });
    return palabras;
  };
  const titulosPalabras = reduceMotion
    ? []
    : Array.from(document.querySelectorAll("[data-palabras]")).map((titulo) => {
        titulo.removeAttribute("data-reveal");
        return { titulo, palabras: partirPalabras(titulo), objetivo: 0, actual: 0 };
      });
  if (titulosPalabras.length) {
    const TENUE = 0.3; // opacidad de las palabras que faltan (como en juanmora.co)
    const DESDE = 0.8; // empieza con el borde de arriba del título al 80 % de la pantalla
    const HASTA = 0.5; // y termina al 50 %
    const ONDA = 3; // cada palabra dura lo que tardan en salir 3 (juanmora.co: 0,6 s cada una, 0,2 s entre una y otra)
    const SEGUIR = 0.25; // s: después de soltar el scroll tarda ~0,8 s en llegar (su "scrub" de 0,8)
    // las que faltan van en el color de acento (en juanmora.co, durazno) y llegan al del título
    // (currentColor: el que tenga el título en ese momento)
    const acento = getComputedStyle(document.documentElement).getPropertyValue("--md-accent").trim();
    const entre01 = (v) => Math.min(1, Math.max(0, v));
    const salida = (x) => 1 - (1 - x) ** 4; // arranca rápido y frena suave
    let raf = 0;
    let antes = 0;
    // Alto de pantalla estable (como las escenas, ver 3a): en el celular
    // window.innerHeight cambia cuando la barra del navegador aparece o se
    // esconde, y las palabras se encendían o apagaban de golpe. Se mide la
    // pantalla grande (100lvh) y solo se vuelve a medir si cambia el ancho.
    let vh = 0;
    let anchoMedido = 0;
    const medirAlto = () => {
      if (window.innerWidth === anchoMedido) return;
      anchoMedido = window.innerWidth;
      const regla = document.createElement("div");
      regla.style.cssText = "position:fixed;visibility:hidden;height:100lvh";
      document.body.appendChild(regla);
      vh = regla.offsetHeight || window.innerHeight;
      regla.remove();
    };
    const leer = () => {
      medirAlto();
      titulosPalabras.forEach((t) => {
        const avance = entre01((vh * DESDE - t.titulo.getBoundingClientRect().top) / (vh * (DESDE - HASTA)));
        t.objetivo = avance; // al volver a subir se apagan otra vez
      });
    };
    const pintar = (ahora) => {
      // inercia según el tiempo (no por cuadro): igual de suave a 60 o a 120 Hz
      const dt = antes ? Math.min(0.1, (ahora - antes) / 1000) : 1 / 60;
      antes = ahora;
      const paso = 1 - Math.exp(-dt / SEGUIR);
      let falta = false;
      titulosPalabras.forEach((t) => {
        t.actual += (t.objetivo - t.actual) * paso;
        if (Math.abs(t.objetivo - t.actual) < 0.001) t.actual = t.objetivo;
        else falta = true;
        const n = t.palabras.length;
        t.palabras.forEach((palabra, i) => {
          const luz = salida(entre01((t.actual * (n - 1 + ONDA) - i) / ONDA));
          palabra.style.opacity = luz < 1 ? (TENUE + (1 - TENUE) * luz).toFixed(3) : "";
          if (!palabra.classList.contains("palabra")) return; // la pastilla conserva su color
          palabra.style.color = luz < 1 ? `color-mix(in oklab, ${acento} ${Math.round((1 - luz) * 100)}%, currentColor)` : "";
        });
      });
      if (falta) {
        raf = requestAnimationFrame(pintar);
      } else {
        raf = 0;
        antes = 0;
      }
    };
    const pedir = () => {
      leer();
      if (!raf) raf = requestAnimationFrame(pintar);
    };
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    leer();
    titulosPalabras.forEach((t) => (t.actual = t.objetivo));
    pintar(performance.now());
  }

  /* ---------- 6b) ESQUINA QUE SE DESPEGA: abrir/cerrar al tocar ----------
     En escritorio se abre con hover o con foco de teclado (CSS);
     en táctil, cada toque la abre o la cierra. Con la esquina abierta,
     "Cómo llegar" abre Google Maps (y no la cierra). */
  const peel = document.getElementById("peel");
  if (peel) {
    peel.addEventListener("pointerup", (e) => {
      if (e.pointerType !== "mouse" && !e.target.closest(".peel__mapa")) peel.classList.toggle("is-open");
    });
    peel.addEventListener("keydown", (e) => {
      if (e.target !== peel) return; // en "Cómo llegar", Enter sigue el enlace
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
