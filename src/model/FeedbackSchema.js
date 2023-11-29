const { model, Schema } = require("mongoose");
const FeedbackSchema = new Schema({
    coursetitle: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    feedback: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        required: true
    },

});



const feedbackCollection = model("feedback", FeedbackSchema)
module.exports = feedbackCollection;