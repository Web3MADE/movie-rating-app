import { createRxDatabase } from "rxdb";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";
import { movieSchema } from "../models/schema";

// instantiate db
// add movies collection with schema
// export db
export async function init() {
  const db = await createRxDatabase({
    name: "moviesdb",
    storage: getRxStorageMemory(),
  });

  db.addCollections({
    movies: {
      schema: movieSchema,
    },
  });
}
