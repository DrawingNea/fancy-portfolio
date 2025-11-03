'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function HeroSection() {
  const maskRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize screen width
    setScreenWidth(window.innerWidth);

    // Resize listener
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // GSAP animations
    const nWaves = 5;
    const waves = [];
    const amp = 10;
    const speed = 0.4;
    const detail = 30;
    let waveY = 0;

    const mask = maskRef.current;
    if (!mask) return;

    const createPolygons = () => {
      mask.querySelectorAll('polygon').forEach((p) => p.remove());
      for (let w = 0; w < nWaves; w++) {
        const p = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'polygon'
        );
        waves[w] = p;
        mask.appendChild(p);

        if (w === 0) {
          p.setAttribute('fill', '#fff');
        } else {
          p.setAttribute('fill', 'none');
          p.setAttribute('stroke', '#fff');
          p.setAttribute('stroke-dasharray', '2 4');
          p.setAttribute('stroke-width', `${3 - (w / nWaves) * 3}`);
        }
      }
    };

    createPolygons();

    const cwRef = { current: window.innerWidth };
    const chRef = { current: window.innerHeight };

    gsap
      .timeline({ defaults: { duration: 1 }, delay: 0.9 })
      .from('.txt1', { opacity: 0, ease: 'power2.inOut' }, 0)
      .to(window, { scrollTo: chRef.current / 2 }, 0);

    ScrollTrigger.create({
      trigger: `.${styles.hero}`,
      start: 'bottom top+=1000',
      end: 'bottom top+=600',
      scrub: true,
      animation: gsap.to('.txt2', { opacity: 0, ease: 'power1.out' }),
    });

    gsap.ticker.add((t) => {
      const cw = cwRef.current;
      const ch = chRef.current;
      const scrollY = window.scrollY;
      if (waveY !== -scrollY) waveY = -scrollY;

      waves.forEach((p, k) => {
        const offset = ((1 - k / nWaves) * nWaves) / 6;
        let pts = '';
        for (let i = -1; i < cw + detail; i += detail) {
          let y = ch - -waveY;
          y += Math.sin(i * 0.003 - t / speed + offset) * amp;
          y += Math.sin(i * 0.004 - t / speed + offset) * amp;
          y += Math.sin(i * -0.011 - t / speed + 20 + offset) * amp;
          pts += `${i.toFixed(2)},${y.toFixed(2)} `;
        }
        p.setAttribute('points', `-20,-20 -20,${ch / 2} ${pts} ${cw},-20`);
      });
    });

    const handleResizePolygons = () => {
      cwRef.current = window.innerWidth;
      chRef.current = window.innerHeight;
      createPolygons();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResizePolygons);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleResizePolygons);
      gsap.ticker.remove();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const txt1X = screenWidth < 480 ? 200 : screenWidth < 768 ? 120 : -200;
  const txt2X = screenWidth < 480 ? 200 : screenWidth < 768 ? 120 : -200;

  return (
    <section className={styles.hero}>
      <div className={styles.scrollDist}></div>
      <svg className={styles.container}>
        <defs>
          <mask id="m" ref={maskRef}></mask>
          <g id="txt2">
            <rect width="750" height="120" fill="none" />
            <text
              className="txt2"
              x={txt2X}
              y="0"
              stroke="#000"
              fill="#fff"
              strokeWidth="1.2px"
            >
              FULLSTACK DEVELOPER
            </text>
          </g>
          <g id="txt1">
            <rect width="750" height="120" fill="none" />
            <text
              className="txt1"
              x={txt1X}
              y="0"
              fill="#fff"
              letterSpacing="0.15"
              wordSpacing="20"
            >
              FRONTEND DEVELOPER
            </text>
          </g>
        </defs>
        <use xlinkHref="#txt2" x="50%" y="50%" transform="translate(-375 0)" />
        <g mask="url(#m)">
          <rect fill="#000" width="100%" height="100%" />
          <use
            xlinkHref="#txt1"
            x="50%"
            y="50%"
            transform="translate(-375 0)"
          />
        </g>
      </svg>
    </section>
  );
}
