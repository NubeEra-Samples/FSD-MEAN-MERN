import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  try {
    // Normalize request URL and prevent directory traversal
    const safeUrl = decodeURIComponent(req.url.split("?")[0]);
    let filePath = path.join(__dirname, safeUrl === "/" ? "index.html" : safeUrl);
    // If the request ends with a slash, serve index.html from that directory
    if (filePath.endsWith(path.sep)) {
      filePath = path.join(filePath, "index.html");
    }

    let ext = path.extname(filePath);
    let contentType = "text/plain";

    const mimeTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".svg": "image/svg+xml",
      ".ico": "image/x-icon",
    };
    contentType = mimeTypes[ext] || "application/octet-stream";

    fs.readFile(filePath, (err, content) => {
      if (err) {
        // SPA fallback: if the file wasn't found and the path looks like a client-side route (no extension), serve index.html
        if (err.code === "ENOENT" && (!ext || ext === "")) {
          fs.readFile(path.join(__dirname, "index.html"), (err2, indexContent) => {
            if (err2) {
              res.writeHead(500);
              res.end("Server error");
            } else {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(indexContent);
            }
          });
        } else {
          res.writeHead(404);
          res.end("File not found");
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
      }
    });
  } catch (e) {
    res.writeHead(400);
    res.end("Bad request");
  }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
