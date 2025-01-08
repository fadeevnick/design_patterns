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
]

let completed = 0;
tasks.forEach(t => {
  t(() => {
    if (++completed === tasks.length) {
      finish()
    }
  })
})

function finish() {
  console.log('finish')
}

console.log('6')