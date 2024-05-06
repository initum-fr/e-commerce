const db = require('../config/db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = (req, res) => {
    // Hash the password
    hashedPassword = bcrypt.hashSync(req.body.password, 10)
    var sql = `INSERT INTO users(name, email, password) VALUES ?`
    const values = [[req.body.name, req.body.email, hashedPassword],]
    db.query(sql, [values], (err) => {
        if (err) {
            return res.status(500).json({ "error": { code: err.code, message: err.sqlMessage } })
        }
        res.status(201).json({ message: 'User created!' })
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
                email: result[0].email,
            }, 'SECRET_KEY', { expiresIn: '48h' })
            return res.status(200).json({ token })
        }
        return res.status(401).json({ message: 'Auth failed' })
    })
}