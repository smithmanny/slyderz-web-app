import React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { UpdatePassword } from "app/auth/validations";
import { useAppSelector } from "integrations/redux";
import { trpc } from "server/utils/trpc";

import Layout from "app/core/layouts/Layout";
import Button from "app/core/components/shared/Button";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import Form, { TextField } from "app/core/components/form";

import type { SlyderzPage } from "next";

const DynamicStripeCardElement = dynamic(() => import("app/stripe/components/StripeCardElement"), {
  ssr: false
})
const DynamicStripeSavedCards = dynamic(() => import("app/stripe/components/StripeSavedCards"), {
  ssr: false
})

const Account: SlyderzPage<any> = (props) => {
  const router = useRouter();
  const updatePassword = trpc.auth.updatePassword.useMutation()
  const deleteAccount = trpc.account.deleteAccount.useMutation({
    onSuccess: () => {
      return router.replace("/");
    },
  })

  const user = useAppSelector((state) => state.user);

  const initialValues = {
    name: user.name,
  };

  return (
    <React.Fragment>
      <ConsumerContainer maxWidth="sm">
        <Typography variant="h2" align="center">
          Your Account
        </Typography>
        <Form
          submitText="Update Password"
          schema={UpdatePassword}
          mutation={{
            schema: updatePassword.mutateAsync,
            toVariables: (values) => ({
              currentPassword: values.currentPassword,
              newPassword: values.newPassword
            }),
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 6 }}>
              <strong>Update Password</strong>
            </Typography>
          </Grid>
          <TextField
            name="currentPassword"
            label="Current Password"
            placeholder="Current Password"
          />
          <TextField
            name="newPassword"
            label="New Password"
            placeholder="New Password"
          />
          <TextField
            name="newPasswordConfirmation"
            label="Confirm New Password"
            placeholder="Confirm New Password"
          />
        </Form>

        {/* Update Account */}
        <Form
          initialValues={initialValues}
        >
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 6 }} gutterBottom>
              <strong>Personal Info</strong>
            </Typography>
          </Grid>
          <Grid item container spacing={2}>
            <TextField
              disabled
              name="name"
              label="Name"
              placeholder="First Name"
              md={6}
            />
          </Grid>
        </Form>

        <Typography variant="h6" sx={{ mt: 6 }} gutterBottom>
          <strong>Payment Methods</strong>
        </Typography>
        {user.stripeCards.length > 0 ? (
          <DynamicStripeSavedCards paymentMethods={user.stripeCards} />
        ) : (
          <DynamicStripeCardElement />
        )}

        {/* Delete Account */}
        <Typography variant="h6" sx={{ mt: 6 }} gutterBottom>
          <strong>Delete Your Account</strong>
        </Typography>
        <Button
          label="delete-account"
          variant="text"
          onClick={async() => await deleteAccount.mutateAsync()}
        >
          Delete Account
        </Button>
      </ConsumerContainer>
    </React.Fragment>
  );
};

Account.getLayout = (page) => <Layout>{page}</Layout>;

export default Account;
