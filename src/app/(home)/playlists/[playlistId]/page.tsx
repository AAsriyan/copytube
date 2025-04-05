import { INFINITE_QUERY_LIMIT } from "@/constants";
import { VideosView } from "@/modules/playlists/ui/views/videos-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface PlaylistsHistoryPageProps {
  params: Promise<{
    playlistId: string;
  }>;
}

export default async function PlaylistsHistoryPage({
  params,
}: PlaylistsHistoryPageProps) {
  const { playlistId } = await params;

  void trpc.playlists.getOne.prefetch({ playlistId });
  void trpc.playlists.getVideos.prefetchInfinite({
    limit: INFINITE_QUERY_LIMIT,
    playlistId,
  });

  return (
    <HydrateClient>
      <VideosView playlistId={playlistId} />
    </HydrateClient>
  );
}
