import React from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@apollo/client";

import CURRENT_SESSION_QUERY from "../src/libs/gql/query/session/currentSessionQuery.gql";

const LoggedInContainer = dynamic(() =>
  import("../src/layouts/loggedInContainer")
);
const LoggedOutContainer = dynamic(() =>
  import("../src/layouts/loggedOutContainer")
);

const Index = () => {
  // TODO: Check user status
  const content = <LoggedInContainer />;

  return <main>{content}</main>;
};

export default Index;
