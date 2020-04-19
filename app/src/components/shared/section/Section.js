import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
      <Container {...props}>
        {children}
      </Container>
    )
  }
  return (
    <Container {...props}>
      <span {...titleDivProps}>
        <Typography
          className={classes.title}
          variant="h2"
          gutterBottom
          {...titleProps}
        >
          {title}
        </Typography>

        {subTitle && (
          <Typography
            className={classes.subTitle}
            variant="h6"
            gutterBottom
            {...subTitleProps}
          >
            {subTitle}
          </Typography>
        )}
      </span>
      {children}
    </Container>
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
