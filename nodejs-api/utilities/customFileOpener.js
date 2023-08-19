"use strict";

const logger = require("./logger");
const fs = require("fs");

const openBase64 = (res, dir) => {
    try {
        const data = fs.readFileSync(dir,{encoding: 'base64'});
        return data
    } catch (error) {
        const msg = 'Error while opening File: ' + error;
        logger.error(msg);
        res.status(500).send(msg)
    }
}

module.exports = { openBase64 }