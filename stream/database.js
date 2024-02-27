const mysql = require('mysql2')

// const db = 'localhost'
const db = 'db'

const pool = mysql.createPool({
    host: db,
    user: 'root',
    password: 'password',
    database: 'video_streaming_app'
}).promise();

const getVideo = async (title) => {
    const [rows] = await pool.query(`
    SELECT filePath FROM videos WHERE title = ?`, [title])
    return rows[0]
}

module.exports = {
    getVideo
}