const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: '../config/.env' })
let p = process.env

const User = require('../models/user')

exports.register = (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10)
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash
    })
    user.save()
        .then(() => res.status(201).json({ message: 'User created!' }))
        .catch(() => res.status(500).json({ message: 'User not created!' }))
}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        p.JWT_SECRET,
                        { expiresIn: '1h' }
                    ),
                    role: user.admin ? 'admin' : 'user'
                })
            } else {
                res.status(401).json({ error: 'Authentication failded!' })
            }
        })
        .catch(error => res.status(500).json({ error: 'Authentication failded!' }))
}
