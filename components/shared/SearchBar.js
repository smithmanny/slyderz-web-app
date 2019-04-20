import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: 900,
    margin: 'auto',
    marginBottom: theme.spacing.unit * 5
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

const SearchBar = ({ classes }) => (
  <Paper className={classes.root} elevation={1}>
    <InputBase
      className={classes.input}
      placeholder="Search for cooks, food and more..."
    />

    <Divider className={classes.divider} />
    <IconButton className={classes.iconButton} aria-label="Search">
      <SearchIcon />
    </IconButton>
  </Paper>
);

SearchBar.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(SearchBar);
