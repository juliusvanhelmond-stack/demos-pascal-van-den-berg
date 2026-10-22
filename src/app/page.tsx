import { About } from "@/components/About";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { RevealObserver } from "@/components/RevealObserver";
import { ServiceArea } from "@/components/ServiceArea";
import { Services } from "@/components/Services";
import { WhyPascal } from "@/components/WhyPascal";
import { KluslijstProvider } from "@/lib/kluslijst";

export default function Home() {
  return (
    <KluslijstProvider>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <ProjectGallery />
        <BeforeAfterSlider />
        <WhyPascal />
        <ServiceArea />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
    </KluslijstProvider>
  );
}
