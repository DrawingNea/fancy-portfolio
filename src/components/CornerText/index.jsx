'use client';

import { useEffect, useRef } from 'react';
import styles from './style.module.scss';

export default function CodeDrivenAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      const { gsap } = await import('gsap');

      const svg = containerRef.current;
      if (!svg) return;

      // Scope all selectors to this component
      const q = gsap.utils.selector(svg);

      const tl = gsap
        .timeline({
          defaults: {
            duration: 2,
            yoyo: true,
            ease: 'power2.inOut',
          },
        })
        .fromTo(
          q('.left, .right'),
          {
            svgOrigin: '640 500',
            skewY: (i) => [-30, 15][i],
            scaleX: (i) => [0.6, 0.85][i],
            x: 200,
          },
          {
            skewY: (i) => [-15, 30][i],
            scaleX: (i) => [0.85, 0.6][i],
            x: -200,
          }
        )
        .play(0.5);

      const tl2 = gsap.timeline();
      q('text').forEach((t, i) => {
        tl2.add(
          gsap.fromTo(
            t,
            { xPercent: -100, x: 700 },
            { duration: 1, xPercent: 0, x: 575, ease: 'sine.inOut' }
          ),
          (i % 3) * 0.2
        );
      });

      const onMove = (e) => {
        tl.pause();
        tl2.pause();
        gsap.to([tl, tl2], {
          duration: 2,
          ease: 'power4',
          progress: e.clientX / window.innerWidth,
        });
      };

      window.addEventListener('pointermove', onMove);

      cleanup = () => {
        window.removeEventListener('pointermove', onMove);
        tl.kill();
        tl2.kill();
      };
    })();

    return () => cleanup();
  }, []);

  return (
    <div className={styles.wrapper}>
      <svg viewBox="0 0 1280 720" ref={containerRef}>
        <mask id="maskLeft">
          <rect x="-50%" width="100%" height="100%" fill="#fff" />
        </mask>
        <mask id="maskRight">
          <rect x="50%" width="100%" height="100%" fill="#fff" />
        </mask>

        <g fontSize="150">
          <g mask="url(#maskLeft)" fill="#000" className="left">
            <text y="120">Thoughtful</text>
            <text y="250">Adaptable</text>
            <text y="380">Reliable</text>
          </g>
          <g mask="url(#maskRight)" fill="#455ce9" className="right">
            <text y="120">Thoughtful</text>
            <text y="250">Adaptable</text>
            <text y="380">Reliable</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
