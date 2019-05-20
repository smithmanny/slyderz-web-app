import React from 'react';

import Section from '../../components/shared/Section';
import Layout from '../../components/Layout';
import AccountSettings from '../../components/settings/AccountSettings';
import PrivateRoute from '../../components/PrivateRoute';

const SettingsAccountContainer = props => (
  <PrivateRoute>
    {user => (
      <Layout>
        <Section>
          <AccountSettings user={user} />
        </Section>
      </Layout>
    )}
  </PrivateRoute>
);

export default SettingsAccountContainer;
