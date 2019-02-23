import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import PersonIcon from '@material-ui/icons/Person';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import ClockIcon from '@material-ui/icons/AccessTime';
import TextField from '@material-ui/core/TextField';

import Content from '../components/Content';
import Layout from '../components/Layout';
import Form, { DatePickerField } from '../components/form/Form';

const useStyles = theme => ({
  bigAvatar: {
    width: 60,
    height: 60,
  },
  button: {
    width: '100%',
    height: 46,
  },
  cancellation: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    padding: `0, ${theme.spacing.unit}`,
  },
  datePicker: {
    marginBottom: theme.spacing.unit,
  },
  disclaimer: {
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  section: {
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
  },
  time: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  name: {
    margin: 'auto',
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
});

function getSteps() {
  return ['Summary', 'Event Address', 'Payment'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const OrderSummary = ({ classes }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  function handleNext() {
    setActiveStep(prev => ({ activeStep: prev.activeStep + 1 }))
  }

  function handleNext() {
    setActiveStep(prev => ({ activeStep: prev.activeStep - 1 }))
  }

  return (
    <Layout>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const props = {};
          const labelProps = {};
          return (
            <Step key={label} {...props}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Content>
        <Form>
          {({ errors, values }) => (
            <Grid container className={classes.content} spacing={32}>
              { /* Left Side */ }
              <Grid item xs={12} md={9}>
                <Grid item xs={12}>
                  <Typography variant="h3">Review your event</Typography>
                </Grid>

                <Grid className={classes.section} item xs={12} md={6}>
                  <List dense>
                    {generate(
                      <ListItem>
                        <ListItemText primary="Single-line item" />
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
                      <Button variant="contained" color="primary" className={classes.button}>
                        Continue
                      </Button>
                    </ListItem>
                    <ListItem>
                      <Typography
                        variant="caption" 
                        className={classes.disclaimer}
                      >
                        You won't be charged yet
                      </Typography>
                    </ListItem>
                  </List>
                </Grid>

             
              </Grid>

              { /* Right Side */ }
              <Grid item xs={12} md={3}>
                <Paper className={classes.paper}>
                  <React.Fragment>
                    <Grid container spacing={16}>
                      <Grid className={classes.name} item xs>
                        <Typography variant="h5">Shakhor Smith</Typography>
                      </Grid>
                      <Grid item>
                        <Avatar alt="Remy Sharp" src="/static/food.jpg" className={classes.bigAvatar} />
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
                              <ListItemText
                                primary="Single-line item"
                                secondary="x 2"
                              />
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
            </Grid>
          )}
        </Form>
      </Content>
    </Layout>
  )
}

OrderSummary.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(useStyles)(OrderSummary);
