const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({ url: process.env.REDIS_URL });

client.on('connect', () => console.log('Redis connected'));
client.on('error', (err) => console.log(err));
client.on('end', () => console.log('Redis disconnected'));

exports.get   = promisify(client.get).bind(client);
exports.setex = promisify(client.setex).bind(client);
exports.hget  = promisify(client.hget).bind(client);
exports.hmset = promisify(client.hmset).bind(client);
exports.hlen  = promisify(client.hlen).bind(client);
exports.del   = promisify(client.del).bind(client);
