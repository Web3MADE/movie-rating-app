import { getDatabase } from "../clients/database";

export async function findMovies(selector: object) {
  const { movieCollection } = await getDatabase();
  return movieCollection ? movieCollection.find({ selector }).exec() : [];
}

export async function findOneMovie(selector: object) {
  const { movieCollection } = await getDatabase();
  return movieCollection ? movieCollection.findOne({ selector }).exec() : null;
}
