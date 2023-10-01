import getMovies from "../services/movies.service";
export async function GET() {
  await getMovies();
}
