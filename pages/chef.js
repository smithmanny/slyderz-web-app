import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Link from 'next/link';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';

import Content from '../components/Content';
import Layout from '../components/Layout';
import DishCard from '../components/chef/dishCard';
import Form from '../components/form/Form';

const useStyles = theme => ({
  bigAvatar: {
    width: 60,
    height: 60,
  },
  button: {
    width: '100%',
    height: 46,
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

const Chef = ({ classes }) => {
  function generate(element) {
    return [0, 1, 2].map(value =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

  return (
    <Layout>
      <div 
        style={{ 
          position: 'relative', 
          height: 300,
        }}
      >
        <img style={{ height: '100%', width: '100%' }} src="/static/detail.jpg" alt="Chef header image"/>
      </div>

      <Content>
        <Form>
          {({ errors, values }) => (
            <Grid container className={classes.content} spacing={32}>
              { /* Left Side */ }
              <Grid item xs={12} md={9}>
                <Grid container spacing={16}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" src="/static/food.jpg" className={classes.bigAvatar} />
                  </Grid>
                  <Grid className={classes.name} item xs>
                    <Typography variant="h5">Shakhor Smith</Typography>
                  </Grid>

                  <Grid item xs={12} style={{ marginTop: 6 }}>
                    <Typography variant="body1">Atlanta, GA</Typography>
                  </Grid>
                </Grid>

                <Grid className={classes.section} item xs={12} md={6}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>Read more about the chef</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Grid>

                <Typography variant="h5" gutterBottom>Chef dishes</Typography>
                <Grid item xs={12}>
                  <Grid container spacing={16}>
                    {[0, 1, 2].map(i => (
                      <Grid item xs={12} md={4}>
                        <DishCard name={i} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>

              { /* Right Side */ }
              <Grid item xs={12} md={3}>
                <Paper className={classes.paper}>
                  <React.Fragment>
                    <Form.DatePickerField />

                    <FormControl fullWidth margin="normal">
                      <Typography variant="body1" gutterBottom>Event Time</Typography>
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
                      <ListItem>
                        <ListItemText primary="Total:" />
                        <ListItemSecondaryAction>
                          <ListItemText primary="$300" />
                        </ListItemSecondaryAction>
                      </ListItem>

                      <ListItem>
                        <Button variant="contained" color="primary" className={classes.button}>
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
            </Grid>
          )}
        </Form>
      </Content>
    </Layout>
  )
}

Chef.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(useStyles)(Chef);
