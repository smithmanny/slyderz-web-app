import HomePage from "./home-page";

import getHomePageChefs from "app/actions/queries/getHomePageChefs";

export interface Chef {
	id: string;
	user: {
		id: string;
		name: string;
		headshotUrl: string | null;
	};
}

export default async function Page() {
	const nearbyChefs = await getHomePageChefs();

	return <HomePage nearbyChefs={nearbyChefs} />;
}
