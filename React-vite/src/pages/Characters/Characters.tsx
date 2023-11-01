import { useQuery } from "react-query";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { QueryKeys } from "../../constants/queryKeys";
import { getFilms } from "../../api/films";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from "victory";
import styles from "./styles.module.scss";

export function Characters() {
  const {
    data,
    isLoading: isFilmsLoading,
    isError: isErrorFetchingFilms,
  } = useQuery([QueryKeys.Films], () => getFilms());

  const films = (data ?? []).map((film) => ({
    x: film.title,
    y: film.characters.length,
  }));

  if (isErrorFetchingFilms) {
    return (
      <Alert variant="filled" severity="error">
        Error fetching data
      </Alert>
    );
  }

  if (isFilmsLoading) {
    return <CircularProgress />;
  }

  const colors = [
    "#e8e9ff",
    "#c3c8fe",
    "#98a5fe",
    "#6681ff",
    "#3463fe",
    "#0a45f7",
    "#0030e2",
    "#001fd1",
    "#0002bf",
  ]; // Specific colors for bars

  const getBarColor = (index: number) => {
    return index > colors.length
      ? colors[index]
      : colors[index % colors.length];
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <label className={styles.title}>Films characters chart</label>
        <VictoryChart domainPadding={{ x: 20 }} theme={VictoryTheme.material}>
          <VictoryAxis
            tickFormat={() => ""} // Format tick labels if needed
          />
          <VictoryAxis dependentAxis />
          {films.map((item, index) => {
            return (
              <VictoryBar
                key={index}
                data={[item]}
                x="x"
                y="y"
                style={{
                  data: {
                    fill: getBarColor(index),
                    width: 20,
                  },
                }}
              />
            );
          })}
        </VictoryChart>
        <div className={styles.label}>star war films</div>
        <div className={styles["label-container"]}>
          {films.map((film, index) => {
            return (
              <div className={styles["sub-label"]}>
                <span
                  className={styles.icon}
                  style={{
                    backgroundColor: getBarColor(index),
                  }}
                />
                <label key={film.x}>{`Film ${index + 1}`}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
