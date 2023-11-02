import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getPeople } from "../../api/people";
import PaginatedTable from "../../components/Table/Table";
import { Person } from "../../types/people";
import "./styles.css";
import { QueryKeys } from "../../constants/queryKeys";
import { getPeopleId } from "../../utils";
import { fontFamily } from "../../constants";
import { Toaster } from "../../components/Toaster/Toaster";
import { Link } from "react-router-dom";

export function People() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Person[]>([]);
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const { data, isLoading, isError } = useQuery(
    [QueryKeys.People, page, search],
    () => getPeople(page + 1, search)
  );
  useEffect(() => {
    if (data?.results) {
      search
        ? setSearchResults(data?.results)
        : setResults([...results, ...data.results]);
    }
  }, [data?.pageNumber, data?.results, results, search]);

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    if (!event.target.value) {
      setSearchResults([]);
    }
    // TODO add debounce
    setSearch(event.target.value);
  };

  const getRows = (rows: Person[]) => {
    return rows.map((item) => ({
      name: item.name,
      gender: item.gender,
      height: item.height,
      eye_color: item.eye_color,
      details: (
        <Button
          variant="contained"
          href={`/details/${getPeopleId(item.url)}`}
          className="button"
        >
          Details
        </Button>
      ),
    }));
  };

  if (isError) {
    return <Toaster severity="error" message="Error fetching data" />;
  }

  return (
    <div className="container">
      <Link className="label" to="/">
        Star War
      </Link>
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
        rows={getRows(search ? searchResults : results)}
        count={data?.count}
        page={page}
        setPage={setPage}
        isLoading={isLoading}
      />
    </div>
  );
}
