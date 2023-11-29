const { model, Schema } = require("mongoose");
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    fathersName: {
        type: String,
    },
    mothersName: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    role: {
        type: String,
    },
    enrolledCourseId: {
        type: Number,
    },
    completedCourseId: {
        type: Number,
    },
    students: {
        type: Number,
    },
    IswantInstructor: {
        type: Boolean,
    },
    requestReject: {
        type: Boolean,
    },
    expertise: {
        type: String,
    },
    socialmedia: {
        type: String,
    },


});



const userCollection = model("users", UserSchema)
module.exports = userCollection;