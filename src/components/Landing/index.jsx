'use client';
import Image from 'next/image';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { slideUp } from './animation';
import { Fragment } from 'react';
import { basePath } from '../../../next.config.mjs';

const words = [
  'Frontend Developer',
  'Fullstack Developer',
  'UI/UX Designer',
  'Coffee-Fueled Coder',
];

export default function Home() {
  return (
    <motion.main
      variants={slideUp}
      initial="initial"
      animate="enter"
      className={styles.landing}
    >
      <Image
        src={`${basePath}/images/background6.jpg`}
        fill={true}
        alt="background"
      />

      {/* Text marquee section */}
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          {[...new Array(2)].fill(0).map((_, index) => (
            <Fragment key={index}>
              {words.map((word) => (
                <p key={word}>{word} -</p>
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Description */}
      <div data-scroll data-scroll-speed={0.1} className={styles.description}>
        <svg
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
            fill="white"
          />
        </svg>
        <p>Evelyn Lindner</p>
        <p>Designer & Developer</p>
      </div>
    </motion.main>
  );
}
