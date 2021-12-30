function binaryInsert(array, input) {
  //array contain objects as {name, time}
  if (array.length === 0) {
    return [input];
  }
  let left = 0;
  let right = array.length - 1;
  let { time } = input;
  if (time > array[0].time) {
    array.unshift(input);
  } else if (time < array[right].time) {
    array.push(input);
  } else {
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      let dataAtMid = array[mid];
      // we're inserting at the index, we'll be shifting whatever is at the index back one. so we're looking for where the number is just slightly higher than input
      if (dataAtMid.time > time) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    array.splice(left, 0, input);
  }
  return array;
}

module.exports = binaryInsert;
