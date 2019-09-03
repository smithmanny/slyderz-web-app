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
  subTitle,
  subTitleProps,
  ...props
}) => (
  <section className={classes.root} {...props}>
    <div {...titleDivProps}>
      <Typography
        className={classes.title}
        variant="h5"
        gutterBottom
        {...titleProps}
      >
        {title}
      </Typography>

      {subTitle && (
        <Typography
          className={classes.subTitle}
          variant="body2"
          gutterBottom
          {...subTitleProps}
        >
          {subTitle}
        </Typography>
      )}
    </div>
    {children}
  </section>
);

SectionLayout.defaultProps = {
  classes: PropTypes.object,
  title: null,
  titleDivProps: {},
  titleProps: {},
  props: {},
  subTitle: null,
  subTitleProps: null
};

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object,
  title: PropTypes.string,
  titleDivProps: PropTypes.object,
  titleProps: PropTypes.object,
  props: PropTypes.object,
  subTitle: PropTypes.string,
  subTitleProps: PropTypes.object
};

export default withStyles(sectionLayoutStyles)(SectionLayout);
