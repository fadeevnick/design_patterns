import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

eventEmitter.on('test', (data) => {
  console.log('data', data);
})

eventEmitter.emit('test', { name: 'nick' })

console.log('after')