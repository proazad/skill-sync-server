const mongoose = require('mongoose');
const CourseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    lesson: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    ratings: {
        type: String,
    },
    enrolled: {
        type: Number,
    },
    label: {
        type: String,
        required: true,
    },
    description: {

        type: String,
        required: true
    },
    mentor: {
        type: String,
        required: true
    },
    mentorId: {
        type: String,
        required: true
    },
    mentorimage: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }

})

module.exports = CourseSchema;