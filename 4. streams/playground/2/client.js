async function main() {
  console.log('here')
  const res = await fetch('http://localhost:8000')

  const reader = res.body.getReader()

  await readData(reader)
}

async function readData(reader) {
  const textDecoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      return
    }

    const text = textDecoder.decode(value)
    console.log('text', text)
    // console.log('value', value)
    // console.log('buffer', value.buffer)
    // console.log('value.toString()', value.toString())

  }
}

main()