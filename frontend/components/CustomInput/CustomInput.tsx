import React from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { KeyboardTypeOptions, StyleSheet, View } from "react-native";
import { TextInput, Text } from "react-native-paper";

interface Props {
  control: Control;
  name: string;
  rules?: Partial<RegisterOptions>;
  placeholder: string;
  secureTextEntry?: boolean;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  defaultValue?: string;
}

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  maxLength,
  keyboardType,
  defaultValue = "",
}: Props) => {
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
