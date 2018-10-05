const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

exports.init = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));
};
