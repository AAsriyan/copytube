import { StudioView } from "@/modules/studio/ui/views/studio-view";
import { trpc } from "@/trpc/server";
import { HydrateClient } from "@/trpc/server";
import { INFINITE_QUERY_LIMIT } from "@/constants";

export const dynamic = "force-dynamic";

const StudioPage = async () => {
  void trpc.studio.getMany.prefetchInfinite({ limit: INFINITE_QUERY_LIMIT });

  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
};

export default StudioPage;
