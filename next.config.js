const withGraphql = require('next-plugin-graphql');

module.exports = withGraphql({
  webpack(config, options) {
    return config;
  },
});
