import { useState } from "react";
import Link from "next/link";

import { ForgotPassword } from "validations/authValidations";
import { trpc } from "server/utils/trpc";
import { auth } from "app/lib/auth";

import Layout from "app/layout";
import ConsumerContainer from "app/components/shared/ConsumerContainer";
import Form, { TextField } from "app/components/legacy_form";
import Typography from "app/components/shared/Typography";
import Button from "app/components/shared/Button";

export async function getServerSideProps(ctx) {
  const authRequest = auth.handleRequest(ctx);
  const session = await authRequest.validate();

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
const ForgotPasswordPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const forgotPassword = trpc.auth.sendPasswordResetLink.useMutation({
    onSuccess: () => setIsSuccess(true),
  });

  return (
    <ConsumerContainer maxWidth="sm">
      {isSuccess ? (
        <>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Request Submitted
          </Typography>
          <Typography>
            If your email is in our system, you will receive instructions to
            reset your password shortly.
          </Typography>
          <Link href="/">
            <Button label="Go home" variant="text" sx={{ pl: 0 }}>
              Go back home
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Forgot your password?
          </Typography>
          <Form
            submitText="Send Reset Password Instructions"
            schema={ForgotPassword}
            mutation={{
              schema: forgotPassword.mutateAsync,
              toVariables: (values) => ({
                ...values,
              }),
            }}
          >
            <TextField
              autoComplete="email"
              name="email"
              label="Email"
              placeholder="Email"
            />
          </Form>
        </>
      )}
    </ConsumerContainer>
  );
};

ForgotPasswordPage.getLayout = (page) => (
  <Layout title="Forgot Your Password?">{page}</Layout>
);

export default ForgotPasswordPage;
