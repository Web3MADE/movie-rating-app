"use client";
import clsx from "clsx";
import { useState } from "react";
interface IRatingProps {
  averageRating: string;
  onSubmit: (rating: string) => void;
}

const Rating = (props: IRatingProps) => {
  const [rating, setRating] = useState(props.averageRating);

  function handleRating(star: number) {
    setRating(star.toString());
  }

  return (
    <div className="flex gap-3 flex-col items-center mt-2">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={clsx("cursor-pointer", {
              "text-yellow-500": star <= Number(rating),
              "text-gray-500": star > Number(rating),
            })}
            onClick={() => handleRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      <button
        onClick={() => props.onSubmit(rating.toString())}
        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default Rating;
