import {
  processNumbers,
  fetchNumbers,
  createUrlWithParams,
} from "../generateCode";

describe("createUrlWithParams", () => {
  it("should return a url with params", () => {
    let codeLength = 5;
    let maxDigit = 7;
    let expectedUrl =
      "https://www.random.org/integers/?num=5&min=1&max=7&col=1&base=10&format=plain&rnd=new";
    let returnedUrl = createUrlWithParams(codeLength, maxDigit);
    expect(returnedUrl).toEqual(expectedUrl);
  });
});

describe("fetchNumbers", () => {
  it("should call fetch with url", async () => {
    let expectedValue = "4\n5\n6\n7\n".trim();
    let mockUrl = "wwww.test.mock";
    let mockFetch = jest.fn((url) => {
      return new Response("   4\n5\n6\n7\n     ");
    });
    let fetchedValues = await fetchNumbers(mockUrl, mockFetch);
    expect(mockFetch).toHaveBeenCalledWith(mockUrl);
    expect(fetchedValues).toBe(expectedValue);
  });

  it("should call fetch with url", async () => {
    let expectedValue = "4\n6\n1\n4\n5\n6\n7\n".trim();
    let mockUrl = "wwww.test.mock";
    let mockFetch = jest.fn((url) => {
      return new Response("  4\n6\n1\n4\n5\n6\n7\n    ");
    });
    let fetchedValues = await fetchNumbers(mockUrl, mockFetch);
    expect(mockFetch).toHaveBeenCalledWith(mockUrl);
    expect(fetchedValues).toBe(expectedValue);
  });
});

describe("processNumbers", () => {
  it("should remove linebreaks and count number if times a number appears", () => {
    let string = "4\n6\n1\n4\n5\n6\n7\n".trim();
    let expected = {
      nums: ["4", "6", "1", "4", "5", "6", "7"],
      countOfNums: { 1: 1, 4: 2, 5: 1, 6: 2, 7: 1 },
    };
    let processedNums = processNumbers(string);
    let { nums, countOfNums } = processedNums;
    expect(JSON.stringify(processedNums)).toEqual(JSON.stringify(expected));
    for (let i = 0; i < nums.length; i++) {
      expect(nums[i]).toBe(expected.nums[i]);
    }
    for (let number in countOfNums) {
      expect(countOfNums[number]).toBe(expected.countOfNums[number]);
    }
  });
  it("should remove linebreaks and count number if times a number appears", () => {
    let string = "8\n5\n2\n9\n".trim();
    let expected = {
      nums: ["8", "5", "2", "9"],
      countOfNums: { 2: 1, 5: 1, 8: 1, 9: 1 },
    };
    let processedNums = processNumbers(string);
    let { nums, countOfNums } = processedNums;
    expect(JSON.stringify(processedNums)).toEqual(JSON.stringify(expected));
    for (let i = 0; i < nums.length; i++) {
      expect(nums[i]).toBe(expected.nums[i]);
    }
    for (let number in countOfNums) {
      expect(countOfNums[number]).toBe(expected.countOfNums[number]);
    }
  });
  it("should remove linebreaks and count number if times a number appears", () => {
    let string = "1\n1\n1\n1\n1\n1\n1\n".trim();
    let expected = {
      nums: ["1", "1", "1", "1", "1", "1", "1"],
      countOfNums: { 1: 7 },
    };
    let processedNums = processNumbers(string);
    let { nums, countOfNums } = processedNums;
    expect(JSON.stringify(processedNums)).toEqual(JSON.stringify(expected));
    for (let i = 0; i < nums.length; i++) {
      expect(nums[i]).toBe(expected.nums[i]);
    }
    for (let number in countOfNums) {
      expect(countOfNums[number]).toBe(expected.countOfNums[number]);
    }
  });
});
