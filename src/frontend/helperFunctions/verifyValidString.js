export function verifyValidString(string, feedbackCallback) {
  if (string.length < 8) {
    feedbackCallback("Username and password must be longer than 8 characters");
    return false;
  }
  let downcaseString = string.toLowerCase();
  let validCharacters = "abcdefghijklmnopqrstuvwxyz1234567890"
    .split("")
    .reduce((acc, char) => {
      acc[char] = true;
      return acc;
    }, {});
  for (let i = 0; i < downcaseString.length; i++) {
    let currentStringVal = downcaseString[i];
    if (validCharacters[currentStringVal] === undefined) {
      feedbackCallback(
        "Username and password may only be alphanumeric characters"
      );
      return false;
    }
  }
  return true;
}
