import React from 'react';
import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import Chefs from '../components/Chefs';
import Foods from '../components/Foods';
import SearchBar from '../components/SearchBar';

export default () => (
  <Layout>
    <SearchBar />
    <Typography variant="h5" color="inherit" gutterBottom>
      What would you like to eat?
    </Typography>
    <Foods />

    <Chefs />
  </Layout>
);
