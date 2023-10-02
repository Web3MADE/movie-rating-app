"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import getMovies, {
  GET_MOVIES_KEY,
} from "../../server/services/movies.service";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";

// 1. setup HMTL
// 2. basic styling
// 3. add search bar
// 4. add tanstack query
// 5. filter results via search bar

const Home = () => {
  const {
    data: movies,
    refetch,
    isLoading,
    error,
  } = useQuery(GET_MOVIES_KEY, getMovies);

  const [results, setResults] = useState([]);

  function handleResults(results: string) {
    // filter results
  }

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error loading data</div>;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <SearchBar onSearch={handleResults} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 max-w-screen-md mx-auto">
        {movies && <MovieList movies={movies} />}
      </div>
    </main>
  );
};

export default Home;
