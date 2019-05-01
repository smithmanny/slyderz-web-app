import React from 'react';
import PropTypes from 'prop-types';

import Content from '../Content';

const Section = ({ children, fullWidth, ...props }) => {
  const sectionStyles = {
    maxWidth: fullWidth ? '100%' : '1070px',
    margin: 'auto'
  };

  return (
    <div style={sectionStyles} {...props}>
      <Content>{children}</Content>
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.shape(),
  fullWidth: PropTypes.bool
};

export default Section;
