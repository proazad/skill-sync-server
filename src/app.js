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
        const studentCollection = client.db("SkillSync").collection("students");
        const feedbackCollection = client.db("SkillSync").collection("feedback");
        const partnersCollection = client.db("SkillSync").collection("partners");
        const mentorsCollection = client.db("SkillSync").collection("mentors");




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
        app.get("/students", async (req, res) => {
            const result = await studentCollection.find().toArray();
            res.send(result);
        });


        // Get Single Student By Id 
        app.get("/students/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const result = await studentCollection.findOne(filter);
            res.send(result);
        });

        // Update Single Student Data With Id 
        app.put("/students/:id", async (req, res) => {
            const id = req.params.id;
            const student = req.body;
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    name: student.name,
                    image: student.image,
                    enrolledCourseId: student.enrolledCourseId,
                    completedCourseId: student.completedCourseId,
                    fathersName: student.fathersName,
                    mothersName: student.mothersName,
                    email: student.email,
                    phoneNumber: student.phoneNumber
                }
            }
            const result = await studentCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        // Get Single Student By Id 
        app.delete("/students/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const result = await studentCollection.deleteOne(filter);
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
         * Instructors / Mentors Related API 
         * Get all Instructors/mentors 
         */
        app.get("/mentors", async (req, res) => {
            const result = await mentorsCollection.find().toArray();
            res.send(result);
        })
        /**
         * Get Single Mentors by ID
         */
        app.get("/mentors/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await mentorsCollection.findOne(filter);
            res.send(result);
        })







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