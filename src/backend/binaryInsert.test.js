import { binaryInsert } from "./binaryInsert";

describe("binaryInsert", () => {
  let mockData = [];
  for (let i = 5; i < 88; i += 3) {
    mockData.push({ name: `paul ${i}`, time: i });
  }
  it("should insert it in correct location", () => {
    let mockInput = { name: "frank", time: 37 };
    console.log(binaryInsert(mockData, mockInput));
  });
  it("should insert it in correct location", () => {
    let mockInput = { name: "frank", time: 7 };
    console.log(binaryInsert(mockData, mockInput));
  });
  it("should insert it in correct location", () => {
    let mockInput = { name: "frank", time: 100 };
    console.log(binaryInsert(mockData, mockInput));
  });
  it("should insert it in correct location", () => {
    let mockInput = { name: "frank", time: 38 };
    console.log(binaryInsert(mockData, mockInput));
  });
  it("should insert it in correct location", () => {
    let mockInput = { name: "frank", time: 9 };
    console.log(binaryInsert(mockData, mockInput));
  });
  it("should insert it in correct location", () => {
    let mockInput = { name: "frank", time: 5 };
    console.log(binaryInsert(mockData, mockInput));
  });

  it("should insert it in correct location", () => {
    let mockInput = { name: "frank", time: 37 };
    console.log(binaryInsert(mockData, mockInput));
  });
  it("should insert it in correct location", () => {
    let mockInput = { name: "frank", time: 86 };
    console.log(binaryInsert(mockData, mockInput));
  });
});
