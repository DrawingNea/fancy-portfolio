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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const stickyElement = useRef(null);

    useEffect(() => {
      // simulate your preloader timing
      const timer = setTimeout(() => {
        setIsLoading(false);
        window.scrollTo(0, 0);
      }, 2000);

      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      let loco;
      let mounted = true;

      (async () => {
        try {
          const LocomotiveScroll = (await import('locomotive-scroll')).default;

          loco = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            // tweak these for speed / smoothness
            lerp: 0.08, // interpolation - smaller = smoother/slower
            multiplier: 1, // global speed multiplier
          });

          locoRef.current = loco;
          // expose for quick debugging or for components that don't use context
          window.locoScroll = loco;

          console.info('Locomotive initialized', loco);
        } catch (err) {
          console.warn('Failed to init locomotive-scroll:', err);
        }
      })();

      return () => {
        mounted = false;
        if (loco) {
          loco.destroy();
          locoRef.current = null;
          window.locoScroll = undefined;
        }
      };
    }, []);
    return (
      <main className={styles.main} data-scroll-container>
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>
        <Header ref={stickyElement} />
        <StickyCursor stickyElement={stickyElement} />
        <section id="home" data-scroll-section>
          <Landing />
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