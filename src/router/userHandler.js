const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyInstructor = require('../middleware/verifyInstructor');
const verifyAdmin = require('../middleware/verifyAdmin');
const userCollection = require('../model/UserSchema');

/* Get All User
*/
router.get("/users", async (req, res) => {
    const result = await userCollection.find();
    res.send(result);
});

// Get Single Student By id
router.get("/users/role/student/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id }
    const result = await userCollection.findOne(filter);
    res.send(result);
});


//Request For Instructor 
router.put("/users/instructor/request/:email", verifyToken, async (req, res) => {
    const email = req.params.email;
    const instructor = req.body;
    const filter = { email: email }
    const updateDoc = {
        $set: {
            label: instructor.label,
            expertise: instructor.expertise,
            name: instructor.name,
            IswantInstructor: instructor.IswantInstructor
        }
    }
    const result = await userCollection.updateOne(filter, updateDoc);
    res.send(result);
});

// Make Instructor 
router.put("/users/instructor/:id", verifyToken, verifyAdmin, async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id }
    const updateDoc = {
        $set: {
            IswantInstructor: false,
            role: "instructor",
            requestReject: false,
        }
    }
    const result = await userCollection.updateOne(filter, updateDoc);
    res.send(result);
});


// Make Admin
router.put("/users/admin/:id", verifyToken, verifyAdmin, async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id }
    const updateDoc = {
        $set: {
            role: "moderator",
        }
    }
    const result = await userCollection.updateOne(filter, updateDoc);
    res.send(result);
});

// Make Instructor  Reject 
router.put("/users/instructor/requestreject/:id", verifyToken, verifyAdmin, async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id }
    const updateDoc = {
        $set: {
            requestReject: true,
        }
    }
    const result = await userCollection.updateOne(filter, updateDoc);
    res.send(result);
});


// Get User By Email
router.get("/users/:email", async (req, res) => {
    const email = req.params.email;
    const filter = { email: email }
    const result = await userCollection.findOne(filter);
    res.send(result);
});


// Create a new user 
router.post("/users", async (req, res) => {
    const user = req.body;
    const query = { email: user.email }
    const existingUser = await userCollection.findOne(query);
    if (existingUser) {
        return res.send({ message: "User already Exist", insertedId: null })
    }
    const result = await userCollection.insertOne(user);
    res.send(result);
});


// Update user Student Data With Id  when Enroll Course 
router.put("/users/enroll/:id", verifyToken, async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const filter = { _id: id };
    const updateDoc = {
        $push: {
            enrolledCourseId: user.enrolledCourseId,
            studentTotalPayment: user.studentTotalPayment
        }
    };

    const result = await userCollection.updateOne(filter, updateDoc);
    res.send(result);
});
// Update Teacher Students Data With Id  when Enroll Course 
router.put("/users/teacher/:id", verifyToken, async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const filter = { _id: id };
    console.log(id, filter);
    const updateDoc = {
        $inc: {
            students: user.student
        }
    };

    const result = await userCollection.updateOne(filter, updateDoc);
    res.send(result);
});


// Delete user user By Id 
router.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id }
    const result = await userCollection.deleteOne(filter);
    res.send(result);
});


module.exports = router