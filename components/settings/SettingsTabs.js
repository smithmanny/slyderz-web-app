import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Text from '../shared/Text';

const styles = theme => ({
  content: {
    display: 'flex'
  },
  image: {
    height: '135px'
  },
  title: {
    margin: 'auto'
  }
});

const SettingsTabs = ({ classes, setView }) => {
  const settings = [
    {
      name: 'Account',
      view: 'account',
      picture:
        'https://res.cloudinary.com/slyderz/image/upload/c_thumb,w_200,g_face/v1556083409/account_ybfgxu.png'
    },
    {
      name: 'Address',
      view: 'address',
      picture:
        'https://res.cloudinary.com/slyderz/image/upload/c_thumb,w_200,g_face/v1556083409/world_jowgmi.png'
    },
    {
      name: 'Payment',
      view: 'payment',
      picture:
        'https://res.cloudinary.com/slyderz/image/upload/c_thumb,w_200,g_face/v1556083409/payment_viyyhd.png'
    }
  ];

  return (
    <Grid container spacing={32}>
      {settings.map(({ name, view, picture }) => (
        <Grid item xs={12} md={4}>
          <Card className={classes.card} onClick={() => setView(view)}>
            <CardContent className={classes.content}>
              <img src={picture} alt={`${name}`} className={classes.image} />
              <Text
                type="title"
                className={classes.title}
                style={{ textTransform: 'uppercase' }}
              >
                {name}
              </Text>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

SettingsTabs.propTypes = {
  classes: PropTypes.shape(),
  setView: PropTypes.string
};

export default withStyles(styles)(SettingsTabs);
