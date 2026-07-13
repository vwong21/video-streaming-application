const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const jwtAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader.length <= 0) {
        return res.status(401).json({ error: "Authorization Failed" });
    }
    const authorization = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
        req.user = { username: decoded.username };
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = jwtAuth;
