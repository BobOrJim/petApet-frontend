import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const CustomButton = ({ onPress, text, bgColor, fgColor }: any) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, bgColor ? { backgroundColor: bgColor } : {}]}
    >
      <Text style={[styles.text, fgColor ? { color: fgColor } : {}]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 175,
    width: "75%",
    backgroundColor: "#3871F3",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
});

export default CustomButton;
