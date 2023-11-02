import api from "./api";
import { GetPeopleResponse, Person } from "../types/people";

export async function getPeople(pageNumber: number, search?: string) {
  const { data } = await api.get<GetPeopleResponse>(
    `/people/?page=${pageNumber}`,
    {
      params: search ? { search } : {},
    }
  );
  return { ...data, pageNumber };
}

export async function fetchPersonDetails(id?: string) {
  const url = `/people/${id}`;
  const { data } = await api.get<Person>(url);
  return data;
}
