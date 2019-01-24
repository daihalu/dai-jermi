const Redis = require('redis');
const { promisifyAll } = require('bluebird');
const { redis } = require('../env');
const log = require('../log');

const client = Redis.createClient({ url: redis.uri });

client.on('connect', () => log.info('Redis connected'));
client.on('error', err => log.error(err));

module.exports = promisifyAll(client);
