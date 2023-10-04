"use client";
import { IMovie } from "@/server/models/models";
import clsx from "clsx";
import Link from "next/link";
import useMovies from "../hooks/useMovies";
import { PLACEHOLDER_IMG } from "../utils/constants";
import { IHomeWrapperProps } from "../wrappers/HomeWrapper";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";

const Home = (props: IHomeWrapperProps) => {
  const { movies, isError, isLoading } = useMovies({
    page: props.page,
    limit: props.limit,
    search: props.search,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading data</div>;

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <SearchBar search={props.search} />
      </div>

      {!props.search && (
        <div className="flex gap-4 mx-auto">
          <Link
            href={{
              pathname: "/movies",
              query: {
                ...(props.search ? { search: props.search } : {}),
                page: props.page > 1 ? props.page - 1 : 1,
              },
            }}
            className={clsx(
              "rounded border bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 px-3 py-1 text-sm text-white",
              props.page <= 1 && "pointer-events-none opacity-50"
            )}
          >
            Previous
          </Link>
          <Link
            href={{
              pathname: "/movies",
              query: {
                ...(props.search ? { search: props.search } : {}),
                page: props.page + 1,
              },
            }}
            className="rounded border bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 px-3 py-1 text-sm text-white"
          >
            Next
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 max-w-screen-md mx-auto">
        {movies &&
          movies.map((movie: IMovie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              thumbnailSrc={movie.posterUrl}
              placeholderSrc={PLACEHOLDER_IMG}
              thumbnailClassName="relative h-40 w-40 "
              title={movie.title}
              averageRating={movie.averageRating}
            />
          ))}
      </div>
    </main>
  );
};

export default Home;
