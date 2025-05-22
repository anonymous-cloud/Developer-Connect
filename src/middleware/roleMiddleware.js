const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Authorization header must be provided in this format: Bearer <token>
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Attach user payload to req

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied: Insufficient role" });
      }

      next(); // Proceed if role is valid
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = authorizeRoles;
