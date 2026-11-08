import type { Project, ProjectCategory } from "@/types";

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "web", label: "Web" },
  { id: "mobile", label: "Móvil" },
  { id: "smartwatch", label: "Smartwatch" },
  { id: "desktop", label: "Escritorio" },
  { id: "game", label: "Videojuego" },
  { id: "ai", label: "IA" },
];

const github = "https://github.com/Josecampoe";

// "logo" is shown on the strip over the brand color "tint" (the video plays in the detail).
// "device" picks the frame of the detail view; "video" or "image" fills its screen.
// Demo links point to each repo's Releases page (.exe / .apk downloads).
export const projects: Project[] = [
  {
    id: "caso-404",
    title: "El Caso 404",
    description:
      "Videojuego 3D de investigación criminal en primera persona. Exploras escenas, analizas evidencias e interrogas sospechosos que responden con IA, mientras tu asistente ALEX intenta manipular la investigación. Dos casos y siete finales.",
    categories: ["game", "ai"],
    tags: ["Unity 6", "C#", "URP", "Gemini", "Cloudflare Workers"],
    year: "2026",
    device: "console",
    logo: {
      src: "/images/projects/caso-404-logo.webp",
      alt: "Logotipo de El Caso 404",
      kind: "wordmark",
    },
    tint: "#0e0f18",
    video: {
      webm: "/projects/caso-404.webm",
      mp4: "/projects/caso-404.mp4",
      poster: "/projects/caso-404-poster.webp",
      label:
        "Avance de El Caso 404: menú principal, carta del caso, el pasillo del Edificio Mirador y la sala de interrogatorio",
    },
    github: `${github}/CriminalisticaGame`,
    demo: { label: "Descargar juego", url: `${github}/CriminalisticaGame/releases` },
  },
  {
    id: "pmp-smart",
    title: "PMP Smart",
    description:
      "App móvil de monitoreo fitosanitario para cultivos de papa. Detecta con IA la Punta Morada de la Papa a partir de una foto de la hoja, registra parcelas con GPS y conecta al agricultor con un técnico agrónomo.",
    categories: ["mobile", "ai"],
    tags: ["React Native", "Expo", "NativeWind", "Express", "Gemini"],
    year: "2026",
    device: "phone",
    logo: {
      src: "/images/projects/pmp-smart-icon.webp",
      alt: "Logo de PMP Smart: hojas de papa con circuitos",
      kind: "icon",
    },
    tint: "#173f27",
    video: {
      webm: "/projects/pmp-smart.webm",
      mp4: "/projects/pmp-smart.mp4",
      poster: "/projects/pmp-smart-poster.webp",
      label:
        "Demostración de PMP Smart: el agricultor registra una parcela y ve el diagnóstico con IA, y el técnico vincula la parcela con su código",
    },
    github: `${github}/PMP-SMART-PROJECT`,
    demo: { label: "Descargar APK", url: `${github}/PMP-SMART-PROJECT/releases` },
  },
  {
    id: "tallerpro",
    title: "TallerPro",
    description:
      "Sistema de gestión para talleres de reparación de motos en Windows: clientes, órdenes, inventario y reportes, con un cotizador de repuestos con IA que protege la clave detrás de un proxy propio.",
    categories: ["desktop", "ai"],
    tags: ["Python", "PySide6", "SQLAlchemy", "Alembic", "Gemini"],
    year: "2026",
    device: "desktop",
    logo: {
      src: "/images/projects/tallerpro-logo.webp",
      alt: "Logo de TallerPro: una moto deportiva",
      kind: "icon",
    },
    tint: "#142f6b",
    video: {
      webm: "/projects/tallerpro.webm",
      mp4: "/projects/tallerpro.mp4",
      poster: "/projects/tallerpro-poster.webp",
      label:
        "Demostración de TallerPro: panel del taller, creación de una orden de trabajo y cotización de un repuesto con IA",
    },
    github: `${github}/TallerPro-PROJECT`,
    demo: { label: "Descargar .exe", url: `${github}/TallerPro-PROJECT/releases` },
  },
  {
    id: "busalert",
    title: "BusAlert",
    description:
      "Asistente de transporte público para San Juan de Pasto en relojes Wear OS. Dices a dónde vas y el reloj te indica qué bus tomar, dónde subir y dónde bajar, en pantalla y en voz alta. Incluye app de teléfono sincronizada.",
    categories: ["smartwatch", "mobile"],
    tags: ["Kotlin", "Jetpack Compose", "Wear OS", "Node.js", "SQLite"],
    year: "2026",
    device: "watch",
    logo: {
      src: "/images/projects/busalert-logo.svg",
      alt: "Logo de BusAlert: un bus blanco",
      kind: "icon",
    },
    tint: "#5c0a20",
    image: {
      src: "/projects/busalert.webp",
      alt: "Pantalla principal de BusAlert en un reloj Wear OS: botón de micrófono para consultar qué bus tomar en Pasto",
    },
    github: `${github}/ProjectBusAlert`,
    demo: { label: "Descargar APK", url: `${github}/ProjectBusAlert/releases` },
  },
];
