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

function iterate(index) {
  if (index === tasks.length) {
    return
  }

  const task = tasks[index];

  const p = task(() => iterate(index + 1))
}

iterate(0)
console.log('4')


// async function f1() {
//   console.log('1')
//   await console.log('2')
//   await console.log('3')
// }

// const p = f1()
// console.log('p', p)
// console.log('4')