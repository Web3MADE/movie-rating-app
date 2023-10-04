"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface IMovieImageProps {
  src: string;
  alt: string;
  placeholderSrc: string;
  className?: string;
  objectFit: "contain" | "cover";
  onClick?: () => void;
}

const MovieImage = (props: IMovieImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(props.src);

  useEffect(() => {
    setCurrentSrc(props.src);
  }, [props.src]);

  const handleError = () => {
    setCurrentSrc(props.placeholderSrc);
  };
  return (
    <div className={props.className}>
      <Image
        src={currentSrc}
        alt={props.alt}
        fill
        objectFit={props.objectFit}
        onClick={props.onClick}
        onError={handleError}
        className="rounded"
      />
    </div>
  );
};

export default MovieImage;
