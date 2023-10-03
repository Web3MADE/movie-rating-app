import { getDatabase } from "../clients/database";

// TODO: fix upsert dev error
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
        const movieData = movie.toJSON(); // Convert RxDocument to plain object
        // spread to avoid mutation
        // fix readOnly string array error with genres
        await movieCollection.upsert({
          ...movieData,
          rating: rating,
          genres: [...movieData.genres],
        });

        // Keep temporarily for upsert reference
        movie = await movieCollection
          .findOne({
            selector: {
              id: id,
            },
          })
          .exec()
          .then((doc) => {
            console.log("updated movie ", doc?.toJSON());
          });
      }
    }

    return movie;
  } catch (error) {
    console.log("error ", error);
  }
}
