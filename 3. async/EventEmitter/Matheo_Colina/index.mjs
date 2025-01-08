import { EventEmitter } from 'node:events'

const eventEmitter = new EventEmitter({
  captureRejections: true
})

eventEmitter.on('event', async () => {
  throw new Error('my Error')
})

try {
  eventEmitter.emit('event')
} catch (e) {
  console.log('catch', e)
}