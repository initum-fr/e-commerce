const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
let p = process.env;

const User = require("../models/user");

exports.register = (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hash,
  });
  user
    .save()
    .then(() => res.status(201).json({ message: "User created!" }))
    .catch(() => res.status(500).json({ message: "User not created!" }));
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json({
          userId: user._id,
          token: jwt.sign({ userId: user._id }, p.JWT_SECRET, {
            expiresIn: "1h",
          }),
          firstname : user.firstname,
          lastname : user.lastname,
          email : user.email,
          role: user.admin ? "admin" : "user",
        });
      } else {
        res.status(401).json({ message: "Authentication failded!" });
      }
    })
    .catch((error) =>
      res.status(500).json({ error, message: "Authentication failded!" }),
    );
};

exports.verify = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, p.JWT_SECRET);
    User.findOne({ _id: decodedToken.userId })
      .then((user) => {
        if (user) {
          res.status(200).json({ role: user.admin ? "admin" : "user" });
        } else {
          res.status(404).json({ message: "User not found!" });
        }
      })
      .catch((error) =>
        res.status(500).json({ error, message: "User not found!" }),
      );
  } catch (error) {
    res.status(401).json({ error, message: "Invalid token!" });
  }
};
