module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      stage: 0,
      autoprefixer: {
        flexbox: 'no-2009',
      },
      importFrom: ['./src/styles/mediaqueries.css'],
      features: {
        'custom-media-queries': true,
        'custom-properties': {
          preserve: true,
          importFrom: ['./src/styles/variables.css'],
        },
      },
    }),
  ],
};
