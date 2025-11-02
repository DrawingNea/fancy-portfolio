'use client'; // if you're using Next.js 13+ app router

import { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function HeroSection() {
  const maskRef = useRef(null);

  useEffect(() => {
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const nWaves = 5;
    const waves = [];
    const amp = 10;
    const speed = 0.4;
    const detail = 30;
    let waveY = 0;

    const mask = maskRef.current;
    if (!mask) return;

    // Create waves (polygon elements in SVG)
    for (let w = 0; w < nWaves; w++) {
      const p = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'polygon'
      );
      waves.push(p);
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

    gsap
      .timeline({ defaults: { duration: 1 }, delay: 0.9 })
      .from('.txt1', { opacity: 0, ease: 'power2.inOut' }, 0)
      .to(window, { scrollTo: ch / 2 }, 0);

    // Fade out DEVELOPMENT text before next section
    ScrollTrigger.create({
      trigger: `.${styles.hero}`,
      start: 'bottom top+=1000',
      end: 'bottom top+=600',
      scrub: true,
      animation: gsap.to('.txt2', {
        opacity: 0,
        ease: 'power1.out',
      }),
    });

    gsap.ticker.add((t) => {
      if (waveY !== -window.scrollY) {
        gsap.to(window, { duration: 1, waveY: Math.round(window.scrollY) });
        waveY = -window.scrollY;
      }

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
      // you might want to update cw, ch etc
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
              x="0"
              y="0"
              stroke="#000"
              fill="#fff"
              strokeWidth="1.2px"
            >
              DEVELOPMENT
            </text>
          </g>
          <g id="txt1">
            <rect width="750" height="120" fill="none" />
            <text
              className="txt1"
              x="107"
              y="0"
              fill="#fff"
              letterSpacing="0.15"
            >
              ANIMATION
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
