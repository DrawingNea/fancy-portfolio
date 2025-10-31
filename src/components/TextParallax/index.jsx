'use client';
import { useScroll, useTransform, motion } from 'framer-motion';
import Picture1 from '../../../public/images/1.jpg';
import Picture2 from '../../../public/images/2.jpg';
import Picture3 from '../../../public/images/3.jpg';
import Lenis from 'lenis';

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
      <div className={styles.spacer} />
      <div ref={container} className={styles.slideContainer}>
        <Slide
          src={Picture1}
          direction="left"
          left="-40%"
          progress={scrollYProgress}
        />
        <Slide
          src={Picture2}
          direction="right"
          left="-25%"
          progress={scrollYProgress}
        />
        <Slide
          src={Picture3}
          direction="left"
          left="-75%"
          progress={scrollYProgress}
        />
      </div>
      <div className={styles.spacer} />
    </>
  );
}

const Slide = ({ src, direction, left, progress }) => {
  const dir = direction === 'left' ? -1 : 1;
  const translateX = useTransform(progress, [0, 1], [700 * dir, -700 * dir]);

  return (
    <motion.div style={{ x: translateX, left: left }} className={styles.slide}>
      <Phrase src={src} />
      <Phrase src={src} />
      <Phrase src={src} />
    </motion.div>
  );
};

const Phrase = ({ src }) => (
  <div className={styles.phrase}>
    <p>Front End Developer</p>
    <span className={styles.imageWrapper}>
      <Image style={{ objectFit: 'cover' }} src={src} alt="image" fill />
    </span>
  </div>
);
