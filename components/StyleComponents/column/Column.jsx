import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export function Column(props) {
  if (props.flex) {
    return (
      <View style={[styles.displayColumn, { flex: props.flex }]}>
        {props.children}
      </View>
    );
  } else {
    if (props.border) {
      return (
        <View style={styles.displayColumnWithLeftBorder}>{props.children}</View>
      );
    } else {
      return <View style={styles.displayColumn}>{props.children}</View>;
    }
  }
}

const column = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
};

const styles = StyleSheet.create({
  displayColumn: {
    ...column,
  },
  displayColumnWithLeftBorder: {
    ...column,
    borderStyle: "solid",
    borderLeftColor: "#434c58",
    borderLeftWidth: 0.5,
    overflow: "hidden",
  },
});
