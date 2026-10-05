import { useSiteContent } from '../utils/firebaseUtils';
import { motion } from 'framer-motion';

function HeroSection() {
  const { data: content, loading } = useSiteContent("hero", {
    subheading: "JAY ELECTRONICS PVT LTD",
    heading: "Technology.\nSecurity.\nInfrastructure.",
    description: "Integrated technology solutions for secure, connected and efficient environments.",
    primaryCtaText: "Explore Solutions",
  });

  if (loading) {
    return <section className="hero" id="home"></section>;
  }

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="hero-label">{content.subheading}</p>

        <h1 style={{ whiteSpace: 'pre-line' }}>{content.heading}</h1>

        <p className="hero-description">{content.description}</p>

        <div className="hero-buttons">
          <a href="#solutions" className="btn-primary">
            {content.primaryCtaText}
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
