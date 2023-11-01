export interface People {
  name: string;
  height: string;
  gender: string;
  eye_color: string;
  url: string;
  hair_color: string;
  created: string;
}

export interface GetPeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: People[];
}
