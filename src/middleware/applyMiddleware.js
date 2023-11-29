const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const applyMiddleware = (app) => {
    app.use(cors({
        // origin: ["https://skillsync-hub.web.app", "https://skillsync-hub.surge.sh"],
        origin: ["http://localhost:5173"],
        credentials: true,
    })
    );
    app.use(express.json());
    app.use(cookieParser());
    
    app.post("/jwt", async (req, res) => {
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_JWT_TOKEN_SECRET, { expiresIn: "1h" });
        res.send({ token });
    });
};

module.exports = applyMiddleware;