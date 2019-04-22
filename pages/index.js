import React from 'react';
import Typography from '@material-ui/core/Typography';

import Content from '../components/Content';
import Chefs from '../components/Chefs';
import Foods from '../components/Foods';
import Layout from '../components/Layout';
import SearchBar from '../components/shared/SearchBar';

const Index = props => (
  <Layout>
    <Content>
      <SearchBar />
      <Typography variant="h5" color="inherit" gutterBottom>
        What would you like to eat?
      </Typography>
      <Foods />

      <Chefs />
    </Content>
  </Layout>
);

export default Index;
