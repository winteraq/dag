'use strict';
const pkg = require('../package');
module.exports = {
  pathPrefix: '/dag',
  siteMetadata: {
    title: `${pkg.name}`,
    description: `${pkg.name} demo website`,
    keywords: `${pkg.name}, javascript, typescript`,
    siteUrl: 'https://winteraq.github.io/dag',
    author: {
      name: pkg.author,
      url: pkg.repository,
    },
  },
  plugins: [
    `gatsby-plugin-tsconfig-paths`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://winteraq.github.io/dag',
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
  ],
};
