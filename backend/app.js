// import express
const express = require('express');

// create an express app
const app = express();

// Middleware which intercept JSON data
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();
let p = process.env;

const mongoose = require('mongoose');

app.use((req, res, next) => {
  mongoose
    .connect(
      `mongodb+srv://${p.MONGODB_USER}:${p.MONGODB_PASSWORD}@${p.MONGODB_HOST}/?retryWrites=true&w=majority&appName=${p.MONGODB_APPNAME}`
    )
    .then(() => {
      console.log('Connected to database!');
      next();
    })
    .catch((error) => {
      console.log('Connection failed!', error);
      res.status(500).json({ message: 'Connection failed!' });
    });
});

// cors middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');

// simple middleware
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/category', categoryRoutes);

// export the express app
module.exports = app;
