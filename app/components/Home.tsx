"use client";
import { IMovie } from "@/server/models/models";
import { useState } from "react";
import useMovies from "../hooks/useMovies";
import { PLACEHOLDER_IMG } from "../utils/constants";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";

// 1. setup HMTL
// 2. basic styling
// 3. add search bar
// 4. add tanstack query
// 5. filter results via search bar

const Home = () => {
  const { movies, isError, isLoading } = useMovies();

  const [results, setResults] = useState([]);

  function handleResults(results: string) {
    // filter results
  }

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading data</div>;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <SearchBar onSearch={handleResults} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 max-w-screen-md mx-auto">
        {movies &&
          movies.map((movie: IMovie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              thumbnailSrc={movie.posterUrl}
              placeholderSrc={PLACEHOLDER_IMG}
              thumbnailClassName="relative h-32 w-32"
              title={movie.title}
              averageRating={movie.averageRating}
            />
          ))}
      </div>
    </main>
  );
};

export default Home;
