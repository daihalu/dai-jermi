const mongoose = require('mongoose');
const envConfig = require('../env');
const logger = require('../log');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const getUrl = (config) => {
    const { username, password, host, port, name: dbName } = config.database.mongodb;
    return config.environment === 'production'
        ? `mongodb://${username}:${password}@${host}:${port}/${dbName}`
        : `mongodb://${host}:${port}/${dbName}`;
};

exports.init = () => {
    mongoose.connect(getUrl(envConfig))
        .then(() => logger.info('MongoDB connected'))
        .catch(err => logger.error(err));
};
