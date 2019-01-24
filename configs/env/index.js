/* eslint-disable global-require,import/no-extraneous-dependencies,import/no-dynamic-require */

const { merge } = require('lodash');

const ENVIRONMENT = process.env.NODE_ENV.trim() || 'development';

if (ENVIRONMENT !== 'production') require('dotenv').config();

const config = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbname: process.env.MONGODB_DBNAME,
  },
  redis: {
    uri: process.env.REDIS_URI,
  },
};

const envConfig = require(`./${ENVIRONMENT}`);

module.exports = merge(config, envConfig);
