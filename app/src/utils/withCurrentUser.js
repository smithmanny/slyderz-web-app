import React from 'react'
import { CurrentSessionContext } from './currentSessionContext'

const withCurrentUser = Component =>
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

export default withCurrentUser