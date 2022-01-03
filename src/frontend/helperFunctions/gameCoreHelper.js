export function backSpace(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] !== null) {
      arr[i] = null;
      break;
    }
  }
  return arr;
}

export function addToCode(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === null) {
      arr[i] = val;
      break;
    }
  }
  return arr;
}
