import { Query } from 'react-apollo';

import currentUserQuery from '../../lib/gql/query/user/currentUserQuery.gql';

const User = props => (
  <Query
    query={currentUserQuery}
  >
    {(payload => props.children(payload))}
  </Query>
)

export default User;