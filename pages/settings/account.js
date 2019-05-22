import React from 'react';

import Section from '../../components/shared/Section';
import Layout from '../../components/Layout';
import AccountSettings from '../../components/settings/AccountSettings';
import LoggedInRoute from '../../components/LoggedInRoute';

const SettingsAccountContainer = props => (
  <LoggedInRoute>
    {user => (
      <Layout>
        <Section>
          <AccountSettings user={user} />
        </Section>
      </Layout>
    )}
  </LoggedInRoute>
);

export default SettingsAccountContainer;
