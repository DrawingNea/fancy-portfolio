'use client';
import { forwardRef, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './style.module.scss';
import { AnimatePresence } from 'framer-motion';
import Magnetic from '../Magnetic/framer';
import Nav from './nav';

const Header = forwardRef(function Header(props, ref) {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  return (
    <>
      <div className={styles.header}>
        <Magnetic>
          <div
            onClick={() => {
              setIsActive(!isActive);
            }}
            className={styles.button}
          >
            <div
              className={`${styles.burger} ${
                isActive ? styles.burgerActive : ''
              }`}
            >
              <div ref={ref} className={styles.bounds}></div>
            </div>
          </div>
        </Magnetic>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
});

export default Header;
