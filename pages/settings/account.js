import React from 'react';
import PropTypes from 'prop-types';

import Section from '../../components/shared/Section';
import Layout from '../../components/Layout';
import AccountSettings from '../../components/settings/AccountSettings';
import PrivateRoute from '../../components/PrivateRoute';

const SettingsAccountContainer = ({ user }) => (
  <PrivateRoute user={user}>
    <Layout>
      <Section>
        <AccountSettings user={user} />
      </Section>
    </Layout>
  </PrivateRoute>
);

SettingsAccountContainer.defaultProps = {
  user: {}
};

SettingsAccountContainer.propTypes = {
  user: PropTypes.object
};

export default SettingsAccountContainer;
