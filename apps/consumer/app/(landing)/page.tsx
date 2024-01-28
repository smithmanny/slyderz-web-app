import prisma from "db";
import HomePage from "./home-page";

export interface Chef {
	id: string;
	userId: string;
	user: {
		name: string;
		image: {
			id: string;
			imageUrl: string;
		};
	};
}
async function getNearbyChefs() {
	return prisma.chef.findMany({
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
}

export default async function Page() {
	const nearbyChefs = (await getNearbyChefs()) as Array<Chef>;

	return <HomePage nearbyChefs={nearbyChefs} />;
}
