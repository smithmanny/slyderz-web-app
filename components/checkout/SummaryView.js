import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = theme => ({
  button: {
    width: '100%',
    height: 46
  },
  content: {
    padding: `0, ${theme.spacing.unit}`
  },
  disclaimer: {
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center'
  },
  section: {
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5
  },
  name: {
    margin: 'auto'
  }
});

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value
    })
  );
}

const SummaryView = ({ classes, handleNext }) => (
  <Grid item xs={12} md={9}>
    <Grid item xs={12}>
      <Typography variant="h3">Review your event</Typography>
    </Grid>

    <Grid className={classes.section} item xs={12} md={6}>
      <List dense>
        {generate(
          <ListItem>
            <ListItemText primary="Blackend Salmon" />
            <ListItemSecondaryAction>
              <ListItemText primary="$100" />
            </ListItemSecondaryAction>
          </ListItem>
        )}
        <TextField
          id="outlined-multiline-static"
          label="Note to Chef"
          multiline
          rows="4"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <ListItem>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleNext}
          >
            Continue
          </Button>
        </ListItem>
        <ListItem>
          <Typography variant="caption" className={classes.disclaimer}>
            You won't be charged yet
          </Typography>
        </ListItem>
      </List>
    </Grid>
  </Grid>
);

SummaryView.propTypes = {
  classes: PropTypes.shape().isRequired,
  handleNext: PropTypes.func.isRequired
};

export default withStyles(useStyles)(SummaryView);
