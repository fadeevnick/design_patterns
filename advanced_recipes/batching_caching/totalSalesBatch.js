import { totalSales as totalSalesOld } from "./totalSales.js";

const map = new Map();

export async function totalSales(product) {
  const promise = map.get(product);

  if (promise) {
    return promise;
  }

  const p = totalSalesOld()
  map.set(product, p)

  p.finally(() => {
    map.delete(product)
  })

  return p;
}