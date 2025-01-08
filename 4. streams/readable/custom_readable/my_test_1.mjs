import { Readable } from "stream";
import Chance from "chance";

const chance = new Chance();

class RandomStream extends Readable {
  constructor(options) {
    super({ ...options, highWaterMark: 14 });
  }

  _read(size) {
    const chunk = chance.string();
    console.log(`Pushing chunk:${chunk} of size: ${chunk.length}`);
    // this.push(chunk, 'utf8')
    this.push(Buffer.from(chunk));

    if (chance.bool({ likelihood: 5 })) {
      this.push(null);
    }
  }
}

const randomStream = new RandomStream({ encoding: "utf8" });

randomStream.on("data", async (chunk) => {
  console.log("chunk", chunk);
  await new Promise((res, rej) => {
    setTimeout(res, 1000);
  });
  console.log(`Chunk received (${chunk.length} bytes): ${chunk.toString()}`);
});

// randomStream
//   .on('readable', () => {
//     let chunk;
//     while ((chunk = randomStream.read()) !== null) {
//       console.log('chunk', chunk)
//     }
//   })

// randomStream
//   .setEncoding('utf8')
//   .on('readable', () => {
//     let chunk;
//     while ((chunk = randomStream.read()) !== null) {
//       console.log('chunk', chunk)
//     }
//   })
