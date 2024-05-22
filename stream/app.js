require("dotenv").config()
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
const {getVideo} = require(process.env.DB_PATH)
app.use(cors())
app.use(express.json())

app.get('/stream', async (req, res) => {
    console.log(req.query.title)
    const filePathObject = await getVideo(req.query.title)
    const filePath = filePathObject.filePath
    console.log(filePath)
    if (filePath == undefined) {
        return res.status(404).json({message:'could not find video'})
    }
    const stat = fs.statSync(filePath)
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-')
        const start = parseInt(parts[0], 10)
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1

        const chunkSize = end - start + 1
        const file = fs.createReadStream(filePath, {start, end})
        const head = {
            'Content-Range': `bytes ${start} - ${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4'
        }
        res.writeHead(206, head)
        file.pipe(res)
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        }
        res.writeHead(200, head)
        fs.createReadStream(filePath).pipe(res)
    }
})

app.listen(3003)    