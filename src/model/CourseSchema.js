const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CourseSchema = new Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
    },
    date: {
        type: Date,
    },
    lesson: {
        type: Number,
    },
    duration: {
        type: Number,
    },
    ratings: {
        type: Number,
    },
    enrolled: {
        type: Number,
    },
    label: {
        type: String,
    },
    description: {
        type: String,
    },
    mentor: {
        type: String,
    },
    mentorId: {
        type: String,
    },
    mentorimage: {
        type: String,
    },
    email: {
        type: String,
    },
    isApproved:{
        type:Boolean
    }
   
});

const courseCollection = model("courses", CourseSchema);
module.exports = courseCollection;
