// add data prop?
export interface IMovie {
  id: number;
  rating: number;
  title: string;
  year: string;
  runtime: string;
  genres: string[];
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
}

export interface IData {
  genres: string[];
  movies: IMovie[];
}
