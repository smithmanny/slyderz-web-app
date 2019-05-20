import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import Layout from '../../components/Layout';
import Section from '../../components/shared/Section';
import Text from '../../components/shared/Text';
import pendingChefsQuery from '../../lib/gql/query/chef/pendingChefsQuery.gql';
import PrivateRoute from '../../components/PrivateRoute';

const styles = theme => ({
  grid: {
    margin: 'auto'
  },
  event: {
    padding: theme.spacing(1),
    maxWidth: 975,
    margin: 'auto'
  },
  fab: {
    marginLeft: theme.spacing(1)
  },
  listItem: {
    paddingLeft: theme.spacing(1)
  }
});

class AdminChefScreen extends React.Component {
  render() {
    const { classes, user } = this.props;
    return (
      <PrivateRoute user={user}>
        <Layout>
          <Section>
            <Grid container>
              <Grid className={classes.grid} item xs={12}>
                <Query query={pendingChefsQuery}>
                  {({ data, loading }) => {
                    if (loading) return 'Loading...';

                    if (data.pendingChefs.length === 0) {
                      return 'No pending chefs.';
                    }
                    return (
                      <Paper className={classes.event}>
                        <List>
                          {data.pendingChefs.map(chef => (
                            <ListItem
                              key={chef.id}
                              className={classes.listItem}
                              divider
                              disableGutters
                            >
                              <ListItemText
                                primary={chef.firstName}
                                secondary={`${chef.city}, ${chef.state}`}
                              />
                              <ListItemSecondaryAction>
                                <IconButton
                                  className={classes.fab}
                                  size="small"
                                  aria-label="Add"
                                >
                                  <CloseIcon />
                                </IconButton>
                                <IconButton
                                  className={classes.fab}
                                  size="small"
                                  aria-label="Add"
                                >
                                  <CheckIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    );
                  }}
                </Query>
              </Grid>
            </Grid>
          </Section>
        </Layout>
      </PrivateRoute>
    );
  }
}

AdminChefScreen.defaultProps = {
  user: {}
};

AdminChefScreen.propTypes = {
  classes: PropTypes.object,
  user: PropTypes.object
};

export default withStyles(styles)(AdminChefScreen);
