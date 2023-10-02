import { getDatabase } from "../clients/database";
import { data } from "../models/data";
import { IMovie } from "../models/models";
// TODO: implement rxDB later, replace with NextReponse.json()
export default async function getMovies() {
  try {
    const { movieCollection } = await getDatabase();

    if (movieCollection)
      movieCollection
        .find()
        .exec() // <- find all documents
        .then((documents) => console.log(documents));

    const filteredData = data.movies.map((movie: IMovie) => {
      return {
        ...movie,
      };
    });

    return filteredData;
  } catch (error) {
    console.log("error ", error);
  }
}

export const GET_MOVIES_KEY = ["GET_MOVIES"];
