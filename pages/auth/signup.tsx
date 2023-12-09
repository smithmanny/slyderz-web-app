import { useRouter } from "next/router";

import { auth } from "integrations/auth/lucia";

import ConsumerContainer from "app/components/shared/ConsumerContainer";
import Layout from "app/layouts/Layout";
import { SignupForm } from "app/components/auth/SignupForm";

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

const SignupPage = () => {
  const router = useRouter();

  return (
    <ConsumerContainer maxWidth="sm">
      <SignupForm onSuccess={() => router.push("/")} />
    </ConsumerContainer>
  );
};

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>;

export default SignupPage;
