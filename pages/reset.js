import React from 'react';
import PropTypes from 'prop-types';

import Content from '../components/Content';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';

const Reset = props => (
  <Content>
    <ResetPasswordForm resetToken={props.query.resetToken} />
  </Content>
);

Reset.propTypes = {
  query: PropTypes.shape()
};

export default Reset;
