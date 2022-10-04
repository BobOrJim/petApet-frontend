// @ts-nocheck
import { View, StyleSheet } from "react-native";
import { Button, Card, Switch, Text } from "react-native-paper";
import { useTheme } from "../contexts/ThemeContext";
import ColorPicker from "react-native-wheel-color-picker";
import { useState } from "react";

type focusedItem = "card" | "background" | "surface";

export default function SettingsScreen() {
  const {
    darkmode,
    setDarkmode,
    customColors,
    setCustomColors,
    usingCustomTheme,
    setUsingCustomTheme,
  } = useTheme();
  const [focusedItem, setFocusedItem] = useState<focusedItem>("card");

  return (
    <View>
      <View style={styles.switchContainer}>
        <Text variant='titleMedium'>Darkmode</Text>
        <Switch value={darkmode} onValueChange={setDarkmode} disabled={usingCustomTheme} />
      </View>

      <View style={styles.switchContainer}>
        <Text variant='titleMedium'>Custom theme</Text>
        <Switch value={usingCustomTheme} onValueChange={setUsingCustomTheme} />
      </View>

      {usingCustomTheme && (
        <Card elevation={5} style={styles.centered}>
          <View style={styles.buttonContainer}>
            <Button
              mode={focusedItem === "card" ? "contained" : "elevated"}
              style={{ flexGrow: 1 }}
              onPress={() => setFocusedItem("card")}
            >
              <Text>card</Text>
            </Button>

            <Button
              mode={focusedItem === "background" ? "contained" : "elevated"}
              style={{ flexGrow: 1 }}
              onPress={() => setFocusedItem("background")}
            >
              <Text>background</Text>
            </Button>

            <Button
              mode={focusedItem === "surface" ? "contained" : "elevated"}
              style={{ flexGrow: 1 }}
              onPress={() => setFocusedItem("surface")}
            >
              <Text>surface</Text>
            </Button>
          </View>
          <ColorPicker
            thumbSize={20}
            sliderSize={20}
            noSnap={true}
            row={false}
            swatches={false}
            color={customColors[focusedItem]}
            onColorChangeComplete={(color) =>
              setCustomColors((prevState) => ({ ...prevState, [focusedItem]: color }))
            }
          />
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    marginHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centered: {
    marginHorizontal: 10,
    height: 310,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
