import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  orderWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    paddingBottom: theme.spacing.unit * 5,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  section: {
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
  },
  chefImage: {
    height: '100%',
  },
  paper: {
    height: 205,
    marginBottom: theme.spacing.unit,
  },
});

const tileData = [
  {
    img: '/static/food.jpg',
    title: 'BBQ',
  },
  {
    img: '/static/food.jpg',
    title: 'Seafood',
  },
  {
    img: '/static/food.jpg',
    title: 'American',
  },
];

const Foods = ({ classes }) => (
  <div className={classes.orderWrapper}>
    <GridList className={classes.gridList} cols={3} spacing={16}>
      {tileData.map(tile => (
        <GridListTile key={tile.title}>
          <img src={tile.img} alt={tile.title} />
          <GridListTileBar
            title={tile.title}
            classes={{
              root: classes.titleBar,
            }}
          />
        </GridListTile>
      ))}
    </GridList>
  </div>
);

export default withStyles(styles)(Foods);
