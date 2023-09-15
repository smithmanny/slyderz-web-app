import { useFlags } from "flagsmith/react";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import { auth } from "integrations/auth/lucia";

import Layout from "app/layouts/Layout";
import BetaContainer from "app/beta";
import LoggedInContainer from "app/home";

type HomePage = {
  unlockBeta: boolean;
};

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  const authRequest = auth.handleRequest(ctx);
  const { session } = await authRequest.validateUser();

  return {
    props: {
      unlockBeta: !!session,
    },
  };
}) satisfies GetServerSideProps<HomePage>;

const Home = ({
  unlockBeta,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const flags = useFlags(["is_beta"]);

  if (flags.is_beta && !unlockBeta) return <BetaContainer />;

  return <LoggedInContainer />;
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
