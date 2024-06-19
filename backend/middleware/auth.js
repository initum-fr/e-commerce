const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
let p = process.env;

const User = require("../models/user");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, p.JWT_SECRET);
    const userId = decodedToken.userId;
    User.findOne({ _id: userId })
      .then((user) => {
        if (user._id == req.params.id || user.admin == true) {
          next();
        } else {
          res
            .status(401)
            .json({ error: "You are not authorized to access this resource!" });
        }
      })
      .catch(() =>
        res.status(401).json({ error: "You need to be authenticated!" }),
      );
  } catch {
    res.status(401).json({ error: "You need to be authenticated!" });
  }
};

module.exports = auth;
