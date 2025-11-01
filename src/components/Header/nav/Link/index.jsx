'use client';
import styles from './style.module.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from '../../anim';

export default function Index({ data, isActive, setSelectedIndicator }) {
  const { title, href, index } = data;

  const handleClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(data.href);
    if (!target) return;

    if (window.locoScroll) {
      window.locoScroll.scrollTo(target, {
        offset: 0,
        duration: 2,
        easing: [0.25, 0.0, 0.35, 1.0],
      });
    } else {
      const startY = window.scrollY;
      const targetY = target.getBoundingClientRect().top + startY;
      const distance = targetY - startY;
      const duration = Math.abs(distance) * 0.9;
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
