import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Text from '../../components/shared/Text';
import Section from '../../components/shared/Section';
import Layout from '../../components/Layout';
import PrivateRoute from '../../components/PrivateRoute';

const styles = theme => ({
  imageWrapper: {
    maxWidth: 600,
    margin: `${theme.spacing(5)}px auto`
  },
  image: {
    width: '100%'
  }
});

const Payment = ({ classes, user }) => (
  <PrivateRoute user={user}>
    <Layout>
      <Section>
        <Text type="h5" align="center" color="inherit">
          You don't have any payments saved.
        </Text>
        <div className={classes.imageWrapper}>
          <img
            src="https://res.cloudinary.com/slyderz/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1556857856/credit-card_gy6dyg.png"
            alt="Credit cards"
            className={classes.image}
          />
        </div>
      </Section>
    </Layout>
  </PrivateRoute>
);

Payment.defaultProps = {
  user: {}
};

Payment.propTypes = {
  classes: PropTypes.shape().isRequired,
  user: PropTypes.object
};

export default withStyles(styles)(Payment);
