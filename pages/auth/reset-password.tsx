import Link from "next/link";
import { useMutation } from "@blitzjs/rpc";
import { BlitzPage } from "@blitzjs/next";
import Layout from "app/core/layouts/Layout";
import Form, { TextField } from "app/core/components/form";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Typography from "app/core/components/shared/Typography";

import resetPassword from "app/auth/mutations/resetPassword";
import { AuthorizationError } from "blitz";
import { gSSP } from "app/blitz-server";

export const getServerSideProps = gSSP(async ({ ctx, query }) => {
  const { session } = ctx;

  if (!query.token || session.userId) {
    throw new AuthorizationError();
  }
  return {
    props: {
      token: query.token,
    },
  };
});

interface ResetPasswordTypes {
  token: string;
}

const ResetPasswordPage: BlitzPage<ResetPasswordTypes> = ({ token }) => {
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword);

  return (
    <ConsumerContainer maxWidth="sm">
      {isSuccess ? (
        <div>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Password Reset Successfully
          </Typography>
          <Typography>
            Go to the <Link href="/">homepage</Link>
          </Typography>
        </div>
      ) : (
        <>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Set a New Password
          </Typography>
          <Form
            submitText="Reset Password"
            mutation={{
              schema: resetPasswordMutation,
              toVariables: (values) => ({
                ...values,
                token,
              }),
            }}
          >
            <TextField name="password" label="New Password" type="password" />
            <TextField
              name="passwordConfirmation"
              label="Confirm New Password"
              type="password"
            />
            <TextField
              sx={{ display: "none" }}
              name="token"
              label="Token"
              value={token}
              fieldProps={{
                type: "hidden",
              }}
              hidden
              disabled
            />
          </Form>
        </>
      )}
    </ConsumerContainer>
  );
};

ResetPasswordPage.getLayout = (page) => (
  <Layout title="Reset Your Password">{page}</Layout>
);

export default ResetPasswordPage;
