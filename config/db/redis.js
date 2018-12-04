const redis = require('redis');
const { promisify } = require('util');
const envConfig = require('../env');
const log = require('../log');

const getUrl = (config) => {
  const {
    username,
    password,
    host,
    port,
  } = config.database.redis;
  return config.environment === 'production'
    ? `redis://${username}:${password}@${host}:${port}`
    : `redis://${host}:${port}`;
};

const client = redis.createClient({ url: getUrl(envConfig) });

client.on('connect', () => log.info('Redis connected'));
client.on('error', err => log.error(err));

exports.del = promisify(client.del).bind(client);
exports.get = promisify(client.get).bind(client);
exports.setex = promisify(client.setex).bind(client);
exports.hget = promisify(client.hget).bind(client);
exports.hmset = promisify(client.hmset).bind(client);
exports.hlen = promisify(client.hlen).bind(client);
