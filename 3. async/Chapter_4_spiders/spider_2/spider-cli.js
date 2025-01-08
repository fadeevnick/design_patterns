import { spider } from './spider.js'
// import { spider } from './my-spider.js'
// import { spider } from './my-spider-promise.js'
import { getLinkUrl, getPageLinks } from './utils.js';
import fs from 'fs'

const url = process.argv[2]
const nesting = Number.parseInt(process.argv[3], 10) || 1
console.log('nesting', nesting);

spider(url, nesting, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log('Download completed');
})

//
// spider(url, nesting)
//   .then(() => console.log('Download completed'))

// fs.readFile('www.google.com.html', 'utf-8', (err, content) => {
// fs.readFile('www.example.com.html', 'utf-8', (err, content) => {
//   console.log('getPageLinks', getPageLinks('https://www.example.com', content));
// })