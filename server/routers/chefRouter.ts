import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

const chefRouter = router({
  fetchNearbyChefs: publicProcedure
    .query(async (opts) => {
      try {
        const nearbyChefs = await opts.ctx.prisma.chef.findMany({
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