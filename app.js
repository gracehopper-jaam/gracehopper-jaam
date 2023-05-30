require("dotenv").config();
const express = require("express");
const path = require('path');
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const client = require("./db/client");
client.connect();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  next();
});

app.use(express.static(path.join(__dirname, 'build')));

const apiRouter = require("./api");

app.use("/api", apiRouter);

app.use("/", (req, res) => {res.sendFile(path.join(__dirname, 'build'))});

module.exports = app;

