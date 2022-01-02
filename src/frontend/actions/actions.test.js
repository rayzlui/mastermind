import { generateMastermindCode, setMastermindCode } from "./actions";

describe("generateMastermindCode", () => {
  let mockCodeLength = 4;
  let mockMaxDigit = 7;
  let mockGenerateCode = jest.fn();
  let thunkAction = generateMastermindCode(
    mockCodeLength,
    mockMaxDigit,
    mockGenerateCode
  );
  it("should return a function", () => {
    expect(typeof thunkAction).toEqual("function");
  });
  let mockDispatch = jest.fn();
  it("should run generateCode with codeLength and maxDigits and then dispatch setMastermindCode", async () => {
    thunkAction(mockDispatch);
    expect(mockGenerateCode).toHaveBeenCalledWith(mockCodeLength, mockMaxDigit);
    expect(await mockDispatch).toHaveBeenCalledWith(setMastermindCode());
  });
});
