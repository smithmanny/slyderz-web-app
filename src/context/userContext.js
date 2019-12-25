/* eslint-disable react/prop-types */
import React, { createContext, useContext, useReducer } from 'react';
import { useQuery } from '@apollo/react-hooks';

import CURRENT_USER from '../libs/gql/query/user/currentUserQuery.gql';

const UserDispatchContext = createContext();
const UserStateContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGNOUT':
      return { ...state, user: null };
    case 'SIGNUP':
      return { ...state, user: action.payload };
    case 'LOGIN':
      return { ...state, user: action.payload };
    default:
      return new Error(`Action not found: ${action.type}`);
  }
};

export const UserProvider = ({ children }) => {
  const { data, loading } = useQuery(CURRENT_USER);
  if (loading) return null;

  const [state, dispatch] = useReducer(reducer, { user: data.me });
  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state.user}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

export const getUser = () => useContext(UserStateContext);
export const useUserDispatch = () => useContext(UserDispatchContext);
