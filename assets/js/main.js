/* ============================================================
   main.js — Interacciones del sitio Biblián Vive
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1) HEADER: entrada desde los lados + fijo con fondo ---------- */
  const header = document.getElementById("site-header");
  if (header) {
    // entrada desde los lados (pequeña pausa para que la animación se aprecie)
    setTimeout(() => header.classList.add("is-ready"), 350);
    // fondo translúcido al hacer scroll
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 2) MENÚ MÓVIL (hamburguesa) ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll(".nav__link").forEach((link) =>
      link.addEventListener("click", () => nav.classList.remove("is-open"))
    );
  }

  /* ---------- 3) CARRUSEL "Desde la raíz" (Swiper coverflow) ---------- */
  if (typeof Swiper !== "undefined" && document.querySelector(".raiz-swiper")) {
    new Swiper(".raiz-swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: false,
      initialSlide: 1, // arranca en la foto del MEDIO → abanico centrado
      coverflowEffect: { rotate: 0, stretch: 45, depth: 220, modifier: 1, slideShadows: true },
      pagination: { el: ".swiper-pagination", clickable: true },
    });
  }

  /* ---------- 3a) HERO scroll-driven (tipo armenia.travel) ----------
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

  /* ---------- 3b) PARALLAX en títulos (Padre Rumi, Desde la raíz…) ---------- */
  const parallaxItems = Array.from(document.querySelectorAll("[data-parallax]")).map((el) => ({
    el,
    speed: parseFloat(el.dataset.parallax) || 0.25,
    // posición original en el documento (sin transform)
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
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      {
        // El elemento debe haber entrado un 30% Y superado el 15% inferior
        // de la pantalla antes de animarse → se aprecia completo.
        threshold: 0.3,
        rootMargin: "0px 0px -15% 0px",
      }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    // Sin soporte: mostrar todo directamente
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- 5) MARQUEE: bucle continuo SIN huecos ----------
     1. Repite el set original hasta cubrir al menos una pantalla.
     2. Duplica el conjunto exacto → la animación a -50% empalma perfecto. */
  document.querySelectorAll("[data-marquee]").forEach((track) => {
    const original = track.innerHTML;
    let guard = 0;
    while (track.scrollWidth < window.innerWidth && guard < 10) {
      track.innerHTML += original;
      guard++;
    }
    track.innerHTML += track.innerHTML;
  });

  /* ---------- 6) TARJETAS GIRATORIAS: giro al tocar (móvil/clic) ---------- */
  // El hover ya lo maneja el CSS; esto añade el giro por clic/tap.
  document.querySelectorAll(".flip").forEach((card) => {
    card.addEventListener("click", () => card.classList.toggle("is-flipped"));
  });

  /* ---------- 7) VIDEO: el autoplay silencioso lo maneja el HTML
     (autoplay + muted + loop). No necesita JavaScript. ---------- */
});
