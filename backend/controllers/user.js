const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.getAllUsers = (req, res) => {
    var sql = `SELECT id, firstname, lastname, email, created_at, updated_at FROM users`
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ "error": { code: err.code, message: err.sqlMessage } })
        }
        res.status(200).json(result)
    })
}

exports.getOneUser = (req, res) => {
    var sql = `SELECT id, firstname, lastname, email, created_at, updated_at FROM users WHERE id = ?`
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ "error": { code: err.code, message: err.sqlMessage } })
        }
        if (result.length == 0) {
            return res.status(404).json({ message: 'User not found!' })
        }
        res.status(200).json(result[0])
    })
}

exports.updateUser = (req, res) => {
    if (req.body.password != undefined) {
        hashedPassword = bcrypt.hashSync(req.body.password, 10)
        var sql = `UPDATE users SET firstname = ?, lastname = ?, email = ?, password = '${hashedPassword}' WHERE id = ?`

    } else {
        var sql = `UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE id = ?`
    }
    const values = [req.body.firstname, req.body.lastname, req.body.email, req.params.id]
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ "error": { code: err.code, message: err.sqlMessage } })
        }
        res.status(200).json({ message: 'User updated!' })
    })
}

exports.deleteUser = (req, res) => {
    var sql = `SELECT * FROM users WHERE id = ?`
    db.query(sql, [req.params.id], (err, result) => {
        if (result.length > 0) {
            var sql = `DELETE FROM users WHERE id = ?`
            db.query(sql, [req.params.id], (err) => {
                if (err) {
                    return res.status(500).json({ "error": { code: err.code, message: err.sqlMessage } })
                }
                return res.status(200).json({ message: 'User deleted!' })
            })
        } else {
            return res.status(404).json({ message: 'User not found!' })
        }
    })
}