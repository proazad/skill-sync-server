const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyInstructor = require('../middleware/verifyInstructor');
const verifyAdmin = require('../middleware/verifyAdmin');
const eventsCollection = require('../model/EventSchema');




/**
 * Upcoming Events Related API
 * Get all Events
 */
router.get("/events", async (req, res) => {
    const result = await eventsCollection.find();
    res.send(result)
});


/**
 * Get Single Events by Id 
 */
router.get("/events/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id };
    const result = await eventsCollection.findOne(filter);
    res.send(result)
});

/**
 * Add Post Single Events 
 */
router.post("/events", async (req, res) => {
    const event = req.body;
    const result = await eventsCollection.insertOne(event);
    res.send(result)
});







module.exports = router

