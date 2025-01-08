async function asyncOperation(num) {
  console.log('op', num)
  console.log('2')
  return new Promise((res, rej) => {
    console.log('3')
    setTimeout(() => {
      res()
    }, 1000)
  })
}

async function asyncFunction(cancellObj) {
  console.log('1')
  const res1 = await asyncOperation(1);

  if (cancellObj.cancell) throw new Error('cancelled')

  const res2 = await asyncOperation(2);

  if (cancellObj.cancell) throw new Error('cancelled')

  const res3 = await asyncOperation(3);
}

const cancellObj = { cancell: false }

asyncFunction(cancellObj)
console.log('4')

setTimeout(() => {
  cancellObj.cancell = true
}, 1000)