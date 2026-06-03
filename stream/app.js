require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const { getVideo, searchVideos } = require(process.env.DB_PATH);
app.use(cors());
app.use(express.json());
app.use("/thumbnails", express.static(process.env.THUMBNAILS_PATH));

app.get("/stream", async (req, res) => {
    console.log(req.query.id);
    const filePathObject = await getVideo(req.query.id);
    console.log(filePathObject);
    const filePath = filePathObject.videoPath;
    console.log(filePath);
    if (filePath == undefined) {
        return res.status(404).json({ message: "could not find video" });
    }
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunkSize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });
        const head = {
            "Content-Range": `bytes ${start} - ${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "video/mp4",
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
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
        console.log("Found Results:", results);
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "search failed", error: err.message });
    }
});

app.listen(3003);
