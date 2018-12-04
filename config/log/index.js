/* eslint-disable no-param-reassign */

const { createLogger, format, transports } = require('winston');
const { logging } = require('../env');

const customFormat = format((info) => {
  info[Symbol.for('message')] = `[${new Date().toISOString()}] ${info.level}: ${info.message}`;
  return info;
});

module.exports = createLogger({
  level: 'info',
  format: customFormat(),
  transports: [
    new transports.Console(),
  ],
  silent: !logging,
});
