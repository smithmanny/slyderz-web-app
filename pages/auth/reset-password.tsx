import { useState } from "react";
import Link from "next/link";

import Layout from "app/(landing)/layout";
import Form, { TextField } from "app/components/legacy_form";
import ConsumerContainer from "app/components/shared/ConsumerContainer";
import Typography from "app/components/shared/Typography";
import { trpc } from "server/utils/trpc";
import { ResetPassword } from "app/validations/authValidations";

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
            Go back{" "}
            <Link href="/" style={{ color: "#000" }}>
              Home
            </Link>
          </Typography>
        </div>
      ) : (
        <>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Set a New Password
          </Typography>
          <Form
            submitText="Reset Password"
            schema={ResetPassword}
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
