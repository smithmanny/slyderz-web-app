import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import ClockIcon from '@material-ui/icons/AccessTime';

const styles = theme => ({
  bigAvatar: {
    width: 60,
    height: 60
  },
  cancellation: {
    display: 'flex',
    flexDirection: 'column'
  },
  name: {
    margin: 'auto'
  },
  paper: {
    padding: theme.spacing(2)
  }
});

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value
    })
  );
}

const SideSummary = ({ classes }) => (
  <Grid item xs={12} md={4}>
    <Paper className={classes.paper}>
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid className={classes.name} item xs>
            <Typography variant="h5">Shakhor Smith</Typography>
          </Grid>
          <Grid item>
            <Avatar
              alt="Remy Sharp"
              src="/static/food.jpg"
              className={classes.bigAvatar}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="caption">5 Reviews</Typography>
          </Grid>

          <Grid item xs={2}>
            <PersonIcon />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="caption">3 Guest</Typography>
          </Grid>

          <Grid item xs={2}>
            <CalendarIcon />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="caption">February 21, 2019</Typography>
          </Grid>

          <Grid item xs={2}>
            <ClockIcon />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="caption">7:00 PM</Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
            <List dense>
              {generate(
                <ListItem>
                  <ListItemText primary="Single-line item" secondary="x 2" />
                  <ListItemSecondaryAction>
                    <ListItemText primary="$100" />
                  </ListItemSecondaryAction>
                </ListItem>
              )}
              <ListItem divider>
                <ListItemText primary="Total:" />
                <ListItemSecondaryAction>
                  <ListItemText primary="$300" />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem className={classes.cancellation}>
                <Typography variant="h5" gutterBottom>
                  Free Cancellation
                </Typography>
                <Typography variant="body1" align="center">
                  Cancel within 48 hours of booking to get a full refund.
                </Typography>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </React.Fragment>
    </Paper>
  </Grid>
);

SideSummary.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(SideSummary);
