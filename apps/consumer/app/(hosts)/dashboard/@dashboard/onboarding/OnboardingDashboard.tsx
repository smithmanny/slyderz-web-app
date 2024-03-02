"use client";

import dynamic from "next/dynamic";
import { PropsWithChildren, useEffect, useState } from "react";

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
	const [onboardingStep, setOnboardingStep] = useState<OnboardingState>(
		props.state,
	);
	const title = onboardingSteps.get(onboardingStep);
	const stepCount = onboardingStepsIndex[onboardingStep];

	if (props.state !== "setup_stripe") {
		setOnboardingStep(props.state);
	}

	// useEffect(() => {
	// 	if (props.state !== "setup_stripe") {
	// 		setOnboardingStep(props.state);
	// 	}
	// }, [props.state]);

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
	return (
		<div className="text-right mt-4 border-t-2 pt-4">
			<Button
				disabled={props.disabled}
				onClick={async () => await props.mutation()}
			>
				Next step
			</Button>
		</div>
	);
}

interface OnboardingDashboardProps extends PropsWithChildren {
	state: OnboardingState;
}
export default function OnboardingDashboard(props: OnboardingDashboardProps) {
	return (
		<OnboardingWrapper state={props.state}>
			{props.state === "setup_stripe" && <StripeStep />}
			{props.state === "upload_headshot" && <HeadshotStep />}
			{props.state === "complete_servsafe" && <ServerSafeStep />}
		</OnboardingWrapper>
	);
}
