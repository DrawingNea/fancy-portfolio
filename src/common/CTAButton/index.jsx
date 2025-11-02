'use client';

import { useEffect, useRef } from 'react';
import styles from './style.module.scss';

const CTAButton = ({ children }) => {
  const btnRef = useRef(null);
  const speedRef = useRef(2); // gradient rotation speed

  // Spinning gradient animation
  useEffect(() => {
    let angle = 0;
    let animationFrame;

    const animate = () => {
      angle += speedRef.current;
      if (angle >= 360) angle = 0;

      if (btnRef.current) {
        btnRef.current.style.setProperty('--gradient-angle', `${angle}deg`);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Ripple effect on hover
  const handleMouseEnter = (e) => {
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    btn.style.setProperty('--ripple-x', `${x}px`);
    btn.style.setProperty('--ripple-y', `${y}px`);

    // Trigger ripple animation
    btn.classList.remove(styles.rippleActive);
    // Force reflow to restart animation
    void btn.offsetWidth;
    btn.classList.add(styles.rippleActive);
  };

  return (
    <button
      ref={btnRef}
      className={`${styles.shinyCta} ${styles.ripple}`}
      onMouseEnter={handleMouseEnter}
    >
      <span>{children}</span>
    </button>
  );
};

export default CTAButton;
