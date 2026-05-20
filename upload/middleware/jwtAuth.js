const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const jwtAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader.length <= 0) {
        return res.status(401).json({
            error: "Authorization Failed",
        });
    }
    const authorization = authHeader.split(" ")[1];
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    console.log(decoded.username);
    req.body.username = decoded.username;
    next();
};

module.exports = jwtAuth;
