const Category = require("../models/category");

exports.createCategory = (req, res) => {
  const category = new Category({
    name: req.body.name,
  });
  category
    .save()
    .then(() => res.status(201).json({ message: "Category created!" }))
    .catch((error) =>
      res.status(400).json({ error, message: "Category not created!" }),
    );
};

exports.getAllCategories = (req, res) => {
  Category.find()
    .then((categories) => res.status(200).json(categories))
    .catch((error) =>
      res.status(400).json({ error, message: "Categories not found!" }),
    );
};

exports.getOneCategory = (req, res) => {
  Category.findOne({ _id: req.params.id })
    .then((category) => res.status(200).json(category))
    .catch((error) =>
      res.status(404).json({ error, message: "Category not found!" }),
    );
};

exports.updateCategory = (req, res) => {
  Category.findOne({ _id: req.params.id })
    .then((category) => {
      if (category) {
        Category.updateOne({ _id: req.params.id }, { ...req.body })
          .then(() => res.status(200).json({ message: "Category updated!" }))
          .catch((error) =>
            res.status(400).json({ error, message: "Category not updated!" }),
          );
      } else {
        res.status(400).json({ message: "Category not found!" });
      }
    })
    .catch((error) =>
      res.status(400).json({ error, message: "Category not found!" }),
    );
};

exports.deleteCategory = (req, res) => {
  Category.findOne({ _id: req.params.id })
    .then((category) => {
      if (category) {
        Category.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Category deleted!" }))
          .catch((error) =>
            res.status(400).json({ error, message: "Category not deleted!" }),
          );
      } else {
        res.status(400).json({ message: "Category not found!" });
      }
    })
    .catch((error) =>
      res.status(400).json({ error, message: "Category not found!" }),
    );
};
