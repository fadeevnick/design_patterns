import { totalSales as totalSalesOld } from "./totalSales.js";

const CACHE_TTL = 2000;

const map = new Map();

export async function totalSales(product) {
  const promise = map.get(product);

  if (promise) {
    return promise;
  }

  const p = totalSalesOld()
  map.set(product, p)

  p.then(() => {
    setTimeout(() => {
      map.delete(product)
    }, CACHE_TTL)
  }).catch((err) => {
    map.delete(product)
    throw err
  })

  return p;
}