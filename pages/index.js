import React from 'react';

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

export default Index;
