import "./Footer.css";
import ScrollReveal from "./ScrollReveal";
import logo from "../assets/je-logo.png";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">

        <ScrollReveal direction="up">
          <div className="footer-top">

            {/* Brand */}
            <div className="footer-brand">
              <a href="#home" className="footer-logo">
                <img
                  src={logo}
                  alt="Jay Electronics Pvt Ltd"
                />
              </a>

              <p className="footer-description">
                Technology Integrator & Infrastructure Service Provider
                delivering integrated technology, security and
                infrastructure solutions.
              </p>

              <a
                href="#contact"
                className="footer-cta"
              >
                Request a Consultation
                <span>↗</span>
              </a>
            </div>


            {/* Quick Links */}
            <div className="footer-column">
              <h3>Quick Links</h3>

              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#solutions">Solutions</a>
              <a href="#projects">Projects</a>
              <a href="#industries">Industries</a>
              <a href="#information">Information</a>
              <a href="#contact">Contact</a>
            </div>


            {/* Solutions */}
            <div className="footer-column">
              <h3>Solutions</h3>

              <a href="#solutions">
                Electronic Security
              </a>

              <a href="#solutions">
                Networking
              </a>

              <a href="#solutions">
                Telecom
              </a>

              <a href="#solutions">
                Audio Visual
              </a>

              <a href="#solutions">
                Fire & Safety
              </a>

              <a href="#solutions">
                Infrastructure
              </a>

              <a href="#solutions">
                City Surveillance
              </a>

              <a href="#solutions">
                Solar
              </a>
            </div>


            {/* Contact */}
            <div className="footer-column footer-contact">

              <h3>Get In Touch</h3>

              <p>
                Looking for a technology partner for your
                next project?
              </p>


              {/* Phone */}
              <a
                href="tel:+919876543210"
                className="footer-contact-detail"
              >
                <span className="footer-contact-icon">
                  ☎
                </span>

                <span>
                  +91 98765 43210
                </span>
              </a>


              {/* Email */}
              <a
                href="mailto:info@jayelectronics.in"
                className="footer-contact-detail"
              >
                <span className="footer-contact-icon">
                  ✉
                </span>

                <span>
                  info@jayelectronics.in
                </span>
              </a>


              {/* Address */}
              <div className="footer-contact-detail footer-address">
                <span className="footer-contact-icon">
                  📍
                </span>

                <span>
                  Kolhapur, Maharashtra, India
                </span>
              </div>


              <a
                href="#contact"
                className="footer-contact-link"
              >
                Send an Enquiry
                <span>→</span>
              </a>

            </div>

          </div>
        </ScrollReveal>


        {/* Bottom */}
        <div className="footer-bottom">

          <p>
            © {currentYear} Jay Electronics Pvt Ltd.
            All rights reserved.
          </p>

          <p className="footer-bottom-right">
            Technology Integrator & Infrastructure Service Provider
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;