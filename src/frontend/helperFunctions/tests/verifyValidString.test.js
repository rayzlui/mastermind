import { verifyValidString } from "../verifyValidString";

describe("verifyValidString", () => {
  let shortStringMessage =
    "Username and password must be longer than 8 characters";
  let alphanumericMessage =
    "Username and password may only be alphanumeric characters";
  it("should return false if string is less than 8 characters long", () => {
    let mockString = "abc";
    let mockInfoCallBack = jest.fn();
    let verifyingString = verifyValidString(mockString, mockInfoCallBack);
    expect(verifyingString).toBe(false);
    expect(mockInfoCallBack).toHaveBeenCalledWith(shortStringMessage);
  });
  it("should return false if there are non-alphanumeric characters", () => {
    let mockString = "ab*#c324joidojfsd349d";
    let mockInfoCallBack = jest.fn();
    let verifyingString = verifyValidString(mockString, mockInfoCallBack);
    expect(verifyingString).toBe(false);
    expect(mockInfoCallBack).toHaveBeenCalledWith(alphanumericMessage);
  });

  it("should return true if longer than 8 characters and all alphanumeric characters", () => {
    let mockString = "abdc12345";
    let mockInfoCallBack = jest.fn();
    let verifyingString = verifyValidString(mockString, mockInfoCallBack);
    expect(verifyingString).toBe(true);
    expect(mockInfoCallBack).not.toHaveBeenCalledWith();
  });

  it("should return true if longer than 8 characters and all alphanumeric characters and contains capitalized letters", () => {
    let mockString = "abDCS12345";
    let mockInfoCallBack = jest.fn();
    let verifyingString = verifyValidString(mockString, mockInfoCallBack);
    expect(verifyingString).toBe(true);
    expect(mockInfoCallBack).not.toHaveBeenCalledWith();
  });
});
