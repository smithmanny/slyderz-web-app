import { LuciaTokenError } from "@lucia-auth/tokens";
import type { GetServerSidePropsContext } from "next";

import { auth, emailVerificationToken } from "integrations/auth/lucia";

import Layout from "app/layouts/Layout";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import VerifyEmailForm from "app/auth/components/VerifyEmail";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const authRequest = auth.handleRequest(ctx);
  const { user } = await authRequest.validateUser();
  const tokenParams = ctx.query?.token as string;

  if (user.emailVerified) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!tokenParams) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const token = await emailVerificationToken.validate(tokenParams);
    await auth.invalidateAllUserSessions(token.userId);
    await auth.updateUserAttributes(token.userId, {
      emailVerified: true,
    });
    const session = await auth.createSession(token.userId);
    authRequest.setSession(session);
  } catch (e) {
    if (e instanceof LuciaTokenError && e.message === "EXPIRED_TOKEN") {
      console.log("TOKEN_EXPIRED", e);
    }
    if (e instanceof LuciaTokenError && e.message === "INVALID_TOKEN") {
      console.log("TOKEN_INVALID", e);
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
}

const VerifyEmail = () => {
  return (
    <ConsumerContainer>
      <VerifyEmailForm />
    </ConsumerContainer>
  );
};

VerifyEmail.getLayout = (page) => <Layout>{page}</Layout>;

export default VerifyEmail;
