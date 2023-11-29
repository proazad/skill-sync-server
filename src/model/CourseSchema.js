const { model, Schema } = require("mongoose");

const CourseSchema = new Schema({
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
        type: Number,
        required: true
    },
    ratings: {
        type: Number, 
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
});



const courseCollection= model("courses",CourseSchema)
module.exports = courseCollection;