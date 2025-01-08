import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { urlToFilename, getPageLinks } from './utils.js'
import { promisify } from 'util'
import { EventEmitter } from 'events'

const mkdirpPromise = promisify(mkdirp)

function saveFile(filename, contents) {
  return mkdirpPromise(path.dirname(filename))
    .then(() => {
      return fs.promises.writeFile(filename, contents)
    })
}

function download(url, filename) {
  console.log(`Downloading ${url}`)
  return superagent.get(url)
    .then((res) => {
      if (!res.text) {
        return console.log('res.text is null');
      }

      return saveFile(filename, res.text)
        .then(() => {
          console.log(`Downloaded and saved: ${url}`)
          return res.text
        })
    })
}

class LimitedParallelQueue extends EventEmitter {
  tasks = []
  running = 0
  completed = 0

  constructor(max) {
    super()
    this.max = max
  }

  addTask(task) {
    this.tasks.push(task)
    process.nextTick(this.run.bind(this))
  }

  run() {
    if (!this.tasks.length) {
      if (this.running === 0) {
        this.emit('drained')
      }
      return
    }

    while (this.running < this.max) {
      this.running++;

      const task = this.tasks.shift()
      const promise = task()
      promise
        .finally(() => {
          this.running--
          this.run()
        })
    }
  }
}

export const limitedParallelQueue = new LimitedParallelQueue(2)

function spiderLinks(currentUrl, body, nesting) {
  if (nesting === 0) {
    // Remember Zalgo?
    return Promise.resolve()
  }

  const links = getPageLinks(currentUrl, body) // [1]
  if (links.length === 0) {
    return Promise.resolve()
  }

  links.forEach(link => {
    limitedParallelQueue.addTask(() => spider(link, nesting - 1))
  })

  // let p = spider(links[0], nesting - 1)
  // for (let i = 1; i < links.length; i++) {
  //   p = p.then(() => spider(links[i], nesting - 1))
  // }

  // return p;
}

export function spider(url, nesting) {
  const filename = urlToFilename(url)
  return fs.promises.readFile(filename, 'utf8')
    .then((fileContent) => {
      // The file already exists, let’s process the links
      return spiderLinks(url, fileContent, nesting)
    })
    .catch((err) => {
      if (err.code !== 'ENOENT') {
        throw err
      }

      // The file doesn't exist, so let’s download it
      return download(url, filename)
        .then((requestContent) => {
          return spiderLinks(url, requestContent, nesting)
        })
    })
}