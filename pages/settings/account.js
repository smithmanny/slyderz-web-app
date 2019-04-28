import React from 'react';
import PropTypes from 'prop-types';

import Content from '../../components/Content';
import Layout from '../../components/Layout';
import AccountSettings from '../../components/settings/AccountSettings';

const SettingsAccountContainer = ({ user }) => (
  <Layout>
    <Content>
      <AccountSettings user={user} />
    </Content>
  </Layout>
);

SettingsAccountContainer.propTypes = {
  user: PropTypes.shape()
};

export default SettingsAccountContainer;
