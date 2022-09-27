import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import AdvertList from "../components/AdvertsList";
import CustomButton from "../components/CustomButton/CustomButton";
export default function MainScreen() {
  type Nav = {
    navigate: (value: string) => void;
  };
  const navigation = useNavigation<Nav>();
  const onAddVert = () => {
    navigation.navigate("AddAdvert");
  };
  return (
    <>
      <View>
        <Text style={{ fontSize: 50 }}>Sök&Filter kommer här</Text>
        <CustomButton text='Go to add advert' onPress={onAddVert} />
      </View>
      <AdvertList />
    </>
  );
}
