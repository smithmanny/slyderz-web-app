import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import SideSummary from './SideSummary';

const useStyles = theme => ({
  button: {
    width: '100%',
    height: 46
  },
  content: {
    padding: `0, ${theme.spacing.unit}`
  },
  section: {
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5
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

const AddressView = ({ classes, handleNext }) => {
  const [value, setValue] = React.useState('home');

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <React.Fragment>
      <Grid item xs={12} md={9}>
        <Typography variant="h3">Event Address</Typography>

        <Grid className={classes.section} item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Choose an address</FormLabel>
            <RadioGroup
              aria-label="event-address"
              name="gender1"
              className={classes.group}
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={<AddressLabel classes={classes} />}
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label={<AddressLabel classes={classes} />}
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label={<AddressLabel classes={classes} />}
              />
              <FormControlLabel
                value="disabled"
                disabled
                control={<Radio />}
                label="(Add Address)"
              />
            </RadioGroup>
          </FormControl>

          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleNext}
            >
              Payment
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Side */}
      <SideSummary />
    </React.Fragment>
  );
};

AddressView.propTypes = {
  classes: PropTypes.shape().isRequired,
  handleNext: PropTypes.func.isRequired
};

export default withStyles(useStyles)(AddressView);
