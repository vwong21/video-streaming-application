const express = require('express')
const multer = require('multer')

const router = express.Router()
const videosPath = '../videos/'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, videosPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage })
router.post('/', upload.single('video'), (req, res) => {
    console.log(req)
    res.status(201).json(req.file)
})

router.get('/', (req, res) => {
    res.status(201).json({message: "success"})
})

module.exports = router