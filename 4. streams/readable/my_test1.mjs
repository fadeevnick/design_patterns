import { createServer } from "http";

process.stdin
  .on("data", (data) => {
    console.log("data: ", data);
    console.log("data.toString(): ", data.toString());
  })
  .on("end", () => {
    console.log("End of stream.");
  });

const server = createServer((req, res) => {
  // res.writeHead(200, { "Content-Type": "application/json" });
  res.writeHead(200, { "Content-Type": "text/plain" });
  // res.end("server response.");
  res.end(JSON.stringify({ data: "hello" }));
});

server.listen(3000, () => console.log("Listening on http://localhost:3000"));
