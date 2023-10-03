export interface IMovie {
  id: string;
  ratings: string[];
  averageRating: string;
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
  movies: IMovie[];
}
