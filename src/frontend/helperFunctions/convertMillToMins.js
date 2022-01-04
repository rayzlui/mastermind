export function convertMillisecondsToMinutes(milli) {
  let totalSeconds = Math.floor(milli / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds =
    totalSeconds % 60 < 10
      ? `0${Math.floor(totalSeconds % 60)}`
      : Math.floor(totalSeconds % 60);
  if (milli < 0) {
    minutes = 0;
    seconds = "00";
  }
  return { minutes, seconds };
}
