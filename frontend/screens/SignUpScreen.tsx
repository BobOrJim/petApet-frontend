import * as Haptics from "expo-haptics";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";
import CustomButton from "../components/CustomButton/CustomButton";
import CustomInput from "../components/CustomInput/CustomInput";
import { useUserContext } from "../contexts/UserContext";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
type Props = NativeStackScreenProps<RootStackParamList>;

export default function SignUpScreen({ navigation }: Props) {
  const { control, handleSubmit, watch } = useForm({});
  const { signUp } = useUserContext();
  const pwd = watch("password");

  const onPressSignIn = () => {
    navigation.navigate("SignIn");
  };
  const onRegisterPressed = (data: any) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.navigate("User");
    console.log(data);
    signUp({ username: data.username, email: data.email, password: data.password });
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
          rules={{ pattern: { value: EMAIL_REGEX, message: "Must be a valid email adress" } }}
        />
        <CustomInput
          placeholder='Password'
          name='password'
          control={control}
          secureTextEntry
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be minimum 8 characters long",
            },
          }}
        />
        <CustomInput
          placeholder='Repeat password'
          name='passwordRepeat'
          control={control}
          secureTextEntry
          rules={{
            validate: (value: any) => value === pwd || "Password not matching",
          }}
        />
        <CustomButton text='Register' onPress={handleSubmit(onRegisterPressed)} />
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
