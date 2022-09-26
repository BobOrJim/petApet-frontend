import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import CustomButton from "../components/CustomButton/CustomButton";
import DisplayAnImage from "../components/CustomButton/DisplayAnImage";
import CustomInput from "../components/CustomInput/CustomInput";

export default function SignInScreen() {
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();

  // tillfällig navigate kod
  type Nav = {
    navigate: (value: string) => void;
  };
  const navigation = useNavigation<Nav>();
  const onSignInPressed = (data: any) => {
    navigation.navigate("Main");
    console.log(data);
  };
  const onCreateAccount = () => {
    navigation.navigate("SignUp");
  };
  // tillfällig navigate kod

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <DisplayAnImage></DisplayAnImage>
        <CustomInput
          name='username'
          placeholder='username'
          control={control}
          rules={{ required: "Username is required" }}
        />
        <CustomInput
          name='password'
          placeholder='password'
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password should be minimum 3 characters long",
            },
          }}
          secureTextEntry
        />
        <CustomButton text='Login to Pet@Pet' onPress={handleSubmit(onSignInPressed)} />
        <CustomButton text='Dont have an account? Create one' onPress={onCreateAccount} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
});
