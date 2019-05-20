import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Section from '../../components/shared/Section';
import Layout from '../../components/Layout';
import SideSummary from '../../components/checkout/SideSummary';
import SummaryView from '../../components/checkout/SummaryView';
import AddressView from '../../components/checkout/AddressView';
import PaymentView from '../../components/checkout/PaymentView';

const useStyles = theme => ({
  content: {
    padding: theme.spacing(2, 0)
  },
  name: {
    margin: 'auto'
  }
});

function getSteps() {
  return ['Summary', 'Event Address', 'Payment'];
}

const OrderSummary = ({ classes }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SummaryView handleNext={handleNext} />;
      case 1:
        return <AddressView handleNext={handleNext} />;
      case 2:
        return <PaymentView />;
      default:
        return 'Unknown step';
    }
  }

  return (
    <Layout>
      <Section>
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

        <Grid container spacing={3} className={classes.content}>
          {getStepContent(activeStep)}
          <SideSummary />
        </Grid>
      </Section>
    </Layout>
  );
};

OrderSummary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(OrderSummary);
