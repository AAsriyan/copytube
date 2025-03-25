"use client";

import { trpc } from "@/trpc/client";

const HomeClient = () => {
  const [data] = trpc.hello.useSuspenseQuery({ text: "server" });

  return <div>HomeClient says: {data.greeting}</div>;
};

export default HomeClient;
