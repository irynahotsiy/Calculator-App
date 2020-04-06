import React, { useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RippleViewElement } from "../StyleComponents/animations/RippleViewElement";

export function ElementBox(props) {
  const opacity = 0.12;
  const [maxOpacity] = useState(opacity);
  const [scaleValue] = useState(new Animated.Value(0.01));
  const [opacityValue] = useState(new Animated.Value(opacity));

  function onPressedIn() {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 225,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: Platform.OS === "android",
    }).start();
  }

  function onPressOut() {
    Animated.timing(opacityValue, {
      toValue: 0,
      useNativeDriver: Platform.OS === "android",
    }).start(() => {
      scaleValue.setValue(0.01);
      opacityValue.setValue(maxOpacity);
    });
  }

  function onLongPressedOut(symbol) {
    if (props.onLongBackspaceClick) {
      props.onLongBackspaceClick(props.symbol);
      onPressOut();
    }
  }

  function onPressedOut(symbol) {
    props.onElementClick(props.symbol);
    onPressOut();
  }

  const elemContainer = {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    userSelect: "none",
  };

  return (
    <TouchableWithoutFeedback
      onLongPress={onLongPressedOut}
      onPressIn={onPressedIn}
      onPressOut={onPressedOut}
    >
      <View style={[styles.elemContainer, elemContainer]}>
        <RippleViewElement
          isInNumberPad={props.isInNumberPad}
          scaleValue={scaleValue}
          opacityValue={opacityValue}
        />

        <Text
          style={{
            textAlign: "center",
            color: props.color,
            fontSize: 30,
            fontFamily: "linotte-reg",
          }}
        >
          {props.symbol}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
