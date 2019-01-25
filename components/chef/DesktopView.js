import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Link from 'next/link';

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

import Layout from '../Layout';
import DishCard from './dishCard';

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

const DesktopView = ({ classes }) => {
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <Layout>
      <Grid container spacing={32}>
        <Grid item xs={12} sm={3}>
          <Grid item xs={12} className={classes.cookLogo}>
            <Paper className={classes.paper}>
              <CardMedia className={classes.media} image="/static/headshot.jpg" title="Contemplative Reptile" />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <List component="nav" >
              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Nia Brooks" />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <PlaceIcon />
                </ListItemIcon>
                <ListItemText primary="Atlanta, Georgia" />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={9}>
          <Grid item xs={12}>
            <Typography variant="body1" component='p' color="inherit" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu turpis mauris. Nullam dictum molestie nisl, aliquam rutrum dui finibus et. Fusce congue ex sapien, ac facilisis erat vehicula in. Fusce quis diam quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc ullamcorper ex at lacus suscipit rutrum. Integer ac ligula vitae purus elementum lacinia eu quis erat. Interdum et malesuada fames ac ante ipsum primis in faucibus.
            </Typography>
          </Grid>

          <Typography variant="h5" color="inherit" className={classes.section}>
            Dishes
          </Typography>
          <Grid container xs={12} spacing={32}>
            <Grid item xs={12} sm={6} className={classes.cookLogo}>
              <DishCard />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.cookLogo}>
              <DishCard />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.cookLogo}>
              <DishCard />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.cookLogo}>
              <DishCard />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.cookLogo}>
              <DishCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

DesktopView.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(useStyles)(DesktopView);
