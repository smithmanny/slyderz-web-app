import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
  button: {
    width: '100%',
    height: 46
  },
  section: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5)
  },
  name: {
    margin: 'auto'
  }
});

const AddressLabel = () => (
  <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar alt="Remy Sharp" src="/static/food.jpg" />
    </ListItemAvatar>
    <ListItemText
      primary="4288 Glider Circle"
      secondary={
        <React.Fragment>
          <Typography component="span" color="textPrimary">
            Douglasville, GA
          </Typography>
        </React.Fragment>
      }
    />
  </ListItem>
);

const PaymentView = ({ classes }) => (
  <Grid item xs={12} md={8}>
    <Typography variant="h3">Payment</Typography>

    <Grid className={classes.section} item xs={6}>
      <Button variant="contained" color="primary" className={classes.button}>
        Pay Now
      </Button>
    </Grid>
  </Grid>
);

PaymentView.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(useStyles)(PaymentView);
