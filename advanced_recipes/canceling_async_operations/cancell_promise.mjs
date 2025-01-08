async function asyncOperation(ms) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('24')
    }, ms)
  })
}

function withCancellation(func, after) {
  function f() {
    return new Promise((res, rej) => {
      func()
        .then(result => {
          res(result)
        })

      setTimeout(() => {
        rej('cancelled')
      }, after)
    })
  }

  return f;
}

const withCancell = withCancellation(asyncOperation.bind(null, 3000), 1000)

withCancell()
  .then((res) => {
    console.log('res', res)
  })
  .catch((err) => {
    console.log('err', err)
  })