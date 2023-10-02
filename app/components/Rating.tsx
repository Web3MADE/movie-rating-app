"use client";
import { useState } from "react";

interface IRatingProps {
  rating: string;
  onSubmit: (rating: string) => void;
}

const Rating = (props: IRatingProps) => {
  const [rating, setRating] = useState(props.rating);

  function handleRating(star: number) {
    setRating(star.toString());
  }

  return (
    <div className="flex flex-col items-center mt-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer ${
              star <= Number(rating) ? "text-yellow-500" : "text-gray-500"
            }`}
            onClick={() => handleRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      <button onClick={() => props.onSubmit(rating.toString())}>Submit</button>
    </div>
  );
};

export default Rating;
