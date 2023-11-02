import "./styles.css";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/people" className="link">
              People
            </Link>
          </li>
          <li>
            <Link to="/characters" className="link">
              Characters
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
