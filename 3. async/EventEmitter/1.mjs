import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

async function f() {
  return new Promise((res, rej) => {
    // setTimeout(() => {
    //   res('hello')
    // }, 0)
    res('hello')
  })
}

async function main() {
  const res = await f();
  console.log('res', res)
}

main()

majn()

eventEmitter.on('e', (data) => {
  console.log('data', data)
})

eventEmitter.emit('e', { name: 'nick' })