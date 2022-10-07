import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import CustomButton from "../components/CustomButton/CustomButton";
import DisplayAnImage from "../components/CustomButton/DisplayAnImage";
import CustomInput from "../components/CustomInput/CustomInput";
import { useAdverts } from "../contexts/AdvertContext";
import { RootStackParamList } from "../NavigationContainerContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ios_extraKeyboardPadding from "../components/Ios_extraKeyboardPadding";

export const IMGURL_REGEX = /^https?:\/\/(\w+\.)?imgur.com|imgur.io/;
const NUMBER_REGEX = /^[0-9]*$/;
const LETTER_REGEX = /^[A-Öa-ö\s]+$/;

type Props = NativeStackScreenProps<RootStackParamList, "AddAdvert">;

export default function AddAdvertScreen({ navigation }: Props) {
  const [sound, setSound] = useState<Audio.Sound>();
  const { addAdvert } = useAdverts();

  const onAddAdvertFailed = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };
  React.useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require("../assets/dog_woof.mp3"));
    setSound(sound);
    await sound.playAsync();
  }

  const onAddAdvertPressed = (data: any) => {
    addAdvert(data);
    alert("Advert added");
    navigation.navigate("Main");
    playSound();
  };

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();

  return (
    <Ios_extraKeyboardPadding>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <DisplayAnImage></DisplayAnImage>
          <Text style={{ fontSize: 20 }}>Add Advert</Text>
          <CustomInput
            name='name'
            placeholder='Pet name'
            control={control}
            keyboardType={"default"}
            rules={{
              required: "Pet name is required",
              pattern: { value: LETTER_REGEX, message: "Must be letters" },
            }}
          />
          <CustomInput
            name='age'
            placeholder='Age'
            control={control}
            maxLength={2}
            keyboardType={"numeric"}
            rules={{
              required: "Age is required",
              pattern: { value: NUMBER_REGEX, message: "Must be a number" },
              maxLength: {
                value: 2,
                message: "Cannot be longer than two numbers",
              },
            }}
          />
          <CustomInput
            name='race'
            placeholder='Race'
            control={control}
            keyboardType={"default"}
            rules={{
              required: "Race is required",
              minLength: {
                value: 2,
                message: "Must be longer than 0",
              },
              pattern: { value: LETTER_REGEX, message: "Must be letters" },
            }}
          />
          <CustomInput
            name='sex'
            placeholder='Sex'
            control={control}
            keyboardType={"default"}
            rules={{
              required: "Sex is required",
              minLength: {
                value: 1,
                message: "Must be longer than 0",
              },
              pattern: { value: LETTER_REGEX, message: "Must be letters" },
            }}
          />
          <CustomInput
            name='personallity'
            placeholder='Personality'
            keyboardType={"default"}
            control={control}
            rules={{
              required: "Personality is required",
              maxLength: { value: 100, message: "Max 100 letters" },
              pattern: { value: LETTER_REGEX, message: "Must be letters" },
            }}
          />
          <CustomInput
            name='rentperiod'
            placeholder='Rent Period'
            maxLength={2}
            control={control}
            keyboardType={"numeric"}
            rules={{
              maxLength: {
                value: 2,
                message: "Cannot be longer than two numbers",
              },
              required: "Rent period is required",
              pattern: { value: NUMBER_REGEX, message: "Must be a number" },
            }}
          />

          <CustomInput
            name='imageUrls'
            placeholder='IMGUR url'
            keyboardType={"url"}
            control={control}
            rules={{
              required: "IMGUR url is required",
              pattern: { value: IMGURL_REGEX, message: "Must be a valid IMGUR url adress" },
              maxLength: { value: 300, message: "Too long url" },
            }}
          />
          <CustomButton
            text='Add advert'
            onPress={handleSubmit(onAddAdvertPressed, onAddAdvertFailed)}
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
