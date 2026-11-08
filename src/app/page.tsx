import { Intro } from "@/components/layout/Intro";
import { ChakraBackdrop } from "@/components/layout/ChakraBackdrop";
import { AppFrame } from "@/components/layout/AppFrame";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Experience } from "@/components/sections/Experience";
import { Languages } from "@/components/sections/Languages";
import { Contact } from "@/components/sections/Contact";

// Each section is a view of the frame; the keys match the ids in src/data/navigation.ts.
export default function HomePage() {
  return (
    <>
      <ChakraBackdrop />
      <Intro />
      <AppFrame
        views={{
          home: <Hero />,
          about: <About />,
          projects: <Projects />,
          testimonials: <Testimonials />,
          experience: <Experience />,
          languages: <Languages />,
          contact: <Contact />,
        }}
        footer={<Footer />}
      />
    </>
  );
}
