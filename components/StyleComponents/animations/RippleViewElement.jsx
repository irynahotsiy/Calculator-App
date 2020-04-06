import React from "react";
import { Animated, View } from "react-native";
import { deviceHeight, deviceWidth } from "../../../constants/device_params";

export function RippleViewElement(props) {
  const { isInNumberPad, opacityValue, scaleValue } = props;

  const isScreenWide = deviceHeight < deviceWidth;
  const buttonHeight = ((deviceHeight / 3) * 2) / (isInNumberPad ? 4 : 5);

  const topOffset = props.isInNumberPad
    ? (buttonHeight - deviceWidth / 4) / 2
    : 0;
  const leftOffset = (deviceWidth / 4 - buttonHeight) / 2;
  return (
    <Animated.View
      style={{
        position: "absolute",
        top: isScreenWide ? 0 : topOffset,
        left: isScreenWide ? leftOffset : 0,
        width: isScreenWide ? buttonHeight : "100%",
        height: isScreenWide ? "100%" : deviceWidth / 4,
        borderRadius: buttonHeight,
        transform: [{ scale: scaleValue }],
        opacity: opacityValue,
        backgroundColor: "grey",
      }}
    />
  );
}
