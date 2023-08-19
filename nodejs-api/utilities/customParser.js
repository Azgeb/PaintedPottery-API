"use strict";

const logger = require("../utilities/logger");

const parse = (res, jsonString) => {
    try {
        const parsedJson = JSON.parse(jsonString)
        return parsedJson
    } catch (error) {
        const msg = 'JSON Parse errror: ' + error;
        logger.error(msg);
        res.status(500).send(msg)
    }
}

module.exports = { parse }