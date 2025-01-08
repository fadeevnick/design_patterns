const tasks = [
  (cb) => {
    setTimeout(() => {
      console.log('1');
      cb()
    }, 3)
  },
  (cb) => {
    setTimeout(() => {
      console.log('2');
      cb()
    }, 2)
  },
  (cb) => {
    setTimeout(() => {
      console.log('3');
      cb()
    }, 1)
  },
  (cb) => {
    setTimeout(() => {
      console.log('4');
      cb()
    }, 1)
  },
]

const concurrency = 2
let running = 0
let completed = 0
let index = 0

function next() {
  while (running < concurrency && index < tasks.length) {
    const task = tasks[index++]
    task(() => {
      if (++completed === tasks.length) {
        return finish()
      }
      running--
      next()
    })
    running++
  }
}

next()

function finish() {
  // all tasks finished
}