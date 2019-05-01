import React from 'react';
import PropTypes from 'prop-types';

import Section from '../../components/shared/Section';
import Layout from '../../components/Layout';
import AccountSettings from '../../components/settings/AccountSettings';

const SettingsAccountContainer = ({ user }) => (
  <Layout>
    <Section>
      <AccountSettings user={user} />
    </Section>
  </Layout>
);

SettingsAccountContainer.propTypes = {
  user: PropTypes.shape()
};

export default SettingsAccountContainer;
