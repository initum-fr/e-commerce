// import mysql
const mysql = require('mysql')
const dotenv = require('dotenv')

// load environment variables
dotenv.config({ path: __dirname + '\\.env' })
let p = process.env

// create a connection to the database
const db = mysql.createConnection({
    // mysql infos
    host: p.MYSQL_HOST,
    port: p.MYSQL_PORT,
    user: p.MYSQL_USER,
    password: p.MYSQL_PASSWORD,

    // database infos
    database: p.DB_NAME,
})

try {
    db.connect((err) => err ? console.error(`${err.code}: ${err.sqlMessage}`) : console.log(`Connected to database successfully!`))
} catch (error) {
    console.error('Database connection failed:', error)
}

module.exports = db