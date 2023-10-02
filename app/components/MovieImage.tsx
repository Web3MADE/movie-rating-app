"use client";
import Image from "next/image";

interface IMovieImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}
// TODO: define Movie components (Movie, MovieImage, MovieList)
// create unit tests
const MovieImage = (props: IMovieImageProps) => {
  return (
    <div className={props.className}>
      <Image
        src={props.src}
        alt={props.alt}
        fill
        objectFit="contain"
        onClick={props.onClick}
      />
    </div>
  );
};

export default MovieImage;
