import type { Testimonial } from "@/types";

// TODO: minimum 3 REAL testimonials from teachers, work leaders or tech contacts.
// Not from family or classmates, and not written with AI.
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Durante el tiempo que he tenido la oportunidad de trabajar con José, he podido conocer a una persona comprometida, curiosa y con una gran iniciativa para aprender y superar cualquier desafío. Siempre me ha llamado la atención su capacidad para analizar situaciones, proponer soluciones y encontrar la manera de sacar adelante las tareas, incluso cuando las cosas se complican. Más allá de sus conocimientos, destacaría su calidad humana, su disposición para colaborar y la confianza que transmite al trabajar en equipo; considero que tiene un enorme potencial y que será un profesional que aportará mucho en cualquier equipo del que forme parte.",
    name: "Angie Daniela Ibarra",
    role: "Ingeniera electrónica",
    organization: "Magíster en Biomédica",
    photo: {
      src: "/images/testimonials/angie-ibarra.webp",
      alt: "Foto de Angie Daniela Ibarra",
    },
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
