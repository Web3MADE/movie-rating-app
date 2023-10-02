import { RxDatabase, createRxDatabase } from "rxdb";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";
import { IMovie } from "../models/models";
import { movieSchema } from "../models/schema";

// instantiate db
// add movies collection with schema
// export db
let db: RxDatabase<IMovie> | null = null; // Declare db as a module-level variable // Declare db as a module-level variable
export async function init() {
  if (!db) {
    db = await createRxDatabase({
      name: "moviesdb",
      storage: getRxStorageMemory(),
    });

    await db.addCollections({
      movies: {
        schema: movieSchema, // Make sure movieSchema is defined or imported
      },
    });
  }
  return db;
}
