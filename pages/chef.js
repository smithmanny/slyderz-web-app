import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';

import Section from '../components/shared/Section';
import Layout from '../components/Layout';
import DishCard from '../components/chef/dishCard';
import Form, { DatePickerField } from '../components/form/Form';

const useStyles = theme => ({
  bigAvatar: {
    width: 60,
    height: 60
  },
  button: {
    width: '100%',
    height: 46
  },
  disclaimer: {
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center'
  },
  section: {
    padding: theme.spacing(3, 0)
  },
  time: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  name: {
    margin: 'auto'
  },
  paper: {
    padding: theme.spacing(2)
  }
});

const Chef = ({ classes }) => {
  function generateCheckoutItems(values) {
    const itemsObject = Object.entries(values);
    const items = itemsObject.map(([name, quantity]) => (
      <ListItem>
        <ListItemText primary={name} secondary={`x ${quantity}`} />
        <ListItemSecondaryAction>
          <ListItemText primary={`$${quantity}`} />
        </ListItemSecondaryAction>
      </ListItem>
    ));

    const total = itemsObject.map(([name, data]) => data.price * data.quantity);

    return (
      <div>
        {items}
        <ListItem>
          <ListItemText primary="Total:" />
          <ListItemSecondaryAction>
            <ListItemText primary="$Money" />
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    );
  }

  return (
    <Layout>
      <Section>
        <div
          style={{
            position: 'relative',
            height: 300,
            marginBottom: '30px'
          }}
        >
          <img
            style={{ height: '100%', width: '100%' }}
            src="/static/detail.jpg"
            alt="Chef header"
          />
        </div>

        <Form>
          {({ errors, values }) => (
            <React.Fragment>
              {/* Left Side */}
              <Grid item xs={12} md={8}>
                <Grid container spacing={3}>
                  <Grid item>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/food.jpg"
                      className={classes.bigAvatar}
                    />
                  </Grid>
                  <Grid className={classes.name} item xs>
                    <Typography variant="h5">Shakhor Smith</Typography>
                  </Grid>

                  <Grid item xs={12} style={{ marginTop: 6 }}>
                    <Typography variant="body1">Atlanta, GA</Typography>
                  </Grid>
                </Grid>

                <Grid className={classes.section} item xs={12}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>
                        Read more about the chef
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Grid>

                <Typography variant="h4" gutterBottom>
                  Chef dishes
                </Typography>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    {['Dish 1', 'Dish 2', 'Dish 3'].map(name => (
                      <Grid item xs={12} md={6}>
                        <DishCard name={name} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>

              {/* Right Side */}
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <React.Fragment>
                    <DatePickerField />

                    <FormControl fullWidth margin="normal">
                      <Typography variant="body1" gutterBottom>
                        Event Time
                      </Typography>
                      <div className={classes.time}>
                        {['5:00 pm', '5:30 pm', '6:00 pm'].map(time => (
                          <Button key={time} variant="contained">
                            {time}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <Divider />

                    <List dense>
                      {generateCheckoutItems(values)}
                      <ListItem>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          onClick={() => Router.push('/checkout/summary')}
                        >
                          Book Chef
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
                  </React.Fragment>
                </Paper>
              </Grid>
            </React.Fragment>
          )}
        </Form>
      </Section>
    </Layout>
  );
};

Chef.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(useStyles)(Chef);
