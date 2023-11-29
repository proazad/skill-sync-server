const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h7gpv70.mongodb.net/?retryWrites=true&w=majority`;
const connectDB = async () => {
    console.log("Connecting to database..")
    await mongoose.connect(uri, { dbName: "SkillSync" })
    console.log("Connected to database")
}
module.exports = connectDB;