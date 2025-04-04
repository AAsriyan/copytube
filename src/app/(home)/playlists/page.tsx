import { INFINITE_QUERY_LIMIT } from "@/constants";
import { PlaylistsView } from "@/modules/playlists/ui/views/playlists-view";
import { HydrateClient, trpc } from "@/trpc/server";

const PlaylistsPage = async () => {
  void trpc.playlists.getMany.prefetchInfinite({
    limit: INFINITE_QUERY_LIMIT,
  });

  return (
    <HydrateClient>
      <PlaylistsView />
    </HydrateClient>
  );
};

export default PlaylistsPage;
