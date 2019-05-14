import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

import Layout from '../components/Layout';
import Section from '../components/shared/Section';
import Text from '../components/shared/Text';

const styles = theme => ({
  bigAvatar: {
    width: 65,
    height: 65
  },
  grid: {
    margin: 'auto'
  },
  event: {
    display: 'flex',
    minHeight: 65,
    padding: theme.spacing(1)
  },
  eventName: {
    flex: 1,
    padding: 5
  },
  fab: {
    margin: theme.spacing(1)
  }
});

class Events extends React.Component {
  render() {
    const { classes, user } = this.props;

    return (
      <Layout>
        <Section>
          <Grid container>
            <Grid className={classes.grid} item xs={12} md={6}>
              <Paper className={classes.event}>
                <div className={classes.eventName}>
                  <Text color="inherit" type="body1">
                    Event Namehhhgyyffujuhjghghffhggfddsaaqqqw hggffgdgsgsfdfsfs
                  </Text>
                </div>
                <div>
                  <Fab
                    size="small"
                    color="error"
                    aria-label="Delete"
                    className={classes.fab}
                  >
                    <DeleteIcon />
                  </Fab>
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="Delete"
                    className={classes.fab}
                  >
                    <DeleteIcon />
                  </Fab>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Section>
      </Layout>
    );
  }
}

Events.propTypes = {
  classes: PropTypes.shape(),
  user: PropTypes.shape()
};

export default withStyles(styles)(Events);
