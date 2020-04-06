import { AppLoading } from "expo";
import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  Easing,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ElementBox } from "./components/element/ElementBox";
import { ResultBox } from "./components/result/ResultBox";
import { RippleViewResult } from "./components/StyleComponents/animations/RippleViewResult";
import { Column } from "./components/StyleComponents/column/Column";
import { Row } from "./components/StyleComponents/rows/Row";
import { Colors } from "./constants/colors";
import { OPERATORS } from "./constants/operators";
import { fetchFonts } from "./fetch/FetchFonts";
import {
  canInputMinusNumber,
  getFontSizeOfResultField,
  getLastSymbol,
  isEmptyArray,
  isOperator,
  roundResult,
  startedMinusNumber,
} from "./helpers/helpers";
import { calculate } from "./services/services";

export default function App(props) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [contentArray, setContentArray] = useState([]);
  const [isBackspace, setIsBackspace] = useState(true);
  const [isFloatNumber, setIsFloatNumber] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const resultBox = useRef(null);

  const opacity = 0.3;

  const [maxOpacity] = useState(opacity);
  const [scaleValue] = useState(new Animated.Value(0.001));
  const [opacityValue] = useState(new Animated.Value(opacity));

  function onPressClearIn() {
    Animated.timing(scaleValue, {
      toValue: 3,
      duration: 600,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: Platform.OS === "android",
    }).start();
  }

  function onPressClearOut() {
    Animated.timing(opacityValue, {
      toValue: 0,
      duration: 600,
      easing: Easing.bezier(1, 0, 1, 0),
      useNativeDriver: Platform.OS === "android",
    }).start(() => {
      scaleValue.setValue(0.01);
      opacityValue.setValue(maxOpacity);
    });
  }

  function onPressInOutClearAll() {
    if (!isEmptyArray(contentArray)) {
      onPressClearIn();
      onPressClearOut();
    }
  }

  function replaceLastSymbol(symbol) {
    setContentArray([...contentArray.slice(0, -1), symbol]);
  }

  function addSymbol(symbol) {
    setContentArray([...contentArray, symbol]);
    setIsResult(false);
  }

  function startAgain(symbol) {
    setContentArray(symbol ? [symbol] : []);
    setIsBackspace(true);
    setIsFloatNumber(false);
    setIsResult(false);
  }

  function setResult(result) {
    setContentArray([result]);
    setIsBackspace(false);
    setIsFloatNumber(false);
    setIsResult(true);
  }

  function clearLast() {
    setContentArray(contentArray.slice(0, -1));
    setIsFloatNumber(false);
    setIsResult(false);
  }

  function addScrollToEnd() {
    setTimeout(() => {
      if (resultBox.current) {
        resultBox.current.scrollToEnd();
      }
    });
  }

  function onClearClick() {
    startAgain();
    onPressInOutClearAll();
  }

  function onBackspaseClick() {
    if (getLastSymbol(contentArray) === ".") {
      setIsFloatNumber(false);
    }

    if (!isEmptyArray(contentArray)) {
      clearLast();
    }
    addScrollToEnd();
  }

  function onLongBackspaceClick() {
    startAgain();
    addScrollToEnd();
    onPressInOutClearAll();
  }

  function onEqualClick() {
    if (isEmptyArray(contentArray)) {
      return;
    }

    if (!isOperator(contentArray, 1)) {
      setResult(roundResult(calculate(contentArray)));
    }
    addScrollToEnd();
  }

  function onElementClick(symbol) {
    if (isEmptyArray(contentArray) || isResult === true) {
      startAgain(symbol);
    } else {
      addSymbol(symbol);
    }
    addScrollToEnd();
  }

  function onOperatorClick(symbol) {
    if (symbol === OPERATORS.MINUS) {
      if (canInputMinusNumber(contentArray)) {
        addSymbol(symbol);
      } else {
        replaceLastSymbol(symbol);
      }
    } else {
      if (contentArray.length > 0) {
        if (isOperator(contentArray, 1)) {
          if (!startedMinusNumber(contentArray)) {
            replaceLastSymbol(symbol);
          }
        } else {
          addSymbol(symbol);
        }
      }
    }
    setIsFloatNumber(false);
    setIsBackspace(true);
    addScrollToEnd();
  }

  function onDotClick(symbol) {
    if (isResult) {
      startAgain(".");
      return;
    }

    if (getLastSymbol(contentArray) !== "." && !isFloatNumber) {
      addSymbol(symbol);
      setIsFloatNumber(true);
    }
    addScrollToEnd();
  }

  const elemContainer = {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    userSelect: "none",
  };

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      ></AppLoading>
    );
  }
  return (
    <View style={styles.mainContainerBackground}>
      <Row flex={1} backgroundColor={Colors.result_background}>
        <View style={[styles.elemContainer, elemContainer]}>
          <RippleViewResult
            scaleValue={scaleValue}
            opacityValue={opacityValue}
          />
          <ScrollView
            ref={resultBox}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <ResultBox
              fontSizeResult={getFontSizeOfResultField(contentArray)}
              result={contentArray.join("")}
            />
          </ScrollView>
        </View>
      </Row>

      <Row flex={2}>
        <Column flex={3}>
          <Row>
            <Column>
              <ElementBox
                isInNumberPad={true}
                symbol="7"
                color={Colors.white_color}
                onElementClick={onElementClick}
              />
              <ElementBox
                isInNumberPad={true}
                color={Colors.white_color}
                symbol="4"
                onElementClick={onElementClick}
              />
              <ElementBox
                isInNumberPad={true}
                color={Colors.white_color}
                symbol="1"
                onElementClick={onElementClick}
              />
              <ElementBox
                isInNumberPad={true}
                color={Colors.white_color}
                symbol="0"
                onElementClick={onElementClick}
              />
            </Column>
            <Column>
              <ElementBox
                isInNumberPad={true}
                color={Colors.white_color}
                symbol="8"
                onElementClick={onElementClick}
              />
              <ElementBox
                isInNumberPad={true}
                color={Colors.white_color}
                symbol="5"
                onElementClick={onElementClick}
              />
              <ElementBox
                isInNumberPad={true}
                color={Colors.white_color}
                symbol="2"
                onElementClick={onElementClick}
              />
              <ElementBox
                isInNumberPad={true}
                onElementClick={onDotClick}
                color={Colors.white_color}
                symbol="."
              />
            </Column>
            <Column>
              <ElementBox
                isInNumberPad={true}
                color={Colors.white_color}
                symbol="9"
                onElementClick={onElementClick}
              />
              <ElementBox
                isInNumberPad={true}
                color={Colors.white_color}
                symbol="6"
                onElementClick={onElementClick}
              />
              <ElementBox
                isInNumberPad={true}
                color={Colors.white_color}
                symbol="3"
                onElementClick={onElementClick}
              />
              <ElementBox
                isInNumberPad={true}
                onElementClick={onEqualClick}
                color={Colors.white_color}
                symbol="="
              />
            </Column>
          </Row>
        </Column>
        <Column border="left">
          {isBackspace ? (
            <ElementBox
              color={Colors.blue_color}
              symbol="⌫"
              onElementClick={onBackspaseClick}
              onLongBackspaceClick={onLongBackspaceClick}
            />
          ) : (
            <ElementBox
              color={Colors.blue_color}
              symbol="C"
              onElementClick={onClearClick}
            />
          )}
          <ElementBox
            color={Colors.blue_color}
            symbol={OPERATORS.DIVIDE}
            onElementClick={onOperatorClick}
          />
          <ElementBox
            color={Colors.blue_color}
            symbol={OPERATORS.MULTIPLY}
            onElementClick={onOperatorClick}
          />
          <ElementBox
            color={Colors.blue_color}
            symbol={OPERATORS.MINUS}
            onElementClick={onOperatorClick}
          />
          <ElementBox
            color={Colors.blue_color}
            symbol={OPERATORS.PLUS}
            onElementClick={onOperatorClick}
          />
        </Column>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainerBackground: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#171819",
  },
});
