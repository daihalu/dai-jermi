const http = require('http');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const MongoDB = require('./configs/db/mongodb');
const passport = require('./configs/passport');
const routes = require('./routes');
const runTasks = require('./tasks');
const log = require('./configs/log');

const app = express();
const server = http.createServer(app);
const { PORT } = process.env;

MongoDB.init();

app.use(cors());
app.use(compression());
app.use(express.json());
app.disable('x-powered-by');

passport(app);
routes(app);
runTasks();

server.listen(PORT, () => log.info(`server running on port ${PORT}`));
