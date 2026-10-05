import "./BrandBackground.css";

function BrandBackground() {
  return (
    <div className="brand-background" aria-hidden="true">
      {/* Circuit Grid */}
      <div className="circuit-grid"></div>

      {/* Nodes / Particles */}
      <div className="node node-1"></div>
      <div className="node node-2"></div>
      <div className="node node-3"></div>
      <div className="node node-4"></div>
      <div className="node node-5"></div>

      {/* Ambient Glows */}
      <div className="tech-glow glow-primary"></div>
      <div className="tech-glow glow-secondary"></div>

      {/* Connection Lines */}
      <div className="connection-line line-1"></div>
      <div className="connection-line line-2"></div>
      <div className="connection-line line-3"></div>
    </div>
  );
}

export default BrandBackground;