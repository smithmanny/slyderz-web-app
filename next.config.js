/* eslint-disable global-require */
const withPlugins = require('next-compose-plugins');
const withGraphql = require('next-plugin-graphql');
const withOptimizedImages = require('next-optimized-images');
const sharp = require('sharp');

const nextConfig = {
  target: 'serverless',
};

module.exports = withPlugins(
  [
    [withGraphql],
    [
      withOptimizedImages,
      {
        defaultImageLoader: 'responsive-loader',
        imagesName: '[name]-[hash].[ext]',
        responsive: {
          adapter: sharp
        }
      }
    ]
  ],
  nextConfig
);
