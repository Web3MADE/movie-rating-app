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
  console.log(props.placeholderSrc);
  return (
    <>
      <MovieImage
        src={props.src}
        alt={props.alt}
        placeholderSrc={props.placeholderSrc}
        className="relative w-full h-96"
      />
      <h2 className="text-3xl text-white mt-4">{props.title}</h2>
      <p className="text-lg text-white">{props.genre}</p>
      <p className="text-sm text-white mb-4">{props.releaseDate}</p>
      <p className="text-xl text-white">
        Average Rating: {props.averageRating}
      </p>
      <Rating averageRating={props.averageRating} onSubmit={props.onSubmit} />
    </>
  );
};

export default MovieDetails;
