export function casearCypher(password) {
  //its 20 B.C. Rome
  let random = Math.floor(Math.random() * 20);
  let encrypt = scramblePassword(password, random);
  return [encrypt, random];
}

//when logging in put key stored in database and input password into scramble and compare with password stored in database
export function scramblePassword(password, key) {
  //key nums between 33 - 126
  //so between 0 - 93
  let scramble = password.split("").map((char) => {
    let charCode = char.charCodeAt(0);
    let shiftCode = ((charCode + key) % 93) + 33;
    return String.fromCharCode(shiftCode);
  });
  return scramble.join("");
}
