// const withPlugins = require('next-compose-plugins');
const { withBlitz } = require("@blitzjs/next");
const { withAxiom } = require('next-axiom');

module.exports = (phase, { defaultConfig }) => {
  const plugins = [
    withBlitz,
    withAxiom
  ];
  return plugins.reduce((acc, next) => next(acc), {
    /* global config here ... */
  });
};

