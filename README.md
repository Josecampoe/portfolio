# Portafolio · José Manuel Campo Erazo

Portafolio personal hecho con **Next.js 16**, **TypeScript**, **Tailwind CSS 4** y **motion** para las animaciones. Interfaz enmarcada estilo plataforma de streaming: menú lateral, una sección (vista) a la vez y proyectos como franjas verticales que se expanden. Rojo como color principal, modo claro (predeterminado, fondo blanco) y oscuro.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Dónde cambiar tu información

Todo el contenido está en `src/data/` (nada está "quemado" en los componentes):

| Archivo | Qué tiene |
|---|---|
| `profile.ts` | Nombre, rol, frase de presentación, tecnologías, foto, link del CV, correo, GitHub y LinkedIn |
| `about.ts` | Textos de "Sobre mí", intereses y galería de fotos |
| `projects.ts` | Proyectos con links a GitHub y demo |
| `testimonials.ts` | Los 3 testimonios |
| `experience.ts` | Experiencia técnica y formación académica |
| `languages.ts` | Sección libre: idiomas |
| `sections.ts` | Títulos e introducciones de cada sección |
| `navigation.ts` | Vistas del menú |
| `contact.ts` / `ui.ts` | Textos del formulario y de la interfaz |

## Pendientes antes de entregar

- [ ] Foto real (profesional-casual) en `public/images/`, comprimida a menos de 300 KB, y cambiar `photo.src` en `profile.ts`
- [ ] Link público de Google Drive del CV (1 página) en `cvUrl`
- [ ] Correo profesional
- [ ] Publicar en cada repo un Release con el .exe / .apk / build del juego (los botones de descarga apuntan a la página de Releases)
- [ ] 3 testimonios reales (profesores, líderes o contactos del sector, no familia ni compañeros)
- [ ] Tus hobbies y fotos en `about.ts`
- [ ] Ciudad, carrera y universidad en `profile.ts`; experiencia en `experience.ts`

Cada proyecto tiene:

- `cover`: portada vertical de la franja (`public/images/projects/*-cover.webp`, menos de 300 KB). Si la quitas, se dibuja una portada con CSS en el color `tint`.
- `video` o `image`: lo que se ve dentro del dispositivo en el detalle (`public/projects/`).

Cada sección es una vista con su propio enlace: `#about`, `#projects`, `#contact`… Un proyecto se abre directo con `#proyecto-<id>`, por ejemplo `#proyecto-busalert`.

## Publicar en Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. Entra a https://vercel.com, inicia sesión con GitHub y dale **Add New → Project**.
3. Elige el repositorio y dale **Deploy**. Vercel detecta Next.js solo.

Cada vez que hagas push, Vercel actualiza el sitio.

## Cumplimiento de requisitos

- Next.js + Vercel + Tailwind CSS
- Menú lateral en computador y menú hamburguesa en celular
- Componentes separados por sección en `src/components/sections`
- Datos separados en `src/data/*.ts`
- Código, carpetas y archivos en inglés
- Sin barras de porcentaje y sin HTML/CSS/JS en las habilidades
- Formulario de contacto validado con expresiones regulares (`src/lib/validation.ts`)
- Año del footer generado por código (`src/components/layout/CopyrightYear.tsx`)
- Modo claro y oscuro que recuerda la elección
- Animaciones con motion que respetan "reducir movimiento" (sin desplazamientos)
