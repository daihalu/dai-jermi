const redis = require('redis');
const { promisify } = require('util');
const { REDIS_URL } = require('../config');

const client = redis.createClient({ url: REDIS_URL });

client.on('connect', () => console.log('Redis connected'));
client.on('error', (err) => console.log(err));
client.on('end', () => console.log('Redis disconnected'));

exports.get = promisify(client.get).bind(client);
exports.setex = promisify(client.setex).bind(client);
