const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;
const connectDB = require("./db/connectDB");
const applyMiddleware = require("./middleware/applyMiddleware");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const courseHandler = require("../src/router/courseHandler");
const useHandler = require("./router/userHandler");
const partnerHandler = require("./router/partnerHandler");
const eventHandler = require("./router/eventHandler");
const feedbackHandler = require("./router/feedbackHandler");
applyMiddleware(app);
app.use(courseHandler);
app.use(useHandler);
app.use(partnerHandler);
app.use(eventHandler);
app.use(feedbackHandler);



const main = async () => {
    await connectDB();

    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
}
main();


