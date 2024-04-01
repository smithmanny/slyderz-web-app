import ChefHours from "./ChefHours";

import { getChefHoursQuery } from "app/actions/queries/getChefHours";

export default async function HoursDashboardPage() {
	const calendar = await getChefHoursQuery();

	return (
		<div>
			<span className="flex justify-between">
				<h1 className="text-2xl font-bold tracking-tight text-gray-900">
					Hours
				</h1>
			</span>

			<ChefHours calendar={calendar} />
		</div>
	);
}
