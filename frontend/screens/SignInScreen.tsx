import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../NavigationContainerContainer";
import CustomButton from "../components/CustomButton/CustomButton";
import DisplayAnImage from "../components/CustomButton/DisplayAnImage";
import CustomInput from "../components/CustomInput/CustomInput";
import { useUserContext } from "../contexts/UserContext";
import * as Haptics from "expo-haptics";
import * as Speech from "expo-speech";
import Ios_extraKeyboardPadding from "../components/Ios_extraKeyboardPadding";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function SignInScreen({ navigation }: Props) {
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();
  const { signIn, user } = useUserContext();
  const onLoginFailedHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const speak = (data: string) => {
    const thingToSay = "Welcome " + data;
    Speech.speak(thingToSay);
  };

  const onSignInPressed = async (data: any) => {
    const result = await signIn({ username: data.username, password: data.password });
    if (result) {
      navigation.navigate("Main");
      speak(data.username);
    } else {
      alert("Something went wrong");
      return;
    }
  };
  const onPressCreateAccount = () => {
    navigation.navigate("SignUp");
  };

  return (
    <Ios_extraKeyboardPadding>
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
                value: 6,
                message: "Password should be minimum 6 characters long",
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
    </Ios_extraKeyboardPadding>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
});
