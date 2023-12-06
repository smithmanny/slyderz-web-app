import Layout from "app/layouts/Layout";
import LoggedInContainer from "app/home";

// type HomePage = {
//   unlockBeta: boolean;
// };

// export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
//   const authRequest = auth.handleRequest(ctx);
//   const session = await authRequest.validate();

//   return {
//     props: {
//       unlockBeta: !!session,
//     },
//   };
// }) satisfies GetServerSideProps<HomePage>;

const Home = () => {
  return <LoggedInContainer />;
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
