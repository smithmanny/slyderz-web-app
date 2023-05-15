import { BlitzLogger, BlitzServerMiddleware } from "blitz";
import { setupBlitzServer } from "@blitzjs/next";
import { AuthServerPlugin, PrismaStorage } from "@blitzjs/auth";
import { simpleRolesIsAuthorized } from "@blitzjs/auth";

import db from "db";
import { authConfig } from "./blitz-client";

export const { gSSP, gSP, api } = setupBlitzServer({
  logger: BlitzLogger({
    colorizePrettyLogs: true,
  }),
  plugins: [
    AuthServerPlugin({
      ...authConfig,
      storage: PrismaStorage(db),
      isAuthorized: simpleRolesIsAuthorized,
    }),
    // BlitzServerMiddleware(async (req, res, next) => {
    //   const publicData = res.blitzCtx.session._kernel.publicData
    //   console.log("RES", res.blitzCtx.session._kernel.publicData)
    //   const canVisitRoute = req.headers.referer?.endsWith('dashboard')

    //   if (publicData.role !== 'USER') {
    //     console.log('WRONG USER')
    //     console.log(res.url)
    //   }

    //   await next()
    // })
  ],
});
