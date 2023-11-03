import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import TextField from "@mui/material/TextField";
import { getPeople } from "../../api/people";
import PaginatedTable from "../../components/Table/Table";
import { Person } from "../../types/people";
import { QueryKeys } from "../../constants/queryKeys";
import { fontFamily } from "../../constants";
import { Toaster } from "../../components/Toaster/Toaster";
import { Link } from "../../components/Link/Link";
import styles from "./styles.module.scss";
import { getRows } from "./utils";

export function People() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Person[]>([]);
  const { data, isLoading, isError } = useQuery(
    [QueryKeys.People, page, search],
    () => getPeople(page + 1, search)
  );
  useEffect(() => {
    if (data?.results) {
      setResults(data.results);
    }
  }, [data?.results]);

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    // TODO add debounce
    setSearch(event.target.value);
  };

  if (isError) {
    return <Toaster severity="error" message="Error fetching data" />;
  }

  return (
    <div className={styles.container}>
      <Link to="/" text="Star War" />
      <TextField
        label="Search By Name"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        color="info"
        InputProps={{
          style: {
            fontFamily,
          },
        }}
        InputLabelProps={{
          style: {
            fontFamily,
          },
        }}
      />
      <PaginatedTable
        columns={["Name", "Gender", "Height", "Eye color", " "]}
        rows={getRows(results)}
        count={data?.count}
        page={page}
        setPage={setPage}
        isLoading={isLoading}
      />
    </div>
  );
}
