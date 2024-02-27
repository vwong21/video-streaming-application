const mysql = require('mysql2')

// const db = 'localhost'
const db = 'db'

const pool = mysql.createPool({
    host: db,
    user: 'root',
    password: 'password',
    database: 'video_streaming_app'
}).promise();

const getVideo = async (id) => {
    const [rows] = await pool.query(`
    SELECT * FROM videos WHERE id = ?
    `, [id])
    return rows[0]
}

const createVideo = async (title, filePath) => {
    const [result] = await pool.query(`
    INSERT INTO videos (title, filePath) VALUES (?, ?)`, [title, filePath]);
    const id = result.insertId
    return getVideo(id)
}

module.exports = {
    getVideo,
    createVideo
};