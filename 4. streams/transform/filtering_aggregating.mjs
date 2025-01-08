import { createReadStream, createWriteStream } from 'fs';
import { createGzip, createGunzip } from 'zlib';
import parse from 'csv-parser'
import { Transform } from 'stream';

// createReadStream('data.csv.gz')
//   .pipe(createGunzip())
//   .pipe(createWriteStream('data.csv'))
//   .on('finish', () => {
//     console.log('file saved');
//   })

const csvParser = parse({ columns: true })
console.log(csvParser instanceof Transform)

let res;

// createReadStream('data.csv')
//   .pipe(csvParser)
//   .on('data', (chunk) => {
//     // console.log('chunk', JSON.stringify(chunk))
//     // console.log('chunk', chunk.toString())
//     console.log(chunk)
//   })

class FilterByCountry extends Transform {
  constructor(country, options) {
    super({ ...options, objectMode: true })
    this.country = country;
  }

  _transform(chunk, encoding, callback) {
    console.log('typeof chunk', typeof chunk)
    if (chunk.country === this.country) {
      this.push(chunk)
    }
    callback()
  }

  _flush(cb) {
    this.push({ type: 'a', country: 'b', profit: '-100000000' })
    cb()
  }
}

class SumProfit extends Transform {
  sum = 0

  constructor(options) {
    super({ ...options, objectMode: true })
  }

  _transform(chunk, encoding, callback) {
    console.log(chunk)
    this.sum += +chunk.profit;
    callback()
  }

  _flush(callback) {
    this.push(this.sum.toString())
    // this.push({ sum: this.sum })
    callback()
  }
}

createReadStream('data.csv')
  .pipe(csvParser)
  .pipe(new FilterByCountry('Italy'))
  .pipe(new SumProfit())
  .pipe(process.stdout)