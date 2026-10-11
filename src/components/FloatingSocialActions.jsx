import { useState, useEffect } from 'react';
import './FloatingSocialActions.css';
import { useSiteContent } from '../utils/firebaseUtils';

function FloatingSocialActions() {
  const [isVisible, setIsVisible] = useState(false);
  const { data: socialData } = useSiteContent('social');

  useEffect(() => {
    // Reveal buttons after a slight delay for smooth entrance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const getWhatsAppUrl = () => {
    if (!socialData?.whatsapp) {
      return `https://wa.me/919876543210?text=${encodeURIComponent("Hello Jay Electronics, I would like to inquire about your services.")}`;
    }
    if (socialData.whatsapp.startsWith('http')) return socialData.whatsapp;
    const digits = socialData.whatsapp.replace(/[^0-9]/g, '');
    return `https://wa.me/${digits || '919876543210'}?text=${encodeURIComponent("Hello Jay Electronics, I would like to inquire about your services.")}`;
  };

  const getInstagramUrl = () => {
    if (!socialData?.instagram) return "https://www.instagram.com/";
    if (socialData.instagram.startsWith('http')) return socialData.instagram;
    return `https://www.instagram.com/${socialData.instagram.replace(/^@/, '')}`;
  };

  const getFacebookUrl = () => {
    if (!socialData?.facebook) return "https://www.facebook.com/";
    if (socialData.facebook.startsWith('http')) return socialData.facebook;
    return `https://www.facebook.com/${socialData.facebook}`;
  };

  if (!isVisible) return null;

  return (
    <aside className="floating-social-dock" aria-label="Quick Social Media Links">
      {/* WhatsApp Button */}
      <a 
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-social-btn floating-whatsapp-btn"
        aria-label="Chat with us on WhatsApp"
      >
        <span className="social-tooltip">WhatsApp</span>
        <div className="btn-pulse-wave whatsapp-wave"></div>
        <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12.031 0C5.405 0 0 5.414 0 12.046c0 2.128.553 4.2 1.603 6.035L.031 24l6.062-1.593A11.967 11.967 0 0012.031 24c6.627 0 12.032-5.414 12.032-12.046C24.062 5.414 18.658 0 12.031 0zm3.834 17.15c-.19.534-1.096 1.026-1.523 1.096-.395.065-.892.122-2.585-.579-2.035-.845-3.344-2.92-3.444-3.054-.099-.134-.823-1.096-.823-2.091 0-.994.512-1.482.693-1.685.18-.203.394-.254.526-.254.132 0 .264 0 .378.006.12.006.284-.046.435.318.15.364.512 1.25.558 1.343.045.093.076.202.016.324-.06.122-.09.197-.18.29-.09.094-.19.202-.27.284-.091.092-.191.196-.078.39.112.194.502.83 1.077 1.341.742.66 1.365.86 1.558.954.193.094.307.078.423-.053.115-.133.498-.58.632-.78.134-.2.27-.166.446-.102.176.064 1.115.526 1.306.622.191.096.318.14.364.22.046.079.046.46-.144.994z"/>
        </svg>
      </a>

      {/* Instagram Button */}
      <a 
        href={getInstagramUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-social-btn floating-instagram-btn"
        aria-label="Follow us on Instagram"
      >
        <span className="social-tooltip">Instagram</span>
        <div className="btn-pulse-wave instagram-wave"></div>
        <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.449-1.44z"/>
        </svg>
      </a>

      {/* Facebook Button */}
      <a 
        href={getFacebookUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-social-btn floating-facebook-btn"
        aria-label="Visit us on Facebook"
      >
        <span className="social-tooltip">Facebook</span>
        <div className="btn-pulse-wave facebook-wave"></div>
        <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>
    </aside>
  );
}

export default FloatingSocialActions;
