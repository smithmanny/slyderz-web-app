const { withBlitz } = require("@blitzjs/next");

module.exports = (phase, { defaultConfig }) => {
  return withBlitz({
    reactStrictMode: true,
    compiler: {
      emotion: true,
    },
  });
};
