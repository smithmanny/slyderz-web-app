/* eslint-disable global-require */
const withPlugins = require('next-compose-plugins');
const withGraphql = require('next-plugin-graphql');
const withOptimizedImages = require('next-optimized-images');

const nextConfig = {
  target: 'serverless',
  env: {
    // Will be available on both server and client
    PROD_URL: 'https://hasura-slyderz.herokuapp.com/v1/graphql'
  }
};

module.exports = withPlugins(
  [
    [withGraphql],
    [
      withOptimizedImages,
      {
        defaultImageLoader: 'responsive-loader'
      }
    ]
  ],
  nextConfig
);
