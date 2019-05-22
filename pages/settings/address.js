import React from 'react';

import Section from '../../components/shared/Section';
import Layout from '../../components/Layout';
import AddressSettings from '../../components/settings/AddressSettings';
import LoggedInRoute from '../../components/LoggedInRoute';

const SettingsAddressContainer = props => (
  <LoggedInRoute>
    {user => (
      <Layout>
        <Section>
          <AddressSettings user={user} />
        </Section>
      </Layout>
    )}
  </LoggedInRoute>
);

export default SettingsAddressContainer;
