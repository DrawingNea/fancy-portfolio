'use client';
import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../anim';
import Link from './Link';
import Curve from './Curve';
import Footer from './Footer';

const navItems = [
  { title: 'Home', href: '#home' },
  { title: 'About', href: '#about' },
  { title: 'Skills', href: '#skills' },
  { title: 'Work', href: '#work' },
  { title: 'Hobbies', href: '#hobbies' },
  { title: 'Contact', href: '#contact' },
];

export default function index() {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState('#home');

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3; // look 1/3 down viewport
      let currentSection = sections[0];

      for (let sec of sections) {
        const top = sec.offsetTop;
        if (scrollPos >= top) {
          currentSection = sec;
        } else {
          break;
        }
      }

      setSelectedIndicator(`#${currentSection.id}`);
    };

    // Listen to scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // set initial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={styles.nav}
        >
          <div className={styles.header}>
            <p>Navigation</p>
          </div>
          {navItems.map((data, index) => {
            return (
              <Link
                key={index}
                data={{ ...data, index }}
                isActive={selectedIndicator == data.href}
                setSelectedIndicator={setSelectedIndicator}
              ></Link>
            );
          })}
        </div>
        <Footer />
      </div>
      <Curve />
    </motion.div>
  );
}
