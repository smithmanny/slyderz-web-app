import HomePage from "../home-page";
import { getPrisma } from "../lib/prisma";

async function getNearbyChefs() {
  const prisma = await getPrisma();

  try {
    const nearbyChefs = prisma.chef.findMany({
      where: {
        NOT: {
          hours: {
            none: {},
          },
        },
        AND: {
          NOT: {
            dishes: {
              none: {},
            },
          },
        },
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return nearbyChefs;
  } catch (err) {
    console.log(err);
  }
}

export default async function Page() {
  const nearbyChefs = await getNearbyChefs();

  return <HomePage nearbyChefs={nearbyChefs} />;
}
