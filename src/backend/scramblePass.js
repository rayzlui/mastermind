function scramblePassword(password, key) {
  //key nums between 33 - 126
  //so between 0 - 93
  let scramble = password.split("").map((char) => {
    let charCode = char.charCodeAt(0);
    let shiftCode = ((charCode + key) % 93) + 33;
    return String.fromCharCode(shiftCode);
  });
  return scramble.join("");
}

module.exports = scramblePassword;
