const api = require('./api/index');

module.exports = (app) => {
    app.use('/api', api);

    app.use((err, req, res, next) => {
        console.log(err);
        res.status(err.status || 500).json({ error: err.message });
    });
};
