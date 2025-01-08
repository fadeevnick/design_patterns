import { Writable } from 'stream';
import { promises as fs } from 'fs'
import { dirname, join } from 'path'

export class ToFileStream extends Writable {
  constructor(options) {
    super({ ...options, objectMode: true })
  }

  _write(chunk, encoding, cb) {
    console.log('chunk', chunk)
    fs.mkdir(dirname(chunk.path))
      .then(() => fs.writeFile(chunk.path, chunk.content))
      .then(() => cb())
      .catch((err) => cb(err))
  }
}

const tfs = new ToFileStream()

tfs.write({ path: join('files', 'file1.txt'), content: 'Hello1' })
tfs.end(() => console.log('all files created'));