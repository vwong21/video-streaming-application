const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { getUser, createUser } = require('./database');
const authenticateToken = require('./middleware');

dotenv.config();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userPassword = await getUser(username);
        if (password != userPassword.userPassword) {
            return res.status(401).json({ message: "unauthorized" });
        }
        accessToken = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: '1800s'})
        console.log(accessToken)
        res.status(201).json({ message: 'User validated successfully', accessToken: accessToken });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/register', async (req, res) => {
    const {username, firstName, lastName, userPassword, email} = req.body;
    console.log(username, firstName, lastName, userPassword, email)
    try {
        await createUser(username, firstName, lastName, userPassword, email)
        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
        console.error(error)
    }

})

router.get('/authentication', authenticateToken, (req, res) => {
    res.json({message: 'authenticated'}).status(200)
})

module.exports = router;
