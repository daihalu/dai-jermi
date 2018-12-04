const http = require('http');
const express = require('express');
const MongoDB = require('./config/db/mongodb');
const cors = require('cors');
const compression = require('compression');
const passport = require('./config/passport');
const routes = require('./routes');
const runTasks = require('./tasks');
const log = require('./config/log');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

MongoDB.init();

app.use(cors());
app.use(compression());
app.use(express.json());
app.disable('x-powered-by');

passport(app);
routes(app);
runTasks();

server.listen(PORT, () => log.info(`server running on port ${PORT}`));
