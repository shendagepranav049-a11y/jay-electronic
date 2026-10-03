import "./Footer.css";
import logo from "../assets/je-logo.png";

function Footer() {
  const quickLinks = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Solutions", "#solutions"],
    ["Projects", "#projects"],
    ["Industries", "#industries"],
    ["Partners", "#partners"],
    ["Contact", "#contact"],
  ];

  const solutions = [
    "Electronic Security",
    "Networking",
    "Telecom",
    "Audio Visual",
    "Fire & Safety",
    "Infrastructure",
    "City Surveillance",
    "Solar",
  ];

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Company */}
        <div className="footer-company">
          <img src={logo} alt="Jay Electronics Pvt Ltd" />

          <h3>Jay Electronics Pvt Ltd</h3>

          <p>
            Technology Integrator & Infrastructure Service Provider
            delivering integrated technology, security and infrastructure
            solutions.
          </p>

          <div className="footer-tagline">
            Technology. Security. Infrastructure.
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>

          <ul>
            {quickLinks.map(([label, link]) => (
              <li key={label}>
                <a href={link}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions */}
        <div className="footer-column">
          <h4>Solutions</h4>

          <ul>
            {solutions.map((solution) => (
              <li key={solution}>{solution}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-column footer-contact">
          <h4>Get In Touch</h4>

          <p>
            For business enquiries, projects and technology solutions,
            connect with our team.
          </p>

          <a href="#contact" className="footer-button">
            Request a Consultation
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Jay Electronics Pvt Ltd. All rights reserved.
        </p>

        <p>
          Technology. Security. Infrastructure.
        </p>
      </div>
    </footer>
  );
}

export default Footer;