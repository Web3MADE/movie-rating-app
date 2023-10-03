import { getDatabase } from "../clients/database";

export async function rateMovie(id: string, rating: string) {
  try {
    const { movieCollection } = await getDatabase();
    let movie = null;
    console.log("movieCollection ", movieCollection);
    if (movieCollection) {
      movie = await movieCollection
        .findOne({
          selector: {
            id: id,
          },
        })
        .exec();
      if (movie) {
        console.log("movie selected ", movie);
        await movieCollection.upsert({
          ...movie,
          rating: rating,
        });
      }
    }
    console.log("movie ", movie);
    return movie;
  } catch (error) {
    console.log("error ", error);
  }
}
