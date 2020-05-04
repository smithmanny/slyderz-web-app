import React from 'react';
import Link from 'next/link';

import Typography from '../src/components/shared/Typography';
import authStyles from '../src/assets/styles/consumer/authStyles';

const Settings = () => {
  const classes = authStyles();
  return (
    <section className={classes.container}>
      <Link href="/">
        <a>
          <img className={classes.logo} src="/logo.png" alt="Slyderz" />
        </a>
      </Link>
      <Typography className={classes.welcome} variant="h3">
        My Settings
      </Typography>
    </section>
  );
};

export default Settings;
