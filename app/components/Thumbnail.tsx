"use client";
import Image from "next/image";

interface IThumbnailProps {
  src: string;
  alt: string;
  onClick?: () => void;
}
// TODO: define Movie components (Movie, thumbnail, MovieList)
// create unit tests
const Thumbnail = (props: IThumbnailProps) => {
  return (
    <div className="relative h-40 w-40 bg-white">
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

export default Thumbnail;
