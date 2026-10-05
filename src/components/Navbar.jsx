import { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../assets/je-logo.png";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = [
        "home",
        "about",
        "solutions",
        "projects",
        "industries",
        "information",
        "why-jay",
        "contact",
      ];

      const scrollPosition = window.scrollY + 160;

      let currentSection = "home";

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (section && section.offsetTop <= scrollPosition) {
          currentSection = sectionId;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "solutions", label: "Solutions" },
    { id: "projects", label: "Projects" },
    { id: "industries", label: "Industries" },
    { id: "information", label: "Information" },
    { id: "why-jay", label: "Why Jay" },
  ];

  return (
    <motion.header 
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar-container">

        {/* Logo */}

        <button
          className="navbar-logo"
          onClick={() => handleNavClick("home")}
          aria-label="Go to home"
        >
          <img src={logo} alt="Jay Electronics" />
        </button>


        {/* Desktop Navigation */}

        <nav className="navbar-links">

          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`navbar-link ${
                activeSection === item.id ? "active" : ""
              }`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            className={`navbar-contact ${
              activeSection === "contact" ? "active" : ""
            }`}
            onClick={() => handleNavClick("contact")}
          >
            Contact
          </button>

        </nav>


        {/* Mobile Menu Button */}

        <button
          className={`menu-button ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>


      {/* Mobile Navigation */}
      
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="mobile-menu mobile-menu-open"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', visibility: 'visible', pointerEvents: 'auto' }}
          >

            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                type="button"
                className={`mobile-link ${
                  activeSection === item.id ? "active" : ""
                }`}
                onClick={() => handleNavClick(item.id)}
              >
                <span>{item.label}</span>

                {activeSection === item.id && (
                  <span className="mobile-active-dot"></span>
                )}
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.05 }}
              type="button"
              className={`mobile-contact ${
                activeSection === "contact" ? "active" : ""
              }`}
              onClick={() => handleNavClick("contact")}
            >
              Contact
              <span>↗</span>
            </motion.button>

          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
}

export default Navbar;