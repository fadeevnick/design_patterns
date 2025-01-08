import { Readable, Transform } from "stream";
import fs from "fs";

async function concatFiles1(destination, files) {
  return new Promise((res, rej) => {
    Readable.from(files)
      .pipe(
        new Transform({
          transform: (chunk, encoding, cb) => {
            const readStream = fs.createReadStream(chunk.toString());
            const writeStream = fs.createWriteStream(destination, {
              flags: "a",
            });
            readStream.pipe(writeStream).on("finish", () => {
              console.log("finished writing ", chunk.toString());
              cb();
            });
          },
        })
      )
      .on("finish", () => {
        console.log("finished writing all files!");
        res();
      });
  });
}

async function concatFiles2(destination, files) {
  const writeStream = fs.createWriteStream(destination);

  return new Promise((res, rej) => {
    Readable.from(files)
      .pipe(
        new Transform({
          transform: (chunk, encoding, cb) => {
            const readStream = fs.createReadStream(chunk.toString());
            readStream.pipe(writeStream, { end: false });
            readStream.on("end", () => {
              console.log("finished writing ", chunk.toString());
              cb();
            });
          },
        })
      )
      .on("finish", () => {
        console.log("finished writing all files!");
        writeStream.end();
        res();
      });
  });
}

async function main() {
  try {
    await concatFiles2(process.argv[2], process.argv.slice(3));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();
