/* eslint-disable react/prop-types */
import React, { createContext } from 'react';

const INITIAL_SESSION_STATE = {
  user: null
};
export const CurrentSessionContext = createContext({ ...INITIAL_SESSION_STATE });

const CurrentSessionProvider = CurrentSessionContext.Provider;

export default CurrentSessionProvider;
