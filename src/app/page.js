'use client';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import MobileFlag from '../components/MobileFlag';
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
import NewLanding2 from '@/components/NewLanding2';
import styles from './page.module.scss';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const stickyElement = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined')
      return;

    const checkIsMobile = () => {
      const isMobileDevice =
        /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const isSmallScreen = window.innerWidth <= 1200;

      setIsMobile(isMobileDevice || isSmallScreen);
    };

    // Initial check
    checkIsMobile();

    // Update on resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <main
      data-scroll-container
      style={{
        overflow: isMobile ? 'hidden' : 'visible',
        height: isMobile ? '100vh' : 'auto',
        width: isMobile ? '100vw' : 'auto',
      }}
    >
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {!isLoading && <Header ref={stickyElement} />}
      {!isLoading && <StickyCursor stickyElement={stickyElement} />}

      <section
        id="home"
        data-scroll-section
        style={{
          overflow: isMobile ? 'hidden' : 'visible',
        }}
      >
        <NewLanding2 />
        <TextClip />
      </section>

      <section
        id="about"
        data-scroll-section
        style={{
          overflow: isMobile ? 'hidden' : 'auto',
        }}
      >
        <TextGradient />
      </section>

      <Description />

      <section
        id="skills"
        data-scroll-section
        style={{
          overflow: isMobile ? 'hidden' : 'auto',
        }}
      >
        <TextSlider />
      </section>

      <section
        id="work"
        data-scroll-section
        style={{
          overflow: isMobile ? 'hidden' : 'auto',
        }}
      >
        <Projects />
      </section>

      <section
        id="hobbies"
        data-scroll-section
        style={{
          overflow: isMobile ? 'hidden' : 'auto',
        }}
      >
        <TextParallax />
      </section>

      <section
        id="contact"
        data-scroll-section
        style={{
          overflow: isMobile ? 'hidden' : 'auto',
        }}
      >
        <Footer />
      </section>

      {/* Overlay Mobile Flag */}
      {isMobile && <MobileFlag />}
    </main>
  );
}
