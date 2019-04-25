import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Text from '../shared/Text';

const SettingsContent = ({ view }) => {
  function renderSettingContent() {
    switch (view) {
      case 'account':
        return 'Account';
      case 'address':
        return 'Address';
      case 'payment':
        return 'Payment';
      default:
        return 'default';
    }
  }
  return (
    <Grid container spacing={32}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Text type="display1" color="black">
              {renderSettingContent()}
            </Text>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
SettingsContent.propTypes = {
  view: PropTypes.string
};

export default SettingsContent;
