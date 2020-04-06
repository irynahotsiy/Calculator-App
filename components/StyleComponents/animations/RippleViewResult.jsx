import React from "react";
import { Animated, View } from "react-native";
import { deviceHeight, deviceWidth } from "../../../constants/device_params";

export function RippleViewResult(props) {
  const { opacityValue, scaleValue } = props;

  return (
    <Animated.View
      style={{
        width: deviceWidth,
        height: deviceWidth,
        borderRadius: deviceWidth * 2,
        bottom: deviceWidth - (deviceWidth + deviceWidth / 2) - 10,
        right: deviceWidth - (deviceWidth + deviceWidth / 2) - 10,
        transform: [{ scale: scaleValue }],
        opacity: opacityValue,
        backgroundColor: "grey",
        position: "absolute",
        zIndex: 1,
      }}
    />
  );
}
