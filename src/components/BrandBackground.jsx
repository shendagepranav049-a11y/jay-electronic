import "./BrandBackground.css";
import bgImage from "../assets/devices-bg.jpg";

function BrandBackground() {
  return (
    <div className="brand-background" aria-hidden="true">
      <div 
        className="brand-bg-image" 
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      {/* Light gradient overlay to ensure text readability */}
      <div className="brand-bg-overlay"></div>
    </div>
  );
}

export default BrandBackground;