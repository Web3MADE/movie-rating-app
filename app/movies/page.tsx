import HomeWrapper from "../wrappers/HomeWrapper";

interface IHomePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function page({ searchParams }: IHomePageProps) {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  return <HomeWrapper page={page} limit={limit} search={search} />;
}
