import ChefHours from "./ChefHours";

export default async function HoursDashboardPage() {
	return (
		<div>
			<span className="flex justify-between">
				<h1 className="text-2xl font-bold tracking-tight text-gray-900">
					Hours
				</h1>
			</span>

			<ChefHours />
		</div>
	);
}
