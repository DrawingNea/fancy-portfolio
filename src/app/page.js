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
import Footer from '../components/Footer';
import Projects from '../components/Projects';
import TextSlider from '@/components/TextSlider';
import NewLanding from '@/components/NewLanding';
import NewLanding2 from '@/components/NewLanding2';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const stickyElement = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={styles.main} data-scroll-container>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      {!isLoading && <Header ref={stickyElement} />}
      {!isLoading && <StickyCursor stickyElement={stickyElement} />}{' '}
      <section id="home" data-scroll-section>
        <NewLanding2 />
        <TextClip />
      </section>
      <section id="about" data-scroll-section>
        <TextGradient />
      </section>
      <Description />
      <section id="skills" data-scroll-section>
        <TextSlider />
      </section>
      <section id="work" data-scroll-section>
        <Projects />
      </section>
      <section id="hobbies" data-scroll-section>
        <TextParallax />
      </section>
      <section id="contact" data-scroll-section>
        <Footer />
      </section>
    </main>
  );
}