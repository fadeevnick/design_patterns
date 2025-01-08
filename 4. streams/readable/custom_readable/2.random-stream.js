import { Readable } from 'stream';
import Chance from 'chance';
const chance = new Chance();

class RandomStream extends Readable {
  constructor(options) {
    super(options)
  }

  _read(size) {
    console.log('in _read')

    setTimeout(() => {
      const chunk = chance.string();
      console.log(`Pushing chunk:${chunk} of size: ${chunk.length}`);
      this.push(chunk, 'utf-8');

      if (chance.bool({ likelihood: 5 })) {
        this.push(null)
      }
    }, 2000)
  }
}

const randomStream = new RandomStream()

randomStream
  .on('readable', () => {
    let chunk;
    console.log('here')

    // while ((chunk = randomStream.read(1)) !== null) {
    //   console.log(`Chunk received: ${chunk.toString()}`)
    // }
  })
  .on('end', () => { console.log('end') })

// randomStream
//   .on('data', () => {
//     console.log(`Produced ${randomStream.emittedBytes} bytes of random data`);
//   })

// module.exports = RandomStream;