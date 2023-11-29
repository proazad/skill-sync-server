const { model, Schema } = require("mongoose");
const PartnerSchema = new Schema({
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



const partnersCollection= model("partners",PartnerSchema)
module.exports = partnersCollection;