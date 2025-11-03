'use client';
import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';
export default function index() {
  const phrase =
    'I like taking ideas and bringing them to life, discovering new challenges as I go. Each project is a chance to learn something new and push myself a little further.';
  const description = useRef(null);
  const isInView = useInView(description);
  return (
    <div ref={description} className={styles.description}>
      <div className={styles.body}>
        <p>
          {phrase.split(' ').map((word, index) => {
            return (
              <span key={index} className={styles.mask}>
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? 'open' : 'closed'}
                  key={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
        <motion.p variants={opacity} animate={isInView ? 'open' : 'closed'}>
          By blending design, code, and a sense of curiosity, I create web
          experiences that stand out and feel alive.
        </motion.p>
        <div data-scroll data-scroll-speed={0.1}>
          <a
            href="https://drawingnea.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Rounded
              className={styles.button}
              href="https://drawingnea.github.io/portfolio/"
            >
              <p>About me</p>
            </Rounded>
          </a>
        </div>
      </div>
    </div>
  );
}
