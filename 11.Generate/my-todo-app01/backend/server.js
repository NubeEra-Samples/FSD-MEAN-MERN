const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = 5000;
const cors = require('cors');
 
// Middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function fetchTodos() {
  // Promise-based function
  return new Promise((resolve, reject) => {
    axios.get("https://jsonplaceholder.typicode.com/todos")
      .then(response => resolve(response.data.slice(0, 5)))
      .catch(error => reject("Error fetching todos"));
  });
}


// Route to fetch todos from external API
app.get("/api/todos", (req, res) => {
  fetchTodos()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err }));
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
