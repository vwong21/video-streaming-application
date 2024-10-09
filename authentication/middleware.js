const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const authenticateToken = (req, res, next) => {
    authHeader = req.headers["authorization"]
    const token = authHeader.split(' ')[1]
    console.log(token)

    if (token == null) {
        return res.json({message: "Invalid Token"}).status(401)
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err) {
            return res.json({message: "Invalid Token"}).status(403)
        }

        req.user = user

        next()
    })
}

module.exports = authenticateToken