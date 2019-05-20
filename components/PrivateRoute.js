import React from 'react';
import PropTypes from 'prop-types';

class PrivateRoute extends React.Component {
  state = {
    authorized: false
  };

  componentDidMount() {
    this.handleView();
  }

  handleView() {
    if (!this.props.user) {
      this.setState({ authorized: false });
    }

    return this.props.children;
  }

  render() {
    return this.state.authorized ? this.children : 'Not Authorized';
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.object,
  user: PropTypes.object
};

export default PrivateRoute;
