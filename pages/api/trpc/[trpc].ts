import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "server/routers/_app";
import createContext from "server/utils/createContext";

// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError(opts) {
    const { error, type, path, input, ctx, req } = opts;
    console.error("Error:", error);
    if (error.code === "INTERNAL_SERVER_ERROR") {
      // send to bug reporting
    }
  },
});
