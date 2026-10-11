import { useState, useEffect, useRef } from 'react';
import './TouchBubbles.css';

function TouchBubbles() {
  const [bubbles, setBubbles] = useState([]);
  const lastTouchTime = useRef(0);

  useEffect(() => {
    // Function to handle creating a new bubble
    const handleTouchOrClick = (e) => {
      const now = Date.now();
      let clientX, clientY;

      // Handle touch events
      if (e.touches && e.touches.length > 0) {
        lastTouchTime.current = now;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } 
      // Handle click events (prevent duplicate fire right after touchstart)
      else if (e.clientX && e.clientY) {
        if (now - lastTouchTime.current < 500) {
          return; // Ignore synthetic mouse click following touch
        }
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const bubbleId = now + Math.random();
      const newBubble = {
        id: bubbleId,
        x: clientX,
        y: clientY,
        size: Math.random() * 18 + 18 // Size between 18px and 36px
      };

      // Limit max concurrent bubbles to 6 for buttery smooth performance
      setBubbles((prev) => [...prev.slice(-5), newBubble]);

      // Remove the bubble after animation completes
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));
      }, 900);
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
