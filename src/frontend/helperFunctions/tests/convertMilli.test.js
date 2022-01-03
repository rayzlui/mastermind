import { convertMillisecondsToMinutes } from "../convertMillToMins";

describe("convertMillisecondsToMinutes", () => {
  it("should convert 0 milliseconds to 0 minutes 00 seconds", () => {
    let expectedSeconds = "00";
    let expectedMinutes = 0;
    let milliseconds = 0;
    let convertedTime = convertMillisecondsToMinutes(milliseconds);
    let { minutes, seconds } = convertedTime;
    expect(minutes).toEqual(expectedMinutes);
    expect(seconds).toEqual(expectedSeconds);
  });

  it("should convert 100000 milliseconds to 1 minute 40 seconds", () => {
    let expectedSeconds = 40;
    let expectedMinutes = 1;
    let milliseconds = 100000;
    let convertedTime = convertMillisecondsToMinutes(milliseconds);
    let { minutes, seconds } = convertedTime;
    expect(minutes).toEqual(expectedMinutes);
    expect(seconds).toEqual(expectedSeconds);
  });

  it("should convert 192030 milliseconds to 3 minutes 12 seconds", () => {
    let expectedSeconds = 12;
    let expectedMinutes = 3;
    let milliseconds = 192030;
    let convertedTime = convertMillisecondsToMinutes(milliseconds);
    let { minutes, seconds } = convertedTime;
    expect(minutes).toEqual(expectedMinutes);
    expect(seconds).toEqual(expectedSeconds);
  });
  describe("it should handle leading zeroes in seconds", () => {
    it("should convert 182030 milliseconds to 3 minutes 02 seconds", () => {
      let expectedSeconds = "02";
      let expectedMinutes = 3;
      let milliseconds = 182030;
      let convertedTime = convertMillisecondsToMinutes(milliseconds);
      let { minutes, seconds } = convertedTime;
      expect(minutes).toEqual(expectedMinutes);
      expect(seconds).toEqual(expectedSeconds);
    });
  });

  describe("it should handle minutes greater than 10", () => {
    it("should convert 610000 to 10 minutes 10 seconds", () => {
      let expectedSeconds = 10;
      let expectedMinutes = 10;
      let milliseconds = 610000;
      let convertedTime = convertMillisecondsToMinutes(milliseconds);
      let { minutes, seconds } = convertedTime;
      expect(minutes).toEqual(expectedMinutes);
      expect(seconds).toEqual(expectedSeconds);
    });
  });
});
