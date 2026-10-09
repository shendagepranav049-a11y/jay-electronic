import { useState, useEffect } from 'react';
import './TouchBubbles.css';

function TouchBubbles() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    // Function to handle creating a new bubble
    const handleTouchOrClick = (e) => {
      let clientX, clientY;

      // Handle touch events
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } 
      // Handle click events (for desktop testing or hybrid devices)
      else if (e.clientX && e.clientY) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const newBubble = {
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
        size: Math.random() * 20 + 20 // Random size between 20px and 40px
      };

      setBubbles((prev) => [...prev, newBubble]);

      // Remove the bubble after animation completes (1 second)
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
      }, 1000);
    };

    window.addEventListener('click', handleTouchOrClick);
    window.addEventListener('touchstart', handleTouchOrClick, { passive: true });

    return () => {
      window.removeEventListener('click', handleTouchOrClick);
      window.removeEventListener('touchstart', handleTouchOrClick);
    };
  }, []);

  return (
    <div className="touch-bubbles-container">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="touch-bubble"
          style={{
            left: bubble.x - bubble.size / 2,
            top: bubble.y - bubble.size / 2,
            width: bubble.size,
            height: bubble.size,
          }}
        ></div>
      ))}
    </div>
  );
}

export default TouchBubbles;
