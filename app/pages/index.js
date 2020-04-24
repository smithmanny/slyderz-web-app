import React from 'react';

import withCurrentUser from '../src/utils/withCurrentUser'
import homePageStyles from '../src/components/logged_in_container/styles';

import Footer from '../src/components/shared/footer'
import LoggedInContainer from '../src/components/logged_in_container';
import LoggedOutContainer from '../src/components/logged_out_container';

const Index = ({ currentUser }) => {
  const classes = homePageStyles();

  let content = <LoggedOutContainer />
  if (currentUser) {
    content = <LoggedInContainer />
  }
  return (
    <main>
      {content}
      <Footer />
    </main>
  );
};

export default withCurrentUser(Index);
