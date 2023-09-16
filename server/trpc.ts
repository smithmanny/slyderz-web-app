import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import context from "./utils/createContext";

const t = initTRPC.context<typeof context>().create({
  transformer: superjson,
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Please log in",
    });
  }

  return next({
    ctx: {
      ...ctx,
    },
  });
});

const isAdmin = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.userId || ctx.session.user?.role !== 'ADMIN') {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authorized",
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
export const adminProcedure = t.procedure.use(isAdmin);
export const chefProcedure = t.procedure.use(isChef);
