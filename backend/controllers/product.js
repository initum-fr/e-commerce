const db = require('../config/db.js')

exports.createProduct = (req, res) => {
    if (req.body.name == undefined || req.body.description == undefined || req.body.price == undefined) {
        return res.status(400).json({ message: 'All fields are required!' })
    } else {
        var sql = `INSERT INTO products(name, description, price) VALUES ?`
        const values = [[req.body.name, req.body.description, req.body.price],]
        db.query(sql, [values], (err) => {
            if (err) {
                return res.status(500).json({ "error": { code: err.code, message: err.sqlMessage } })
            }
            res.status(201).json({ message: 'Product created!' })
        })
    }
}

exports.getAllProducts = (req, res) => {
    var sql = `SELECT * FROM products`
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ "error": { code: err.code, message: err.sqlMessage } })
        }
        res.status(200).json(result)
    })
}

exports.getOneProduct = (req, res) => {
    var sql = `SELECT * FROM products WHERE id = ?`
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ "error": { code: err.code, message: err.sqlMessage } })
        }
        if (result.length == 0) {
            return res.status(404).json({ message: 'Product not found!' })
        }
        res.status(200).json(result[0])
    })
}

exports.updateProduct = (req, res) => {
    var sql = `UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?`;
    const values = [req.body.name, req.body.price, req.body.description, req.params.id]
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ "error": { code: err.code, message: err.sqlMessage } })
        }
        res.status(200).json({ message: 'Product updated!' })
    })
}

exports.deleteProduct = (req, res) => {
    var sql = `SELECT * FROM products WHERE id = ?`
    db.query(sql, [req.params.id], (err, result) => {
        if (result.length > 0) {
            var sql = `DELETE FROM products WHERE id = ?`
            db.query(sql, [req.params.id], (err) => {
                if (err) {
                    return res.status(500).json({ "error": { code: err.code, message: err.sqlMessage } })
                }
                return res.status(200).json({ message: 'Product deleted!' })
            })
        } else {
            return res.status(404).json({ message: 'Product not found!' })
        }
    })
}