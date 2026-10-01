/* ============================================================
   main.js — Interacciones del sitio Biblián Vive
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      header.classList.toggle("scrolled", y > TOP_ZONE);

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
  if (navToggle && nav) {
    const setMenu = (open) => {
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    };
    navToggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
    nav.querySelectorAll(".nav__link").forEach((link) =>
      link.addEventListener("click", () => setMenu(false))
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        navToggle.focus();
      }
    });
    // Si se agranda la pantalla con el menú abierto, se cierra
    window.matchMedia("(min-width: 600px)").addEventListener("change", (e) => {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- 3) CARRUSEL "Desde la raíz" (Swiper coverflow, no avanza solo) ---------- */
  if (typeof Swiper !== "undefined" && document.querySelector(".raiz-swiper")) {
    new Swiper(".raiz-swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: false,
      initialSlide: 1, // arranca en la foto del medio → abanico centrado
      speed: reduceMotion ? 0 : 300,
      coverflowEffect: { rotate: 0, stretch: 45, depth: 220, modifier: 1, slideShadows: true },
      pagination: { el: ".swiper-pagination", clickable: true },
      a11y: {
        prevSlideMessage: "Foto anterior",
        nextSlideMessage: "Foto siguiente",
        paginationBulletMessage: "Ir a la foto {{index}}",
      },
    });

    /* Entrada en abanico (como landonorris.com): al entrar en pantalla aparece
       primero la foto del centro y luego las laterales salen desde detrás de
       ella hacia su lugar. Se usa la propiedad "translate", que se suma al
       "transform" que Swiper pone en cada foto sin pisarlo. */
    const fan = document.querySelector(".raiz-swiper[data-fan]");
    if (fan && !reduceMotion && "IntersectionObserver" in window && fan.animate) {
      fan.classList.add("is-fan-pending");
      new IntersectionObserver(
        (entries, obs) => {
          if (!entries[0].isIntersecting) return;
          obs.disconnect();

          const css = getComputedStyle(document.documentElement);
          const ms = (token) => parseFloat(css.getPropertyValue(token)) * 1000; // tokens en segundos
          const easing = css.getPropertyValue("--ease-out").trim();
          const slides = Array.from(fan.querySelectorAll(".swiper-slide"));
          const active = Math.max(0, slides.findIndex((s) => s.classList.contains("swiper-slide-active")));
          const center = slides[active].getBoundingClientRect();
          const centerX = center.left + center.width / 2;

          fan.classList.remove("is-fan-pending");
          slides.forEach((slide, i) => {
            const distance = Math.abs(i - active); // 0 = centro, 1 = vecinas, 2…
            if (distance === 0) {
              slide.animate(
                [{ opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }],
                { duration: ms("--dur-fan-center"), easing, fill: "backwards" }
              );
              return;
            }
            // Arranca escondida detrás del centro. La perspectiva 3D achica el
            // desplazamiento en pantalla, así que se mide y se compensa.
            const r = slide.getBoundingClientRect();
            const startX = r.left + r.width / 2;
            let dx = centerX - startX;
            slide.style.translate = `${dx}px 0`;
            const moved = slide.getBoundingClientRect().left + r.width / 2 - startX;
            slide.style.translate = "";
            if (Math.abs(moved) > 1) dx *= dx / moved;
            slide.animate(
              [
                { opacity: 0, translate: `${dx}px 0` },
                { opacity: 1, offset: 0.15 },
                { opacity: 1, translate: "0 0" },
              ],
              {
                duration: ms("--dur-fan"),
                delay: ms("--delay-fan") * distance, // las más lejanas salen después
                easing,
                fill: "backwards",
              }
            );
          });
          const dots = fan.querySelector(".swiper-pagination");
          if (dots) {
            dots.animate([{ opacity: 0 }, { opacity: 1 }], {
              duration: ms("--dur-fan-center"),
              delay: ms("--delay-fan") + ms("--dur-fan") * 0.5,
              fill: "backwards",
            });
          }
        },
        { threshold: 0.3, rootMargin: "0px 0px -15% 0px" } // igual que los demás reveals
      ).observe(fan);
    }
  }

  /* ---------- 3a) HERO scroll-driven ----------
     Calcula el progreso 0→1 mientras se atraviesa el hero y lo pasa
     al CSS por la variable --p (el CSS hace el resto). */
  const heroWrap = document.getElementById("hero-wrap");
  if (heroWrap) {
    let heroTicking = false;
    const updateHero = () => {
      const range = heroWrap.offsetHeight - window.innerHeight;
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
    updateParallax();
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
    revealEls.forEach((el) => (el.closest(".site-footer") ? ioFooter : io).observe(el));
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

  /* ---------- 7) VIDEO ----------
     Se reproduce solo (silenciado, en bucle) cuando se ve al menos la mitad,
     y se pausa al salir de pantalla. Si la persona lo pausa, no vuelve a
     arrancar solo. Con "reducir movimiento" o ahorro de datos, o si el
     navegador bloquea el autoplay, queda la portada con el botón de play. */
  const videoMedia = document.getElementById("video-media");
  const videoBtn = document.getElementById("video-btn");
  if (videoMedia && videoBtn) {
    const video = videoMedia.querySelector("video");
    const saveData = navigator.connection && navigator.connection.saveData;

    const startVideo = () =>
      video.play().then(() => {
        videoMedia.classList.add("is-playing");
        video.setAttribute("controls", "");
      });

    videoBtn.addEventListener("click", () => {
      startVideo().catch(() => {});
      video.focus();
    });

    if (!reduceMotion && !saveData && "IntersectionObserver" in window) {
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
            if (!userPaused) startVideo().catch(() => {}); // si se bloquea, queda el botón
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
