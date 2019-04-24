import React from 'react';
import PropTypes from 'prop-types';

const SettingsContainer = ({ children }) => {
  const [view, setView] = React.useState('account');

  return children({ view, setView });
};

SettingsContainer.propTypes = {
  children: PropTypes.shape()
};

export default SettingsContainer;
