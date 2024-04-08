const express = require('express')
const cors = require('cors');
const bodyparser = require('body-parser')
const app = express()
app.use(bodyparser.json());
app.use(cors());
const credentials = {
    "johndoe": "password",
    "janedoe": "password",
    "root": "password",
    "admin": "password"
}

app.post('/auth', (req, res) => {
    const { username, password } = req.body
    console.log(username)
    if (credentials[username] && credentials[username] === password) {
        res.status(201).json({ message: 'User validated successfully' });
    } else {
        res.status(401).json({ error: `Username: ${username} Password: ${password} does not match Username: ${username} Password: ${credentials[username]}` });
    }
})

app.listen(3001)