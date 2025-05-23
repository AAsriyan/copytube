import { db } from "@/db";
import { users } from "@/db/schema";
import { rateLimit } from "@/lib/rate-limit";
import { auth } from "@clerk/nextjs/server";
import { TRPCError, initTRPC } from "@trpc/server";
import { eq } from "drizzle-orm";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const { userId } = await auth();

  return { clerkUserId: userId };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async function isAuthed({
  ctx,
  next,
}) {
  if (!ctx.clerkUserId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authorized",
    });
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, ctx.clerkUserId))
    .limit(1);

  const { success } = await rateLimit.limit(ctx.clerkUserId);

  if (!success) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Too many requests",
    });
  }

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authorized",
    });
  }

  return next({ ctx: { ...ctx, user } });
});
