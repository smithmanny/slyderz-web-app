import React from "react";
import Link from "next/link";

import Typography from "../src/components/shared/Typography";

const Settings = () => {
  // const classes = authStyles();
  return (
    <section>
      {/* <Link href="/">
        <a>
          <img className={classes.logo} src="/logo.png" alt="Slyderz" />
        </a>
      </Link> */}
      <Typography variant="h3">My Settings</Typography>
    </section>
  );
};

export default Settings;
