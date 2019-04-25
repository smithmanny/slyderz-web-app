import React from 'react';

import Content from '../components/Content';
import Layout from '../components/Layout';
import SettingsTabs from '../components/settings/SettingsTabs';

const Index = props => (
  <Layout>
    <Content>
      <SettingsTabs />
    </Content>
  </Layout>
);

export default Index;
