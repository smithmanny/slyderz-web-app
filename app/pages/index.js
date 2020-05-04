import React, { useEffect } from 'react';
import dynamic from 'next/dynamic'
import { useQuery } from '@apollo/react-hooks';

import CurrentSessionProvider from '../src/components/shared/CurrentSessionProvider';
import CURRENT_SESSION_QUERY from '../src/libs/gql/query/session/currentSessionQuery.gql';

import Footer from '../src/components/shared/footer'
const LoggedInContainer = dynamic(() => import('../src/components/logged_in_container'))
const LoggedOutContainer = dynamic(() => import('../src/components/logged_out_container'))

const Index = () => {
  const { data, loading } = useQuery(CURRENT_SESSION_QUERY);

  if (loading) return 'loading'

  let content = <LoggedOutContainer />
  if (data?.currentSession.user) {
    content = <LoggedInContainer />
  }
  return (
    <CurrentSessionProvider value={data?.currentSession}>
      <main>
        {content}
        <Footer />
      </main>
    </CurrentSessionProvider>
  );
};

export default Index;
