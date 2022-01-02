import { compareCode } from "../compareCode";

describe("compareCode", () => {
  describe("all incorrect", () => {
    it("should return redPeg: 0, whitePeg: 0", () => {
      let mastermind = {};
      mastermind["nums"] = [1, 1, 1, 1];
      mastermind["countOfNums"] = { 4: 1 };
      let { redPeg, whitePeg } = compareCode([2, 5, 6, 3], mastermind);
      expect(redPeg).toEqual(0);
      expect(whitePeg).toEqual(0);
    });
  });
  describe("1 in right position, 2 incorrect position, rest incorrect", () => {
    it("should return redPeg: 1, whitePeg: 2", () => {
      let mastermind = {};
      mastermind["nums"] = [1, 1, 3, 4, 5, 6];
      mastermind["countOfNums"] = { 1: 2, 3: 1, 4: 1, 5: 1, 6: 1 };
      let { redPeg, whitePeg } = compareCode([1, 3, 1, 1, 1, 1], mastermind);
      expect(redPeg).toEqual(1);
      expect(whitePeg).toEqual(2);
    });
  });
  describe("3 nums in right position, one incorrect, rest in correct", () => {
    it("should work with string form of numbers and return redPeg: 3, whitePeg: 0", () => {
      let mastermind = {
        countOfNums: { 1: 2, 3: 1, 7: 1 },
        nums: ["1", "7", "1", "3"],
      };
      let { redPeg, whitePeg } = compareCode(["1", "3", "1", "3"], mastermind);
      expect(redPeg).toEqual(3);
      expect(whitePeg).toEqual(0);
    });
  });

  describe("nums match, all in wrong spot", () => {
    it("should work with one string form of numbers and one number and return redPeg: 0, whitePeg: 8", () => {
      let mastermind = {
        countOfNums: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1 },
        nums: [8, 7, 6, 5, 4, 3, 2, 1],
      };
      let { redPeg, whitePeg } = compareCode(
        ["1", "2", "3", "4", "5", "6", "7", "8"],
        mastermind
      );
      expect(redPeg).toEqual(0);
      expect(whitePeg).toEqual(8);
    });
  });
  describe("nums correct, wrong spot except one", () => {
    it("should work with one string form of numbers and one number and return redPeg: 1, whitePeg: 4", () => {
      let mastermind = {
        countOfNums: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 },
        nums: ["1", "2", "3", "4", "5"],
      };
      let { redPeg, whitePeg } = compareCode([5, 4, 3, 2, 1], mastermind);
      expect(redPeg).toEqual(1);
      expect(whitePeg).toEqual(4);
    });
  });

  describe("exact match", () => {
    it("should return redPeg: 6, whitePeg: 0", () => {
      let mastermind = {};
      mastermind["nums"] = [1, 1, 3, 4, 5, 6];
      mastermind["countOfNums"] = { 1: 2, 3: 1, 4: 1, 5: 1, 6: 1 };
      let { redPeg, whitePeg } = compareCode([1, 1, 3, 4, 5, 6], mastermind);
      expect(redPeg).toEqual(6);
      expect(whitePeg).toEqual(0);
    });
  });
});
