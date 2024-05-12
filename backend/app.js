// import express
const express = require('express');

// create an express app
const app = express();

// // import database connection
// const { db } = require('./config/db');

// Middleware which intercept JSON data
app.use(express.json());

// import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

// simple middleware
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
})

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// export the express app
module.exports = app;