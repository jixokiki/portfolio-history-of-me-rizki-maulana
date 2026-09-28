import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import MoreWork from "@/components/MoreWork";
import ArchiveGallery from "@/components/ArchiveGallery";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SinkHero from "@/components/ui/SinkHero";
import StickyReveal from "@/components/ui/StickyReveal";
import ScrollVeil from "@/components/ui/ScrollVeil";

export default function Home() {
  return (
    <main>
      <Nav />
      <StickyReveal sinkPx={122} dimTo={0.35} clip={false}>
        <Hero />
        {/* <SinkHero sinkPx={20} minScale={0.94}> */}
          {/* <About /> */}
        {/* </SinkHero> */}
      </StickyReveal>
      <About/>
      <Experience />
      {/* <ScrollVeil distancePx={100} /> */}
      {/* <CaseStudies /> */}
      <div className="relative z-0 -mt-10 md:-mt-16">
        <CaseStudies />
      </div>
      {/* <ScrollVeil distancePx={100} /> */}
      {/* <Experience /> */}
      {/* <Skills /> */}
      {/* <ScrollVeil distancePx={100} /> */}
      <SinkHero sinkPx={20} minScale={0.94}>
        <MoreWork />
        <ArchiveGallery />
      </SinkHero>
      {/* <MoreWork /> */}
      {/* <ScrollVeil distancePx={100} /> */}
      <Education />
      {/* <ScrollVeil distancePx={5} /> */}
      <Contact />
      <Footer />
    </main>
  );
}
