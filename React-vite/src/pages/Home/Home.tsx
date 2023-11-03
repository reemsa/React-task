import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export function Home() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/people" className={styles.link}>
              People
            </Link>
          </li>
          <li>
            <Link to="/characters" className={styles.link}>
              Characters
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
