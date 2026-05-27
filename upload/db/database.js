require("dotenv").config({ override: true });

const mysql = require("mysql2");
console.log({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const pool = mysql
    .createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    })
    .promise();

const getVideo = async (id) => {
    const [rows] = await pool.query(
        `
    SELECT * FROM videos WHERE id = ?
    `,
        [id],
    );
    return rows[0];
};

const createVideo = async (
    title,
    description,
    videoPath,
    thumbnailPath,
    username,
) => {
    const [result] = await pool.query(
        `
    INSERT INTO videos (title, description, videoPath, thumbnailPath, username) VALUES (?, ?, ?, ?, ?)`,
        [title, description, videoPath, thumbnailPath, username],
    );
    const id = result.insertId;
    return getVideo(id);
};

module.exports = {
    getVideo,
    createVideo,
};
