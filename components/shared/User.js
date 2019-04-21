import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import currentUserQuery from '../../lib/gql/query/user/currentUserQuery.gql';

const User = props => (
  <Query query={currentUserQuery}>{payload => props.children(payload)}</Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired
};

export default User;
