// 1. fetch movies
// 2. filter by highest ratings
import { NextResponse } from "next/server";
import { data } from "../data";
import { IMovie } from "../models";
export async function GET() {
  try {
    const filteredData = data.movies.map(
      (movie: IMovie) => (movie.rating = Math.floor(Math.random() * 5) + 1)
    );

    console.log("filteredData ", filteredData);

    return NextResponse.json(filteredData);
  } catch (error) {
    console.log("error ", error);
  }
}
