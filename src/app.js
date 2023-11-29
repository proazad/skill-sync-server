const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
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
        const eventsCollection = client.db("SkillSync").collection("events");

        /**
         *  JWT Related API 
         */

        app.post("/jwt", async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_JWT_TOKEN_SECRET, { expiresIn: "1h" });
            res.send({ token });
        })

        /** Middle Ware */
        const verifyToken = async (req, res, next) => {
            if (!req.headers.authorization) {
                return res.status(401).send({ message: "Unauthorized Access" });
            }
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_JWT_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: "Unauthorized Access" });
                }
                req.decoded = decoded;
                next();
            })

        }

        /** 
         * verifyAdmin
         */
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            const isAdmin = user?.role === 'admin';
            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            next();
        }
        /** 
         * verifyInstructor
         */
        const verifyInstructor = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            const isAdmin = user?.role === 'instructor';
            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            next();
        }

        /**
         * Cousres Related All API Start here 
         *  Get All  Course  User Email API 
         * */
        app.get("/courses/:email", verifyToken, verifyInstructor, async (req, res) => {
            const query = { email: req.params.email }
            const result = await courseCollection.find(query).toArray();
            res.send(result);
        });
        /**
         *  Get All Courses API 
         * */
        app.get("/courses", async (req, res) => {
            const result = await courseCollection.find().toArray();
            res.send(result);
        });



        //Get single Course by ID
        app.get("/courses/:id", async (req, res) => {
            console.log(req.params.id);
        });

        // Update Single Course By Id 
        app.put("/courses/update/:id", verifyToken, verifyInstructor, async (req, res) => {
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
        // Approve Course  
        app.put("/courses/approve/:id", verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    isApproved: true,
                    isreject: false

                }
            }
            const result = await courseCollection.updateOne(filter, updateDoc);
            res.send(result)
        });

        // Cancel Course  
        app.put("/courses/cancel/:id", verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    isreject: true
                }
            }
            const result = await courseCollection.updateOne(filter, updateDoc);
            res.send(result);
        });


        //Post Single Post 
        app.post("/courses", verifyToken, verifyInstructor, async (req, res) => {
            const course = req.body;
            const result = await courseCollection.insertOne(course);
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
         * User Related All API Start Here 
         * Get All User
         */
        app.get("/users", async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        });



        // Get Single Student By id
        app.get("/users/role/student/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const result = await userCollection.findOne(filter);
            res.send(result);
        });







        //Request For Instructor 
        app.put("/users/instructor/request/:email", verifyToken, async (req, res) => {
            const email = req.params.email;
            const instructor = req.body;
            const filter = { email: email }
            const updateDoc = {
                $set: {
                    label: instructor.label,
                    expertise: instructor.expertise,
                    name: instructor.name,
                    IswantInstructor: instructor.IswantInstructor
                }
            }
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        // Make Instructor 
        app.put("/users/instructor/:id", verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    IswantInstructor: false,
                    role: "instructor",
                    requestReject: false,
                }
            }
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        // Make Instructor  Reject 
        app.put("/users/instructor/requestreject/:id", verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    requestReject: true,
                }
            }
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        });


        // Get User By Email
        app.get("/users/:email", async (req, res) => {
            const email = req.params.email;
            const filter = { email: email }
            const result = await userCollection.findOne(filter);
            res.send(result);
        });

        // Create user API 
        app.post("/users", async (req, res) => {
            const user = req.body;
            const query = { email: user.email }
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