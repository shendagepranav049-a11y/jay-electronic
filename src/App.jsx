import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import SolutionsSection from "./components/SolutionsSection";
import ProjectsSection from "./components/ProjectsSection";
import IndustriesSection from "./components/IndustriesSection";
import InformationSection from "./components/InformationSection";
import WhyJaySection from "./components/WhyJaySection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import BrandBackground from "./components/BrandBackground";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function PublicWebsite() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      <main>

        {/* HERO SECTION */}
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


        {/* ABOUT */}
        <AboutSection />

        {/* SOLUTIONS */}
        <SolutionsSection />

        {/* PROJECTS */}
        <ProjectsSection />

        {/* INDUSTRIES */}
        <IndustriesSection />
        
        <InformationSection />
       
        {/* WHY JAY */}
        <WhyJaySection />

        {/* CONTACT */}
        <ContactSection />

      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Main Website */}
        <Route
          path="/"
          element={<PublicWebsite />}
        />

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;