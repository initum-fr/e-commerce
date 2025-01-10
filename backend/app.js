// import express
const express = require('express');
const path = require('path');

// create an express app
const app = express();

// Middleware which intercept JSON data
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();
let p = process.env;

// import mongoose
const mongoose = require('mongoose');

var connected = false;
var error = null;

mongoose
  .connect(
    `mongodb+srv://${p.MONGODB_USER}:${p.MONGODB_PASSWORD}@${p.MONGODB_HOST}/?retryWrites=true&w=majority&appName=${p.MONGODB_APPNAME}`
  )
  .then(() => {
    console.log('Connected to MongoDB!');
    connected = true;
  })
  .catch((error) => {
    console.log('Connection failed!', error);
    error = error;
  });

// cors middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const imageRoutes = require('./routes/image');

// simple middleware
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!', connected, error });
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/category', categoryRoutes);
app.use('/images', imageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// export the express app
module.exports = app;
