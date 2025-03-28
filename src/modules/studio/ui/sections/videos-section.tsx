"use client";

import { trpc } from "@/trpc/client";
import { INFINITE_QUERY_LIMIT } from "@/constants";

export const VideosSection = () => {
  const [data] = trpc.studio.getMany.useSuspenseInfiniteQuery(
    { limit: INFINITE_QUERY_LIMIT },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return <div>{JSON.stringify(data)}</div>;
};
