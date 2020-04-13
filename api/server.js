const express = require("express");

const accountsRouter = require('../routers/accountsRouter');

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter);
server.get('/', (req, res) => {
  res.send('Server active')
})

module.exports = server;