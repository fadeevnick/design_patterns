import { Transform } from "stream";

export class ReplaceStream extends Transform {
  constructor(searchStr, replaceStr, options) {
    super({ ...options });
    this.searchStr = searchStr;
    this.replaceStr = replaceStr;
    this.tail = "";
  }

  _transform(chunk, encoding, callback) {
    debugger;
    const pieces = (this.tail + chunk).split(this.searchStr);
    const lastPiece = pieces[pieces.length - 1];
    const tailLen = this.searchStr.length - 1;
    this.tail = lastPiece.slice(-tailLen);
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen);

    this.push(pieces.join(this.replaceStr));
    callback();
  }

  _flush(callback) {
    this.push(this.tail);
    callback();
  }
}

// const replaceStream = new ReplaceStream("World", "Node.js");
// replaceStream.on("data", (chunk) => {
//   console.log(chunk.toString());
//   console.log(chunk.length);
// });

// // replaceStream.write('Hello W')
// // replaceStream.write('orld!')
// replaceStream.write("abcW");
// // replaceStream.write('W')
// replaceStream.write("o");
// replaceStream.write("r");
// replaceStream.write("l");
// replaceStream.write("d!");
// replaceStream.write("b");
// replaceStream.write("y");
// replaceStream.write("e");
// replaceStream.write("World");
// replaceStream.end();
