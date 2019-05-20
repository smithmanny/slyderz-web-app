import React from 'react';
import PropTypes from 'prop-types';

import Section from '../../components/shared/Section';
import Layout from '../../components/Layout';
import AddressSettings from '../../components/settings/AddressSettings';
import PrivateRoute from '../../components/PrivateRoute';

const SettingsAddressContainer = ({ user }) => (
  <PrivateRoute user={user}>
    <Layout>
      <Section>
        <AddressSettings user={user} />
      </Section>
    </Layout>
  </PrivateRoute>
);

SettingsAddressContainer.defaultProps = {
  user: {}
};

SettingsAddressContainer.propTypes = {
  user: PropTypes.object
};

export default SettingsAddressContainer;
