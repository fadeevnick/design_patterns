import { createServer } from "http";
import Chance from "chance";

const chance = new Chance();
const server = createServer(async (req, res) => {
  res.writeHead(200, { "Content-type": "text/plain" });

  for (let i = 0; i < 10; i++) {
    console.log("i", i);
    await postpone(() => res.write(`hello_${i}\n`), i * 300);
  }
  // while (chance.bool({ likelihood: 95 })) {
  //   res.write(`${chance.string()}\n`)
  // }

  console.log("res.end()");
  res.end("\n\n");
  res.on("finish", () => console.log("All data sent"));
});

server.listen(8080, () => {
  console.log("listening on http://localhost:8080");
});

async function postpone(func, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      func();
      res();
    }, delay);
  });
}
