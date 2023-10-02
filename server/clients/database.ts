import { RxCollection, RxDatabase, addRxPlugin, createRxDatabase } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";
import { data } from "../models/data";
import { IMovie } from "../models/models";
import { movieSchema } from "../models/schema";
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBDevModePlugin);
// instantiate db
// add movies collection with schema
// export db

let database: RxDatabase | null = null;
let movieCollection: RxCollection<IMovie> | null = null;

async function init() {
  if (!database) {
    database = await createRxDatabase({
      name: "moviesdb",
      storage: getRxStorageMemory(),
    });
    const collections = await database.addCollections({
      movies: {
        schema: movieSchema,
      },
    });
    movieCollection = collections.movies;
    await movieCollection.bulkInsert(data.movies); // Ensure data.movies is accessible
  }
  return {
    database,
    movieCollection,
  };
}

export async function getDatabase() {
  if (!database || !movieCollection) {
    return await init();
  }
  return {
    database,
    movieCollection,
  };
}
