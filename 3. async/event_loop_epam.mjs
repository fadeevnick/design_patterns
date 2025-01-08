import fs from 'fs'

console.log('START')

setTimeout(() => console.log('setTimeout 1'), 0)               // A

setImmediate(() => console.log('setImmediate'))                // B

fs.readFile('event_loop_epam.mjs', () => {                     // C
  setTimeout(() => console.log('readFile setTimeout'), 0)      // D
  setImmediate(() => console.log('readFile setImmediate'))     // E
  process.nextTick(() => console.log('readFile Next Tick'))    // F
})

Promise.resolve()
  .then(() => {
    console.log('Promise')                                     // G
    process.nextTick(() => console.log('Promise Next Tick'))   // H
  })

process.nextTick(() => console.log('Next Tick'))               // I

setTimeout(() => console.log('setTimeout 2'), 0)               // J

console.log('END')
