import { dynamic, BlitzPage } from "blitz"

import Layout from "app/core/layouts/Layout"

const LoggedInContainer = dynamic(() =>
  import("app/core/layouts/LoggedInLayout")
);
// const LoggedOutContainer = dynamic(() =>
//   import("../src/components/loggedOutContainer")
// );

const Home: BlitzPage = () => {
  return (
   <LoggedInContainer />
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
