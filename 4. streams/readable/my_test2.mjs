import { Readable } from 'stream';

const mountains = [
  { name: 'Everest1', height: 1 },
  { name: 'Everest2', height: 2 },
  { name: 'Everest3', height: 3 },
  { name: 'Everest4', height: 4 },
]

const mJSON = JSON.stringify(mountains)
console.log('mJSON', mJSON)

const mountainsStream = Readable.from(mountains, { objectMode: true });
// const arrayJSON = JSON.stringify(mountains);
// const mountainsStream = Readable.from(mJSON);

// mountainsStream
//   // .setEncoding('utf8')
//   .on('data', (mountain) => {
//     console.log('m', mountain)
//   })

mountainsStream
  .on('readable', () => {
    let chunk;
    while ((chunk = mountainsStream.read()) !== null) {
      console.log('chunk', chunk)
    }
  })


// const mountainsStream = Readable.from(['h', 'e', 'l', 'l']); // 4 chunks
// const mountainsStream = Readable.from('hell'); // 1 chunk

// let obj = {
//   name: 'nik',
//   age: 24,
//   height: 182
// }
// let arr = JSON.stringify(obj).split('');

// const mountainsStream = Readable.from(arr, { objectMode: false })

// let resStr = '';
// mountainsStream
//   .on('readable', () => {
//     let chunk;
//     while ((chunk = mountainsStream.read()) !== null) {
//       resStr += chunk.toString()
//       console.log('chunk', chunk)
//     }
//   })
//   .on('end', () => {
//     console.log('end')
//     console.log('resStr', resStr)
//     console.log('typeof resStr', typeof resStr)
//     console.log('parse JSON', JSON.parse(resStr))
//   })
