'use client';
import styles from './style.module.scss';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

const phrase =
  'Every interaction tells a story, and I enjoy shaping how those stories unfold. I experiment with ideas, patterns, and flows to create moments that feel effortless. Tiny details become the things people remember.';

export default function Index() {
  let refs = useRef([]);
  const body = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  }, []);

  const createAnimation = () => {
    if (typeof window === 'undefined') return;
    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: container.current,
        scrub: 10,
        start: `top`,
        end: `+=${window.innerHeight / 10}`,
      },
      opacity: 1,
      ease: 'none',
      stagger: 0.1,
    });
  };

  const splitWords = (phrase) => {
    let body = [];
    phrase.split(' ').forEach((word, i) => {
      const letters = splitLetters(word);
      body.push(<p key={word + '_' + i}>{letters}</p>);
    });
    return body;
  };

  const splitLetters = (word) => {
    let letters = [];
    word.split('').forEach((letter, i) => {
      letters.push(
        <span
          key={letter + '_' + i}
          ref={(el) => {
            refs.current.push(el);
          }}
        >
          {letter}
        </span>
      );
    });
    return letters;
  };

  return (
    <div ref={container} className={styles.container}>
      <div ref={body} className={styles.body}>
        {splitWords(phrase)}
      </div>
    </div>
  );
}
