const http = require("http");
const fs = require("fs");

const port = 3005;

const server = http.createServer((req, res) => {
  const log = `${Math.floor(Math.random() * 100)}`;
  console.log(`${log}:New Request`);

  if (req.url == "/") {
    const path = `Request:${req.url}\n`;

    fs.readFile("index.html", "utf-8", (err, data) => {
      fs.appendFile("file.text", path, (err) => {
        if (!err) {
          console.log(`${path}:Html Request`);
          res.statusCode = 200;
          res.setHeader("Content-type", "text/html");
          res.end(data);
        }
      });
    });
  } else if (req.url == "/about") {
    const path = `Request:${req.url}\n`;
    fs.appendFile("file.text", path, (err) => {
      if (!err) {
        console.log(`${path}:Text Request`);
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        res.end("<p>Welcome To About Page</p>");
      }
    });
  } else {
    const path = `Request:${req.url}\n`;
    fs.appendFile("file.text", path, (err) => {
      if (!err) {
        console.log(`${path}:Default Request`);
        res.statusCode = 400;
        res.setHeader("Content-type", "text/plain");
        res.end("Page Not Found");
      }
    });
  }
});

server.listen(port, (err) => {
  if (!err) {
    console.log(`server running on http:localhost:${port}`);
  }
});
