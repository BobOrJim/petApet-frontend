import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton/CustomButton";
import CustomInput from "../components/CustomInput/CustomInput";
import { useUserContext } from "../contexts/UserContext";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function SignUpScreen() {
  const { control, handleSubmit, watch } = useForm({});
  const { signUp } = useUserContext();
  const pwd = watch("password");

  // tillfällig navigate kod
  type Nav = {
    navigate: (value: string) => void;
  };
  const navigation = useNavigation<Nav>();
  // Tell the onHaveAnAccount where to navigate
  const onHaveAnAccount = () => {
    navigation.navigate("SignIn");
  };
  const onRegisterPressed = (data: any) => {
    // Tell the onRegisterPressed where to navigate
    navigation.navigate("");
    console.log(data);
    signUp(data.username, data.email, data.password);
  };
  // tillfällig navigate kod

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
              value: 3,
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
          onPress={onHaveAnAccount}
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

export default SignUpScreen;
