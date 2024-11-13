// server.js
import http from "http";
import fs from "fs";
import path from "path";

// 서버 생성
const server = http.createServer((req, res) => {
  // 기본 요청에 대해 index.html을 제공
  if (req.url === "/") {
    const filePath = path.join(__dirname, "index.html");

    // HTML 파일 읽기
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading HTML file");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// 서버 포트 설정
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
