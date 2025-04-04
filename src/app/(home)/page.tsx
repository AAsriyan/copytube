import { INFINITE_QUERY_LIMIT } from "@/constants";
import { HomeView } from "@/modules/home/ui/views/home-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams: Promise<{ categoryId?: string }>;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { categoryId } = await searchParams;

  // Prefetch the data on the server
  void trpc.categories.getMany.prefetch();
  void trpc.videos.getMany.prefetchInfinite({
    categoryId,
    limit: INFINITE_QUERY_LIMIT,
  });

  return (
    <HydrateClient>
      <HomeView categoryId={categoryId} />
    </HydrateClient>
  );
};

export default HomePage;
