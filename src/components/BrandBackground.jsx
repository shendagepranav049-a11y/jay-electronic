import "./BrandBackground.css";
import logo from "../assets/je-logo.png";

function BrandBackground() {
  return (
    <div className="brand-background" aria-hidden="true">

      {/* Red ambient glow */}
      <div className="brand-glow"></div>

      {/* Main JE Logo */}
      <div className="brand-logo brand-logo-one">
        <img src={logo} alt="" />
      </div>

      {/* Secondary JE Logo */}
      <div className="brand-logo brand-logo-two">
        <img src={logo} alt="" />
      </div>

      {/* Decorative rings */}
      <div className="brand-ring brand-ring-one"></div>
      <div className="brand-ring brand-ring-two"></div>

    </div>
  );
}

export default BrandBackground;