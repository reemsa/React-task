import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getPeople } from "../../api/people";
import PaginatedTable from "../../components/Table/Table";
import { People } from "../../types/people";
import "./styles.css";
import { QueryKeys } from "../../constants/queryKeys";
import { getPeopleId } from "../../utils";

export function Home() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<People[]>([]);
  const [searchResults, setSearchResults] = useState<People[]>([]);
  const { data, isLoading, isError } = useQuery(
    [QueryKeys.People, page, search],
    () => getPeople(page + 1, search)
  );
  useEffect(() => {
    console.log(data);
    if (data?.results) {
      search
        ? setSearchResults(data?.results)
        : setResults([...results, ...data.results]);
    }
  }, [data?.pageNumber]);

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    if (!event.target.value) {
      setSearchResults([]);
    }
    // TODO call the same api with the search value
    setSearch(event.target.value);
  };

  const getRows = (rows: People[]) => {
    // Filter the data based on the search input
    const filteredData = rows.filter((data) =>
      Object.values(data).some(
        (value) =>
          value !== null &&
          value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
    return filteredData.map((item) => ({
      name: item.name,
      gender: item.gender,
      height: item.height,
      eye_color: item.eye_color,
      details: (
        <Button variant="contained" href={`/details/${getPeopleId(item.url)}`}>
          Details
        </Button>
      ),
    }));
  };

  if (isError) {
    return (
      <Alert variant="filled" severity="error">
        Error fetching data
      </Alert>
    );
  }

  return (
    <div className="container">
      <label className="label">Star War</label>
      <TextField
        label="Search"
        variant="standard"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        color="primary"
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
