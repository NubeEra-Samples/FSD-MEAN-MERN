const express = require("express"); 
const app = express(); 
const PORT = 5000; 
app.get("/", (req, res) =
// app.listen(PORT, () => `running on port ${PORT}`)); 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));