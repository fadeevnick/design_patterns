import { Transform } from "stream";

export class MyReplaceStream extends Transform {
  constructor(searchStr, replaceStr, options) {
    super(options);
    this.searchStr = searchStr;
    this.replaceStr = replaceStr;
    this.tmp = "";
  }

  _transform(chunk, encoding, callback) {
    this.tmp += chunk;

    const split = this.tmp.split(this.searchStr);

    for (let i = 0; i < split.length; i++) {
      if (i === split.length - 1) {
        const left = split[i].slice(0, -1 * (this.searchStr - 1));
        const right = split[i].slice(-1 * (this.searchStr - 1));
        if (left) {
          this.push(left);
        }
        this.tmp = right;
      } else {
        if (split[i]) {
          this.push(split[i]);
        }
        this.push(this.replaceStr);
      }
    }

    callback();
  }

  _flush(callback) {
    if (this.tmp) {
      this.push(this.tmp);
    }
    callback();
  }
}

const myReplaceStream = new MyReplaceStream("World", "Node.js");

myReplaceStream.setEncoding("utf-8").on("data", (str) => {
  console.log("chunk:", str);
  console.log(str.length);
});

myReplaceStream.write("abcW");
// myReplaceStream.write("W");
myReplaceStream.write("o");
myReplaceStream.write("r");
myReplaceStream.write("l");
myReplaceStream.write("d!");
myReplaceStream.write("b");
myReplaceStream.write("y");
myReplaceStream.write("e");
myReplaceStream.write("World");
myReplaceStream.end();
