const { merge } = require('lodash');

const ENVIRONMENT = process.env.NODE_ENV.trim() || 'development';

if (ENVIRONMENT !== 'production') require('dotenv').config();

const config = {
    database: {
        mongodb: {
            host: process.env.MONGODB_DB_HOST,
            port: process.env.MONGODB_DB_PORT,
            username: process.env.MONGODB_DB_USERNAME,
            password: process.env.MONGODB_DB_PASSWORD,
            name: process.env.MONGODB_DB_NAME
        },
        redis: {
            host: process.env.REDIS_DB_HOST,
            port: process.env.REDIS_DB_PORT,
            username: process.env.REDIS_DB_USERNAME,
            password: process.env.REDIS_DB_PASSWORD
        }
    }
};

const envConfig = require(`./${ENVIRONMENT}`);

module.exports = merge(config, envConfig);
