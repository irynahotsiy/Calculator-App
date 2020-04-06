import { OPERATORS } from "../constants/operators";
import { getJoinedArray, calculate } from "../services/services";

describe("getJoinedArray", () => {
  test("should return joined array", () => {
    expect(
      getJoinedArray(["1", "3", OPERATORS.MINUS, "8", OPERATORS.PLUS, "3", "4"])
    ).toStrictEqual(["13", OPERATORS.MINUS, "8", OPERATORS.PLUS, "34"]);
    expect(
      getJoinedArray([
        "1",
        ".",
        "3",
        OPERATORS.MINUS,
        "8",
        ".",
        "9",
        OPERATORS.MULTIPLY,
        OPERATORS.MINUS,
        "3",
        "4",
      ])
    ).toStrictEqual(["1.3", OPERATORS.MINUS, "8.9", OPERATORS.MULTIPLY, "-34"]);
  });
  expect(
    getJoinedArray(["1", "3", OPERATORS.MINUS, "8", OPERATORS.PLUS, "3", "4"])
  ).toStrictEqual(["13", OPERATORS.MINUS, "8", OPERATORS.PLUS, "34"]);
  expect(
    getJoinedArray([
      OPERATORS.MINUS,
      "1",
      "3",
      OPERATORS.MINUS,
      "8",
      OPERATORS.PLUS,
      "3",
      "4",
    ])
  ).toStrictEqual(["-13", OPERATORS.MINUS, "8", OPERATORS.PLUS, "34"]);
  expect(
    getJoinedArray([
      OPERATORS.MINUS,
      "1",
      "3",
      OPERATORS.MINUS,
      "8",
      " ",
      OPERATORS.PLUS,
      "3",
      "4",
      " ",
    ])
  ).toStrictEqual(["-13", OPERATORS.MINUS, "8", OPERATORS.PLUS, "34"]);
});

describe("calculate", () => {
  test("should return valid result", () => {
    expect(
      calculate([
        "34",
        OPERATORS.MINUS,
        "3",
        OPERATORS.MULTIPLY,
        "10",
        OPERATORS.DIVIDE,
        "2",
      ])
    ).toEqual(19);
    expect(
      calculate([
        "-23",
        OPERATORS.MULTIPLY,
        "-3",
        OPERATORS.PLUS,
        "10",
        OPERATORS.DIVIDE,
        "2",
      ])
    ).toEqual(74);
    expect(
      calculate([
        "-23",
        OPERATORS.MULTIPLY,
        "-3",
        OPERATORS.PLUS,
        "10",
        OPERATORS.DIVIDE,
        "2",
      ])
    ).toEqual(74);
    expect(
      calculate([
        "-23",
        OPERATORS.MULTIPLY,
        "-3",
        OPERATORS.MINUS,
        "10",
        OPERATORS.DIVIDE,
        "2",
      ])
    ).toEqual(64);
    expect(
      calculate([
        "-23",
        OPERATORS.MINUS,
        "3",
        OPERATORS.PLUS,
        "10",
        OPERATORS.PLUS,
        "2",
      ])
    ).toEqual(-14);
    expect(
      calculate([
        "-23",
        OPERATORS.PLUS,
        "3",
        OPERATORS.MINUS,
        "10",
        OPERATORS.MINUS,
        "2",
        OPERATORS.MINUS,
        "2",
        OPERATORS.MINUS,
        "2",
      ])
    ).toEqual(-36);
    expect(calculate(["-23", OPERATORS.MULTIPLY, "-2"])).toEqual(46);
  });
});
