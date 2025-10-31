'use client';
import React, { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';
import Footer from '../Footer';

export default function TextSlider() {
  const container = useRef(null);
  const paths = useRef([]);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (e) => {
      paths.current.forEach((path, i) => {
        if (path) {
          path.setAttribute('startOffset', `${-90 + i * 112 + e * 112}%`);
        }
      });
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={container} className={styles.container}>
      <svg className={styles.svg} viewBox="0 0 250 90">
        <path
          fill="none"
          id="curve"
          d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"
        />
        <text className={styles.text}>
          {[...Array(3)].map((_, i) => (
            <textPath
              key={i}
              ref={(ref) => (paths.current[i] = ref)}
              startOffset={`${i * 112}%`}
              href="#curve"
            >
              React.js - Next.js - Redux - Framer Motion - GSAP - Tailwind CSS -
              Cypress - Git - Spring Boot - SQL
            </textPath>
          ))}
        </text>
      </svg>
      <Logos scrollProgress={scrollYProgress} />
    </div>
  );
}

const Logos = ({ scrollProgress }) => {
  const y = useTransform(scrollProgress, [0, 1], [-700, 0]);

  return (
    <div className={styles.logosWrapper}>
      <motion.div style={{ y }} className={styles.logosInner}>
        <Footer />
      </motion.div>
    </div>
  );
};
