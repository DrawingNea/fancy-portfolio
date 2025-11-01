'use client';
import React, { useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';
import Magnetic from '../Magnetic/gsap';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';

export default function index() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [110, 90]);

  const [copied, setCopied] = useState('');

  const handleMailClick = () => {
    window.location.href = 'mailto:Evelyn.Lindner@outlook.com';
  };

  const handleCopy = (value, type) => {
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000); // remove feedback after 2s
  };
  return (
    <motion.div style={{ y }} ref={container} className={styles.contact}>
      <div className={styles.body}>
        <div className={styles.title}>
          <span>
            <div className={styles.imageContainer}>
              <Image fill={true} alt={'image'} src={`/images/portrait.png`} />
            </div>
            <h2>Let's work</h2>
          </span>
          <h2>together</h2>
          <motion.div style={{ x }} className={styles.buttonContainer}>
            <Rounded
              backgroundColor={'#334BD3'}
              className={styles.button}
              onClick={handleMailClick}
            >
              <p>Get in touch</p>
            </Rounded>
          </motion.div>
          <motion.svg
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
        </div>
        <div className={styles.nav}>
          <Rounded
            onClick={() => handleCopy('Evelyn.Lindner@outlook.com', 'email')}
          >
            <p
              style={{
                width: '200px',
                textAlign: 'center',
              }}
            >
              {copied === 'email' ? 'Copied!' : 'Evelyn.Lindner@outlook.com'}
            </p>
          </Rounded>

          <Rounded onClick={() => handleCopy('+49 172 9822968', 'phone')}>
            <p
              style={{
                width: '150px',
                textAlign: 'center',
              }}
            >
              {copied === 'phone' ? 'Copied!' : '+49 172 9822968'}
            </p>
          </Rounded>
          <div className={styles.iconContainer}>
            <Magnetic>
              <a
                href="https://www.xing.com/profile/Evelyn_Lindner8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  id="Layer_2"
                  data-name="Layer 2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M309.215,304.749   c30.414,57.874,62.227,114.961,94.801,173.782c4.402,7.997,11.826,19.137,8.67,26.073c-4.242,9.332-25.275,5.539-41.855,5.539   c-19.523,0-36.902,3.53-49.764-0.799c-13.125-4.416-25.002-36.989-31.6-48.979c-27.934-50.773-57.736-105.254-85.319-154.831   c47.294-86.353,103.108-180.979,152.448-270.165c7.572-13.661,13.748-33.771,31.613-34.769C396.68,0.14,413.596,1.4,430.875,1.4   c14.32,0,36.428-2.108,40.295,3.941c6.6,10.367-10.842,30.466-15.807,39.51C407.158,132.44,356.971,217.997,309.215,304.749z    M125.953,357.67c15.657-1.908,23.653-23.777,30.789-36.341c22.631-39.746,45.697-80.715,66.369-117.705   c-12.774-23.728-29.766-51.385-44.249-76.624c-6.25-10.891-10.979-25.087-25.263-25.275c-25.275,0-50.575,0-75.85,0   c-4.129,0.586-7.846,1.635-8.682,5.527c-2.046,12.438,5.625,19.486,9.48,26.073c8.97,15.407,17.978,29.866,27.646,46.608   c3.094,5.327,12.874,18.938,12.625,24.489c-0.15,3.718-7.598,12.638-10.254,17.378c-21.607,38.586-39.334,70.735-60.83,109.009   c-3.194,5.689-10.267,12.301-7.896,20.534c1.023,3.605,6.749,6.637,9.469,6.325C74.853,357.67,100.403,357.67,125.953,357.67z" />
                </svg>
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="https://www.linkedin.com/in/evelyn-l-b83888231/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  id="Layer_2"
                  data-name="Layer 2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 45"
                >
                  <path d="M41,4.1H7A2.9,2.9,0,0,0,4,7V41.1A2.9,2.9,0,0,0,7,44H41a2.9,2.9,0,0,0,2.9-2.9V7A2.9,2.9,0,0,0,41,4.1Zm-25.1,34h-6v-19h6Zm-3-21.6A3.5,3.5,0,0,1,9.5,13a3.4,3.4,0,0,1,6.8,0A3.5,3.5,0,0,1,12.9,16.5ZM38,38.1H32.1V28.8c0-2.2,0-5-3.1-5s-3.5,2.4-3.5,4.9v9.4H19.6v-19h5.6v2.6h.1a6.2,6.2,0,0,1,5.6-3.1c6,0,7.1,3.9,7.1,9.1Z" />
                </svg>
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="https://github.com/DrawingNea"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  id="Layer_2"
                  data-name="Layer 2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path d="M24,1.9a21.6,21.6,0,0,0-6.8,42.2c1,.2,1.8-.9,1.8-1.8V39.4c-6,1.3-7.9-2.9-7.9-2.9a6.5,6.5,0,0,0-2.2-3.2C6.9,31.9,9,32,9,32a4.3,4.3,0,0,1,3.3,2c1.7,2.9,5.5,2.6,6.7,2.1a5.4,5.4,0,0,1,.5-2.9C12.7,32,9,28,9,22.6A10.7,10.7,0,0,1,11.9,15a6.2,6.2,0,0,1,.3-6.4,8.9,8.9,0,0,1,6.4,2.9,15.1,15.1,0,0,1,5.4-.8,17.1,17.1,0,0,1,5.4.7,9,9,0,0,1,6.4-2.8,6.5,6.5,0,0,1,.4,6.4A10.7,10.7,0,0,1,39,22.6C39,28,35.3,32,28.5,33.2a5.4,5.4,0,0,1,.5,2.9v6.2a1.8,1.8,0,0,0,1.9,1.8A21.7,21.7,0,0,0,24,1.9Z" />
                </svg>
              </a>
            </Magnetic>
          </div>
        </div>

        <div className={styles.info}>
          <div>
            <span>
              <h3>Version</h3>
              <p>2025 © Edition</p>
            </span>
            <span>
              <h3>Version</h3>
              <p>7:59 PM GMT+2</p>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
