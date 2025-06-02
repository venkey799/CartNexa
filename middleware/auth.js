const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    const authHeader = req.header("Authorization");
    console.log("Authorization header:", authHeader);  // Debug

    if (!authHeader)
        return res.status(401).json({ message: "Access denied (No Token Provided)" });

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Invalid Authorization header format" });
    }

    const token = parts[1];

    try {
        const user = jwt.verify(token, process.env.JWTSECRET);
        req.user = user;
        next();
    } catch (error) {
        console.error("JWT verification error:", error);  // Debug
        res.status(400).json({ message: "Invalid Token" });
    }
};
