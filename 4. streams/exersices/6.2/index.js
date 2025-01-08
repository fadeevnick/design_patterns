// import { gzip, gunzip, createGunzip } from 'zlib';
import { createGunzip } from 'zlib';
import { promisify } from 'util';
import { createReadStream, createWriteStream } from 'fs';
import unzipper from 'unzipper';
import { PassThrough, Transform } from 'stream';
import parse from 'csv-parser';


async function unzipAndWriteToFS() {
  const readStream = createReadStream('london_crime_by_lsoa.csv.zip')

  const passThroughStream = new PassThrough();
  passThroughStream
    .on('data', (chunk) => {
      console.log('chunk', chunk)
      console.log('chunk.toString()', chunk.toString())
    })

  readStream
    .pipe(unzipper.Parse())
    .on('entry', entry => {
      entry
        .pipe(passThroughStream)
        .pipe(createWriteStream('london_crimes.csv'))
        .on('finish', () => {
          console.log('finished')
        })
    })
}

async function question1() {
  // const stats = {
  //   1999: 3,
  //   2000: 4,
  //   2009: 12,
  //   2011: 2
  // }

  class StatsStream extends Transform {
    stats = {

    }

    constructor(opt) {
      super({ ...opt, objectMode: true })
    }

    _transform(obj, encoding, cb) {
      if (this.stats[obj.year] !== undefined) {
        this.stats[obj.year] += 1;
      } else {
        this.stats[obj.year] = 0
      }

      cb()
    }

    _flush(cb) {
      this.push(JSON.stringify(this.stats))
      cb()
    }
  }

  const csvParser = parse({ columns: true })

  const passThroughStream = new PassThrough({ objectMode: true });
  passThroughStream
    .on('data', (chunk) => {
      console.log('chunk', chunk)
    })

  // const readStream = createReadStream('london_crime_by_lsoa.csv.zip')
  // readStream
  //   .pipe(unzipper.Parse())
  //   .on('entry', (entry) => {
  //     entry
  //       .pipe(csvParser)
  //       .pipe(passThroughStream)
  //       .pipe(new StatsStream())
  //       .pipe(process.stdout)
  //       .on('finish', () => {
  //         console.log('finished')
  //       })
  //   })

  const readStream = createReadStream('london_crimes.csv')
  readStream
    .pipe(csvParser)
    .pipe(passThroughStream)
    .pipe(new StatsStream())
    .pipe(process.stdout)
    .on('finish', () => {
      console.log('finished')
    })
}

question1()