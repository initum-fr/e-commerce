const db = require('../config/db.js')
const bcrypt = require('bcrypt')

exports.createUser = (req, res) => {
    // Hash the password
    hashedPassword = bcrypt.hashSync(req.body.password, 10)
    var sql = `INSERT INTO users(name, email, password, role) VALUES ('${req.body.name}', '${req.body.email}', '${hashedPassword}', '${req.body.role}')`
    db.query(sql, (err) => {
        if (err) {
            return res.status(500).json({ "error": { code: err.code, message: err.sqlMessage } })
        }
        res.status(201).json({ message: 'User created!' })
    })
}