const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());  // Parse JSON data
app.use(cors()); // Enable CORS

// Sample API route
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from Express.js Backend!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
