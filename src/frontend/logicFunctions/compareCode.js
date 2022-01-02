export function compareCode(user, mastermind) {
  //from original mastermind game, white pegs === correct color, but wrong place, red pegs === correct color
  let whitePeg = 0;
  let redPeg = 0;
  let { nums, countOfNums } = mastermind;
  let copyCount = Object.assign({}, countOfNums);
  for (let i = 0; i < user.length; i++) {
    let userCode = user[i];
    let mastermindCode = nums[i];
    if (userCode == mastermindCode) {
      if (copyCount[userCode] < 1) {
        whitePeg--;
      }
      copyCount[userCode]--;
      redPeg++;
    } else {
      if (copyCount[userCode] >= 1) {
        whitePeg++;
        copyCount[userCode]--;
      }
    }
  }
  return { redPeg, whitePeg };
}
