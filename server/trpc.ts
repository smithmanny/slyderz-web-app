import { initTRPC, TRPCError } from "@trpc/server";
import context from "./utils/createContext";

const t = initTRPC.context<typeof context>().create();

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      ...ctx,
    },
  });
});

const isChef = isAuthed.unstable_pipe(async ({ next, ctx }) => {
  const chef = await ctx.prisma.chef.findFirst({
    where: {
      userId: ctx.session.userId,
    },
  });

  if (!chef) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      ...ctx,
      chef,
    },
  });
});

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const chefProcedure = t.procedure.use(isChef);