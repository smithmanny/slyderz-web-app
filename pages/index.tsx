import Layout from "app/core/layouts/Layout";
import LoggedInContainer from "app/LoggedInLayout";

const Home = () => {
  return <LoggedInContainer />;
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
