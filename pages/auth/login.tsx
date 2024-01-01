import { useRouter } from "next/router";

import { auth } from "app/lib/auth";

import Layout from "app/layout";
import ConsumerContainer from "app/components/shared/ConsumerContainer";
import LoginForm from "app/components/auth/LoginForm";

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
