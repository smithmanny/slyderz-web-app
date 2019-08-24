import React from 'react';
import PropTypes from 'prop-types';

import { Typography, withStyles } from '../core';
import sectionLayoutStyles from '../../assets/styles/consumer/sectionLayoutStyles';

const SectionLayout = ({
  children,
  classes,
  title,
  titleDivProps,
  titleProps,
  sectionProps
}) => (
  <section className={classes.root} {...sectionProps}>
    {title && (
      <div {...titleDivProps}>
        <Typography
          className={classes.title}
          variant="h5"
          gutterBottom
          {...titleProps}
        >
          {title}
        </Typography>
      </div>
    )}
    {children}
  </section>
);

SectionLayout.defaultProps = {
  classes: PropTypes.object,
  title: null,
  titleDivProps: {},
  titleProps: {},
  sectionProps: {}
};

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object,
  title: PropTypes.string,
  titleDivProps: PropTypes.object,
  titleProps: PropTypes.object,
  sectionProps: PropTypes.object
};

export default withStyles(sectionLayoutStyles)(SectionLayout);
