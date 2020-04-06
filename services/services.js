import { OPERATORS } from "../constants/operators";
import {
  checkIfSymbolIsDevideOrMyltiply,
  checkIfSymbolIsMinus,
  checkIfSymbolIsOperator,
  isNotEmptyItem,
} from "../helpers/helpers";

export function getJoinedArray(symbols) {
  let result = [];
  let currentItem = [];
  for (let i = 0; i < symbols.length + 1; i++) {
    if (
      checkIfSymbolIsDevideOrMyltiply(symbols[i - 1]) &&
      checkIfSymbolIsMinus(symbols[i])
    ) {
      currentItem.push(symbols[i]);
    } else if (checkIfSymbolIsOperator(symbols[i]) && i !== 0) {
      result.push(currentItem.join(""));
      result.push(symbols[i]);
      currentItem = [];
    } else if (i === symbols.length) {
      result.push(currentItem.join(""));
      currentItem = [];
    } else if (isNotEmptyItem(symbols[i])) {
      currentItem.push(symbols[i]);
    }
  }
  return result;
}

export function calculate(arrayItems) {
  const items = getJoinedArray(arrayItems);
  if (items.length <= 1) {
    return parseFloat(items[0]);
  } else {
    switch (items[1]) {
      case OPERATORS.PLUS:
        if (!checkIfSymbolIsDevideOrMyltiply(items[3])) {
          return calculate([
            parseFloat(items[0]) + parseFloat(items[2]),
            ...items.slice(3),
          ]);
        }
        return parseFloat(items[0]) + calculate(items.slice(2));
      case OPERATORS.MINUS:
        if (!checkIfSymbolIsDevideOrMyltiply(items[3])) {
          return calculate([
            parseFloat(items[0]) - parseFloat(items[2]),
            ...items.slice(3),
          ]);
        }
        return parseFloat(items[0]) - calculate(items.slice(2));
      case OPERATORS.MULTIPLY:
        return calculate([
          parseFloat(items[0]) * parseFloat(items[2]),
          ...items.slice(3),
        ]);
      case OPERATORS.DIVIDE:
        return calculate([
          parseFloat(items[0]) / parseFloat(items[2]),
          ...items.slice(3),
        ]);
      default:
        alert("");
    }
  }
}
