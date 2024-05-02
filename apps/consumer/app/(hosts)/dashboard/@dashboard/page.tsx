import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

import Dashboard from "./Dashboard";

export default async function DashboardPage() {
	const queryClient = new QueryClient();

	return (
		<div>
			<h1 className="text-2xl font-bold tracking-tight text-gray-900">
				Dashboard
			</h1>

			<HydrationBoundary state={dehydrate(queryClient)}>
				<Dashboard />
			</HydrationBoundary>
		</div>
	);
}
