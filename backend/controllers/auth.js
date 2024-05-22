const db = require('../config/db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: '../config/.env' })
let p = process.env

exports.register = (req, res) => {
    // Hash the password
    req.body.password ? hashedPassword = bcrypt.hashSync(req.body.password, 10) : res.status(400).json({ message: 'Invalid password!' })
    var sql = `INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)`
    db.query(sql, [req.body.firstname, req.body.lastname, req.body.email, hashedPassword], (err) => {
        if (err) {
            switch (err.code) {
                case 'ER_BAD_NULL_ERROR':
                    return res.status(400).json({ message: 'All fields are required!' })
                case 'ER_DUP_ENTRY':
                    return res.status(409).json({ message: 'User already exists!' })
                default:
                    return res.status(500).json({ "error": { code: err.code, message: err.sqlMessage } })
            }
        } else {
            res.status(201).json({ message: 'User created!' })
        }
    })
}

exports.login = (req, res) => {
    var sql = `SELECT * FROM users WHERE email = ?`
    if (req.body.email == undefined || req.body.password == undefined) {
        return res.status(400).json({ message: 'All fields are required!' })
    }
    db.query(sql, req.body.email, (err, result) => {
        if (err) {
            return res.status(500).json({ "error": { code: err.code, message: err.sqlMessage } })
        }
        if (result.length == 0) {
            return res.status(401).json({ message: 'Auth failed' })
        }
        if (bcrypt.compareSync(req.body.password, result[0].password)) {
            const token = jwt.sign({
                email: result[0].email, userId: result[0].id
            }, p.JWT_SECRET, { expiresIn: '1h' })
            return res.status(200).json({ message: 'Auth successful', token: token, userId: result[0].id, role: result[0].role })
        }
        return res.status(401).json({ message: 'Auth failed' })
    })
}
