import React from 'react';
import PropTypes from 'prop-types';

import { Typography, withStyles } from '../core';
import sectionLayoutStyles from '../../assets/styles/consumer/sectionLayoutStyles';

const SectionLayout = ({ children, classes, title, titleProps, subTitle }) => (
  <section className={classes.root}>
    {title && (
      <Typography
        className={classes.title}
        variant="h5"
        gutterBottom
        {...titleProps}
      >
        {title}
      </Typography>
    )}
    {children}
  </section>
);

SectionLayout.defaultProps = {
  classes: PropTypes.object,
  subTitle: null,
  title: null,
  titleProps: {}
};

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object,
  subTitle: PropTypes.string,
  title: PropTypes.string,
  titleProps: PropTypes.object
};

export default withStyles(sectionLayoutStyles)(SectionLayout);
