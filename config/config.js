
var _ = require('underscore');

// Set the node environment variable if not set before
process.env.NODE_ENV = typeof process.env.NODE_ENV !== 'undefined' ? process.env.NODE_ENV : 'development';

// Extend the base configuration in all.js with environment specific configuration
module.exports = _.extend(
    require('./env/all'),
    require('./env/' + process.env.NODE_ENV) || {}
);