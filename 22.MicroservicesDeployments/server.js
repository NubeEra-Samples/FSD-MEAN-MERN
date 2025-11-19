const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from Node.js REST API running in Docker!" });
});

app.get("/api/test", (req, res) => {
  res.json({ status: "OK", port: 5000 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));