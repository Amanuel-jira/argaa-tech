import HeroSlider from "../components/HeroSlider.jsx";
import Services from "./Services.jsx";
import About from "./About.jsx";
import Work from "./Work.jsx";
import Workflow from "../components/Workflow.jsx";
import Industries from "../components/Industries.jsx";
import FAQ from "./FAQ.jsx";
import Contact from "./Contact.jsx";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <div id="services">
        <Services />
      </div>
      <div id="about">
        <About />
      </div>

      <div id="portfolio">
        <Work />
      </div>

      <Workflow />
      <Industries />
      <div id="faq">
        <FAQ />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
}
