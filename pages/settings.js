import React from "react";
import Link from "next/link";

import auth0 from "../src/utils/auth0";

import ConsumerContainer from "../src/components/consumerContainer";
import Typography from "../src/components/shared/Typography";

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: { user: session.user } };
}

const Settings = ({ user }) => {
  console.log({ user });
  // const classes = authStyles();
  return (
    <ConsumerContainer maxWidth="lg">
      <Typography variant="h2" align="center">
        Settings
      </Typography>
      <Typography>{user.nickname}</Typography>
    </ConsumerContainer>
  );
};

export default Settings;
