import { PassThrough } from "stream";
import { ReplaceStream } from "../transform/replace_stream.mjs";

const passThrough = new PassThrough();
passThrough.on("data", (data) => {
  console.log("data", data.toString());
});

process.stdin
  .pipe(new ReplaceStream(process.argv[2], process.argv[3]))
  // .pipe(passThrough);
  .pipe(process.stdout);
