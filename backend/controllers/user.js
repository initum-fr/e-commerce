const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.createUser = (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hash,
    admin: req.body.admin,
  });
  user
    .save()
    .then(() => res.status(201).json({ message: "User created!" }))
    .catch((error) =>
      res.status(500).json({ error, message: "User not created!" }),
    );
};

exports.getAllUsers = (req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) =>
      res.status(400).json({ error, message: "Users not found!" }),
    );
};

exports.getOneUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => res.status(200).json(user))
    .catch((error) =>
      res.status(404).json({ error, message: "User not found!" }),
    );
};

exports.updateUser = (req, res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  User.updateOne({ _id: req.params.id }, { ...req.body })
    .then(() => res.status(200).json({ message: "User updated!" }))
    .catch((error) =>
      res.status(400).json({ error, message: "User not updated!" }),
    );
};

exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "User deleted!" }))
    .catch((error) =>
      res.status(400).json({ error, message: "User not deleted!" }),
    );
};
