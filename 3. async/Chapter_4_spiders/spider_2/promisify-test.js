function promisify(fn) {
  return (...params) => {
    return new Promise((res, rej) => {
      fn(...params, (err, data) => {
        if (err) {
          rej(err)
        } else {
          res(data)
        }
      })
    })
  }
}

function delay(ms, f) {
  setTimeout(() => {
    f(null, ms)
  }, ms)
}

async function main() {
  // delay(2000, (err, data) => {
  //   if (err) {
  //     throw err
  //   }

  //   console.log(data);

  // })

  const delayPromisified = promisify(delay)

  const data = await delayPromisified(2000)
  console.log(data);

}

main()