import Button from "@mui/material/Button";
import { Person } from "../../types/people";
import { getPeopleId } from "../../utils";
import styles from "./styles.module.scss";

export const getRows = (rows: Person[]) => {
  return rows.map((item) => ({
    name: item.name,
    gender: item.gender,
    height: item.height,
    eye_color: item.eye_color,
    details: (
      <Button
        variant="contained"
        href={`/details/${getPeopleId(item.url)}`}
        className={styles.button}
      >
        Details
      </Button>
    ),
  }));
};
