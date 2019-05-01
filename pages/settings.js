import React from 'react';

import Section from '../components/shared/Section';
import Layout from '../components/Layout';
import SettingsTabs from '../components/settings/SettingsTabs';

const Index = props => (
  <Layout>
    <Section>
      <SettingsTabs />
    </Section>
  </Layout>
);

export default Index;
