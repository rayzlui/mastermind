import { scramblePassword } from "../scrambleString";

describe("scramble password", () => {
  describe("should be different from the orginal string", () => {
    it("should work with lowercase chars", () => {
      let mockPassword = "potato";
      let mockKey = 15;
      let scrambledString = scramblePassword(mockPassword, mockKey);
      expect(scrambledString).not.toEqual(mockPassword);
    });

    it("should work with UPPERCASE chars", () => {
      let mockPassword = "POTATOES";
      let mockKey = 28;
      let scrambledString = scramblePassword(mockPassword, mockKey);
      expect(scrambledString).not.toEqual(mockPassword);
    });

    it("should with with numbers", () => {
      let mockPassword = "12323532352";
      let mockKey = 12;
      let scrambledString = scramblePassword(mockPassword, mockKey);
      expect(scrambledString).not.toEqual(mockPassword);
    });

    it("should work with combined upper/lower case and numbers", () => {
      let mockPassword = "HwS23dwS";
      let mockKey = 18;
      let scrambledString = scramblePassword(mockPassword, mockKey);
      expect(scrambledString).not.toEqual(mockPassword);
    });
  });
  describe("key and string combos should have consistent output", () => {
    it("should work with lowercase chars", () => {
      let mockPassword = "potato";
      let mockKey = 15;
      let scrambledString1 = scramblePassword(mockPassword, mockKey);
      let scrambledString2 = scramblePassword(mockPassword, mockKey);
      expect(scrambledString1).toEqual(scrambledString2);
    });

    it("should work with UPPERCASE chars", () => {
      let mockPassword = "POTATOES";
      let mockKey = 28;
      let scrambledString1 = scramblePassword(mockPassword, mockKey);
      let scrambledString2 = scramblePassword(mockPassword, mockKey);
      expect(scrambledString1).toEqual(scrambledString2);
    });

    it("should with with numbers", () => {
      let mockPassword = "12323532352";
      let mockKey = 12;
      let scrambledString1 = scramblePassword(mockPassword, mockKey);
      let scrambledString2 = scramblePassword(mockPassword, mockKey);
      expect(scrambledString1).toEqual(scrambledString2);
    });

    it("should work with combined upper/lower case and numbers", () => {
      let mockPassword = "HwS23dwS";
      let mockKey = 18;
      let scrambledString1 = scramblePassword(mockPassword, mockKey);
      let scrambledString2 = scramblePassword(mockPassword, mockKey);
      expect(scrambledString1).toEqual(scrambledString2);
    });
  });
});
