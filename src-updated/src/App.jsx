import "./App.css";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import SolutionsSection from "./components/SolutionsSection";
import ProjectsSection from "./components/ProjectsSection";
import IndustriesSection from "./components/IndustriesSection";
import PartnersSection from "./components/PartnersSection";
import WhyJaySection from "./components/WhyJaySection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

import BrandBackground from "./components/BrandBackground";

function App() {
  return (
    
    <>
     <BrandBackground />

      <Navbar />

      <main>

        {/* =========================
            HERO SECTION
        ========================== */}

        <section className="hero" id="home">
          
         

          <div className="hero-content">
            <p className="hero-label">
              JAY ELECTRONICS PVT LTD
            </p>

            <h1>
              Technology.
              <br />
              Security.
              <br />
              Infrastructure.
            </h1>

            <p className="hero-description">
              Integrated technology solutions for secure,
              connected and efficient environments.
            </p>

            <div className="hero-buttons">
              <a
                href="#solutions"
                className="btn-primary"
              >
                Explore Solutions
              </a>

              <a
                href="#contact"
                className="btn-secondary"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>


        {/* =========================
            ABOUT SECTION
        ========================== */}

        <AboutSection />


        {/* =========================
            SOLUTIONS SECTION
        ========================== */}

        <SolutionsSection />

        <ProjectsSection />

        <IndustriesSection />

        <PartnersSection />
        <WhyJaySection />
        <ContactSection />
        <main>
  <section className="hero">
    {/* existing hero code */}
  </section>

  <AboutSection />
  <SolutionsSection />
  <ProjectsSection />
  <IndustriesSection />
  <PartnersSection />
  <WhyJaySection />
  <ContactSection />
</main>

<Footer />


      </main>
    </>
  );
}

export default App;