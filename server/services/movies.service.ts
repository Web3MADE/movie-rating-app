import { data } from "../models/data";
import { IMovie } from "../models/models";
// TODO: implement rxDB later, replace with NextReponse.json()
export default async function getMovies() {
  try {
    const filteredData = data.movies.map((movie: IMovie) => {
      return {
        ...movie,
        rating: (movie.rating = Math.floor(Math.random() * 5) + 1),
      };
    });

    return filteredData;
  } catch (error) {
    console.log("error ", error);
  }
}

export const GET_MOVIES_KEY = ["GET_MOVIES"];
