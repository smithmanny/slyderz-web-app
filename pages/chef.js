import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FolderIcon from '@material-ui/icons/Folder';
import AddIcon from '@material-ui/icons/Add';

import Section from '../components/shared/Section';
import Layout from '../components/Layout';
import Fab from '../components/shared/Fab';
import Form, {
  DatePickerField,
  TimePickerField
} from '../components/form/Form';

const useStyles = theme => ({
  intro: {
    marginBottom: theme.spacing(1)
  },
  bigAvatar: {
    width: 60,
    height: 60
  },
  button: {
    width: '100%',
    height: 46
  },
  fab: {
    height: 35,
    width: 35
  },
  section: {
    padding: theme.spacing(2, 0)
  },
  time: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  name: {
    margin: 'auto'
  },
  paper: {
    padding: theme.spacing(2)
  }
});

const Chef = ({ classes }) => (
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
              <Paper className={classes.paper}>
                <Grid className={classes.intro} container spacing={3}>
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

                <Grid item xs={12} className={classes.section}>
                  <Typography color="primary" variant="h4" gutterBottom>
                    Main Dishes
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Price per person.
                  </Typography>
                  <List>
                    <ListItem divider disableGutters>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Dish Name #1"
                        secondary="Short summary"
                      />
                      <ListItemSecondaryAction>
                        <Fab
                          className={classes.fab}
                          size="small"
                          aria-label="Add"
                        >
                          <AddIcon />
                        </Fab>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem divider disableGutters>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Dish Name #2"
                        secondary="Summary"
                      />
                      <ListItemSecondaryAction>
                        <Fab
                          className={classes.fab}
                          size="small"
                          aria-label="Add"
                        >
                          <AddIcon />
                        </Fab>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>

                <Grid item xs={12} className={classes.section}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    Extra Dishes
                  </Typography>
                  <List>
                    <ListItem divider disableGutters>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Dish Name #1" secondary="$15" />
                      <ListItemSecondaryAction>
                        <Fab
                          className={classes.fab}
                          size="small"
                          aria-label="Add"
                        >
                          <AddIcon />
                        </Fab>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem divider disableGutters>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Dish Name #2"
                        secondary="Summary goes here but we all know how this goes"
                      />
                      <ListItemSecondaryAction>
                        <Fab
                          className={classes.fab}
                          size="small"
                          aria-label="Add"
                        >
                          <AddIcon />
                        </Fab>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Paper>
            </Grid>

            {/* Right Side */}
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <React.Fragment>
                  <DatePickerField />
                  <TimePickerField />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => Router.push('/checkout/summary')}
                  >
                    Book Chef
                  </Button>
                </React.Fragment>
              </Paper>
            </Grid>
          </React.Fragment>
        )}
      </Form>
    </Section>
  </Layout>
);

Chef.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(useStyles)(Chef);
