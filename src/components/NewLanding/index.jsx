'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import styles from './style.module.scss';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function NewLanding() {
  const arrowBtnRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: `.${styles.scrollDist}`,
        start: '0 0',
        end: '100% 100%',
        scrub: 1,
      },
    });

    timeline
      .fromTo(`.${styles.sky}`, { y: 0 }, { y: -200 }, 0)
      .fromTo(`.${styles.cloud1}`, { y: 100 }, { y: -800 }, 0)
      .fromTo(`.${styles.cloud2}`, { y: -150 }, { y: -500 }, 0)
      .fromTo(`.${styles.cloud3}`, { y: -50 }, { y: -650 }, 0)
      .fromTo(`.${styles.mountBg}`, { y: -10 }, { y: -100 }, 0)
      .fromTo(`.${styles.mountMg}`, { y: -30 }, { y: -250 }, 0)
      .fromTo(`.${styles.mountFg}`, { y: -50 }, { y: -600 }, 0);

    const arrowBtn = arrowBtnRef.current;

    if (arrowBtn) {
      const onEnter = () => {
        gsap.to(`.${styles.arrow}`, {
          y: 10,
          duration: 0.8,
          ease: 'back.inOut(3)',
          overwrite: 'auto',
        });
      };

      const onLeave = () => {
        gsap.to(`.${styles.arrow}`, {
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };

      const onClick = () => {
        gsap.to(window, {
          scrollTo: window.innerHeight,
          duration: 1.5,
          ease: 'power1.inOut',
        });
      };

      arrowBtn.addEventListener('mouseenter', onEnter);
      arrowBtn.addEventListener('mouseleave', onLeave);
      arrowBtn.addEventListener('click', onClick);

      return () => {
        arrowBtn.removeEventListener('mouseenter', onEnter);
        arrowBtn.removeEventListener('mouseleave', onLeave);
        arrowBtn.removeEventListener('click', onClick);
      };
    }

    return () => {
      timeline.kill();
      ScrollTrigger.kill();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollDist}></div>

      <main className={styles.main}>
        <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          <mask id="m">
            <g className={styles.cloud1}>
              <rect fill="#fff" width="100%" height="801" y="799" />
              <image
                xlinkHref="https://assets.codepen.io/721952/cloud1Mask.jpg"
                width="1200"
                height="800"
              />
            </g>
          </mask>

          <image
            className={styles.sky}
            xlinkHref="https://assets.codepen.io/721952/sky.jpg"
            width="1200"
            height="590"
          />
          <image
            className={styles.mountBg}
            xlinkHref="https://assets.codepen.io/721952/mountBg.png"
            width="1200"
            height="800"
          />
          <image
            className={styles.mountMg}
            xlinkHref="https://assets.codepen.io/721952/mountMg.png"
            width="1200"
            height="800"
          />
          <image
            className={styles.cloud2}
            xlinkHref="https://assets.codepen.io/721952/cloud2.png"
            width="1200"
            height="800"
          />
          <image
            className={styles.mountFg}
            xlinkHref="https://assets.codepen.io/721952/mountFg.png"
            width="1200"
            height="800"
          />
          <image
            className={styles.cloud1}
            xlinkHref="https://assets.codepen.io/721952/cloud1.png"
            width="1200"
            height="800"
          />
          <image
            className={styles.cloud3}
            xlinkHref="https://assets.codepen.io/721952/cloud3.png"
            width="1200"
            height="800"
          />

          <text fill="#fff" x="350" y="200" fontSize="99">
            EXPLORE
          </text>
          <polyline
            className={styles.arrow}
            fill="#fff"
            points="599,250 599,289 590,279 590,282 600,292 610,282 610,279 601,289 601,250"
          />

          <g mask="url(#m)">
            <rect fill="#fff" width="100%" height="100%" />
            <text x="350" y="200" fill="#162a43" fontSize="99">
              FURTHER
            </text>
          </g>

          <rect
            ref={arrowBtnRef}
            id="arrow-btn"
            width="100"
            height="100"
            opacity="0"
            x="550"
            y="220"
            style={{ cursor: 'pointer' }}
          />
        </svg>
      </main>
    </div>
  );
}
