require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const client = require("./db/client");
const apiRouter = require("./api");

client.connect();

app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  next();
});
//It is a middleware for logging, use morgan for logging server requets and responses etc. could be 'dev' or 'tiny' or 'common'

// API Router here

app.use("/api", apiRouter);

module.exports = app;
