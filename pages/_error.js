import React from 'react';
import { withStyles } from '@material-ui/styles';

import Layout from '../components/Layout';
import Section from '../components/shared/Section';

const errorStyles = theme => ({
  div: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '850px',
    margin: 'auto',
    maxHeight: '500px',
    padding: theme.spacing(2)
  },
  image: {
    width: '100%',
    height: '100%'
  }
})

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <Section>
          <div className={classes.div}>
            <img 
              className={classes.image}
              src="/static/error.png" 
              alt="Error"
              />
          </div>
        </Section>
      </Layout>
    );
  }
}

export default withStyles(errorStyles)(Error);
