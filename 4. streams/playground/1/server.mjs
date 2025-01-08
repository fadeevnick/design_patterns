import { createServer } from 'http';
import { promises as fs, createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Readable } from 'stream';

const __dirname = dirname(fileURLToPath(import.meta.url))

const server = createServer(async (req, res) => {
  // const data = await fs.readFile(__dirname + '/data.txt');
  // console.log('data', data)
  // res.end(data)

  // const s = createReadStream(__dirname + '/data.txt');
  // s.pipe(res)

  // const arr = ['a', 'b', 'c']
  // const rStream = Readable.from(arr)
  // rStream.pipe(res)

  const arr = ['a', 'b', 'c']
  const rStream = Readable.from(arr)
  rStream
    .on('data', (chunk) => {
      res.write(chunk)
    })
    .on('end', () => {
      res.end()
    })

  // pipe listen 'data' and 'end' inside
})
server.listen(8000)


