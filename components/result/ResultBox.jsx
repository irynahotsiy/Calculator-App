import React, { useState } from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";

export function ResultBox(props) {
  if (Platform.OS === "ios" || Platform.OS === "android") {
    return (
      <View style={styles.resultViewBackground}>
        <Text
          style={[
            styles.resultTextBackground,
            { fontSize: props.fontSizeResult },
          ]}
        >
          {props.result}
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.resultViewBackground}>
      <Text style={[styles.resultTextBackground]}>{props.result}</Text>
    </View>
  );
}
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  resultTextBackground: {
    color: "#ffffff",
    textAlign: "right",
    fontSize: 60,
    fontFamily: "linotte-reg",
  },
  resultViewBackground: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "#2d3033",
    width: "100%",
    minWidth: width,
  },
});
