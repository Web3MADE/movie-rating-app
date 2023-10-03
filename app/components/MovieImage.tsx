"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IMovieImageProps {
  src: string;
  alt: string;
  placeholderSrc: string;
  className?: string;
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
  console.log(props.placeholderSrc);
  return (
    <div className={props.className}>
      <Image
        src={currentSrc}
        alt={props.alt}
        fill
        objectFit="contain"
        onClick={props.onClick}
        onError={handleError}
      />
    </div>
  );
};

export default MovieImage;
