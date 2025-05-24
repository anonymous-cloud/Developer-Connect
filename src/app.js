const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes"); // ✅ You forgot to import this in your original code
const articleRoutes = require("./routes/articleRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const bodyParser = require("body-parser");

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);         // ✅ /api/auth/signup or /api/auth/login
app.use("/api/articles", articleRoutes);  // ✅ /api/articles/review-articles, etc.
app.use("/api/subjects", subjectRoutes);  // // ⬅️ Mount the route
app.listen(3000, () => {
  console.log("✅ Server is successfully listening on port 3000");
});
