import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';

import Typography from '../Typography';
import sectionLayoutStyles from './styles';

const Section = ({
  children,
  title,
  titleDivProps,
  titleProps,
  subTitle,
  subTitleProps,
  ...props
}) => {
  const classes = sectionLayoutStyles();
  const theme = useTheme();

  if (!title) {
    return (
      <section
        style={{
          margin: theme.spacing(0, 30)
        }}
        {...props}
      >
        {children}
      </section>
    )
  }
  return (
    <section
      style={{
        margin: theme.spacing(0, 20)
      }}
      {...props}
    >
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
};

Section.defaultProps = {
  title: null,
  titleDivProps: {},
  titleProps: {},
  props: {},
  subTitle: null,
  subTitleProps: null
};

Section.propTypes = {
  children: PropTypes.object.isRequired,
  title: PropTypes.string,
  titleDivProps: PropTypes.object,
  titleProps: PropTypes.object,
  props: PropTypes.object,
  subTitle: PropTypes.string,
  subTitleProps: PropTypes.object
};

export default Section;
