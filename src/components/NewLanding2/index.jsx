'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function HeroSection() {
  const maskRef = useRef(null);
  const cwRef = useRef(window.innerWidth);
  const chRef = useRef(window.innerHeight);

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const txt1X = screenWidth < 480 ? 200 : screenWidth < 768 ? 120 : -200;
  const txt2X = screenWidth < 480 ? 200 : screenWidth < 768 ? 120 : -200;

  useEffect(() => {
    const nWaves = 5;
    const waves = [];
    const amp = 10;
    const speed = 0.4;
    const detail = 30;
    let waveY = 0;

    const mask = maskRef.current;
    if (!mask) return;

    // Function to create waves (only polygons)
    const createPolygons = () => {
      // Remove only polygons, keep other elements (like <text>)
      mask.querySelectorAll('polygon').forEach((p) => p.remove());

      for (let w = 0; w < nWaves; w++) {
        const p = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'polygon'
        );
        waves[w] = p;
        mask.appendChild(p);

        const fillAttr = w === 0 ? '#fff' : 'none';
        const strokeAttr = w === 0 ? '' : '#fff';
        const strokeDasharray = w === 0 ? '' : '2 4';
        const strokeWidth = w === 0 ? '' : `${3 - (w / nWaves) * 3}`;

        p.setAttribute('fill', fillAttr);
        if (w !== 0) {
          p.setAttribute('stroke', strokeAttr);
          p.setAttribute('stroke-dasharray', strokeDasharray);
          p.setAttribute('stroke-width', strokeWidth);
        }
      }
    };

    createPolygons(); // initial polygons

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

    const handleResize = () => {
      cwRef.current = window.innerWidth;
      chRef.current = window.innerHeight;
      createPolygons(); // recreate polygons for new width/height
      ScrollTrigger.refresh(); // refresh scroll triggers
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
