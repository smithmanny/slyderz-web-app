const withPlugins = require('next-compose-plugins');
const { withBlitz } = require("@blitzjs/next");
const { withAxiom } = require('next-axiom');

// module.exports = withBlitz({});
module.exports = withPlugins([
  withBlitz,
  withAxiom,
], nextConfiguration);

