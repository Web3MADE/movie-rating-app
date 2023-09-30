"use client";
import Image from "next/image";

interface IThumbnailProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export const Thumbnail = (props: IThumbnailProps) => {
  return (
    <div className="relative h-40 w-40 bg-white">
      <Image
        className={props.className}
        src={props.src}
        alt={props.alt}
        objectFit="contain"
        onClick={props.onClick}
      />
    </div>
  );
};
