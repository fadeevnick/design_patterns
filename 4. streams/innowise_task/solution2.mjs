import { createReadStream } from 'fs';
import { Readable, Transform } from 'stream';

class ToUpperCaseFirstLetterStream extends Transform {
  constructor(opt) {
    super({ ...opt, encoding: 'utf8' })
  }

  _transform(chunk, encoding, cb) {
    const elem = chunk.toString();
    this.push(elem[0].toUpperCase() + elem.slice(1));
    cb()
  }
}

class ToArrayStream extends Transform {
  constructor(opt) {
    super(opt)
    this.arr = [];
  }

  _transform(chunk, encoding, cb) {
    this.arr.push(chunk.toString())
    cb()
  }

  _flush(cb) {
    this.push(JSON.stringify(this.arr))
    cb()
  }
}

const arr = ['hello', 'world', 'nick'];

const r_s = Readable.from(arr)

// r_s
//   .pipe(new ToUpperCaseFirstLetterStream())
//   .pipe(new ToArrayStream())
//   .pipe(process.stdout)

let result_arr = [];

r_s
  .pipe(new ToUpperCaseFirstLetterStream())
  .on('data', (chunk) => {
    result_arr.push(chunk.toString())
  })
  .on('end', () => {
    console.log('result', result_arr)
  })
