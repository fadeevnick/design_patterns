const p = [
  new Promise((res, rej) => {
    setTimeout(() => {
      res(1)
    })
  }),
  new Promise((res, rej) => {
    rej(2)
  }),
  new Promise((res, rej) => {
    res(3)
  }),
]

async function main() {
  // try {
  //   const all = await Promise.all(p)
  //   console.log('all', all)
  // } catch (e) {
  //   console.log('e', e)
  // }

  const allSettled = await Promise.allSettled(p)
  console.log('allSettled', allSettled)

  // // try {
  // const all = await Promise.race(p)
  // console.log('all', all)
  // // } catch (e) {
  // //   console.log('e', e)
  // // }
}

main()

// async function mainTest() {
//   console.log(2)
//   console.log(22)
//   console.log(222)
//   const p = await Promise.resolve(5)
//   console.log(4)
//   // console.log(p)
// }

// // mainTest()
// // console.log(3)

// async function test() {
//   // const p = await mainTest()
//   const p = mainTest()
//   console.log('p', p)
//   console.log('3')
// }

// test()