import React from 'react';
import PropTypes from 'prop-types';

import Section from '../components/shared/Section';
import Layout from '../components/Layout';
import SettingsTabs from '../components/settings/SettingsTabs';
import PrivateRoute from '../components/PrivateRoute';

const Index = props => (
  <PrivateRoute user={props.user}>
    <Layout>
      <Section>
        <SettingsTabs />
      </Section>
    </Layout>
  </PrivateRoute>
);

Index.defaultProps = {
  user: {}
};

Index.propTypes = {
  user: PropTypes.object
};

export default Index;
