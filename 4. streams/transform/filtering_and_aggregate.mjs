import { Transform, Writable } from "stream";
import fs from "fs";
import parse from "csv-parser";

const csvParser = parse({ columns: true });

const readableStream = fs.createReadStream("data.csv");

class FilterByCountry extends Transform {
  constructor(country, options) {
    super({ ...options, objectMode: true });
    this.country = country;
  }

  _transform(chunk, encoding, callback) {
    if (chunk.country === this.country) {
      // this.push(JSON.stringify(chunk) + "\n");
      this.push(chunk);
    }
    callback();
  }

  _flush(cb) {
    cb();
  }
}

class TotalProfit extends Transform {
  constructor(options) {
    super({ ...options, objectMode: true });
    this.sum = 0;
  }

  _transform(chunk, encoding, callback) {
    this.sum += Number(chunk.profit);
    callback();
  }

  _flush(cb) {
    this.push(`total Italy profit ${this.sum.toString()}\n`);
    cb();
  }
}

const filterByCountryStream = new FilterByCountry("Italy");
const totalProfit = new TotalProfit();

readableStream
  .pipe(csvParser)
  .pipe(filterByCountryStream)
  .pipe(totalProfit)
  .pipe(process.stdout);
