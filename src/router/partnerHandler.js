const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyInstructor = require('../middleware/verifyInstructor');
const verifyAdmin = require('../middleware/verifyAdmin');
const partnersCollection = require('../model/PartnerSchema');





/**
* Get All Partners API
*/

router.get("/partners", async (req, res) => {
    const result = await partnersCollection.find();
    res.send(result);
});






module.exports = router

