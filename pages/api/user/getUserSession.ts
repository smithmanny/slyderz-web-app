import type { NextApiRequest, NextApiResponse } from "next";

import userRouter from "server/routers/userRouter";
import createContext from "server/utils/createContext";

const handler = async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  const context = await createContext({ req, res })
  const caller = userRouter.createCaller(context)
  const { paymentMethods, address, checkUserChefStatus } = await caller.fetchInitialData()

  res.status(200).json({
    address,
    paymentMethods: paymentMethods.data,
    chefStatus: checkUserChefStatus
  })
};

export default handler;
