import { OPERATORS } from "../constants/operators";
import {
  canInputMinusNumber,
  checkIfSymbolIsDevideOrMyltiply,
  checkIfSymbolIsMinus,
  checkIfSymbolIsOperator,
  getFontSizeOfResultField,
  getLastSymbol,
  isElementMultiplyOrDivide,
  isNotEmptyItem,
  isOperator,
  roundResult,
  startedMinusNumber,
} from "../helpers/helpers";

describe("isOperator", () => {
  test("should return false array is undefined", () => {
    expect(isOperator(undefined, 11)).toBe(false);
  });
  test("should return false when array is empty", () => {
    expect(isOperator([], 1)).toBe(false);
  });
  test("should return false when number is undefined", () => {
    expect(
      isOperator(["1", "3", "10", 67, ".", OPERATORS.MULTIPLY, 67, "."])
    ).toBe(false);
  });
  test("should return true when current symbol is DIVIDE", () => {
    expect(isOperator(["2", "2", OPERATORS.DIVIDE], 1)).toBe(true);
  });
  test("should return true when current symbol is MINUS", () => {
    expect(
      isOperator(["10", "4", "34", OPERATORS.MINUS, "10", "4", "34"], 4)
    ).toBe(true);
  });
  test("should return true when current symbol is PLUS", () => {
    expect(isOperator(["1", "3", "10", 67, ".", OPERATORS.PLUS, "."], 2)).toBe(
      true
    );
  });
  test("should return true when current symbol is MULTIPLY", () => {
    expect(
      isOperator(["1", "3", "10", 67, ".", OPERATORS.MULTIPLY, 67, "."], 3)
    ).toBe(true);
  });
  test("should return false when length of array is less than number", () => {
    expect(
      isOperator(["1", "3", "10", 67, ".", OPERATORS.MULTIPLY, 67, "."], 11)
    ).toBe(false);
  });
});

describe("isElementMultiplyOrDivide", () => {
  test("should return false array is undefined", () => {
    expect(isElementMultiplyOrDivide(undefined, 11)).toBe(false);
  });
  test("should return false when array is empty", () => {
    expect(isElementMultiplyOrDivide([], 1)).toBe(false);
  });
  test("should return false when number is undefined", () => {
    expect(
      isElementMultiplyOrDivide([
        "1",
        "3",
        "10",
        67,
        ".",
        OPERATORS.MULTIPLY,
        67,
        ".",
      ])
    ).toBe(false);
  });
  test("should return false when length of array is less than number", () => {
    expect(
      isElementMultiplyOrDivide(
        ["1", "3", "10", 67, ".", OPERATORS.MULTIPLY, 67, "."],
        11
      )
    ).toBe(false);
  });
  test("should return true when current symbol is DIVIDE", () => {
    expect(isElementMultiplyOrDivide(["2", "2", OPERATORS.DIVIDE], 1)).toBe(
      true
    );
  });
  test("should return true when current symbol is MULTIPLY", () => {
    expect(
      isOperator(["1", "3", "10", 67, ".", OPERATORS.MULTIPLY, 67, "."], 3)
    ).toBe(true);
  });
});

describe("roundResult", () => {
  test("should return a substring rounded to 10 digits length when result is float number", () => {
    expect(roundResult(13.3333333333333333333)).toEqual("13.3333333");
  });
  test("should return a substring", () => {
    expect(roundResult(13)).toEqual("13");
  });
  test("should return a substring", () => {
    expect(roundResult(0)).toEqual("0");
  });
  test("should return a substring", () => {
    expect(roundResult(1.22222)).toEqual("1.22222");
  });
});

describe("getLastSymbol", () => {
  test("should return undefined when array is undefined", () => {
    expect(getLastSymbol(undefined)).toEqual(undefined);
  });
  test("should return undefined when array is empty", () => {
    expect(getLastSymbol([])).toEqual(undefined);
  });
  test("should return the last symbol of array", () => {
    expect(
      getLastSymbol(["1", OPERATORS.MULTIPLY, "9", OPERATORS.MINUS, "3", "."])
    ).toEqual(".");
    expect(
      getLastSymbol([
        "1",
        OPERATORS.MULTIPLY,
        "9",
        OPERATORS.MINUS,
        "3",
        ".",
        "44",
        OPERATORS.MINUS,
      ])
    ).toEqual(OPERATORS.MINUS);
  });
});

describe("canInputMinusNumber", () => {
  test("should return false when array is undefined", () => {
    expect(canInputMinusNumber()).toBe(false);
  });
  test("should return true when there are no items in the array", () => {
    expect(canInputMinusNumber([])).toBe(true);
  });
  test("should return true when last symbol in array is not operator", () => {
    expect(canInputMinusNumber(["1", OPERATORS.MINUS, "7"])).toBe(true);
  });
  test("should return true when last symbol in array is DIVIDE or MULTIPLY", () => {
    expect(
      canInputMinusNumber(["1", OPERATORS.MINUS, "7", OPERATORS.MULTIPLY])
    ).toBe(true);
    expect(
      canInputMinusNumber(["1", OPERATORS.MINUS, "7", OPERATORS.DIVIDE])
    ).toBe(true);
  });
});

describe("startedMinusNumber", () => {
  test("should return true when array length is 1 digit and the digit is MINUS", () => {
    expect(startedMinusNumber([OPERATORS.MINUS])).toBe(true);
  });
  test("should return true when array length is 1 digit and the digit is MINUS", () => {
    expect(startedMinusNumber([OPERATORS.MINUS])).toBe(true);
  });
  test("should return true when array length is more than two digits, the last digit in the array is MINUS and digit before minus is DIVIDE or MULTIPLY", () => {
    expect(
      startedMinusNumber([
        OPERATORS.MINUS,
        "1",
        OPERATORS.PLUS,
        "23",
        OPERATORS.DIVIDE,
        OPERATORS.MINUS,
      ])
    ).toBe(true);
    expect(
      startedMinusNumber([
        OPERATORS.MINUS,
        "1",
        OPERATORS.PLUS,
        "23",
        OPERATORS.MULTIPLY,
        OPERATORS.MINUS,
      ])
    ).toBe(true);
  });
  test("should return false when array length is more than two digits, the last digit in the array is MINUS and digit before minus is MINUS or PLUS", () => {
    expect(
      startedMinusNumber([
        OPERATORS.MINUS,
        "1",
        OPERATORS.PLUS,
        "23",
        OPERATORS.PLUS,
        OPERATORS.MINUS,
      ])
    ).toBe(false);
    expect(
      startedMinusNumber([
        OPERATORS.MINUS,
        "1",
        OPERATORS.PLUS,
        "23",
        OPERATORS.MINUS,
        OPERATORS.MINUS,
      ])
    ).toBe(false);
  });
  test("should return false when array length is more than two digits, the last digit in the array is PLUS and digit before plus is DIVIDE or MULTIPLY", () => {
    expect(
      startedMinusNumber([
        OPERATORS.MINUS,
        "1",
        OPERATORS.PLUS,
        "23",
        OPERATORS.DIVIDE,
        OPERATORS.PLUS,
      ])
    ).toBe(false);
    expect(
      startedMinusNumber([
        OPERATORS.MINUS,
        "1",
        OPERATORS.PLUS,
        "23",
        OPERATORS.MULTIPLY,
        OPERATORS.PLUS,
      ])
    ).toBe(false);
  });
  test("should return false when array length is more than two digits, the last digit in the array is DIVIDE or MULTIPLY and digit before plus is DIVIDE or MULTIPLY", () => {
    expect(
      startedMinusNumber([
        OPERATORS.MINUS,
        "1",
        OPERATORS.PLUS,
        "23",
        OPERATORS.DIVIDE,
        OPERATORS.MULTIPLY,
      ])
    ).toBe(false);
    expect(
      startedMinusNumber([
        OPERATORS.MINUS,
        "1",
        OPERATORS.PLUS,
        "23",
        OPERATORS.MULTIPLY,
        OPERATORS.DIVIDE,
      ])
    ).toBe(false);
    expect(
      startedMinusNumber([
        OPERATORS.MINUS,
        "1",
        OPERATORS.PLUS,
        "23",
        OPERATORS.DIVIDE,
        OPERATORS.DIVIDE,
      ])
    ).toBe(false);
    expect(
      startedMinusNumber([
        OPERATORS.MINUS,
        "1",
        OPERATORS.PLUS,
        "23",
        OPERATORS.MULTIPLY,
        OPERATORS.MULTIPLY,
      ])
    ).toBe(false);
  });
});

describe("getFontSizeOfResultField", () => {
  test("should return 60 when length of array is less than 8", () => {
    expect(getFontSizeOfResultField(["2", OPERATORS.MULTIPLY])).toEqual(60);
  });
  test("should return 60 when length of array is less than 8", () => {
    expect(
      getFontSizeOfResultField([
        "2",
        OPERATORS.MULTIPLY,
        "3",
        OPERATORS.MULTIPLY,
        "66",
        OPERATORS.MINUS,
        "55",
      ])
    ).toEqual(60);
  });
  test("should return 50 when length of array is more than 8 and less than 15", () => {
    expect(
      getFontSizeOfResultField([
        "2",
        OPERATORS.MULTIPLY,
        "3",
        OPERATORS.MULTIPLY,
        "66",
        OPERATORS.MINUS,
        "55",
        OPERATORS.MULTIPLY,
      ])
    ).toEqual(50);
    expect(
      getFontSizeOfResultField([
        "2",
        OPERATORS.MULTIPLY,
        "3",
        OPERATORS.MULTIPLY,
        "66",
        OPERATORS.MINUS,
        "55",
        OPERATORS.MULTIPLY,
        "2",
        OPERATORS.MULTIPLY,
        "3",
        OPERATORS.MULTIPLY,
        "66",
        OPERATORS.MINUS,
      ])
    ).toEqual(50);
  });
  test("should return 50 when length of array is more than 15", () => {
    expect(
      getFontSizeOfResultField([
        "2",
        OPERATORS.MULTIPLY,
        "3",
        OPERATORS.MULTIPLY,
        "66",
        OPERATORS.MINUS,
        "55",
        OPERATORS.MULTIPLY,
        "2",
        OPERATORS.MULTIPLY,
        "3",
        OPERATORS.MULTIPLY,
        "66",
        OPERATORS.MINUS,
        "55",
      ])
    ).toEqual(40);
    expect(
      getFontSizeOfResultField([
        "2",
        OPERATORS.MULTIPLY,
        "3",
        OPERATORS.MULTIPLY,
        "66",
        OPERATORS.MINUS,
        "55",
        OPERATORS.MULTIPLY,
        "2",
        OPERATORS.MULTIPLY,
        "3",
        OPERATORS.MULTIPLY,
        "66",
        OPERATORS.MINUS,
        "55",
        OPERATORS.MULTIPLY,
        "2",
        OPERATORS.MULTIPLY,
        "3",
        OPERATORS.MULTIPLY,
        "66",
        OPERATORS.MINUS,
        "55",
      ])
    ).toEqual(40);
  });
});

describe("checkIfSymbolIsOperator", () => {
  test("should return true when symbol is DIVIDE", () => {
    expect(checkIfSymbolIsOperator(OPERATORS.DIVIDE)).toBe(true);
  });
  test("should return true when symbol is MULTIPLY", () => {
    expect(checkIfSymbolIsOperator(OPERATORS.MULTIPLY)).toBe(true);
  });
  test("should return true when symbol is PLUS", () => {
    expect(checkIfSymbolIsOperator(OPERATORS.PLUS)).toBe(true);
  });
  test("should return true when symbol is MINUS", () => {
    expect(checkIfSymbolIsOperator(OPERATORS.MINUS)).toBe(true);
  });
  test("should return false when symbol is not MINUS, PLUS, MULTIPLY or DIVIDE", () => {
    expect(checkIfSymbolIsOperator("23")).toBe(false);
  });
});

describe("checkIfSymbolIsDevideOrMyltiply", () => {
  test("should return true when symbol is DIVIDE", () => {
    expect(checkIfSymbolIsDevideOrMyltiply(OPERATORS.DIVIDE)).toBe(true);
  });
  test("should return true when symbol is MULTIPLY", () => {
    expect(checkIfSymbolIsDevideOrMyltiply(OPERATORS.MULTIPLY)).toBe(true);
  });
  test("should return false when symbol is PLUS", () => {
    expect(checkIfSymbolIsDevideOrMyltiply(OPERATORS.PLUS)).toBe(false);
  });
  test("should return false when symbol is MINUS", () => {
    expect(checkIfSymbolIsDevideOrMyltiply(OPERATORS.MINUS)).toBe(false);
  });
  test("should return false when symbol is dot", () => {
    expect(checkIfSymbolIsDevideOrMyltiply(".")).toBe(false);
  });
});

describe("checkIfSymbolIsMinus", () => {
  test("should return true when symbol is MINUS", () => {
    expect(checkIfSymbolIsMinus(OPERATORS.MINUS)).toBe(true);
  });
  test("should return false when symbol is not MINUS", () => {
    expect(checkIfSymbolIsMinus(OPERATORS.PLUS)).toBe(false);
    expect(checkIfSymbolIsMinus(OPERATORS.DIVIDE)).toBe(false);
    expect(checkIfSymbolIsMinus(OPERATORS.DIVIDE)).toBe(false);
    expect(checkIfSymbolIsMinus("34")).toBe(false);
  });
});

describe("isNotEmptyItem", () => {
  test("should return true when symbol is not empty", () => {
    expect(isNotEmptyItem("34")).toBe(true);
  });
  test("should return false when symbol is empty", () => {
    expect(isNotEmptyItem(" ")).toBe(false);
  });
});
