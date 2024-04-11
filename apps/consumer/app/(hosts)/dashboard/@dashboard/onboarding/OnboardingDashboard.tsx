"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import type { PropsWithChildren } from "react";

import getOnboardingStateQuery from "app/actions/queries/getOnboardingState";
import { Button } from "app/components/ui/button";
import { Card, CardContent } from "app/components/ui/card";
import { onboardingSteps } from "app/lib/utils";
import { chefs } from "drizzle/schema/user";

const HeadshotStep = dynamic(() => import("./HeadshotOnboarding"));
const StripeStep = dynamic(() => import("./StripeOnboarding"));
const ServerSafeStep = dynamic(() => import("./FoodHandlerOnboarding"));

const OnboardingStateEnum = chefs.onboardingState.enumValues;
type OnboardingState = (typeof OnboardingStateEnum)[number];
const onboardingStepsIndex: { [key: string]: number } = {
	setup_stripe: 1,
	upload_headshot: 2,
	complete_servsafe: 3,
} as const;

interface OnboardingWrapperProps extends PropsWithChildren {
	state: OnboardingState;
}
function OnboardingWrapper(props: OnboardingWrapperProps) {
	const title = onboardingSteps.get(props.state);
	const stepCount = onboardingStepsIndex[props.state];

	return (
		<Card className="mt-6 max-w-2xl">
			<CardContent className="pt-6">
				<div className="">
					<h6 className="text-lg font-bold tracking-tight text-gray-900 pb-2">
						{title}
					</h6>
					<small className="text-gray-600">
						Step {stepCount} of {onboardingSteps.size}
					</small>

					<div>{props.children}</div>
				</div>
			</CardContent>
		</Card>
	);
}

interface OnboardingNextButtonProps {
	disabled: boolean;
	mutation: () => Promise<void>;
}
export function OnboardingNextButton(props: OnboardingNextButtonProps) {
	const queryClient = useQueryClient();

	return (
		<div className="text-right mt-4 border-t-2 pt-4">
			<Button
				disabled={props.disabled}
				onClick={async () => {
					await props.mutation();
					queryClient.invalidateQueries({ queryKey: ["onboarding-state"] });
				}}
			>
				Next step
			</Button>
		</div>
	);
}

export default function OnboardingDashboard() {
	const { data } = useQuery({
		queryKey: ["onboarding-state"],
		queryFn: () => getOnboardingStateQuery(),
	});

	if (!data) throw new Error("Chef onboarding state not found");

	return (
		<OnboardingWrapper state={data.onboardingState}>
			{data.onboardingState === "setup_stripe" && <StripeStep />}
			{data.onboardingState === "upload_headshot" && <HeadshotStep />}
			{data.onboardingState === "complete_servsafe" && <ServerSafeStep />}
		</OnboardingWrapper>
	);
}
