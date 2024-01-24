import HomePage from "./home-page";
import prisma from "db";

async function getNearbyChefs() {
  try {
    const nearbyChefs = await prisma.chef.findMany({
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
