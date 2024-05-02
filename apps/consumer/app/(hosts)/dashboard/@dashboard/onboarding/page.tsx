import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

import getOnboardingStateQuery from "app/actions/queries/getOnboardingState";
import OnboardingDashboard from "./OnboardingDashboard";

export default async function DashboardPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["onboarding-state"],
		queryFn: () => getOnboardingStateQuery(),
	});

	return (
		<div>
			<h1 className="text-2xl font-bold tracking-tight text-gray-900">
				Onboarding
			</h1>

			<HydrationBoundary state={dehydrate(queryClient)}>
				<OnboardingDashboard />
			</HydrationBoundary>
		</div>
	);
}
