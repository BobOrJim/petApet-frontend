import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Audio } from "expo-av";
import { ScrollView, StyleSheet, View, Text, BackHandler } from "react-native";
import CustomButton from "../components/CustomButton/CustomButton";
import DisplayAnImage from "../components/CustomButton/DisplayAnImage";
import CustomInput from "../components/CustomInput/CustomInput";
import { useAdverts } from "../contexts/AdvertContext";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const IMGURL_REGEX = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/g;
const NUMBER_REGEX = /^[0-9]*$/;
const LETTER_REGEX = /^[A-Öa-ö]+$/;

type Props = NativeStackScreenProps<RootStackParamList, "AddAdvert">;

export default function AddAdvertScreen({ navigation }: Props) {
  const [sound, setSound] = React.useState<Audio.Sound>();
  const { addAdvert } = useAdverts();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(require("../assets/dog_woof.mp3"));
    setSound(sound);

    await sound.playAsync();
    React.useEffect(() => {
      return () => {
        console.log("Unloading Sound");
        if (sound) {
          sound.unloadAsync();
        }
      };
    }, [sound]);
  }

  useEffect(() => {
    const backButtonEvent = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate("Main");
      return true;
    });
    return () => backButtonEvent.remove();
  }, []);

  const onAddAdvertPressed = (data: any) => {
    console.log(data);
    addAdvert(data);
    playSound();
  };

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();

  // tillfällig navigate kod
  return (
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
          maxLength={2}
          keyboardType={"default"}
          control={control}
          rules={{
            required: "Personality is required",
            minLength: {
              value: 3,
              message: "Must be longer than 3",
            },
            maxLength: { value: 100, message: "Max 100 letters" },
            pattern: { value: LETTER_REGEX, message: "Must be letters" },
          }}
        />

        <CustomInput
          name='rentperiod'
          placeholder='Rent Period'
          maxLength={2}
          control={control}
          type='number'
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
          placeholder='ImageUrls'
          keyboardType={"url"}
          control={control}
          rules={{
            required: "Url is required",
            pattern: { value: IMGURL_REGEX, message: "Must be a valid url adress" },
            maxLength: { value: 300, message: "Too long url" },
          }}
        />
        <CustomButton text='Add advert' onPress={handleSubmit(onAddAdvertPressed)} />
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
