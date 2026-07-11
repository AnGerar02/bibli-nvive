# Biblián Vive

Sitio web de turismo del cantón **Biblián** — proyecto de tesis (Diseño Gráfico).

Construido en **HTML + CSS + JavaScript puro** (sin frameworks, sin instalaciones).

---

## 🗂️ Estructura del proyecto

```
bibliánvive/
├── index.html                  → Página principal (landing): Inicio · Parroquias · Datos · Voces
│
├── pages/                      → Subpáginas
│   ├── parroquias/             → 5 parroquias (misma plantilla)
│   │   ├── jerusalen.html      → ⭐ Jerusalén / Padre Rumi (la del lunes)
│   │   ├── turupamba.html
│   │   ├── sageo.html
│   │   ├── nazon.html
│   │   └── biblian.html
│   └── voces/                  → 5 voces / habitantes (misma plantilla)
│       ├── rodrigo.html
│       ├── rocio.html
│       ├── maria.html
│       ├── luis.html
│       └── marcos.html
│
├── components/                 → Trozos reutilizables (referencia)
│   ├── header.html             → Menú de navegación
│   └── footer.html             → Pie de página
│
├── data/                       → Contenido en JSON
│   ├── parroquias.json
│   └── voces.json
│
├── assets/                     → Recursos
│   ├── css/
│   │   ├── reset.css           → Normalización entre navegadores
│   │   ├── variables.css       → 🎨 Colores y tipografía (tokens de Figma)
│   │   ├── base.css            → Estilos globales
│   │   ├── components.css      → Menú, botones, tarjetas, footer
│   │   ├── landing.css         → Estilos de la landing
│   │   ├── parroquia.css       → Plantilla de subpágina de parroquia
│   │   └── voz.css             → Plantilla de subpágina de voz
│   ├── js/
│   │   └── main.js             → Menú, scroll suave, carruseles, video
│   ├── img/                    → Imágenes
│   │   ├── landing/
│   │   ├── parroquias/jerusalen/
│   │   ├── voces/
│   │   └── ui/                 → Logo e íconos
│   └── fonts/                  → Tipografías (si se autoalojan)
│
└── README.md
```

## ▶️ Cómo abrir

1. Abrir la carpeta en **VS Code**.
2. (Recomendado) instalar la extensión **Live Server** y hacer clic en *"Go Live"*,
   o simplemente abrir `index.html` en el navegador.

## ✅ Estado actual

- [x] Estructura de carpetas y archivos creada.
- [ ] Colores y tipografía exactos (Figma) → en `assets/css/variables.css`.
- [ ] Maquetar subpágina **Jerusalén / Padre Rumi** (meta del lunes).
- [ ] Landing y demás subpáginas.
