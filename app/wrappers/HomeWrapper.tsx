import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Home } from "../components/Home";
import Hydrate from "../providers/Hydrate";

export default async function HomeWrapper() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["movies"], getMovies);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Home />
    </Hydrate>
  );
}

function getMovies() {
  //replace with service method
}
