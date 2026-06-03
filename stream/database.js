require("dotenv").config({ override: true });
const mysql = require("mysql2");

const pool = mysql
    .createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    })
    .promise();

const getVideo = async (title) => {
    const [rows] = await pool.query(
        `
    SELECT videoPath FROM videos WHERE title = ?`,
        [title],
    );
    return rows[0];
};

const searchVideos = async (keywords) => {
    if (keywords.length === 0) {
        const [rows] = await pool.query("SELECT * FROM videos");
        return rows;
    }

    const conditions = keywords
        .map(() => "(title LIKE ? OR description LIKE ?)")
        .join(" OR ");

    const values = keywords.flatMap((word) => [`%${word}%`, `%${word}%`]);

    const [rows] = await pool.query(
        `SELECT * FROM videos WHERE ${conditions}`,
        values,
    );
    return rows;
};

module.exports = {
    getVideo,
    searchVideos,
};
