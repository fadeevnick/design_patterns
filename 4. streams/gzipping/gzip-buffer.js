import { promises as fs } from 'fs'
import { gzip } from 'zlib'
import { promisify } from 'util';
const gzipPromise = promisify(gzip)

const filename = process.argv[2]

async function main() {
  console.log('0')
  const data = await fs.readFile(filename);
  console.log('1')
  const gzippedData = await gzipPromise(data)
  console.log('2')
  await fs.writeFile(`${filename}.gz`, gzippedData)
  console.log('3')
  console.log('File successfully compressed');
}

main()