"use strict";

const express = require('express');
const cors = require("cors");

const app = express ();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const routes = require("./routes");

// Set all routes from routes folder
app.use(cors());
app.use("/", routes);
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });