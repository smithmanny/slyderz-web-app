import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import Header from '../components/Header';
import PopularChefs from '../components/PopularChefs';
import HowItWorksSection from '../components/HowItWorksSection';

const Index = props => (
  <Layout>
    <Header />
    <PopularChefs />

    <HowItWorksSection />
  </Layout>
);

Index.defaultProps = {
  user: {}
};

export default Index;
