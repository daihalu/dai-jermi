/* eslint-disable no-param-reassign */

const { createLogger, format, transports } = require('winston');

const { combine, timestamp, printf } = format;

const customFormat = printf((info) => {
  const log = info.level !== 'error'
    ? `[${info.level}] ${info.timestamp}: ${info.message}`
    : `[${info.level}] ${info.timestamp}: ${info.message}\n${info.stack}`;
  return log.trim();
});

const customTransports = (() => {
  const env = process.env.NODE_ENV;
  if (env === 'production') return [new transports.File({ filename: 'system.log' })];
  if (env === 'development') return [new transports.Console()];
  return [];
})();

module.exports = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    customFormat,
  ),
  transports: customTransports,
});
