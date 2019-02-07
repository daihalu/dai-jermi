const Redis = require('redis');
const { promisifyAll } = require('bluebird');
const log = require('../log');

const client = Redis.createClient({ url: process.env.REDIS_URI });

client.on('connect', () => log.info('Redis connected'));
client.on('error', err => log.error(err));

module.exports = promisifyAll(client);
