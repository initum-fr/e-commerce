const db = require('../config/db')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: '../config/.env' })
let p = process.env

exports.admin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, p.JWT_SECRET);
        const email = decodedToken.email;
        db.query('SELECT role FROM users WHERE email = ?', [email], (err, result) => {
            if (err) {
                return res.status(500).json({ "error": { code: err.code, message: err.sqlMessage } })
            }
            if (result.length == 0) {
                return res.status(401).json({ message: 'Authentication failed' })
            } else if (result[0].role == 'admin') {
                next();
            } else {
                return res.status(401).json({ message: 'Authentication failed' })
            }
        })
    } catch (e) {
        res.status(403).json({ message: 'Authentication failed' })
    }
}

exports.currentUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, p.JWT_SECRET);
        const userId = decodedToken.userId;
        console.log(userId);
        db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
            if (err) {
                return res.status(500).json({ "error": { code: err.code, message: err.sqlMessage } })
            } else if (result.length == 0) {
                return res.status(401).json({ message: 'Authentication failed' })
            } else if (req.params.id == userId || result[0].role == 'admin') {
                next();
            } else {
                return res.status(401).json({ message: 'Authentication failed' })
            }
        })
    } catch (e) {
        res.status(403).json({ message: 'Authentication failed' })
    }
}