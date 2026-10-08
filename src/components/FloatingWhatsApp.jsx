import { useState, useEffect } from 'react';
import './FloatingWhatsApp.css';

function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  
  // WhatsApp Configuration - edit here to change global number
  const WHATSAPP_NUMBER = "919876543210"; 
  const WHATSAPP_MESSAGE = "Hello, I would like to inquire about your services.";

  useEffect(() => {
    // Reveal button after a slight delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <a 
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="whatsapp-pulse"></div>
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.031 0C5.405 0 0 5.414 0 12.046c0 2.128.553 4.2 1.603 6.035L.031 24l6.062-1.593A11.967 11.967 0 0012.031 24c6.627 0 12.032-5.414 12.032-12.046C24.062 5.414 18.658 0 12.031 0zm3.834 17.15c-.19.534-1.096 1.026-1.523 1.096-.395.065-.892.122-2.585-.579-2.035-.845-3.344-2.92-3.444-3.054-.099-.134-.823-1.096-.823-2.091 0-.994.512-1.482.693-1.685.18-.203.394-.254.526-.254.132 0 .264 0 .378.006.12.006.284-.046.435.318.15.364.512 1.25.558 1.343.045.093.076.202.016.324-.06.122-.09.197-.18.29-.09.094-.19.202-.27.284-.091.092-.191.196-.078.39.112.194.502.83 1.077 1.341.742.66 1.365.86 1.558.954.193.094.307.078.423-.053.115-.133.498-.58.632-.78.134-.2.27-.166.446-.102.176.064 1.115.526 1.306.622.191.096.318.14.364.22.046.079.046.46-.144.994z"/>
      </svg>
    </a>
  );
}

export default FloatingWhatsApp;
