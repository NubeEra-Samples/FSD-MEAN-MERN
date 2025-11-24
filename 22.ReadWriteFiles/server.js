// server.js
const http = require('http');
const readCSV = require('./readCSV'); // Import the readCSV function
// const appendToCSV = require('./writeCSV'); // Import the appendToCSV function
const insertIrisRow = require('./writeToDB');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // Return CSV content
    const csvContent = readCSV();
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(csvContent);
  }

  // else if (req.method === 'POST') {
  //   let body = '';

  //   req.on('data', chunk => body += chunk);

  //   req.on('end', () => {
  //     try {
  //       const data = JSON.parse(body); // expect JSON input
  //       appendToCSV(data);

  //       res.writeHead(200, { "Content-Type": "application/json" });
  //       res.end(JSON.stringify({ status: "Row added to CSV" }));
  //     } catch (err) {
  //       res.writeHead(400, { "Content-Type": "application/json" });
  //       res.end(JSON.stringify({ error: "Invalid JSON" }));
  //     }
  //   });
  // }

  else if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => body += chunk);

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);

        await insertIrisRow(data);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "Row added to PostgreSQL" }));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON or DB error" }));
      }
    });
  }

  else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method not allowed");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
