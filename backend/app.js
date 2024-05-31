// import express
const express = require("express");

// create an express app
const app = express();

// // import database connection
const { db } = require("./config/db");

// Middleware which intercept JSON data
app.use(express.json());

// cors middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");

// simple middleware
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/category", categoryRoutes);

// export the express app
module.exports = app;
