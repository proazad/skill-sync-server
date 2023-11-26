const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const courseSchema = require("../Schemas/CourseSchema");

const Course = new mongoose.model("Course", courseSchema);
/**
 * Cousres Related All API Start here 
 *  Get All Courses API 
 * */
router.get("/courses", async (req, res) => {
    const result = await Course.find().toArray();
    res.send(result);
});

//Get single Course by ID
router.get("/courses/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) }
    const result = await courseCollection.findOne(filter);
    res.send(result);
});

// Update Single Course By Id 
router.put("/courses/:id", async (req, res) => {
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

// Delete Single Course By ID 
router.delete("/courses/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) }
    const result = await courseCollection.deleteOneOne(filter);
    res.send(result);
});

/**
 * Student Related All API Start Here 
 * Get All Student
 */
router.get("/students", async (req, res) => {
    const result = await studentCollection.find().toArray();
    res.send(result);
});

module.exports = router