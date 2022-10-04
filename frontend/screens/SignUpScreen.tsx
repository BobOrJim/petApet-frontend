import * as Haptics from "expo-haptics";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../NavigationContainerContainer";
import CustomButton from "../components/CustomButton/CustomButton";
import CustomInput from "../components/CustomInput/CustomInput";
import { useUserContext } from "../contexts/UserContext";

export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?~_+-=|).{6,32}$/;
type Props = NativeStackScreenProps<RootStackParamList>;

export default function SignUpScreen({ navigation }: Props) {
  const { control, handleSubmit, watch } = useForm({});
  const { signUp } = useUserContext();
  const pwd = watch("password");

  const onPressSignIn = () => {
    navigation.navigate("SignIn");
  };
  const onRegisterFailed = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };
  const onRegisterPressed = async (data: any) => {
    const result = await signUp({
      username: data.username,
      email: data.email,
      password: data.password,
    });
    if (result) {
      navigation.navigate("SignIn");
    } else {
      alert("Something went wrong. Try again later.");
      return;
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInput
          placeholder='Username'
          name='username'
          control={control}
          rules={{ required: "Username is required" }}
        />
        <CustomInput
          placeholder='Email'
          name='email'
          control={control}
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Must be a valid email adress" },
          }}
        />
        <CustomInput
          placeholder='Password'
          name='password'
          control={control}
          secureTextEntry
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password should be minimum 6 characters long",
            },
            pattern: {
              value: PWD_REGEX,
              message:
                "Password too weak. Requires: A number\nOne lower and one uppercase character.\nOne special character. Minimum length: 6.",
            },
          }}
        />
        <CustomInput
          placeholder='Repeat password'
          name='passwordRepeat'
          control={control}
          secureTextEntry
          rules={{
            required: "Repeat password",
            validate: (value: any) => value === pwd || "Password not matching",
          }}
        />
        <CustomButton text='Register' onPress={handleSubmit(onRegisterPressed, onRegisterFailed)} />
        <CustomButton
          text='Have an account? Sign in'
          onPress={onPressSignIn}
          bgColor='#FFFFFF'
          fgColor='#000000'
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#851C60",
    margin: 10,
  },
});
