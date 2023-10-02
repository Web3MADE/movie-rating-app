import { getDatabase } from "../clients/database";
import { IMovie } from "../models/models";
// TODO: implement rxDB later, replace with NextReponse.json()
export default async function getMovies() {
  try {
    const { movieCollection } = await getDatabase();
    let sortedMovies: IMovie[] = [];

    if (movieCollection) {
      sortedMovies = await movieCollection
        .find()
        .sort({ rating: "desc" })
        .limit(10)
        .exec();
    }

    return sortedMovies;
  } catch (error) {
    console.log("error ", error);
  }
}
