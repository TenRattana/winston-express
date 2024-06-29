const express = require("express");
const cors = require("cors");
const { accessLogger } = require("./winston/winston.js");

const app = express();

app.use((req, res, next) => {
  accessLogger.info(
    `Request received: Method=${req.method}, URL=${req.originalUrl}`
  );
  next();
});

app.use(cors());

const router = require('./route/route.js');
app.use(router);

module.exports = { app };
