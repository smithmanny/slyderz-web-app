import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Link from 'next/link';
import toRenderProps from 'recompose/toRenderProps';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import PersonIcon from '@material-ui/icons/Person';
import PlaceIcon from '@material-ui/icons/Place';
import Divider from '@material-ui/core/Divider';
import withWidth from '@material-ui/core/withWidth';

import Layout from '../components/Layout';
import DishCard from '../components/chef/dishCard';
import MobileView from '../components/chef/MobileView';
import DesktopView from '../components/chef/DesktopView';

const useStyles = theme => ({
  cookLogo: {
    marginBottom: theme.spacing.unit * 2,
  },
  section: {
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
  },
  paper: {
    height: 250,
  },
  media: {
    height: '100%',
  },
  listItem: {
    paddingLeft: 0,
  },
});

const WithWidth = toRenderProps(withWidth());

const Chef = ({ classes }) => {
  return (
    // <Layout>
      <WithWidth>
        {({ width }) => {
          if (width === 'xs') {
            return <MobileView />
          }

        return <DesktopView />
        }}
      </WithWidth>
    // </Layout>
  )
}

Chef.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(useStyles)(Chef);
