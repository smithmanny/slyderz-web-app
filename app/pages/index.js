import React from 'react';

import LoggedInContainer from '../src/components/LoggedInContainer';
import LoggedOutContainer from '../src/components/LoggedOutContainer';
import withCurrentUser from '../src/utils/withCurrentUser'
import homePageStyles from '../src/components/LoggedInContainer/styles';

const Index = ({ currentUser }) => {
  const classes = homePageStyles();

  if (currentUser) {
    return <LoggedInContainer />
  }
  return (
    <LoggedOutContainer />
  );
};

export default withCurrentUser(Index);
