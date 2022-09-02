const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const { withBlitz } = require("@blitzjs/next");
const { withAxiom } = require('next-axiom');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return withBlitz()
  }

  const plugins = [
    withBlitz,
    withAxiom
  ];
  return plugins.reduce((acc, next) => next(acc), {
    serverRuntimeConfig: {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    },
    reactStrictMode: true,
    compiler: {
      emotion: true
    }
  });
};

