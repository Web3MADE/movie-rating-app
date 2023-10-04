"use client";
import Link from "next/link";
import Thumbnail from "./MovieImage";

export interface IMovieCardProps {
  id: string;
  thumbnailSrc: string;
  placeholderSrc: string;
  thumbnailClassName: string;
  title: string;
  objectFit: "contain" | "cover";
  averageRating: string;
}

const MovieCard = (props: IMovieCardProps) => {
  return (
    <div className="">
      <Thumbnail
        src={props.thumbnailSrc}
        placeholderSrc={props.placeholderSrc}
        alt={props.title}
        objectFit={props.objectFit}
        className={props.thumbnailClassName}
      />
      <h3 className="text-white font-bold text-2xl">{props.title}</h3>
      <p className="text-gray-500">Average Rating: {props.averageRating}</p>
      <Link
        href={`/movies/${props.id}`}
        className="text-teal-500 hover:text-teal-700 underline"
      >
        View Details
      </Link>
    </div>
  );
};

export default MovieCard;
