import HomePage from "./home-page";

import { db } from "drizzle";

export interface Chef {
	id: string;
	user: {
		id: string;
		name: string;
		headshotUrl: string | null;
	};
}
async function getNearbyChefs() {
	// TODO filter out chefs who have no hours or dishes
	return await db.query.chefs.findMany({
		with: {
			dishes: true,
			user: true,
		},
	});
}

export default async function Page() {
	const nearbyChefs = await getNearbyChefs();

	return <HomePage nearbyChefs={nearbyChefs} />;
}
