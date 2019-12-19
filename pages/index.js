import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { HomePageLayout } from '../src/components/layouts';
import currentUserQuery from '../src/libs/gql/query/user/currentUserQuery.gql';

const Index = () => <HomePageLayout />;

// Index.getInitialProps = () => {
//   const { data } = useQuery(currentUserQuery);

//   return { ctx: data };
// };
export default Index;
