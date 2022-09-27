import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Audio } from "expo-av";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import CustomButton from "../components/CustomButton/CustomButton";
import DisplayAnImage from "../components/CustomButton/DisplayAnImage";
import CustomInput from "../components/CustomInput/CustomInput";

const IMGURL_REGEX = /(https?:\/\/.*\.(?:png|jpg))/i;

export default function AddAdvertScreen() {
  const [sound, setSound] = React.useState<Audio.Sound>();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(require("../assets/dog_woof.mp3"));
    setSound(sound);

    await sound.playAsync();
  }
  React.useEffect(() => {
    return () => {
      console.log("Unloading Sound");
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const onAddAdvertPressed = () => {
    navigation.navigate("Main");
    playSound();
  };

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

  // tillfällig navigate kod
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <DisplayAnImage></DisplayAnImage>
        <Text style={{ fontSize: 20 }}>Add Advert</Text>
        <CustomInput
          name='petName'
          placeholder='Pet name'
          control={control}
          rules={{ required: "Pet name is required" }}
        />
        <CustomInput
          name='age '
          placeholder='Age'
          control={control}
          keyboardType={"numeric"}
          rules={{
            required: "Age is required",
          }}
        />
        <CustomInput
          name='race'
          placeholder='Race'
          control={control}
          rules={{
            required: "Race is required",
            minLength: {
              value: 1,
              message: "Must be longer than 0",
            },
          }}
        />
        <CustomInput
          name='sex'
          placeholder='Sex'
          control={control}
          rules={{
            required: "Sex is required",
            minLength: {
              value: "",
              message: "Must be longer than 0",
            },
          }}
        />
        <CustomInput
          name='personality'
          placeholder='Personality'
          control={control}
          rules={{
            minLength: {
              value: 3,
              message: "Must be longer than 3",
            },
          }}
        />
        <CustomInput
          name='rent period'
          placeholder='Rent Period'
          control={control}
          rules={{
            required: "Rent period is required",
          }}
        />
        <CustomInput
          name='imageUrls'
          placeholder='ImageUrls'
          control={control}
          rules={{
            pattern: { value: IMGURL_REGEX, message: "Must be a valid url adress" },
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
