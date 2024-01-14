import React, { useCallback } from "react";

import { trpc } from "server/utils/trpc";

import Form, { TextField } from "app/components/legacy_form";
import Typography from "app/components/shared/Typography";
import { AddChefDescription } from "../../validations/onboardingValidations";

interface ProfileDescriptionType {
  description?: string;
}

function ProfileDescription(props: ProfileDescriptionType) {
  const utils = trpc.useUtils();

  const invalidateOnboardingState = useCallback(async () => {
    await utils.chef.invalidate();
  }, [utils.chef]);

  const setChefDescription =
    trpc.onboarding.completeOnboardingDescription.useMutation({
      onSuccess: invalidateOnboardingState,
    });
  return (
    <>
      <Typography variant="body2">{props.description}</Typography>
      <Form
        schema={AddChefDescription}
        submitText="Finsh Onboarding"
        mutation={{
          schema: setChefDescription.mutateAsync,
          toVariables: (values) => ({
            ...values,
          }),
        }}
      >
        <TextField
          name="description"
          multiline
          minRows={4}
          helperText="60 Character limit"
        />
      </Form>
    </>
  );
}

export default ProfileDescription;
