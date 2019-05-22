const withGraphql = require('next-plugin-graphql');

module.exports = withGraphql({
  webpack(config, options) {
    return config;
  },
  target: 'serverless',
  publicRuntimeConfig: {
    // Will be available on both server and client
    PROD_URL: 'https://slyderz-backend.herokuapp.com/'
  }
});
