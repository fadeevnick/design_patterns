import fs from 'fs'

// async function main() {
// console.time("t")

// for (let i = 1000000; i > 0; i--) {
//   await fs.promises.appendFile('file.txt', `${i}`)
// }

// console.timeEnd("t")
// }

async function main() {
  console.time("t")

  const wStream = fs.createWriteStream('file.txt')


  for (let i = 1000000; i > 0; i--) {
    wStream.write(`${i}`)
  }

  wStream.end()

  console.timeEnd("t")
}

main()