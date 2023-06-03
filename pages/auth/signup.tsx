import { useRouter } from "next/router";

import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Layout from "app/core/layouts/Layout";
import { SignupForm } from "app/auth/components/SignupForm";

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
