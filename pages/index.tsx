import dynamic from "next/dynamic";
import { BlitzPage } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout"

const LoggedInContainer = dynamic(() =>
  import("app/core/layouts/LoggedInLayout")
);

const Home: BlitzPage = () => {
  return (
   <LoggedInContainer />
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home