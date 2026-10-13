import "./App.css";

import { lazy, Suspense } from "react";
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
import FloatingSocialActions from "./components/FloatingSocialActions";

const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"));
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
      
      {/* FLOATING QUICK ACTIONS (WHATSAPP, INSTAGRAM, FACEBOOK) */}
      <FloatingSocialActions />
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
          element={
            <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0d14", color: "#38bdf8" }}>Loading...</div>}>
              <AdminLogin />
            </Suspense>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0d14", color: "#38bdf8" }}>Loading...</div>}>
              <AdminDashboard />
            </Suspense>
          }
        />

      </Routes>

    </BrowserRouter>
      <TouchBubbles />
    </>
  );
}

export default App;