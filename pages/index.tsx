import { useFlags } from "flagsmith/react";

import Layout from "app/layouts/Layout";
import BetaContainer from "app/beta";
import LoggedInContainer from "app/home";

const Home = () => {
  const flags = useFlags(["is_beta"]);

  if (flags.is_beta) return <BetaContainer />;

  return <LoggedInContainer />;
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
