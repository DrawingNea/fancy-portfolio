'use client';
import { useScroll, useTransform, motion } from 'framer-motion';
import Lenis from 'lenis';
import { basePath } from '../../../next.config.mjs';

import styles from './style.module.scss';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Index() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <div className={styles.spacerTop} />
      <div ref={container} className={styles.slideContainer}>
        <Slide
          src={`${basePath}/images/piano.jpg`}
          direction="left"
          left="-40%"
          progress={scrollYProgress}
          title="Piano & Drums"
        />
        <Slide
          src={`${basePath}/images/pc.jpg`}
          direction="right"
          left="-25%"
          progress={scrollYProgress}
          title="Gaming & Coding"
        />
        <Slide
          src={`${basePath}/images/book.jpg`}
          direction="left"
          left="-75%"
          progress={scrollYProgress}
          title="Cryptography & Mystery"
        />
      </div>
      <div className={styles.spacerBottom} />
    </>
  );
}

const Slide = ({ src, direction, left, progress, title }) => {
  const dir = direction === 'left' ? -1 : 1;
  const translateX = useTransform(progress, [0, 1], [200 * dir, -2200 * dir]);

  return (
    <motion.div style={{ x: translateX, left: left }} className={styles.slide}>
      <Phrase src={src} title={title} />
      <Phrase src={src} title={title} />
      <Phrase src={src} title={title} />
      <Phrase src={src} title={title} />
    </motion.div>
  );
};

const Phrase = ({ src, title }) => (
  <div className={styles.phrase}>
    <p>{title}</p>
    <span className={styles.imageWrapper}>
      <Image style={{ objectFit: 'cover' }} src={src} alt="image" fill />
    </span>
  </div>
);
