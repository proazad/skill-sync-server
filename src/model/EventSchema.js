const { model, Schema } = require("mongoose");
const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
    
});



const eventsCollection= model("events",EventSchema)
module.exports = eventsCollection;