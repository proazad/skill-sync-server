const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyInstructor = require('../middleware/verifyInstructor');
const verifyAdmin = require('../middleware/verifyAdmin');
const feedbackCollection = require('../model/FeedbackSchema');

router.get("/feedback", async (req, res) => {
    const result = await feedbackCollection.find();
    res.send(result);
})
module.exports = router