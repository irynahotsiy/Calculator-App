import { OPERATORS } from "../constants/operators";

function isNotDefined(item) {
  return item === undefined;
}
export function isOperator(contentArray, n) {
  if (isNotDefined(contentArray)) {
    return false;
  } else if (
    contentArray[contentArray.length - n] === OPERATORS.DIVIDE ||
    contentArray[contentArray.length - n] === OPERATORS.MINUS ||
    contentArray[contentArray.length - n] === OPERATORS.MULTIPLY ||
    contentArray[contentArray.length - n] === OPERATORS.PLUS
  ) {
    return true;
  } else {
    return false;
  }
}

export function isElementMultiplyOrDivide(contentArray, n) {
  if (isNotDefined(contentArray)) {
    return false;
  } else if (
    contentArray[contentArray.length - n] === OPERATORS.MULTIPLY ||
    contentArray[contentArray.length - n] === OPERATORS.DIVIDE
  ) {
    return true;
  } else {
    return false;
  }
}

export function roundResult(result) {
  return parseFloat(result)
    .toString()
    .substring(0, 10);
}

export function getLastSymbol(array) {
  if (isNotDefined(array)) {
    return undefined;
  } else {
    return array[array.length - 1];
  }
}

export function canInputMinusNumber(array) {
  if (isNotDefined(array)) {
    return false;
  } else if (array.length === 0) {
    return true;
  } else if (!isOperator(array, 1)) {
    return true;
  } else if (isElementMultiplyOrDivide(array, 1)) {
    return true;
  } else {
    return false;
  }
}

export function startedMinusNumber(array) {
  if (array.length === 1 && array[0] === OPERATORS.MINUS) {
    return true;
  }

  if (array.length > 2) {
    return (
      getLastSymbol(array) === OPERATORS.MINUS &&
      isElementMultiplyOrDivide(array, 2)
    );
  }

  return false;
}

export function getFontSizeOfResultField(array) {
  if (array.length < 8) {
    return 60;
  } else if (array.length >= 8 && array.length < 15) {
    return 50;
  } else {
    return 40;
  }
}

export function checkIfSymbolIsOperator(symbol) {
  if (
    symbol === OPERATORS.DIVIDE ||
    symbol === OPERATORS.MINUS ||
    symbol === OPERATORS.MULTIPLY ||
    symbol === OPERATORS.PLUS
  ) {
    return true;
  } else {
    return false;
  }
}

export function checkIfSymbolIsDevideOrMyltiply(symbol) {
  if (symbol === OPERATORS.DIVIDE || symbol === OPERATORS.MULTIPLY) {
    return true;
  }
  return false;
}

export function checkIfSymbolIsMinus(symbol) {
  return symbol === OPERATORS.MINUS;
}

export function isNotEmptyItem(symbol) {
  return symbol !== " ";
}

export function isEmptyArray(array) {
  if (array.length === 0) {
    return true;
  }
  return false;
}
