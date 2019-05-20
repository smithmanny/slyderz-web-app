import React from 'react';

import Section from '../components/shared/Section';
import Layout from '../components/Layout';
import SettingsTabs from '../components/settings/SettingsTabs';
import PrivateRoute from '../components/PrivateRoute';

const Index = props => (
  <PrivateRoute>
    <Layout>
      <Section>
        <SettingsTabs />
      </Section>
    </Layout>
  </PrivateRoute>
);

export default Index;
