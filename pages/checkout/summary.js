import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Content from '../../components/Content';
import Layout from '../../components/Layout';
import Form from '../../components/form/Form';
import SummaryView from '../../components/checkout/SummaryView';
import AddressView from '../../components/checkout/AddressView';

const useStyles = theme => ({
  content: {
    padding: `0, ${theme.spacing.unit}`,
  },
  datePicker: {
    marginBottom: theme.spacing.unit,
  },
  name: {
    margin: 'auto',
  },
});

function getSteps() {
  return ['Summary', 'Event Address', 'Payment'];
}

const OrderSummary = ({ classes }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  function handlePrev() {
    setActiveStep(prevActiveStep => prevActiveStep - 1 )
  }

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1 )
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SummaryView handleNext={handleNext} />;
      case 1:
        return <AddressView handleNext={handleNext} />;
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown step';
    }
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
              {getStepContent(activeStep)}
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
