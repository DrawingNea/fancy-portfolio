'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './style.module.scss';

export default function Index() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setHeight(window.innerHeight);
  }, []);

  if (height === 0) {
    return <svg className={styles.svgCurve}></svg>;
  }

  const initialPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q-100 ${
    height / 2
  } 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q100 ${
    height / 2
  } 100 0`;

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg className={styles.svgCurve}>
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
}
