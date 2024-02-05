import dynamic from "next/dynamic";

import getOnboardingStateQuery from "app/actions/queries/getOnboardingState";

const DynamicOnboadrdingDashboard = dynamic(() => import("./onboarding/OnboardingDashboard"))
const DynamicDashboard = dynamic(() => import("./Dashboard"))

export default async function DashboardPage() {
	const { onboardingState, isOnboardingComplete } = await getOnboardingStateQuery();
	return (
		<div>
			<h1 className="text-2xl font-bold tracking-tight text-gray-900">
				{isOnboardingComplete ? "Dashboard" : "Onboarding"}
			</h1>

			{isOnboardingComplete ? <DynamicDashboard /> : <DynamicOnboadrdingDashboard state={onboardingState} />}
		</div>
	);
}
