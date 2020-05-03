import React from 'react';
import dynamic from 'next/dynamic'

import withCurrentUser from '../src/utils/withCurrentUser'

import homePageStyles from '../src/components/logged_in_container/styles';
import Footer from '../src/components/shared/footer'
const LoggedInContainer = dynamic(() => import('../src/components/logged_in_container'))
const LoggedOutContainer = dynamic(() => import('../src/components/logged_out_container'))

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
