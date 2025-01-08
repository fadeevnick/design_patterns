import { createServer } from 'http';
import { promises as fs, createReadStream, createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Readable } from 'stream';

const __dirname = dirname(fileURLToPath(import.meta.url))

function writeJSON() {
  const ws = new createWriteStream('data.json')
  ws.write('[\n')

  for (let i = 0; i < 1000; i++) {
    let str = JSON.stringify({ i, name: `name_${i}` });
    str += i === 999 ? '\n' : ',\n';

    ws.write(str)
  }
  ws.end(']')
  console.log('end')
}

const server = createServer(async (req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days,
    'Content-type': 'application/pdf'
    /** add other headers as per requirement */
  };

  // pipe listen 'data' and 'end' inside
  res.writeHead(200, headers)
  // res.write('kolya')
  // setTimeout(() => {
  //   res.write('hi')
  // }, 100)

  // setTimeout(() => {
  //   res.end()
  // }, 300)
  const s = createReadStream('./fadeev-cv.pdf')

  s.pipe(res)
})
server.listen(8000)


