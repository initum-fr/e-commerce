const Category = require("../models/category");
const Product = require("../models/product");

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((error) =>
      res.status(400).json({ error, message: "Products not found!" }),
    );
};

exports.getOneProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => res.status(200).json(product))
    .catch((error) =>
      res.status(404).json({ error, message: "Product not found!" }),
    );
};

exports.createProduct = (req, res, next) => {
  delete req.body._id;
  let _price = parseFloat(req.body.price);
  Category.findOne({ _id: req.body.category })
    .then((category) => {
      if (!category) {
        res.status(400).json({ message: "Category not found!" });
      } else {
        const product = new Product({
          ...req.body,
          price: _price.toFixed(2),
        });
        product
          .save()
          .then(() => res.status(201).json({ message: "Product created!" }))
          .catch((error) =>
            res.status(400).json({ error, message: "Product not created!" }),
          );
      }
    })
    .catch((error) => {
      res.status(400).json({ error, message: "Category not found!" });
    });
};

exports.updateProduct = (req, res, next) => {
  req.body.category &&
    Category.findOne({ _id: req.body.category })
      .then((response) => {
        if (!response) {
          res.status(400).json({ message: "Category not found!" });
        }
      })
      .catch((error) => {
        res.status(400).json({ error, message: "Category not found!" });
      });
  Product.findOne({ _id: req.params.id })
    .then((product) => {
      if (product) {
        if (req.body.price) {
          req.body.price = parseFloat(req.body.price).toFixed(2);
        }
        Product.updateOne({ _id: req.params.id }, { ...req.body })
          .then(() => res.status(200).json({ message: "Product updated!" }))
          .catch((error) =>
            res.status(400).json({ error, message: "Product not updated!" }),
          );
      } else {
        res.status(400).json({ message: "Product not found!" });
      }
    })
    .catch((error) =>
      res.status(400).json({ error, message: "Product not found!" }),
    );
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Product deleted!" }))
    .catch((error) =>
      res.status(400).json({ error, message: "Product not deleted!" }),
    );
};
