import React, { useCallback, useEffect, useState } from "react";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Button from "app/core/components/shared/Button";
import { NoSSrConsumerContainer } from "app/core/components/shared/ConsumerContainer";
import Box from "app/core/components/shared/Box";
import Typography from "app/core/components/shared/Typography";

import type { OnboardingState } from "@prisma/client";
import { trpc } from "server/utils/trpc";

import UploadHeadshot from "./components/UplaodHeadshot";
import ProfileDescription from "./components/ProfileDescription";

interface StepsType {
  id: OnboardingState;
  label: string;
  buttonText?: string;
  description: string;
  component?: React.ReactNode;
}

const steps: Array<StepsType> = [
  {
    id: "SETUP_STRIPE",
    label: "Setup stripe account",
    description:
      "We know that time is money, so we make it easy for you to get paid for your work. Once you complete an event, we'll send you an instant payment directly to your linked bank account. We use Stripe, a secure payment processing platform, to ensure that your payments are processed quickly and safely.",
    buttonText: "Finish linking bank account",
  },
  {
    id: "UPLOAD_HEADSHOT",
    label: "Upload headshot",
    component: <UploadHeadshot />,
    description:
      "Please upload a headshot with a solid background. Supported file types: .jpg, .png, .jpeg",
  },
  {
    id: "COMPLETE_SERVSAFE",
    label: "Complete ServSafe food handler certification",
    description:
      "We'll email you a code to complete your ServSafe Food Handler card to ensure proper food handling and safety.",
  },
  {
    id: "ADD_PROFILE_DESCRIPTION",
    label: "Add profile description",
    component: <ProfileDescription />,
    description: "Add a profile description to tell everyone more about you.",
  },
];

const OnboardingStep = (children: any, description: string) => {
  return React.cloneElement(children, { description });
};

export default function Onboarding() {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const { data: onboardingState } = trpc.onboarding.fetchOnboardingState.useQuery()
  const createStripeAccountLink = trpc.stripe.createAccountLinkMutation.useMutation()

  useEffect(() => {
    switch (onboardingState) {
      case "UPLOAD_HEADSHOT":
        setActiveStep(1);
        break;
      case "COMPLETE_SERVSAFE":
        setActiveStep(2);
        break;
    }
  }, [onboardingState]);

  const handleNext = async (step: StepsType) => {
    if (step.id === "SETUP_STRIPE") {
      const stripeAccountUrl = await createStripeAccountLink.mutateAsync();
      return router.push(stripeAccountUrl);
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleReset = useCallback(() => {
    setActiveStep(0);
  }, []);

  return (
    <NoSSrConsumerContainer maxWidth="sm">
      <Typography variant="h4" fontWeight="bold">
        Complete Onboarding
      </Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 3 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
              sx={{
                ".MuiStepLabel-label": {
                  fontWeight: "550",
                },
              }}
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.component ? (
                OnboardingStep(step.component, step.description)
              ) : (
                <Typography variant="body2">{step.description}</Typography>
              )}
              {!Object.hasOwn(step, "component") && (
                <Box sx={{ mb: 2 }}>
                  <Button
                    label="continue onboarding"
                    variant="contained"
                    onClick={() => handleNext(step)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1
                      ? "Finish"
                      : step.buttonText || "Continue"}
                  </Button>
                </Box>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button
            label="reset onboarding"
            onClick={handleReset}
            sx={{ mt: 1, mr: 1 }}
          >
            Reset
          </Button>
        </Paper>
      )}
    </NoSSrConsumerContainer>
  );
}
