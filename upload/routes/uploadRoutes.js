const express = require('express')
const multer = require('multer')
const router = express.Router()
// const videosPath = '..//videos/'
const videosPath = '/app/videos/'
const { getVideo, createVideo } = require('../db/database')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, videosPath)
    },
    filename: function (req, file, cb) {
        console.log(req.body, req.body.title)
        cb(null, `${req.body.title}.mp4`)
    },
})
const upload = multer({ storage })

router.post('/', upload.single('video'), async (req, res) => {
    // Check if multer encountered an error during file upload
    if (!req.file) {
        // No file was provided or something went wrong during upload
        return res.status(400).json({ error: 'No file uploaded or an error occurred' });
    }
    const title = req.body.title
    const filePath = `${videosPath}${req.body.title}.mp4`
    console.log(filePath)
    const video = await createVideo(title, filePath)
    res.status(201).json({ success: true, file: req.file, title: req.body.title })
})
module.exports = router