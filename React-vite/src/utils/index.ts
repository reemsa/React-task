import { BAR_COLORS, PEOPLE_URL } from "../constants";

export const getPeopleId = (url: string) => {
  return url.split(PEOPLE_URL)?.[1];
};

export const getBarColor = (index: number) => {
  return BAR_COLORS[index % BAR_COLORS.length];
};
