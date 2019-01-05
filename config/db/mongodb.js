const mongoose = require('mongoose');
const { mongodb } = require('../env');
const log = require('../log');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

exports.init = () => {
  mongoose.connect(`${mongodb.uri}/${mongodb.dbname}`)
    .then(() => log.info('MongoDB connected'))
    .catch(err => log.error(err));
};
