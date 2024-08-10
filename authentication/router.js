const express = require('express');
const router = express.Router();
const { getUser, createUser } = require('./database');

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

module.exports = router;
