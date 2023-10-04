import MovieWrapper from "@/app/wrappers/MovieWrapper";

export interface IPageProps {
  params: { id: string };
}
/**
 * Fetch Movie by Id (primary key)
 * @param id existing movie id
 */
export default function page({ params }: IPageProps) {
  return <MovieWrapper params={params} />;
}
