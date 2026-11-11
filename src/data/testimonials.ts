import type { Testimonial } from "@/types";

// TODO: minimum 3 REAL testimonials from teachers, work leaders or tech contacts.
// Not from family or classmates, and not written with AI.
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Trabajar con José ha sido una experiencia muy positiva; es una persona responsable, comprometida y con una gran disposición para aprender. Destaco su capacidad para resolver problemas, su iniciativa y la facilidad que tiene para trabajar en equipo. Sin duda, es alguien en quien se puede confiar y que demuestra un gran potencial profesional.",
    name: "Angie Daniela Ibarra",
    role: "Ingeniera electrónica",
    organization: "Magíster en Biomédica",
    photo: {
      src: "/images/testimonials/angie-ibarra.webp",
      alt: "Foto de Angie Daniela Ibarra",
    },
    linkedin: "https://www.linkedin.com/in/daniela-benavides-679406273/",
  },
  {
    id: "t2",
    quote:
      "Aquí va el testimonio real de un líder de proyecto, mentor o contacto del sector tecnológico.",
    name: "Nombre de la persona",
    role: "Cargo",
    organization: "Empresa o programa",
  },
  {
    id: "t3",
    quote:
      "Aquí va un tercer testimonio real de alguien con quien hayas trabajado en tecnología.",
    name: "Nombre de la persona",
    role: "Cargo",
    organization: "Empresa o programa",
  },
];
