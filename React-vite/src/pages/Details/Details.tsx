import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { format } from "date-fns";
import { QueryKeys } from "../../constants/queryKeys";
import { fetchPersonDetails } from "../../api/people";
import styles from "./styles.module.scss";
import PaginatedTable from "../../components/Table/Table";
import { getFilms } from "../../api/films";

export function Details() {
  const { peopleId } = useParams();
  const {
    data: films,
    isLoading: isFilmsLoading,
    isError: isErrorFetchingFilms,
  } = useQuery([QueryKeys.Films], () => getFilms());
  const { data, isLoading, isError } = useQuery(
    [QueryKeys.Details, peopleId],
    () => fetchPersonDetails(peopleId),
    {
      enabled: !!peopleId,
    }
  );
  const personFilms = (films ?? []).filter((film) =>
    (data?.films ?? []).includes(film.url)
  );
  const details = data
    ? [
        { label: "id:", value: peopleId },
        { label: "Name:", value: data.name },
        { label: "Gender:", value: data.gender },
        { label: "Height:", value: data.height },
        { label: "Hair color:", value: data.hair_color },
        {
          label: "Created Date:",
          value: format(new Date(data.created), "dd/MM/yyyy"),
        },
      ]
    : [];

  if (isError || isErrorFetchingFilms) {
    return (
      <Alert variant="filled" severity="error">
        Error fetching data
      </Alert>
    );
  }

  if (isLoading || isFilmsLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <label className={styles.label}>Person Detail Page:</label>
      <div className={styles["details-container"]}>
        <div className={styles["left-container"]}>
          <List>
            {details.map(({ label, value }) => (
              <ListItem key={label} className={styles["list-item"]}>
                <ListItemText primary={label} secondary={value} />
              </ListItem>
            ))}
          </List>
        </div>
        <div className={styles["right-container"]}>
          <label className={styles["sub-label"]}>Persons Films</label>
          <PaginatedTable
            columns={["Title", "Director", "Release Date"]}
            rows={personFilms.map((film) => ({
              title: film.title,
              director: film.director,
              release_date: film.release_date,
            }))}
            maxHeight={300}
            showPagination={false}
            minWidth={480}
          />
        </div>
      </div>
    </div>
  );
}
