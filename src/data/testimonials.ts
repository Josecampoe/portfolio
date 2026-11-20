import type { Testimonial } from "@/types";

// Teachers and tech contacts who agreed to appear here.
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Trabajar con José ha sido una experiencia muy positiva; es una persona responsable, comprometida y con una gran disposición para aprender. Destaco su capacidad para resolver problemas, su iniciativa y la facilidad que tiene para trabajar en equipo. Sin duda, es alguien en quien se puede confiar y que demuestra un gran potencial profesional.",
    name: "Angie Daniela Ibarra",
    role: "Ingeniera electrónica",
    organization: "Magíster en Ingeniería Biomédica",
    photo: {
      src: "/images/testimonials/angie-ibarra.webp",
      alt: "Foto de Angie Daniela Ibarra",
    },
    linkedin: "https://www.linkedin.com/in/daniela-benavides-679406273/",
  },
  {
    id: "t2",
    quote:
      "José aprende rápido y lleva lo visto en clase a sus propios proyectos: sus APIs en Node.js y TypeScript están bien organizadas, con validaciones y una estructura clara. Cumple con sus entregas.",
    name: "Ivonne Barco",
    role: "Docente, electiva de NestJS",
    organization: "Universidad Cooperativa de Colombia",
    photo: {
      src: "/images/testimonials/ivonne-barco.webp",
      alt: "Foto de Ivonne Barco",
    },
    linkedin: "https://www.linkedin.com/in/ivonnebarco/",
  },
  {
    id: "t3",
    quote:
      "José es un estudiante comprometido y curioso. Trabaja bien en equipo y tiene muy buena proyección como ingeniero de software.",
    name: "Javier Alexander Mendieta Ortega",
    role: "Docente de Arquitectura de Software y Computacional",
    organization: "Universidad Cooperativa de Colombia",
    photo: {
      src: "/images/testimonials/javier-mendieta.webp",
      alt: "Foto de Javier Alexander Mendieta Ortega",
    },
    linkedin: "https://www.linkedin.com/in/jamodev/",
  },
];
