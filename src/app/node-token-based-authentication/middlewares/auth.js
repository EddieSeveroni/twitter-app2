// middlewares/auth.js

const jwt = require("jsonwebtoken");

// The jwt.verify() method checks the API request and does not render the user data if it found an invalid token or JWT secret.
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "longer-secret-is-better");
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
    }
};