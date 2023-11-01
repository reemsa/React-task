import { PEOPLE_URL } from "../constants";

export const getPeopleId = (url: string) => {
  return url.split(PEOPLE_URL)?.[1];
};
