const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyInstructor = require('../middleware/verifyInstructor');
const verifyAdmin = require('../middleware/verifyAdmin');
const feedbackCollection = require('../model/FeedbackSchema');
/**
         * Review / Feedback API
         * Get All Feedback API
         */

router.get("/feedback", async (req, res) => {
    const result = await feedbackCollection.find();
    res.send(result);
});

/**
 * Get Single Feedback API 
 */
router.get("/feedback/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id };
    const result = await feedbackCollection.findOne(filter);
    res.send(result);
});





/**
* Get All Partners API
*/

router.get("/partners", async (req, res) => {
    const result = await partnersCollection.find();
    res.send(result);
});






module.exports = router

