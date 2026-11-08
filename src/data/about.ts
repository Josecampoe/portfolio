import type { FocusArea, GalleryItem, Interest } from "@/types";

export const aboutParagraphs: string[] = [
  "Soy José Manuel, estudiante de Ingeniería de Software y una persona divertida y de buena energía. Me gusta reírme, compartir con la gente y que el trabajo en equipo se sienta liviano, sin dejar de tomarme en serio lo que construyo.",
  "Fuera del código me encontrarás haciendo deporte o jugando videojuegos como Fortnite, Valorant o Clash Royale. De los deportes y los juegos aprendí a trabajar en equipo, a tomar decisiones rápido y a no rendirme cuando algo sale mal. Por eso disfruté tanto crear mi propio juego, El Caso 404.",
  "Hacia el futuro, mis estudios apuntan a la ciberseguridad y la inteligencia artificial. Ya integré IA con Google Gemini en varios proyectos y aprendí a proteger las claves detrás de un servidor propio; ahora quiero ir más lejos y construir sistemas inteligentes que además sean seguros.",
];

export const interestsTitle = "Lo que me mueve";

export const interests: Interest[] = [
  {
    id: "fun",
    label: "Buena energía",
    detail: "Me gusta que el equipo se divierta mientras trabaja.",
    icon: "fun",
  },
  {
    id: "sports",
    label: "Deportes",
    detail: "Disciplina, constancia y jugar en equipo.",
    icon: "sports",
  },
  {
    id: "games",
    label: "Videojuegos",
    detail: "Fortnite, Valorant y Clash Royale.",
    icon: "games",
  },
  {
    id: "music",
    label: "Música",
    detail: "Siempre hay una playlist sonando mientras programo.",
    icon: "music",
  },
];

export const focusTitle = "Hacia dónde voy";

export const focusAreas: FocusArea[] = [
  {
    id: "security",
    title: "Ciberseguridad",
    description:
      "Quiero aprender a proteger aplicaciones y datos: desarrollo seguro, análisis de vulnerabilidades y buenas prácticas para que lo que construyo sea confiable.",
    icon: "security",
  },
  {
    id: "ai",
    title: "Inteligencia artificial",
    description:
      "Quiero ir más allá de usar modelos: entender cómo funcionan y aplicarlos a problemas reales, como ya hice al detectar la Punta Morada de la Papa con PMP Smart.",
    icon: "ai",
  },
];

export const galleryTitle = "Un vistazo a lo que hago";

// Scattered gallery with real captures of my projects.
export const gallery: GalleryItem[] = [
  {
    id: "g-caso-hall",
    caption: "El Caso 404 · pasillo del Edificio Mirador",
    shape: "wide",
    image: {
      src: "/projects/caso-404-poster.webp",
      alt: "Pasillo del Edificio Mirador en El Caso 404",
    },
  },
  {
    id: "g-pmp-report",
    caption: "PMP Smart · reporte fitosanitario",
    shape: "tall",
    image: {
      src: "/images/projects/pmp-smart-cover.webp",
      alt: "Reporte fitosanitario de PMP Smart con el diagnóstico de una hoja",
    },
  },
  {
    id: "g-pmp-tech",
    caption: "PMP Smart · vista del técnico agrónomo",
    shape: "tall",
    image: {
      src: "/images/gallery/pmp-smart-vigilancia.webp",
      alt: "Vista de vigilancia del técnico en PMP Smart con una parcela vinculada",
    },
  },
  {
    id: "g-tallerpro-ai",
    caption: "TallerPro · cotizador de repuestos con IA",
    shape: "wide",
    image: {
      src: "/images/gallery/tallerpro-cotizador.webp",
      alt: "Cotizador con IA de TallerPro mostrando tres opciones de kit de arrastre",
    },
  },
  {
    id: "g-busalert",
    caption: "BusAlert · pantalla del reloj",
    shape: "square",
    image: {
      src: "/projects/busalert.webp",
      alt: "Pantalla principal de BusAlert en el reloj",
    },
  },
  {
    id: "g-caso-file",
    caption: "El Caso 404 · expediente del caso 1",
    shape: "wide",
    image: {
      src: "/images/gallery/caso-404-expediente.webp",
      alt: "Tarjeta del expediente del caso 1 de El Caso 404",
    },
  },
  {
    id: "g-caso-room",
    caption: "El Caso 404 · sala de interrogatorio",
    shape: "wide",
    image: {
      src: "/images/gallery/caso-404-interrogatorio.webp",
      alt: "Sala de interrogatorio de El Caso 404 con sospechosos sentados a la mesa",
    },
  },
];
