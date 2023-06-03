import { useState } from "react";
import Link from "next/link";

import Layout from "app/core/layouts/Layout";
import Form, { TextField } from "app/core/components/form";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Typography from "app/core/components/shared/Typography";
import { trpc } from "server/utils/trpc";

export const getServerSideProps = async ({ query }) => {
  if (!query.token) {
    return {
      redirect: {
        destination: "/auth/forgot-password",
        permanent: false,
      },
    };
  }
  return {
    props: {
      token: query.token,
    },
  };
};

interface ResetPasswordTypes {
  token: string;
}

const ResetPasswordPage = ({ token }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const resetPassword = trpc.auth.handlePasswordReset.useMutation({
    onSuccess: () => setIsSuccess(true),
  });

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
              schema: resetPassword.mutateAsync,
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
