import StringMask from "./index";

describe("StringMask", () => {
  it("should instance with mask", () => {
    const mask = new StringMask({
      mask: "000.000.000-00",
    });

    expect(mask.options).toEqual({
      mask: "000.000.000-00",
    });
  });

  it("should apply mask", () => {
    const mask = new StringMask({ mask: "000.000.000-00" });

    expect(mask.apply("12345678901")).toEqual({
      masked: "123.456.789-01",
      unmasked: "12345678901",
    });
  });

  it("should apply mask with reverse", () => {
    const mask = new StringMask({ mask: "00/00/0000", reverse: true });

    expect(mask.apply("041994")).toEqual({
      masked: "04/1994",
      unmasked: "041994",
    });
  });

  it("should apply mask with optional and reverse", () => {
    const mask = new StringMask({ mask: "00/00/{00}00", reverse: true });

    expect(mask.apply("04/94")).toEqual({
      masked: "04/94",
      unmasked: "0494",
    });

    expect(mask.apply("04/1994")).toEqual({
      masked: "04/1994",
      unmasked: "041994",
    });
  });

  it("should apply mask with optional", () => {
    const mask = new StringMask({ mask: "00/00/{00}00" });

    expect(mask.apply("110494")).toEqual({
      masked: "11/04/94",
      unmasked: "110494",
    });

    expect(mask.apply("0494")).toEqual({
      masked: "04/94",
      unmasked: "0494",
    });
  });

  it("should apply mask with recursive", () => {
    const mask = new StringMask({ mask: "00,0[00.0]" });

    expect(mask.apply("123456789012345")).toEqual({
      masked: "12,345.678.901.234.5",
      unmasked: "123456789012345",
    });

    expect(mask.apply("12,345.678.901.234.5")).toEqual({
      masked: "12,345.678.901.234.5",
      unmasked: "123456789012345",
    });
  });

  it("should apply mask with recursive and reverse", () => {
    const mask = new StringMask({ mask: "[.000],00", reverse: true });

    expect(mask.apply("123456789012345")).toEqual({
      masked: "1.234.567.890.123,45",
      unmasked: "123456789012345",
    });

    expect(mask.apply("1.234.567.890.123,45")).toEqual({
      masked: "1.234.567.890.123,45",
      unmasked: "123456789012345",
    });
  });

  it("should apply mask with recursive, optional and reverse", () => {
    const mask = new StringMask({ mask: "[0.{0}0]0,00", reverse: true });

    expect(mask.apply("123456789012345")).toEqual({
      masked: "1.234.567.890.123,45",
      unmasked: "123456789012345",
    });

    expect(mask.apply("1.234.567.90.123,45")).toEqual({
      masked: "1.234.567.90.123,45",
      unmasked: "12345679012345",
    });
  });

  it("should apply mask with letters", () => {
    const mask = new StringMask({ mask: "AAA-0000" });

    expect(mask.apply("ABC1234")).toEqual({
      masked: "ABC-1234",
      unmasked: "ABC1234",
    });

    expect(mask.apply("ABC-1234")).toEqual({
      masked: "ABC-1234",
      unmasked: "ABC1234",
    });
  });

  it("should apply mask with letters and reverse", () => {
    const mask = new StringMask({ mask: "AAA-0000", reverse: true });

    expect(mask.apply("AABC1234")).toEqual({
      masked: "ABC-1234",
      unmasked: "ABC1234",
    });

    expect(mask.apply("AABC-1234")).toEqual({
      masked: "ABC-1234",
      unmasked: "ABC1234",
    });
  });

  it("should apply mask with letters, reverse and optional", () => {
    const mask = new StringMask({ mask: "AAA-{A}0000", reverse: true });

    expect(mask.apply("ABC-1234")).toEqual({
      masked: "ABC-1234",
      unmasked: "ABC1234",
    });

    expect(mask.apply("ABCC1234")).toEqual({
      masked: "ABC-C1234",
      unmasked: "ABCC1234",
    });

    expect(mask.apply("ABC-C1234")).toEqual({
      masked: "ABC-C1234",
      unmasked: "ABCC1234",
    });
  });

  it("should apply mask with letters optional", () => {
    const mask = new StringMask({ mask: "AA{A}-000" });

    expect(mask.apply("ABC-234")).toEqual({
      masked: "ABC-234",
      unmasked: "ABC234",
    });

    expect(mask.apply("ABC234")).toEqual({
      masked: "ABC-234",
      unmasked: "ABC234",
    });

    expect(mask.apply("AB234")).toEqual({
      masked: "AB-234",
      unmasked: "AB234",
    });
  });

  it("should apply mask with alphanumeric", () => {
    const mask = new StringMask({ mask: "SSS-A00" });

    expect(mask.apply("A1B-C34")).toEqual({
      masked: "A1B-C34",
      unmasked: "A1BC34",
    });

    expect(mask.apply("A1BC34")).toEqual({
      masked: "A1B-C34",
      unmasked: "A1BC34",
    });
  });

  it("should apply mask with alphanumeric and reverse", () => {
    const mask = new StringMask({ mask: "SSS-A00" });

    expect(mask.apply("A1B-C34")).toEqual({
      masked: "A1B-C34",
      unmasked: "A1BC34",
    });

    expect(mask.apply("A1BC34")).toEqual({
      masked: "A1B-C34",
      unmasked: "A1BC34",
    });
  });

  it("should apply mask with alphanumeric and reverse", () => {
    const mask = new StringMask({ mask: "SS-S00", reverse: true });

    expect(mask.apply("AB1-C34")).toEqual({
      masked: "B1-C34",
      unmasked: "B1C34",
    });

    expect(mask.apply("AB1C34")).toEqual({
      masked: "B1-C34",
      unmasked: "B1C34",
    });
  });

  it("should apply mask with alphanumeric, optional and reverse", () => {
    const mask = new StringMask({ mask: "SS-{S}00", reverse: true });

    expect(mask.apply("AB1-C34")).toEqual({
      masked: "B1-C34",
      unmasked: "B1C34",
    });

    expect(mask.apply("AB1-34")).toEqual({
      masked: "B1-34",
      unmasked: "B134",
    });

    expect(mask.apply("AB1C34")).toEqual({
      masked: "B1-C34",
      unmasked: "B1C34",
    });
  });

  it("should apply mask with escape token char", () => {
    const mask = new StringMask({ mask: "AAA-$000" });

    expect(mask.apply("ABC-34")).toEqual({
      masked: "ABC-034",
      unmasked: "ABC34",
    });

    expect(mask.apply("ABC34")).toEqual({
      masked: "ABC-034",
      unmasked: "ABC34",
    });
  });

  it("should apply mask with escape the escape char", () => {
    const mask = new StringMask({ mask: "AAA-$$00" });

    expect(mask.apply("ABC-34")).toEqual({
      masked: "ABC-$34",
      unmasked: "ABC34",
    });

    expect(mask.apply("ABC34")).toEqual({
      masked: "ABC-$34",
      unmasked: "ABC34",
    });

    expect(mask.apply("ABC$")).toEqual({
      masked: "ABC-$",
      unmasked: "ABC",
    });
  });

  it("should apply mask with any char", () => {
    const mask = new StringMask({ mask: "AAA-*00" });

    expect(mask.apply("ABC-/34")).toEqual({
      masked: "ABC-/34",
      unmasked: "ABC/34",
    });

    expect(mask.apply("ABC/34")).toEqual({
      masked: "ABC-/34",
      unmasked: "ABC/34",
    });
  });

  it("should apply mask ignoring not valid inputs", () => {
    const mask = new StringMask({ mask: "AAA-000" });

    expect(mask.apply("AB2313133133C-123")).toEqual({
      masked: "ABC-123",
      unmasked: "ABC123",
    });
  });

  it("should update mask", () => {
    const mask = new StringMask({ mask: "AAA-000" });

    expect(mask.apply("ABC-1234")).toEqual({
      masked: "ABC-123",
      unmasked: "ABC123",
    });

    mask.updateOptions({
      mask: "AAA-000",
    });

    expect(mask.value).toEqual("ABC-123");
    expect(mask.unmaskedValue).toEqual("ABC123");

    const values = mask.updateOptions({
      mask: 'AA-A000',
    });

    expect(values).toEqual({
      masked: "AB-C123",
      unmasked: "ABC123",
    });
  });

  it("should mask with non pattern token", () => {
    const mask = new StringMask({ mask: "AAAF-0000" });

    expect(mask.apply("ABCF-1234")).toEqual({
      masked: "ABCF-1234",
      unmasked: "ABC1234",
    });
  });

  it("should call onProcessInputChar", () => {
    const mask = new StringMask({
      mask: "$0*,0[0{0}.0]",
    });

    let inputChar: string[] = [];
    let fixedChar: string[] = [];
    mask.apply("2,a345.67.8", {
      onProcessInputChar: (char) => {
        inputChar.push(char);
      },
      onProcessFixedChar: (char) => {
        fixedChar.push(char);
      },
    });

    expect(fixedChar).toEqual(["0", ",", ".", "."]);
    expect(inputChar).toEqual([
      "2",
      ",",
      "a",
      "3",
      "4",
      "5",
      ".",
      "6",
      "7",
      ".",
      "8",
    ]);

    inputChar = [];
    fixedChar = [];
    mask.apply("1234567890123456789", {
      onProcessInputChar: (char) => {
        inputChar.push(char);
      },
      onProcessFixedChar: (char) => {
        fixedChar.push(char);
      },
    });

    expect(inputChar).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ]);
    expect(fixedChar).toEqual(["0", ",", ".", ".", ".", ".", "."]);
  });
});
