import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import CURRENT_USER_QUERY from '../lib/gql/query/user/currentUserQuery.gql';

class PrivateRoute extends React.Component {
  state = {
    authorized: false
  };

  handleView = user => {
    if (!user) {
      this.setState({ authorized: false });
    }
    if (user) {
      this.setState({ authorized: true });
    }
  };

  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return 'Loading...';

          const user = data;
          this.handleView(user || {});

          return this.state.authorized
            ? this.props.children(user)
            : 'Not Authorized';
        }}
      </Query>
    );
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.object
};

export default PrivateRoute;
