
const express = require("express");

const app = express();

const usersController = require("./controllers/user.controller")

app.use(express.json());

app.use("/router",usersController);

module.exports = app;



