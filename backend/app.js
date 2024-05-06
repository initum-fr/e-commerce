// import express
const express = require('express');

// create an express app
const app = express();

// import database connection
const { db } = require('./config/db');

// Middleware which intercept JSON data
app.use(express.json());

// simple middleware
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
})

// export the express app
module.exports = app;