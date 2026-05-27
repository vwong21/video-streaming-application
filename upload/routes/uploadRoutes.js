require("dotenv").config({ path: "/app/.env" });
const express = require("express");
const multer = require("multer");
const jwtAuth = require("../middleware/jwtAuth");
const router = express.Router();
const videosPath = process.env.VIDEOS_PATH;
const thumbnailsPath = process.env.THUMBNAILS_PATH;
const { getVideo, createVideo } = require(process.env.DB_PATH);
const ffmpeg = require("ffmpeg");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, videosPath);
    },
    filename: function (req, file, cb) {
        console.log(req.body, req.body.title);
        cb(null, `${req.body.title}.mp4`);
    },
});
const upload = multer({ storage });

const createThumbnail = async (videosPath) => {
    try {
        const process = await ffmpeg(videosPath);
        const filename = new uuidv4();

        const thumbnails = process.fnExtractFrameToJPG(thumbnailsPath, {
            number: 1,
            start_time: 1,
            size: "320x180",
            filename: filename,
        });
        console.log(thumbnails);
        return path.basename(thumbnails[0]);
    } catch (error) {
        throw new Error("Unable to create thumbnail");
    }
};

router.post("/", upload.single("video"), jwtAuth, async (req, res) => {
    if (!req.file) {
        return res
            .status(400)
            .json({ error: "No file uploaded or an error occurred" });
    }
    const title = req.body.title;
    const description = req.body.description;
    const videoPath = `${videosPath}${req.body.title}.mp4`;
    const username = req.body.username;
    const thumbnail = await createThumbnail(filePath);
    const video = await createVideo(
        title,
        description,
        videoPath,
        thumbnail,
        username,
    );
    res.status(201).json({
        success: true,
        file: req.file,
        title: req.body.title,
    });
});
module.exports = router;
