import { Link as RouterLink } from "react-router-dom";
import styles from "./styles.module.scss";

interface LinkProps {
  text: string;
  to: string;
}

export function Link({ text, to }: LinkProps) {
  return (
    <RouterLink className={styles.title} to={to}>
      {text}
    </RouterLink>
  );
}
