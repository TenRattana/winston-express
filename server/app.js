const express = require("express");
const cors = require("cors");
const { accessLogger } = require("./winston/winston.js");
const bodyParser = require('body-parser')

const app = express();

app.use((req, res, next) => {
  accessLogger.info(
    `Request received: Method=${req.method}, URL=${req.originalUrl}`
  );
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./route/route.js');
app.use(router);

module.exports = { app };
