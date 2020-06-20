import { reverseStr } from "./reverseString";

describe("StringMask", () => {
  it("should reverse string", () => {
    const mask = reverseStr('12345')

    expect(mask).toBe('54321')
  });
});
