const db = require('../config/db.js')

exports.createProduct = (req, res) => {
    if (req.body.name == undefined || req.body.description == undefined || req.body.price == undefined) {
        return res.status(400).json({ message: 'All fields are required!' })
    } else {
        var sql = `INSERT INTO products(name, description, price) VALUES ('${req.body.name}', '${req.body.description}', '${req.body.price}')`
        db.query(sql, (err) => {
            if (err) {
                return res.status(500).json({ "error": { code: err.code, message: err.sqlMessage } })
            }
            res.status(201).json({ message: 'Product created!' })
        })
    }
}