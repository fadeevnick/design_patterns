import { EventEmitter } from 'events';

function f(number, callback) {
  const eventEmitter = new EventEmitter()

  let msPassed = 0;
  const tickInterval = 50;

  function emitTick() {
    msPassed += tickInterval;

    eventEmitter.emit('tick', msPassed)
    callback(msPassed / tickInterval)

    if (msPassed + tickInterval <= number) {
      setTimeout(emitTick, tickInterval)
    }
  }

  setTimeout(emitTick, tickInterval)

  return eventEmitter;
}

f(1000, (ticksCount) => { console.log(`count of ticks: ${ticksCount}`); })
  .on('tick', (msPassed) => {
    console.log('tick! msPassed: ', msPassed)
  })