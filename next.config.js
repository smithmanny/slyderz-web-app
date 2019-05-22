const withGraphql = require('next-plugin-graphql');

module.exports = withGraphql({
  webpack(config, options) {
    return config;
  },
  target: 'serverless',
  env: {
    // Will be available on both server and client
    PROD_URL: 'https://slyderz-backend.herokuapp.com/'
  }
});
