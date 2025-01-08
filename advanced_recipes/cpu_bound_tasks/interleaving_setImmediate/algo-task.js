export function findAllSubsetsEqualToNum(arr, num) {
  const resultSubsets = [];
  const subsets = findAllSubsets(arr);

  for (let i = 0; i < subsets.length; i++) {
    const subset = subsets[i];

    let sum = 0;
    for (let j = 0; j < subset.length; j++) {
      sum += subset[j];
    }

    if (sum === num) {
      resultSubsets.push(subset);
    }
  }

  return resultSubsets;
}

export function findAllSubsets(arr) {
  if (arr.length === 2) {
    return [[arr[0]], [arr[1]], [arr[0], arr[1]]]
  }

  let set = [];
  const firstElem = arr.shift();

  const subsetArr = findAllSubsets(arr)
  set = [...subsetArr];

  for (let i = 0; i < subsetArr.length; i++) {
    const arr = subsetArr[i];
    set.push([...arr, firstElem])
  }

  set.push([firstElem])

  return set;
}

const res = findAllSubsetsEqualToNum([1, 2, -4, 5, -3], 0)
console.log('res', res)