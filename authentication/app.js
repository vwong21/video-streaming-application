require("dotenv").config()
const express = require('express')
const cors = require('cors');
const bodyparser = require('body-parser')
const app = express()
const { getUser } = require('./database')
app.use(bodyparser.json());
app.use(cors());

app.post('/auth', async (req, res) => {
    const { username, password } = req.body

    try {
        const userPassword = await getUser(username)
        if (password != userPassword.userPassword) {
            res.status(401).json({message: "unauthorized"})
        }
        res.status(201).json({ message: 'User validated successfully'})
    }
    catch (error) {
        res.status(401).json({message: "Unauthorized"})
    }
})

app.listen(3001)