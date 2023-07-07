module.exports = function override(config, env) {
  require('react-app-rewire-postcss')(config, true); // Uses postcss.config.js

  return config;
};