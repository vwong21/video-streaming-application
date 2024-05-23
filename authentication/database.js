require("dotenv").config()
const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise();

const getUser = async (username) => {
    const [rows] = await pool.query(`
    SELECT userPassword FROM users WHERE username = ?`, [username])
    return rows[0]
}

const createUser = async (username, firstName, lastName, password) => {
    const rows = await pool.query(`
    INSERT INTO users (username, firstName, lastName, userPassword) VALUES (?, ?, ?, ?)
    `, [username, firstName, lastName, password])
    return getUser(username)
}

module.exports = {
    getUser
}