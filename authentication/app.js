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

app.post('/', (req, res) => {
    const { username, password } = req.body
    console.log(username)
    if (credentials[username] && credentials[username] === password) {
        // If username and password match, return success
        res.status(201).json({ message: 'User validated successfully' });
    } else {
        // If username or password is incorrect, return error
        res.status(401).json({ error: 'Invalid username or password' });
    }
})

app.listen(3001)