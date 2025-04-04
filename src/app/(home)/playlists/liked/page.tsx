import { INFINITE_QUERY_LIMIT } from "@/constants";
import { LikedView } from "@/modules/playlists/ui/views/liked-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

export default function PlaylistsLikedPage() {
  void trpc.playlists.getLiked.prefetchInfinite({
    limit: INFINITE_QUERY_LIMIT,
  });

  return (
    <HydrateClient>
      <LikedView />
    </HydrateClient>
  );
}
