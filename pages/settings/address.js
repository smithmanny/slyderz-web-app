import React from 'react';

import Section from '../../components/shared/Section';
import Layout from '../../components/Layout';
import AddressSettings from '../../components/settings/AddressSettings';
import PrivateRoute from '../../components/PrivateRoute';

const SettingsAddressContainer = props => (
  <PrivateRoute>
    {user => (
      <Layout>
        <Section>
          <AddressSettings user={user} />
        </Section>
      </Layout>
    )}
  </PrivateRoute>
);

export default SettingsAddressContainer;
