'use client';
import styles from './page.module.scss';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Landing from '../components/Landing';
import TextClip from '../components/TextClip';
import TextParallax from '../components/TextParallax';
import TextGradient from '../components/TextGradient';
import Description from '../components/Description';
import Header from '../components/Header';
import StickyCursor from '../components/StickyCursor';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const stickyElement = useRef(null);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <main className={styles.main}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Header ref={stickyElement} />
      <StickyCursor stickyElement={stickyElement} />
      <Landing />
      <TextClip />
      <TextParallax />
      <TextGradient />
      <Description />
    </main>
  );
}