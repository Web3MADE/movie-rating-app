"use client";
import Link from "next/link";
import Thumbnail from "./MovieImage";

interface IMovieProps {
  id: string;
  thumbnailSrc: string;
  placeholderSrc: string;
  thumbnailClassName: string;
  title: string;
  averageRating: string;
}

const MovieCard = (props: IMovieProps) => {
  return (
    <div className="">
      <Thumbnail
        src={props.thumbnailSrc}
        placeholderSrc={props.placeholderSrc}
        alt={props.title}
        className={props.thumbnailClassName}
      />
      <h3>{props.title}</h3>
      <p>Average Rating: {props.averageRating}</p>
      <Link href={`/movies/${props.id}`}>View Details</Link>
    </div>
  );
};

export default MovieCard;
