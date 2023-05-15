import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Button from "app/core/components/shared/Button";
import { NoSSrConsumerContainer } from "app/core/components/shared/ConsumerContainer";
import Box from "app/core/components/shared/Box";
import Typography from "app/core/components/shared/Typography";

interface StepsType {
  label: string;
  description: string;
  buttonText?: string;
}

const steps: Array<StepsType> = [
  {
    label: "Setup Stripe account",
    description:
      "We know that time is money, so we make it easy for you to get paid for your work. Once you complete an event, we'll send you an instant payment directly to your linked bank account. We use Stripe, a secure payment processing platform, to ensure that your payments are processed quickly and safely.",
    buttonText: "Finish linking bank account",
  },
  {
    label: "Upload profile picture",
    description: "Please upload a headshot with a solid background.",
  },
  {
    label: "Complete ServSafe Food Handler card",
    description:
      "We'll email you a code to complete your ServSafe Food Handler card to ensure proper food handling and safety.",
  },
  {
    label: "Add profile description",
    description: "Add a profile description to tell everyone more about you.",
  },
];

export default function Onboarding() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  label="continue onboarding"
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === steps.length - 1
                    ? "Finish"
                    : step.buttonText || "Continue"}
                </Button>
              </Box>
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
