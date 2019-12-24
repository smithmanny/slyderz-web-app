/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import CURRENT_USER from '../libs/gql/query/user/currentUserQuery.gql';

const UserStateContext = createContext();

export const UserProvider = ({ children }) => {
  const { data, loading } = useQuery(CURRENT_USER);
  if (loading) {
    return null;
  }

  const [user, setCurrentUser] = useState(data.me);
  return (
    <UserStateContext.Provider value={user}>
      {children}
    </UserStateContext.Provider>
  );
};

export const getUser = () => useContext(UserStateContext);
