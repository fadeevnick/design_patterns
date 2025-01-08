import { EventEmitter } from 'events';

function getTickEmitter(duration, callback) {
  const eventEmitter = new EventEmitter()
  let count = 0
  let msPassed = 0;

  function f() {
    if (msPassed % 50 === 0) {
      eventEmitter.emit('tick')
      count++
    }

    msPassed++

    if (msPassed === duration) {
      return callback(count)
    }

    setTimeout(f, 1)
  }

  f()

  return eventEmitter
}

const tickEmitter = getTickEmitter(1000, (amountOfTicks) => console.log(`${amountOfTicks} times`))
tickEmitter.on('tick', () => {
  console.log('tick happened')
})