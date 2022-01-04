let binaryInsert = require("./binaryInsert");

describe("binaryInsert", () => {
  describe("inserting into sorted array", () => {
    let mockData = [];
    for (let i = 100; i >= 0; i -= 5) {
      mockData.push({ name: `paul ${i}`, time: i });
    }
    //mockData is 100 -> 0 by 5's. intial length === 20.
    it("should insert it in correct location", () => {
      let mockInput = { name: "frank", time: 37 };
      let mockSortArray = binaryInsert(mockData.slice(), mockInput);
      expect(mockSortArray[13].time).toEqual(mockInput.time);
    });
    it("should insert it in correct location", () => {
      let mockInput = { name: "frank", time: 7 };
      let mockSortArray = binaryInsert(mockData.slice(), mockInput);
      expect(mockSortArray[19].time).toEqual(mockInput.time);
    });
    it("should insert it in correct location", () => {
      let mockInput = { name: "frank", time: 100 };
      let mockSortArray = binaryInsert(mockData.slice(), mockInput);
      expect(mockSortArray[0].time).toEqual(mockInput.time);
    });
    it("should insert it in correct location", () => {
      let mockInput = { name: "frank", time: 38 };
      let mockSortArray = binaryInsert(mockData.slice(), mockInput);
      expect(mockSortArray[13].time).toEqual(mockInput.time);
    });
    it("should insert it in correct location", () => {
      let mockInput = { name: "frank", time: 9 };
      let mockSortArray = binaryInsert(mockData.slice(), mockInput);
      expect(mockSortArray[19].time).toEqual(mockInput.time);
    });
    it("should insert it in correct location", () => {
      let mockInput = { name: "frank", time: 5 };
      let mockSortArray = binaryInsert(mockData.slice(), mockInput);
      expect(mockSortArray[20].time).toEqual(mockInput.time);
    });

    it("should insert it in correct location", () => {
      let mockInput = { name: "frank", time: 67 };
      let mockSortArray = binaryInsert(mockData.slice(), mockInput);
      expect(mockSortArray[7].time).toEqual(mockInput.time);
    });
    it("should insert it in correct location", () => {
      let mockInput = { name: "frank", time: 86 };
      let mockSortArray = binaryInsert(mockData.slice(), mockInput);
      expect(mockSortArray[3].time).toEqual(mockInput.time);
    });
  });
  describe("constructing from new", () => {
    let mockData = [
      4, 2, 4, 5, 6, 7, 4, 1, 543, 232, 342, 34, 6456, 756, 12312, 524, 321,
      211, 3123, 1231, 3, 543, 64, 234,
    ].map((x) => {
      return { name: "test", time: x };
    });
    let expected = mockData.sort((x, y) => y.time - x.time);
    let testData = [];
    for (let i = 0; i < mockData.length; i++) {
      testData = binaryInsert(testData, mockData[i]);
    }

    for (let i = 0; i < testData.length; i++) {
      expect(testData[i]).toEqual(expected[i]);
    }
  });
});
