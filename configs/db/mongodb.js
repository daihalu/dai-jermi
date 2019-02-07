const mongoose = require('mongoose');
const log = require('../log');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

exports.init = () => {
  const uri = process.env.MONGODB_URI;
  const dbname = process.env.MONGODB_DBNAME;
  mongoose.connect(`${uri}/${dbname}`)
    .then(() => log.info('MongoDB connected'))
    .catch(err => log.error(err));
};
