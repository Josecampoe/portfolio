import type { Testimonial } from "@/types";

// TODO: minimum 3 REAL testimonials from teachers, work leaders or tech contacts.
// Not from family or classmates, and not written with AI.
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Aquí va el testimonio real de un profesor o profesora. Pídele unas 2 o 3 frases sobre tu trabajo y pégalas tal cual.",
    name: "Nombre del profesor",
    role: "Docente",
    organization: "Universidad",
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
