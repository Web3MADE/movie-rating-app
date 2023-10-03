import MovieWrapper from "@/app/wrappers/MovieWrapper";

export interface IPageProps {
  params: { id: string };
}

export default function page({ params }: IPageProps) {
  return <MovieWrapper params={params} />;
}
