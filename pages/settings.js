import React from "react";
import Link from "next/link";

import auth0 from "../src/utils/auth0";

import BasicForm, { TextField } from "../src/components/form";
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
    <ConsumerContainer maxWidth="sm">
      <Typography variant="h2" align="center">
        Settings
      </Typography>
      <BasicForm>
        <TextField
          name="name"
          variant="outlined"
          value={user.nickname}
          disabled
        />
        {/* <Typography variant="h3">Address</Typography>
        <TextField
          name="address1"
          variant="outlined"
          value=""
          label="Street Number"
          placeholder="123 Sesame Street"
        /> */}
      </BasicForm>
    </ConsumerContainer>
  );
};

export default Settings;
