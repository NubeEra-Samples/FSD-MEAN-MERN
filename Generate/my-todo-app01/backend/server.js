const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Route to fetch todos from external API
app.get("/api/todos", async (req, res) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
    res.json(response.data.slice(0, 10)); // send only first 10 todos for demo
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
