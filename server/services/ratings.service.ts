import { getDatabase } from "../clients/database";

export async function rateMovie(id: string, rating: string) {
  try {
    const { movieCollection } = await getDatabase();
    let movie = null;
    if (movieCollection) {
      movie = await movieCollection
        .findOne({
          selector: {
            id: id,
          },
        })
        .exec();
      if (movie) {
        movie.rating = rating;
        await movieCollection.upsert(movie);
      }
    }
    return movie;
  } catch (error) {
    console.log("error ", error);
  }
}
