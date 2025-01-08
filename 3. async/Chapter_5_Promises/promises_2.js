const tasks = [
  async function f() {
    await new Promise((res, rej) => {
      setTimeout(() => {
        console.log('1')
        res(1)
      }, 100)
    })
  },
  async function f() {
    await new Promise((res, rej) => {
      setTimeout(() => {
        console.log('2')
        res(2)
      }, 10)
    })
  },
  async function f() {
    await new Promise((res, rej) => {
      console.log('3')
      res(3)
    })
  }
]

const promise = tasks.reduce((prev, task) => {
  return prev.then(() => {
    return task()
  })
}, Promise.resolve())