import React from 'react';

import Content from '../components/Content';
import Layout from '../components/Layout';
import SettingsContainer from '../components/settings/SettingsContainer';
import SettingsTabs from '../components/settings/SettingsTabs';

const Index = props => (
  <Layout>
    <Content>
      <SettingsContainer>
        {({ view, setView }) => (
          <React.Fragment>
            <SettingsTabs setView={setView} />
            {view}
          </React.Fragment>
        )}
      </SettingsContainer>
    </Content>
  </Layout>
);

export default Index;
