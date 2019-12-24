/* eslint-disable react/prop-types */
import React, { createContext, useContext, useReducer } from 'react';
import { useQuery } from '@apollo/react-hooks';

import CURRENT_USER from '../libs/gql/query/user/currentUserQuery.gql';

const UserStateContext = createContext();
const UserDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return true;
    case 'SIGNUP':
      return true;
    case 'SIGNOUT':
      return null;
    default:
      throw new Error(`Unknow action: ${action.type}`);
  }
};

export const UserProvider = ({ children }) => {
  const { data, loading } = useQuery(CURRENT_USER);
  if (loading) {
    return null;
  }
  const [state, dispatch] = useReducer(reducer, data.me || null);

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

export const getUser = () => useContext(UserStateContext);
export const useDispatchContext = () => useContext(UserDispatchContext);
