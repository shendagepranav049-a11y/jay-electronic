import "./Navbar.css";
import logo from "../assets/je-logo.png";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        <a href="/" className="navbar-logo">
          <img src={logo} alt="Jay Electronics" />
        </a>

        <nav className="navbar-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/solutions">Solutions</a>
          <a href="/projects">Projects</a>
          <a href="/industries">Industries</a>
          <a href="/partners">Partners</a>
          <a href="/contact" className="navbar-contact">
            Contact
          </a>
        </nav>

        <button className="menu-button" aria-label="Open menu">
          ☰
        </button>

      </div>
    </header>
  );
}

export default Navbar;