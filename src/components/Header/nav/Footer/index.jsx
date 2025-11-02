import styles from './style.module.scss';

export default function index() {
  return (
    <div className={styles.footer}>
      <a
        href="https://www.xing.com/profile/Evelyn_Lindner8"
        target="_blank"
        rel="noopener noreferrer"
      >
        Xing
      </a>

      <a
        href="https://www.linkedin.com/in/evelyn-l-b83888231/"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>

      <a
        href="https://github.com/DrawingNea"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>

      <a href="mailto:Evelyn.Lindner@outlook.com">Email Me</a>
    </div>
  );
}
