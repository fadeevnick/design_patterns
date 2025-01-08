// import { spider } from './spider.js'
// import { spider } from './my-spider.js'
import { spider, limitedParallelQueue } from './my-limited-parallel-spider-promise.js'

const url = process.argv[2]
const nesting = Number.parseInt(process.argv[3], 10) || 1

// spider(url, nesting, (err) => {
//   if (err) {
//     console.error(err)
//     process.exit(1)
//   }

//   console.log('Download completed');
// })

spider(url, nesting)
  .finally(() => {
    console.log('finally');
  })
// .then(() => console.log('Download completed'))

limitedParallelQueue.once('drained', () => {
  console.log('Download completed');
})