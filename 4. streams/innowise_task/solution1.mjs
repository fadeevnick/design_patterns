import { Readable } from 'stream';

const arr = ['hello', 'world', 'nick'];

class ToUpperCaseFirstLetterStream extends Readable {
  constructor(arr, opt) {
    super(opt)
    this.arr = arr;
    this.index = 0;
  }

  _read(size) {
    if (this.index === this.arr.length) {
      return this.push(null)
    }

    const elem = this.arr[this.index++];

    this.push(elem[0].toUpperCase() + elem.slice(1))
  }
}

const resultArr = [];

const stream = new ToUpperCaseFirstLetterStream(arr)

stream
  .on('data', (chunk) => {
    resultArr.push(chunk.toString())
  })
  .on('end', () => console.log('resultArr', resultArr))