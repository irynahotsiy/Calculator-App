import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export function Row(props) {
  if (props.flex) {
    return (
      <View
        style={[
          styles.displayRow,
          { flex: props.flex, backgroundColor: props.backgroundColor },
        ]}
      >
        {props.children}
      </View>
    );
  }
  return <View style={[styles.displayRow]}>{props.children}</View>;
}

const styles = StyleSheet.create({
  displayRow: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    overflow: "hidden",
  },
});
