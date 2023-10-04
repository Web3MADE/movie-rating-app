"use client";
import MovieImage from "./MovieImage";
import Rating from "./Rating";

interface IMovieDetailsProps {
  title: string;
  genre: string;
  releaseDate: string;
  description: string;
  averageRating: string;
  src: string;
  alt: string;
  placeholderSrc: string;
  onSubmit: (rating: string) => void;
}

const MovieDetails = (props: IMovieDetailsProps) => {
  return (
    <>
      <MovieImage
        src={props.src}
        alt={props.alt}
        placeholderSrc={props.placeholderSrc}
        className="relative w-full h-96"
      />
      <h2 className="text-4xl text-white mt-4 font-extrabold">{props.title}</h2>
      <p className="text-lg text-white mt-2 font-medium italic">
        {props.genre}
      </p>
      <p className="text-sm text-gray-400 mt-1">{props.releaseDate}</p>
      <p className="text-xl text-teal-500 mt-2">
        Average Rating:{" "}
        <span className="text-xl text-white font-bold">
          {props.averageRating}
        </span>
      </p>

      <Rating averageRating={props.averageRating} onSubmit={props.onSubmit} />
    </>
  );
};

export default MovieDetails;
