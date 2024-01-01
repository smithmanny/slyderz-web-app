import { TokenError } from "app/utils/errors";

import { auth, validateToken, invalidateAllUserTokens } from "app/lib/auth";
import { createMailjetContact } from "app/helpers/mailjet";

import Layout from "app/layout";
import ConsumerContainer from "app/components/shared/ConsumerContainer";
import VerifyEmailForm from "app/components/auth/VerifyEmail";

export async function getServerSideProps(ctx) {
  const authRequest = auth.handleRequest(ctx);
  const tokenParams = ctx.query?.token as string;

  if (!tokenParams) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const userId = await validateToken(tokenParams);
    const [user] = await Promise.all([
      auth.getUser(userId),
      invalidateAllUserTokens(userId),
      auth.updateUserAttributes(userId, {
        emailVerified: true,
      }),
    ]);

    if (!user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    // Add user to email list
    await createMailjetContact(user.email, user.name);

    if (user.emailVerified) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const session = await auth.createSession({
      userId,
      attributes: {
        stripeCustomerId: user.stripeCustomerId,
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.name,
        role: user.role,
      },
    });
    authRequest.setSession(session);
  } catch (e) {
    if (e instanceof TokenError && e.message === "Expired token") {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    if (e instanceof TokenError && e.message === "Invalid token") {
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
