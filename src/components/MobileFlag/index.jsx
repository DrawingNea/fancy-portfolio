'use client';

import styles from './style.module.scss';

export default function MobileFlag() {
  return (
    <div className={styles.overlay}>
      <div className={styles.textWrapper}>
        <h1 className={styles.title}>Mobile View Coming Soon</h1>
        <p className={styles.subtitle}>
          I am working hard to make the mobile version look amazing!
        </p>
      </div>
    </div>
  );
}
