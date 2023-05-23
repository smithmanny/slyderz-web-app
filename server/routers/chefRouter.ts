import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import db from "db"

const chefRouter = router({
  fetchNearbyChefs: publicProcedure
    .query(async (opts) => {
      try {
        const nearbyChefs = await db.chef.findMany({
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        });

        return nearbyChefs;
      } catch(err) {
        console.log(err)
      }
    }),
});

export default chefRouter