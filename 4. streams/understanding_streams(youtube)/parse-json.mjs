import { createReadStream } from 'fs'

const s = createReadStream('man.json');

let jsonStr = ''

s
  .on('data', (chunk) => {
    console.log('chunk', chunk.toString())
    jsonStr += chunk;
  })
  .on('end', (chunk) => {
    console.log('end chunk', chunk?.toString())
    const obj = JSON.parse(jsonStr)
    console.log('obj', obj)
  })