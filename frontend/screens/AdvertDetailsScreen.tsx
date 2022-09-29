import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { Text, Image, View, BackHandler } from "react-native";
import { Button } from "react-native-paper";
import { RootStackParamList } from "../App";
import { useAdverts } from "../contexts/AdvertContext";
import { Advert } from "../models/Advert";
import ContactUserButton from "../components/AdvertComponents/ContactUserButtons";

type Props = NativeStackScreenProps<RootStackParamList, "AdvertDetails">;

export default function AdvertDetailsScreen({ route, navigation }: Props) {
  const [advert, setAdvert] = useState<Advert>();
  const [advertId] = useState(route.params.advertId);
  const [visibility, setVisibility] = useState(false);
  const { getAdvertById, getNextAdvert } = useAdverts();
  const touchX = useRef(0);


  useEffect(() => {
    getAdvertById(advertId).then((advert) => setAdvert(advert));
  }, [advertId]);


  useEffect(() => {
    const backButtonEvent = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate("Main");
      return true;
    });
    return () => backButtonEvent.remove();
  }, []);

  function nextAdvert() {
    const nextId = getNextAdvert(advertId);
    if (nextId !== "") {
      navigation.push("AdvertDetails", { advertId: nextId });
    }
  }

  function toggleVisibility() {
    setVisibility((prevState) => !prevState);
  }


  return (
    <View
      style={{ height: "100%" }}
      onTouchStart={(e) => (touchX.current = e.nativeEvent.pageX)}
      onTouchEnd={(e) => {
        if (touchX.current - e.nativeEvent.pageX > 20) {
          nextAdvert();
        } else if (e.nativeEvent.pageX - touchX.current > 20) {
          navigation.goBack();
        }
      }}
    >
      <Image source={{ uri: advert?.imageUrls }} style={{ height: 100, width: 100 }} />
      <Text>Age: {advert?.age}</Text>
      <Text>RentPeriod: {advert?.rentPeriod}</Text>
      <Text>Name: {advert?.name}</Text>
      <Text>Personality: {advert?.personallity}</Text>
      <Text>Race: {advert?.race}</Text>
      <Text>Id: {advert?.id}</Text>
      <Text>Sex: {advert?.sex}</Text>
      <Text>Sex: {advert?.sex}</Text>
      <Button
        onPress={() => {
          toggleVisibility();
        }}
      >
        <Text>Kontakta ägaren</Text>
      </Button>
      {visibility && <ContactUserButton />}

    </View>
  );
}

