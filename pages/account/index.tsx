import React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";

import { UpdatePassword } from "app/auth/validations";
import { trpc } from "server/utils/trpc";
import { auth } from "integrations/auth/lucia";

import Layout from "app/layouts/Layout";
import Button from "app/core/components/shared/Button";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import Form, { TextField } from "app/core/components/form";
import UploadImage from "app/core/components/shared/UploadImage";

const DynamicStripeCardElement = dynamic(
  () => import("app/stripe/components/StripeCardElement"),
  {
    ssr: false,
  },
);
const DynamicStripeSavedCards = dynamic(
  () => import("app/stripe/components/StripeSavedCards"),
  {
    ssr: false,
  },
);

export async function getServerSideProps(ctx) {
  const authRequest = auth.handleRequest(ctx);
  const session = await authRequest.validate();

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}

const Account = (props) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const utils = trpc.useContext();

  const invalidatePictureQuery = async () => {
    await utils.user.fetchAccountPicture.invalidate();
    enqueueSnackbar("Profile picture updated", {
      variant: "success",
    });
  };

  const fetchProfileImage = trpc.user.fetchAccountPicture.useQuery();
  const setAccountPicture = trpc.user.setAccountPicture.useMutation({
    onSuccess: invalidatePictureQuery,
  });
  const updatePassword = trpc.auth.updatePassword.useMutation();
  const deleteAccount = trpc.user.deleteAccount.useMutation({
    onSuccess: () => {
      return router.replace("/");
    },
  });
  const destroyImage = trpc.user.deleteAccountPicture.useMutation({
    onSuccess: invalidatePictureQuery,
    onError: (err) => {
      console.log(err);
      props.snackbar("Image not deleted. Please try again", {
        variant: "error",
      });
    },
  });

  const initialValues = {
    name: props.user.name,
  };

  return (
    <React.Fragment>
      <ConsumerContainer maxWidth="sm">
        <Typography variant="h2" align="center">
          Your Account
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 6 }}>
              <strong>Profile Picture</strong>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <UploadImage
              uploadPreset="user_profile_pic"
              image={fetchProfileImage.data}
              destroyFunc={destroyImage}
              destroyOnSuccess={invalidatePictureQuery}
              onUpload={async (res) => {
                setAccountPicture.mutateAsync({
                  image: res.info.secure_url,
                  publicId: res.info.public_id,
                });
              }}
              imageOptions={{
                croppingCoordinatesMode: "face",
                minImageHeight: 250,
                minImageWidth: 250,
              }}
            />
          </Grid>
        </Grid>

        <Form
          submitText="Update Password"
          schema={UpdatePassword}
          mutation={{
            schema: updatePassword.mutateAsync,
            toVariables: (values) => ({
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
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
        <Form initialValues={initialValues}>
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
        {/* TODO */}
        {/* {user.stripeCards.length > 0 ? (
          <DynamicStripeSavedCards paymentMethods={user.stripeCards} />
        ) : (
          <DynamicStripeCardElement />
        )} */}

        {/* Delete Account */}
        <Typography variant="h6" sx={{ mt: 6 }} gutterBottom>
          <strong>Delete Your Account</strong>
        </Typography>
        <Button
          label="delete-account"
          variant="text"
          onClick={async () => await deleteAccount.mutateAsync()}
        >
          Delete Account
        </Button>
      </ConsumerContainer>
    </React.Fragment>
  );
};

Account.getLayout = (page) => <Layout>{page}</Layout>;

export default Account;
