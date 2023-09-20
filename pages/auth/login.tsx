import { useRouter } from "next/router";

import { auth } from "integrations/auth/lucia";

import Layout from "app/layouts/Layout";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import LoginForm from "app/auth/components/LoginForm";

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

const LoginPage = () => {
  const router = useRouter();

  return (
    <ConsumerContainer>
      <LoginForm
        onSuccess={() => {
          const next = (router.query.next as string) ?? "/";
          return router.push(next);
        }}
      />
    </ConsumerContainer>
  );
};

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>;

export default LoginPage;
