// require("dotenv").config({ path: "/app/.env" });
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const jwtAuth = require("../middleware/jwtAuth");
const router = express.Router();
const { getVideo, createVideo } = require(process.env.DB_PATH);
const { execFile } = require("child_process");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const os = require("os");
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const BUCKET = process.env.AWS_S3_UPLOAD_ACCESS_POINT;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, os.tmpdir());
    },
    filename: function (req, file, cb) {
        cb(null, `${uuidv4()}.mp4`);
    },
});
const upload = multer({ storage });

const createThumbnail = (videoPath) => {
    return new Promise((resolve, reject) => {
        const outputPath = path.join(os.tmpdir(), `${uuidv4()}.jpg`);
        execFile(
            "ffmpeg",
            [
                "-i",
                videoPath,
                "-ss",
                "00:00:02",
                "-vframes",
                "1",
                "-vf",
                "scale=320:180",
                outputPath,
            ],
            (error) => {
                if (error) return reject(error);
                resolve(outputPath);
            },
        );
    });
};

const uploadToS3 = async (localPath, key, contentType) => {
    const fileStream = fs.createReadStream(localPath);
    await s3.send(
        new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: fileStream,
            ContentType: contentType,
        }),
    );
    return key;
};

router.post("/", jwtAuth, upload.single("video"), async (req, res) => {
    if (!req.file) {
        return res
            .status(400)
            .json({ error: "No file uploaded or an error occurred" });
    }

    const title = req.body.title;
    const description = req.body.description;
    const username = req.body.username;
    const tempVideoPath = req.file.path;
    let tempThumbnailPath;

    try {
        tempThumbnailPath = await createThumbnail(tempVideoPath);

        const videoId = uuidv4();
        const videoKey = `videos/${videoId}.mp4`;
        const thumbnailKey = `thumbnails/${videoId}.jpg`;

        await uploadToS3(tempVideoPath, videoKey, "video/mp4");
        await uploadToS3(tempThumbnailPath, thumbnailKey, "image/jpeg");

        const video = await createVideo(
            title,
            description,
            videoKey,
            thumbnailKey,
            username,
        );

        res.status(201).json({
            success: true,
            title,
            videoKey,
            thumbnailKey,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Upload failed" });
    } finally {
        fs.unlink(tempVideoPath, () => {});
        if (tempThumbnailPath) fs.unlink(tempThumbnailPath, () => {});
    }
});

module.exports = router;
