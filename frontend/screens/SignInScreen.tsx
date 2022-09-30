import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../App";
import CustomButton from "../components/CustomButton/CustomButton";
import DisplayAnImage from "../components/CustomButton/DisplayAnImage";
import CustomInput from "../components/CustomInput/CustomInput";
import { useUserContext } from "../contexts/UserContext";
import * as Haptics from "expo-haptics";
import * as Speech from "expo-speech";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function SignInScreen({ navigation }: Props) {
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();
  const { signIn } = useUserContext();

  const onLoginFailedHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const speak = (data: string) => {
    const thingToSay = "Welcome " + data;
    Speech.speak(thingToSay);
  };

  const onSignInPressed = (data: any) => {
    navigation.navigate("Main");
    console.log(data);
    signIn({ username: data.username, password: data.password });
    speak(data.username);
  };
  const onPressCreateAccount = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <DisplayAnImage></DisplayAnImage>
        <CustomInput
          name='username'
          placeholder='Username'
          control={control}
          rules={{ required: "Username is required" }}
        />
        <CustomInput
          name='password'
          placeholder='Password'
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be minimum 8 characters long",
            },
          }}
          secureTextEntry
        />
        <CustomButton
          text='Login to Pet@Pet'
          onPress={handleSubmit(onSignInPressed, onLoginFailedHaptic)}
        />
        <CustomButton
          text='Dont have an account? Create one'
          onPress={onPressCreateAccount}
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
});
