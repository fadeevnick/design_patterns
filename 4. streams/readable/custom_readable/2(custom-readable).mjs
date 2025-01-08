import { Readable } from "stream";

const data = [
  "hello",
  "complicated",
  "auth",
  "nick",
  "digitalization",
  "soer",
  "custom-readable",
];

export class MyReadable extends Readable {
  constructor(opt) {
    super(opt);
  }

  _read(size) {
    const str = data[Math.floor(Math.random() * data.length)];
    this.push(str, "utf-8");

    const random = Math.random();
    if (random > 0 && random < 0.1) {
      this.push(null);
    }
  }
}

const myReadable = new MyReadable();
myReadable
  .on("data", (data) => {
    console.log("data: ", data);
    console.log("data.toString(): ", data.toString());
  })
  .on("end", () => {
    console.log("End of stream.");
  });
