import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { QueryKeys } from "../../constants/queryKeys";
import { getFilms } from "../../api/films";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from "victory";
import styles from "./styles.module.scss";
import { getBarColor } from "../../utils";
import { Toaster } from "../../components/Toaster/Toaster";
import { Link } from "../../components/Link/Link";

export function Characters() {
  const {
    data = [],
    isLoading: isFilmsLoading,
    isError: isErrorFetchingFilms,
  } = useQuery([QueryKeys.Films], () => getFilms());

  const films = data.map((film, index) => ({
    x: `${film.title} - ${index}`,
    y: film.characters.length,
  }));

  if (isErrorFetchingFilms) {
    return <Toaster severity="error" message="Error fetching data" />;
  }

  if (isFilmsLoading) {
    return <CircularProgress />;
  }
  // TODO if the films count are so large we would consider showing the first
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/" text="Films characters chart" />
        <VictoryChart domainPadding={{ x: 20 }} theme={VictoryTheme.material}>
          <VictoryAxis tickFormat={() => ""} />
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
                    width: 120 / films.length,
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
              <div className={styles["sub-label"]} key={index}>
                <span
                  className={styles.icon}
                  style={{
                    backgroundColor: getBarColor(index),
                  }}
                />
                <label key={film.x}>{film.x}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
