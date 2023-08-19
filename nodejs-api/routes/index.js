"use strict";

const routes = require("express").Router();
const img = require("./img");

// Provides the different paths and its router
routes.use("/img", img);

module.exports = routes;
