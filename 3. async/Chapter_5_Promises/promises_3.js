try {
  const p = await new Promise((res, rej) => {
    throw 1;
  })
  // setTimeout(() => {
  //   throw 1
  // })
} catch (e) {
  console.log('caught')
  console.log('e', e)
}