const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middle Ware 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h7gpv70.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        const courseCollection = client.db("SkillSync").collection("courses");
        const userCollection = client.db("SkillSync").collection("users");
        const feedbackCollection = client.db("SkillSync").collection("feedback");
        const partnersCollection = client.db("SkillSync").collection("partners");
        const mentorsCollection = client.db("SkillSync").collection("mentors");
        const eventsCollection = client.db("SkillSync").collection("events");




        /**
         * Cousres Related All API Start here 
         *  Get All Courses API 
         * */
        app.get("/courses", async (req, res) => {
            const result = await courseCollection.find().toArray();
            res.send(result);
        });

        //Get single Course by ID
        app.get("/courses/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const result = await courseCollection.findOne(filter);
            res.send(result);
        });
        //Post Single Post 
        app.post("/courses", async (req, res) => {
            const course = req.body;
            const result = await courseCollection.insertOne(course);
            res.send(result);
        });

        // Update Single Course By Id 
        app.put("/courses/:id", async (req, res) => {
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
        app.delete("/courses/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const result = await courseCollection.deleteOneOne(filter);
            res.send(result);
        });

        /**
         * Student Related All API Start Here 
         * Get All Student
         */
        app.get("/users", async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        });


        // Get All Student By Id 
        app.get("/users/role/student", async (req, res) => {
            const filter = { role: "student" }
            const result = await userCollection.find(filter).toArray();
            res.send(result);
        });
        app.get("/users/role/student/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const result = await userCollection.findOne(filter);
            res.send(result);
        });

        // Get user User By Id 
        app.get("/users/:email", async (req, res) => {
            const email = req.params.email;
            const filter = { email: email }
            const result = await userCollection.findOne(filter);
            res.send(result);
        });

        // Create user Student API 
        app.post("/users", async (req, res) => {
            const user = req.body;
            const query = { email: student.email }
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: "User already Exist", insertedId: null })
            }
            const result = await userCollection.insertOne(user);
            res.send(result);
        });


        // Update user Student Data With Id 
        app.put("/users/:id", async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    name: user.name,
                    image: user.image,
                    enrolledCourseId: user.enrolledCourseId,
                    completedCourseId: user.completedCourseId,
                    fathersName: user.fathersName,
                    mothersName: user.mothersName,
                    email: user.email,
                    phoneNumber: user.phoneNumber
                }
            }
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        // Delete user user By Id 
        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const result = await userCollection.deleteOne(filter);
            res.send(result);
        });



        /**
         * Review / Feedback API
         * Get All Feedback API
         */

        app.get("/feedback", async (req, res) => {
            const result = await feedbackCollection.find().toArray();
            res.send(result);
        });

        /**
         * Get Single Feedback API 
         */
        app.get("/feedback/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await feedbackCollection.findOne(filter);
            res.send(result);
        });



        /**
         * Get Partner Related API
         * Get All Partners API
         */

        app.get("/partners", async (req, res) => {
            const result = await partnersCollection.find().toArray();
            res.send(result);
        });


        /**
         * Upcoming Events Related API
         * Get all Events
         */
        app.get("/events", async (req, res) => {
            const result = await eventsCollection.find().toArray();
            res.send(result)
        });


        /**
         * Get Single Events by Id 
         */
        app.get("/events/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await eventsCollection.findOne(filter);
            res.send(result)
        });

        /**
         * Add Post Single Events 
         */
        app.post("/events", async (req, res) => {
            const event = req.body;
            const result = await eventsCollection.insertOne(event);
            res.send(result)
        });





        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("SkillSync Server is Running");
})
app.listen(port, () => {
    console.log("SkillSync is Running on Port ", port);
})