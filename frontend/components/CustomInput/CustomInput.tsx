import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  maxLength,
  keyboardType,
  defaultValue = "",
}: any) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: error ? "red" : "#e8e8e8" }]}>
            <TextInput
              defaultValue={defaultValue}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              maxLength={maxLength}
              keyboardType={keyboardType}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && <Text style={{ color: "red", alignSelf: "stretch" }}>{error.message}</Text>}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",

    minWidth: "100%",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,

    borderRadius: 5,
    marginVertical: 5,
  },
  input: {},
});

export default CustomInput;
