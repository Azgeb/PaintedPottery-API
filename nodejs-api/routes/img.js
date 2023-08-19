"use strict";

const router = require("express").Router();
const bodyParser = require("body-parser");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const {spawn} = require('child_process');
const express = require('express');
const customParser = require("../utilities/customParser");
const customFileOpener = require("../utilities/customFileOpener");

// Parse URL-encoded bodies (as sent by HTML forms)
router.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
router.use(express.text({limit:'5mb'}));
/**
 * Create a new user from the request body provided
 */
router.post("/", express.raw(),(req, res) => {
   
    const jsonDTO = customParser.parse(res, req.body)
    if(!jsonDTO){return}

    const base64Data = jsonDTO.imgData.replace(/^data:image\/png;base64,/,"");
    const binaryData = new Buffer.from(base64Data, 'base64').toString('binary');

    const uuid = uuidv4();
    fs.writeFileSync("../images/input/" + uuid + ".png",  base64Data, "base64");

    const python = spawn('python', ['../python/example.py', '--img=' + uuid + '.png', jsonDTO.args]);
    python.on('close', (code) => {
        let exampleRequestDTO = {
            imgData : customFileOpener.openBase64(res, "../images/output/" + uuid + ".png")
        };
        
        if(!exampleRequestDTO.imgData){return}

         // send data to browser
         res.status(200).send(exampleRequestDTO)
        });
    });

module.exports = router;
