const express = require('express');
const router = express.Router();
const { getUser } = require('./database');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userPassword = await getUser(username);
        if (password != userPassword.userPassword) {
            return res.status(401).json({ message: "unauthorized" });
        }
        res.status(201).json({ message: 'User validated successfully' });
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
});

module.exports = router;
