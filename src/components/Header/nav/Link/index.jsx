'use client';
import styles from './style.module.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from '../../anim';

export default function Index({ data, isActive, setSelectedIndicator }) {
  const { title, href, index } = data;

  const smoothScrollTo = (distance) => {
    const baseSpeed = 0.9;
    const duration = distance * baseSpeed;

    const startY = window.scrollY;
    const startTime = performance.now();

    const ease = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = ease(progress);
      window.scrollTo(0, startY + distance * eased);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const handleClick = (e) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const section = document.querySelector(href);

      if (section) {
        const startY = window.scrollY;
        const targetY = section.getBoundingClientRect().top + startY;
        const distance = targetY - startY;

        // Use dynamic duration based on distance
        smoothScrollTo(targetY, distance);
        setSelectedIndicator(href);
      }
    }
  };

  return (
    <motion.div
      className={styles.link}
      onMouseEnter={() => {
        setSelectedIndicator(href);
      }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? 'open' : 'closed'}
        className={styles.indicator}
      ></motion.div>
      {/* Navigation link */}
      {href.startsWith('#') ? (
        // If it's an on-page section (e.g., #about)
        <a href={href} onClick={handleClick}>
          {title}
        </a>
      ) : (
        // If it's a Next.js route (e.g., /work)
        <Link href={href}>{title}</Link>
      )}
    </motion.div>
  );
}
