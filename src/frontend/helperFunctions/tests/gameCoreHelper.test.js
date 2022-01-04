import { addToCode, backSpace } from "../gameCoreHelper";

describe("addToCode", () => {
  it("should add to zero index, not change any other index", () => {
    let mockArray = new Array(6).fill(null);
    let mockEntry = 7;
    let addedToArray = addToCode(mockArray, mockEntry);
    expect(addedToArray[0]).toEqual(mockEntry);
    for (let i = 1; i < addedToArray.length; i++) {
      expect(addedToArray[i]).toEqual(null);
    }
  });

  it("should add to first index, not change any other index", () => {
    let mockArray = new Array(12).fill(null);
    let mockFirstInput = 8;
    mockArray[0] = mockFirstInput;
    let mockEntry = 9;
    let addedToArray = addToCode(mockArray, mockEntry);

    expect(addedToArray[1]).toEqual(mockEntry);
    for (let i = 2; i < addedToArray.length; i++) {
      expect(addedToArray[i]).toEqual(null);
    }
    expect(addedToArray[0]).toEqual(mockFirstInput);
  });

  it("should add to first index that contains null, even if there are non null values at greater index", () => {
    let mockArray = new Array(7).fill(null);
    let mockInputAtThree = 6;
    mockArray[3] = mockInputAtThree;
    let mockInputAtOne = 9;
    mockArray[1] = mockInputAtOne;
    let mockEntry = 3;
    let addedToArray = addToCode(mockArray, mockEntry);
    expect(addedToArray[0]).toEqual(mockEntry);
    for (let i = 1; i < addedToArray.length; i++) {
      if (i === 1) {
        expect(addedToArray[i]).toEqual(mockInputAtOne);
      } else if (i === 3) {
        expect(addedToArray[i]).toEqual(mockInputAtThree);
      } else {
        expect(addedToArray[i]).toEqual(null);
      }
    }
  });
  it("should add to first index that contains null, even if there are non null values at greater index", () => {
    let mockArray = new Array(9).fill(null);
    let mockInputAtZero = 3;
    mockArray[0] = mockInputAtZero;
    let mockInputAtFour = 4;
    mockArray[4] = mockInputAtFour;
    let mockEntry = 3;
    let addedToArray = addToCode(mockArray, mockEntry);
    for (let i = 0; i < addedToArray.length; i++) {
      if (i === 0) {
        expect(addedToArray[i]).toEqual(mockInputAtZero);
      } else if (i === 1) {
        expect(addedToArray[i]).toEqual(mockEntry);
      } else if (i === 4) {
        expect(addedToArray[i]).toEqual(mockInputAtFour);
      } else {
        expect(addedToArray[i]).toEqual(null);
      }
    }
  });

  it("should add to last index if all indexes except last is not null", () => {
    let fillVal = 4;
    let mockArray = new Array(7).fill(fillVal);
    mockArray[mockArray.length - 1] = null;
    let mockEntry = 6;
    let addedToArray = addToCode(mockArray, mockEntry);
    expect(addedToArray[addedToArray.length - 1]).toEqual(mockEntry);
    for (let i = 0; i < addedToArray.length - 1; i++) {
      expect(addedToArray[i]).toEqual(fillVal);
    }
  });

  it("should add to first index with null", () => {
    let fillVal = 8;
    let mockArray = new Array(5).fill(fillVal);
    mockArray[2] = null;
    let mockEntry = 7;
    let addedToArray = addToCode(mockArray, mockEntry);
    expect(addedToArray[2]).toEqual(mockEntry);
    for (let i = 0; i < addedToArray.length; i++) {
      if (i !== 2) {
        expect(addedToArray[i]).toEqual(fillVal);
      }
    }
  });
});

describe("backSpace", () => {
  it("should set the highest indexed non null digit to null", () => {
    let fillVal = 5;
    let mockArray = new Array(7).fill(fillVal);
    let removedFromArray = backSpace(mockArray);
    expect(mockArray[mockArray.length - 1]).toEqual(null);
    for (let i = 0; i < removedFromArray.length - 1; i++) {
      expect(removedFromArray[i]).toEqual(fillVal);
    }
  });

  it("should set the highest indexed non null digit to null", () => {
    let fillVal = 6;
    let mockArray = new Array(9).fill(fillVal);
    mockArray[0] = null;
    mockArray[mockArray.length - 1] = null;
    let removedFromArray = backSpace(mockArray);
    expect(mockArray[mockArray.length - 2]).toEqual(null);
    for (let i = 0; i < removedFromArray.length; i++) {
      if (
        i !== 0 &&
        i !== mockArray.length - 1 ** i &&
        i !== mockArray.length - 2
      ) {
        expect(removedFromArray[i]).toEqual(fillVal);
      } else {
        expect(removedFromArray[i]).toEqual(null);
      }
    }
  });
});
