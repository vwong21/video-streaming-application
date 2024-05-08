require("dotenv").config()
const express = require('express')
const cors = require('cors')
const app = express()
const {getVideo} = require(process.env.DB_PATH)
app.use(cors())
app.use(express.json())

app.get('/stream', async (req, res) => {
    console.log(req.query.title)
    const filePath = await getVideo(req.query.title)
    if (filePath == undefined) {
        return res.status(401).json({message:'could not find video'})
    }
    return res.status(201).json({filePath})
})

app.listen(3003)