require("dotenv").config()
const express = require('express')
const cors = require('cors')
const app = express()
const uploadRouter = require(process.env.ROUTE_PATH)

app.use(cors())
app.use('/upload', uploadRouter)

app.listen(3002)