import { LuciaTokenError } from "@lucia-auth/tokens";
import type { GetServerSidePropsContext } from "next";

import { auth, emailVerificationToken } from "integrations/auth/lucia";

import Layout from "app/layouts/Layout";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import VerifyEmailForm from "app/auth/components/VerifyEmail";

export async function getServerSideProps(ctx) {
  const authRequest = auth.handleRequest(ctx);
  const session = await authRequest.validate();
  const tokenParams = ctx.query?.token as string;

  if (session?.user?.emailVerified) {
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
    const [user] = await Promise.all([
      auth.getUser(token.userId),
      auth.invalidateAllUserSessions(token.userId),
      auth.updateUserAttributes(token.userId, {
        emailVerified: true,
      }),
    ]);

    const session = await auth.createSession({
      userId: token.userId,
      attributes: {
        stripeCustomerId: user.stripeCustomerId,
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.name,
      },
    });
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
