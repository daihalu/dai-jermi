const http = require('http');
const express = require('express');
const MongoDB = require('./databases/mongodb');
const cors = require('cors');
const routes = require('./routes');
const runTasks = require('./tasks');
const { PORT } = require('./config');

const app = express();
const server = http.createServer(app);

MongoDB.init();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable('x-powered-by');

routes(app);
runTasks();

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
