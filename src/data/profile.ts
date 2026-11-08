import type { Profile } from "@/types";

// TODO: replace "#" links and placeholder values with your real data.
export const profile: Profile = {
  firstName: "José Manuel",
  lastName: "Campo Erazo",
  fullName: "José Manuel Campo Erazo",
  initials: "JC",
  greeting: "Hola, soy",
  role: "Desarrollador de software",
  headline:
    "Desarrollo aplicaciones móviles, de escritorio, para smartwatch y videojuegos, e integro inteligencia artificial con Google Gemini para resolver problemas reales.",
  specialties: [
    "React Native · Expo",
    "Node.js · Express",
    "TypeScript",
    "Kotlin · Jetpack Compose",
    "Python · PySide6",
    "Unity · C#",
    "Google Gemini",
  ],
  location: "Colombia",
  badge: {
    label: "Estudiante de",
    value: "Ingeniería de Software",
  },
  photo: {
    src: "/images/profile.webp",
    alt: "Foto de José Manuel Campo Erazo",
  },
  // Public Google Drive link to your 1-page CV
  cvUrl: "#",
  // Professional email (no birth dates or extra numbers)
  email: "josecampoerazo2@gmail.com",
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/Josecampoe",
      handle: "@Josecampoe",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/jose-manuel-campo-erazo-94a0b83a8/",
      handle: "José Manuel Campo Erazo",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/573171198000",
      handle: "+57 317 119 8000",
    },
  ],
};
