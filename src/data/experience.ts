import type { TimelineItem } from "@/types";

export const experienceTitles = {
  work: "Experiencia técnica",
  education: "Formación académica",
};

// Apps built in academic or freelance settings count as technical experience.
export const workExperience: TimelineItem[] = [
  {
    id: "w1",
    title: "Desarrollador · El Caso 404",
    place: "Proyecto académico · Videojuego",
    period: "2026",
    description:
      "Videojuego 3D en Unity con diálogos generados por IA a través de un proxy en Cloudflare Workers que protege la clave de la API.",
    tags: ["Unity", "C#", "Cloudflare Workers"],
  },
  {
    id: "w2",
    title: "Desarrollador · PMP Smart",
    place: "Proyecto académico · Móvil",
    period: "2026",
    description:
      "App en React Native con diagnóstico de cultivos por IA, roles de agricultor y técnico, y backend en Express.",
    tags: ["React Native", "Expo", "Express"],
  },
  {
    id: "w3",
    title: "Desarrollador · TallerPro",
    place: "Proyecto académico · Escritorio",
    period: "2026",
    description:
      "Aplicación de escritorio con base de datos, migraciones, pruebas automatizadas e instalador para Windows.",
    tags: ["Python", "PySide6", "pytest"],
  },
  {
    id: "w4",
    title: "Desarrollador · BusAlert",
    place: "Proyecto académico · Smartwatch",
    period: "2026",
    description:
      "App para Wear OS y teléfono con API en Node.js y TypeScript, planificador de rutas y estimación de tiempos de llegada.",
    tags: ["Kotlin", "Wear OS", "Node.js"],
  },
];

// TODO: complete with your real studies, courses and English level.
export const education: TimelineItem[] = [
  {
    id: "e1",
    title: "Ingeniería de Software",
    place: "Universidad",
    period: "Año de inicio – actualidad",
    description: "Pregrado en Ingeniería de Software.",
  },
  {
    id: "e2",
    title: "Diplomado o certificado",
    place: "Institución",
    period: "Año",
    description: "Qué aprendiste.",
  },
  {
    id: "e3",
    title: "Inglés",
    place: "Certificación o institución",
    period: "Nivel",
    description: "Tu nivel de inglés (A2, B1, B2…).",
  },
];
