const express = require('express');
const router = require('./router');
const server = express();

server.use(express.json());

module.exports = server;