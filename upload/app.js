const express = require('express')
const cors = require('cors')
const app = express()
const uploadRouter = require('./routes/uploadRoutes')

app.use(cors())
app.use('/upload', uploadRouter)

app.listen(3002)