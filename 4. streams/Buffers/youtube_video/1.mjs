// const buff = Buffer.from([115, 116, 114, 105, 110, 103])
const buff = Buffer.alloc(8);

// buff.write('st', 'utf8')
buff.write('string!!', 'utf8')

// console.log(buff.toString('utf-8'))
console.log(buff)
console.log(buff.toJSON())
console.log(buff[0])

const buff2 = Buffer.from('string', 'utf8')
console.log('buff2', buff2)
console.log('buff2 JSON', buff2.toJSON())

const buff3 = Buffer.from([115, 116, 114, 105, 110, 103], 'hex')
console.log('buff3', buff3)

const buff4 = Buffer.from('E4BDA0', 'hex')
console.log('buff4', buff4.toString())