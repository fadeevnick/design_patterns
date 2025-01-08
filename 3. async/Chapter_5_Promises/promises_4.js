try {
  Promise.reject('rrr')
    .catch((err) => {
      return err
    })
    .then((value) => {
      console.log('then', value);
    })
} catch (e) {
  console.log('caught')
  console.log('e', e)
}
