import { EventEmitter } from 'events';
import { readFile } from 'fs';

function findRegex(files, regex) {
  const emitter = new EventEmitter()

  for (const file of files) {
    readFile(file, 'utf8', (err, content) => {
      if (err) {
        return emitter.emit('error', err)
      }

      // console.log('content', content)
      // console.log('typeof', typeof content)

      emitter.emit('fileread', file);

      const match = content.match(regex);

      if (match) {
        match.forEach(elem => emitter.emit('found', file, elem))
      }
    })
  }
  console.log('here')

  return emitter;
}

findRegex(
  ['fileA.txt', 'fileB.json'],
  /hello \w/g
)
  .on('fileread', file => console.log(`${file} was read`))
  .on('found', (file, match) => console.log(`Matched ${match} in ${file}`))
  .on('error', err => console.log(`Error emitted ${err.message}`))

console.log('finish')