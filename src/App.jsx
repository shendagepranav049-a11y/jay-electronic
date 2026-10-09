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
import HeroSection from "./components/HeroSection";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import TouchBubbles from "./components/TouchBubbles";

function PublicWebsite() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      <main>

        {/* HERO SECTION */}
        <HeroSection />


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
      
      {/* FLOATING WHATSAPP */}
      <FloatingWhatsApp />
    </>
  );
}


function App() {
  return (
    <>
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
      <TouchBubbles />
    </>
  );
}

export default App;