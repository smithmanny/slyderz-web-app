import React from 'react';
import PropTypes from 'prop-types';

import Section from '../../components/shared/Section';
import Layout from '../../components/Layout';
import AddressSettings from '../../components/settings/AddressSettings';

const SettingsAddressContainer = ({ user }) => (
  <Layout>
    <Section>
      <AddressSettings user={user} />
    </Section>
  </Layout>
);

SettingsAddressContainer.propTypes = {
  user: PropTypes.shape()
};

export default SettingsAddressContainer;
