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

// Mosaic of the current projects: demo videos and real captures.
export const gallery: GalleryItem[] = [
  {
    id: "g-caso",
    projectId: "caso-404",
    caption: "Interrogatorios con IA en un videojuego 3D",
    size: "feature",
    frame: "fill",
  },
  {
    id: "g-pmp",
    projectId: "pmp-smart",
    caption: "Diagnóstico de la hoja con una foto",
    size: "tall",
    frame: "phone",
  },
  {
    id: "g-busalert",
    projectId: "busalert",
    caption: "Dices a dónde vas y el reloj te guía",
    size: "tall",
    frame: "watch",
  },
  {
    id: "g-tallerpro",
    projectId: "tallerpro",
    caption: "Órdenes, inventario y reportes del taller",
    size: "feature",
    frame: "fill",
  },
  {
    id: "g-tallerpro-ai",
    projectId: "tallerpro",
    caption: "Cotizador de repuestos con IA",
    size: "wide",
    frame: "fill",
    image: {
      src: "/images/gallery/tallerpro-cotizador.webp",
      alt: "Cotizador con IA de TallerPro mostrando tres opciones de kit de arrastre",
    },
  },
  {
    id: "g-caso-file",
    projectId: "caso-404",
    caption: "Expediente del caso 1",
    size: "small",
    frame: "fill",
    image: {
      src: "/images/gallery/caso-404-expediente.webp",
      alt: "Tarjeta del expediente del caso 1 de El Caso 404",
    },
  },
  {
    id: "g-pmp-tech",
    projectId: "pmp-smart",
    caption: "Vista del técnico agrónomo",
    size: "small",
    frame: "phone",
    image: {
      src: "/images/gallery/pmp-smart-vigilancia.webp",
      alt: "Vista de vigilancia del técnico en PMP Smart con una parcela vinculada",
    },
  },
];
