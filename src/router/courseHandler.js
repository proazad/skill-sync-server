const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyInstructor = require('../middleware/verifyInstructor');
const verifyAdmin = require('../middleware/verifyAdmin');
const courseCollection = require('../model/CourseSchema');

/**
 * Cousres Related All API Start here 
 *  Get All Courses API 
 * */

router.get("/courses", async (req, res) => {
    try {
        const result = await courseCollection.find();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get Courese By User Email 
router.get("/courses/:email", verifyToken, verifyInstructor, async (req, res) => {
    if (req.params.email !== req.decoded.email) {
        return res.status(403).send({ message: "Access Forbbiden" });
    }
    const query = { email: req.params.email }
    const result = await courseCollection.find(query);
    res.send(result);
});

// Get Single Course by Id 
router.get('/courses/single/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: id };
    const result = await courseCollection.findOne(query);
    res.send(result);
});

// Update Single Course By Id 
router.put("/courses/update/:id", verifyToken, verifyInstructor, async (req, res) => {
    const id = req.params.id;
    const course = req.body;
    const filter = { _id: new ObjectId(id) }
    const updateDoc = {
        $set: {
            title: course.title,
            image: course.image,
            lesson: course.lesson,
            duration: course.duration,
            ratings: course.ratings,
            label: course.label,
            description: course.description,
            enrolled: course.enrolled,
            mentor: course.mentor,
            mentorId: course.mentorId,
            email: course.email
        }
    }
    const result = await courseCollection.updateOne(filter, updateDoc);
    res.send(result);
});
// Update Course When Enrolled 
router.put("/courses/enroll/:id", verifyToken, async (req, res) => {
    const id = req.params.id;
    const course = req.body;
    const filter = { _id: id };
    console.log(course);
    const updateDoc = {
        $inc: {
            enrolled: course.enroll
        }
    };
    const result = await courseCollection.updateOne(filter, updateDoc);
    res.send(result);
});

// Approve Course 
router.put("/courses/approve/:id", verifyToken, verifyAdmin, async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const filter = { _id: id };
    const updateDoc = {
        $set: {
            isApproved: true,
            isreject: false

        }
    }
    const result = await courseCollection.updateOne(filter, updateDoc);
    res.send(result);
});

// Cancel Course 
router.put("/courses/cancel/:id", verifyToken, verifyAdmin, async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id }
    const updateDoc = {
        $set: {
            isreject: true
        }
    }
    const result = await courseCollection.updateOne(filter, updateDoc);
    res.send(result);
});

//Post Single Course
router.post("/courses", verifyToken, verifyInstructor, async (req, res) => {
    try {
        const course = req.body;

        // Validate the course data against the schema
        const validationError = courseCollection.validate(course);

        if (validationError) {
            // If validation fails, return a 400 Bad Request with the error details
            return res.status(400).json({ error: validationError.message });
        }

        const result = await courseCollection.create(course);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Delete Single Course By ID 
router.delete("/courses/del/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) }
    const result = await courseCollection.deleteOneOne(filter);
    res.send(result);
});





module.exports = router