import { compareCode } from "./compareCode";

describe("compareCode", () => {
  it("should return redPeg: 0, whitePeg: 0", () => {
    let mastermind = {};
    mastermind["nums"] = [1, 1, 1, 1];
    mastermind["countOfNums"] = { 4: 1 };
    let { redPeg, whitePeg } = compareCode([2, 5, 6, 3], mastermind);
    expect(redPeg).toEqual(0);
    expect(whitePeg).toEqual(0);
  });

  it("should return redPeg: 1, whitePeg: 2", () => {
    let mastermind = {};
    mastermind["nums"] = [1, 1, 3, 4, 5, 6];
    mastermind["countOfNums"] = { 1: 2, 3: 1, 4: 1, 5: 1, 6: 1 };
    let { redPeg, whitePeg } = compareCode([1, 3, 1, 1, 1, 1], mastermind);
    expect(redPeg).toEqual(1);
    expect(whitePeg).toEqual(2);
  });

  it("should return redPeg: 0, whitePeg: 2", () => {
    let mastermind = {
      countOfNums: { 1: 2, 3: 1, 7: 1 },
      nums: ["1", "7", "1", "3"],
    };
    let { redPeg, whitePeg } = compareCode([1, 3, 1, 3], mastermind);
    expect(redPeg).toEqual(3);
    expect(whitePeg).toEqual(0);
  });
});
