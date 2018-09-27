const users = require('./users');
const posts = require('./posts');

module.exports = (app) => {
    app.use('/users', users);
    app.use('/posts', posts);

    app.use((err, req, res, next) => {
        console.log(err);
        res.status(err.status || 500).json({ error: err.message });
    });
};
