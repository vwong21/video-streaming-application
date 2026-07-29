require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const { getVideo, searchVideos } = require(process.env.DB_PATH);
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const jwtAuth = require("./jwtAuth");
const { getVideosByUsername } = require("./database");

const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

app.use(cors());
app.use(express.json());

app.get("/stream", async (req, res) => {
    console.log(req.query.id);
    const filePathObject = await getVideo(req.query.id);
    console.log(filePathObject);
    const videoPath = filePathObject.videoPath;

    if (videoPath == undefined) {
        return res.status(404).json({ message: "could not find video" });
    }

    try {
        const videoUrl = await getSignedUrl(
            client,
            new GetObjectCommand({
                Bucket: process.env.AWS_VIDEO_BUCKET,
                Key: videoPath,
            }),
            { expiresIn: 3600 },
        );

        res.status(200).json({ url: videoUrl });
    } catch (err) {
        res.status(500).json({
            message: "failed to get video url",
            error: err.message,
        });
    }
});
app.get("/search", async (req, res) => {
    const searchQuery = req.query.search;
    console.log("Searching for:", searchQuery);
    if (!searchQuery)
        return res.status(400).json({ message: "no search query provided" });
    const stopWords = new Set([
        // articles
        "a",
        "an",
        "the",
        // prepositions
        "in",
        "on",
        "at",
        "to",
        "for",
        "of",
        "with",
        "by",
        "from",
        "into",
        "about",
        "above",
        "below",
        "between",
        "through",
        // conjunctions
        "and",
        "or",
        "but",
        "nor",
        "so",
        "yet",
        "both",
        "either",
        "neither",
        // pronouns
        "i",
        "me",
        "my",
        "we",
        "our",
        "you",
        "your",
        "he",
        "she",
        "it",
        "they",
        "them",
        "his",
        "her",
        "its",
        "their",
        // verbs
        "is",
        "are",
        "was",
        "were",
        "be",
        "been",
        "being",
        "have",
        "has",
        "had",
        "do",
        "does",
        "did",
        "will",
        "would",
        "can",
        "could",
        "should",
        "may",
        "might",
        // common filler
        "this",
        "that",
        "these",
        "those",
        "what",
        "which",
        "who",
        "how",
        "when",
        "where",
        "why",
        "all",
        "any",
        "some",
        "no",
        "not",
        "more",
        "most",
        "other",
        "such",
        "than",
        "then",
        "just",
        "also",
        "very",
        "too",
        // video-search specific
        "show",
        "watch",
        "find",
        "get",
        "give",
        "want",
        "looking",
        "something",
        "like",
        "good",
        "best",
        "new",
        "top",
        "full",
        "video",
        "videos",
        "movie",
        "movies",
        "episode",
        "series",
    ]);

    const keywords = searchQuery
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .split(/\s+/)
        .filter((word) => word.length > 2 && !stopWords.has(word));

    try {
        console.log("Searching database...");
        const results = await searchVideos(keywords);
        console.log("Found Results...");
        const resultsWithThumbnails = [];
        for (const video of results) {
            const thumbnailUrl = await getSignedUrl(
                client,
                new GetObjectCommand({
                    Bucket: process.env.AWS_THUMBNAIL_BUCKET,
                    Key: video.thumbnailPath,
                }),
                { expiresIn: 3600 },
            );

            resultsWithThumbnails.push({ ...video, thumbnailUrl });
        }
        console.log(resultsWithThumbnails);
        res.status(200).json(resultsWithThumbnails);
    } catch (err) {
        res.status(500).json({ message: "search failed", error: err.message });
    }
});

app.get("/videos", jwtAuth, async (req, res) => {
    const user = req.user.username;
    const videos = await getVideosByUsername(user);
    console.log(videos);
    res.status(200).json({ videos: videos });
});

app.listen(3003);
