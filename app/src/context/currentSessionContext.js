/* eslint-disable react/prop-types */
import React, { createContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import CURRENT_SESSION_QUERY from '../libs/gql/query/session/currentSessionQuery.gql';

const INITIAL_SESSION_STATE = {
  user: null
};
const CurrentSessionContext = createContext({ ...INITIAL_SESSION_STATE });

export const withCurrentUser = Component =>
  function ComponentWithCurrentUser(props) {
    return (
      <CurrentSessionContext.Consumer>
        {currentSession => (
          <Component
            {...props}
            currentUser={currentSession && currentSession.user}
          />
        )}
      </CurrentSessionContext.Consumer>
    );
  };

export const CurrentSessionProviver = ({ children }) => {
  const { data, loading } = useQuery(CURRENT_SESSION_QUERY);
  let session;
  if (!loading && data && data.currentSession) {
    session = data.currentSession;
  } else {
    session = INITIAL_SESSION_STATE;
  }
  return (
    <CurrentSessionContext.Provider value={session}>
      {children}
    </CurrentSessionContext.Provider>
  );
};
