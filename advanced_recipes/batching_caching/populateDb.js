import { Level } from 'level';
import { nanoid } from 'nanoid';

const db = new Level('example-db', { valueEncoding: 'json' });
const salesDb = db.sublevel('sales');
const products = ['book', 'game', 'app', 'song', 'movie'];

async function populate() {
  for (let i = 0; i < 100000; i++) {
    await salesDb.put(nanoid(), {
      amount: Math.ceil(Math.random() * 1000),
      product: products[Math.floor(Math.random() * 5)]
    })
  }

  console.log('Db populated');
}

async function showAll() {
  for await (const [key, value] of salesDb.iterator()) {
    console.log('key ', key, 'value ', value)
  }
}

async function deleteAll() {
  for await (const [key, value] of salesDb.iterator()) {
    await salesDb.del(key)
  }
}


// showAll()
// populate()