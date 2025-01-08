import buffer from "buffer";

// 1. maximus size of of a buffer (4gb)
console.log(buffer.constants.MAX_LENGTH / (1024 * 1024 * 1024 * 1024));
console.log("buff", Buffer.from([1, 2, 3]));

const memoryUsage1 = process.memoryUsage();
for (let key in memoryUsage1) {
  console.log(`${key}: ${(memoryUsage1[key] / 1024 / 1024).toFixed(2)} MB`);
}

console.log("=============================================================");

const arr = [];

console.time();
for (let i = 0; i < 2e8; i++) {
  arr.push(i);
}

const memoryUsage2 = process.memoryUsage();
for (let key in memoryUsage2) {
  console.log(`${key}: ${(memoryUsage2[key] / 1024 / 1024).toFixed(2)} MB`);
}

console.log("=============================================================");

console.timeEnd();
