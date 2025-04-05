import { INFINITE_QUERY_LIMIT } from "@/constants";
import { UserView } from "@/modules/users/ui/views/user-view";
import { HydrateClient } from "@/trpc/server";
import { trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface UserPageProps {
  params: Promise<{ userId: string }>;
}

const UserPage = async ({ params }: UserPageProps) => {
  const { userId } = await params;

  void trpc.users.getOne.prefetch({ id: userId });
  void trpc.videos.getMany.prefetchInfinite({
    userId,
    limit: INFINITE_QUERY_LIMIT,
  });

  return (
    <HydrateClient>
      <UserView userId={userId} />
    </HydrateClient>
  );
};

export default UserPage;
