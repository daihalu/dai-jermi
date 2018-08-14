require('dotenv').config();

exports.PORT = process.env.PORT || 3000;
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.REDIS_URL = process.env.REDIS_URL || null;
exports.JWT_SECRET = process.env.JWT_SECRET || 'GUESS_WHO_S_BACK';
