import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

interface Props {
  children: React.ReactNode;
}

export default function Ios_extraKeyboardPadding({ children }: Props) {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={56}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }} //kanske denna. Flex grow 1 har funkat.
      enabled
    >
      {children}
    </KeyboardAvoidingView>
  );
}
