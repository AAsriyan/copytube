import { INFINITE_QUERY_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server";
import { HistoryView } from "@/modules/playlists/ui/views/history-view";

export const dynamic = "force-dynamic";

export default function PlaylistsHistoryPage() {
  void trpc.playlists.getHistory.prefetchInfinite({
    limit: INFINITE_QUERY_LIMIT,
  });

  return (
    <HydrateClient>
      <HistoryView />
    </HydrateClient>
  );
}
