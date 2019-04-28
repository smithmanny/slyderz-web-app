import React from 'react';
import PropTypes from 'prop-types';

import Content from '../../components/Content';
import Layout from '../../components/Layout';
import AddressSettings from '../../components/settings/AddressSettings';

const SettingsAddressContainer = ({ user }) => (
  <Layout>
    <Content>
      <AddressSettings user={user} />
    </Content>
  </Layout>
);

SettingsAddressContainer.propTypes = {
  user: PropTypes.shape()
};

export default SettingsAddressContainer;
