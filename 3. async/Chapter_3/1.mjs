// process.nextTick(() => { console.log('1') }) - microtask (runs before I/O)
// process.setImmediate(() => { console.log('2') }) - macrotask (runs after I/0)
import { readFile } from 'fs';

function f1() {
  setTimeout(() => {
    console.log('3')
  }, 0)

  setImmediate(() => {
    console.log('2')
  })

  process.nextTick(() => {
    console.log('1')
  })
}

function f2() {
  readFile('file.txt', 'utf8', (err, data) => {
    console.log('data', data)
  })

  process.nextTick(() => {
    console.log('process.nextTick')
  })

  setImmediate(() => {
    console.log('setImmediate')
  })

  // process.nextTick(() => {
  //   console.log('process.nextTick')
  // })

  // setImmediate(() => {
  //   console.log('setImmediate')
  // })

  setTimeout(() => {
    console.log('setTimeout')
  }, 0)
}

function f3() {
  readFile('file.txt', 'utf8', (err, data) => {
    console.log('data', data)
    throw new Error('stop error')
  })

  // function myNextTick() {
  //   console.log('nextTick')
  //   process.nextTick(myNextTick)
  // }

  function mySetImmediate() {
    console.log('setImmediate')
    setImmediate(mySetImmediate)
  }

  // myNextTick()
  mySetImmediate()
}

f3()