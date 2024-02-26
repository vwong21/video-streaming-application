const express = require('express')
const multer = require('multer')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage })
router.post('/', upload.single('video'), (req, res) => {
    console.log(req)
    res.json(req.file)
})

router.get('/', (req, res) => {
    res.status(201).json({message: "success"})
})

module.exports = router