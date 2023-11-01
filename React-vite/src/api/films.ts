import { Film } from "../types/film";
import api from "./api";

export async function getFilms() {
  const { data } = await api.get<{ results: Film[] }>("/films");
  return data.results;
}
