import { Level } from 'level';

const db = new Level('example-db', { valueEncoding: 'json' });
const salesDb = db.sublevel('sales')

export async function totalSales(product) {
  const now = Date.now();
  let sum = 0;

  for await (const [key, value] of salesDb.iterator()) {
    if (!product || value.product === product) {
      sum += value.amount;
    }
  }

  console.log(`totalSales() took: ${Date.now() - now}ms`);

  return sum;
}