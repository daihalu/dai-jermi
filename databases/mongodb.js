const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

exports.init = () => {
    mongoose.connect(MONGODB_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));
};
