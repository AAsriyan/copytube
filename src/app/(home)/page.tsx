import { HydrateClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import HomeClient from "./client";
import { ErrorBoundary } from "react-error-boundary";

const HomePage = async () => {
  // Wait for the prefetch to complete before rendering
  await trpc.hello.prefetch({ text: "server" });

  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>Error</div>}>
          <HomeClient />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
};

export default HomePage;
