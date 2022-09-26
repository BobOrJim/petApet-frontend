import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Text, Image, View, Button, BackHandler } from "react-native";
import { RootStackParamList } from "../App";
import { useAdverts } from "../contexts/AdvertContext";
import { Advert } from "../models/Advert";

type Props = NativeStackScreenProps<RootStackParamList, "AdvertDetails">;

export default function AdvertDetailsScreen({ route, navigation }: Props) {
  const [advert, setAdvert] = useState<Advert>();
  const [advertId, setAdvertId] = useState(route.params.advertId);
  const { getAdvertById, getNextAdvert } = useAdverts();

  let touchX = 0; // ??

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

  return (
    <View
      style={{ height: "100%" }}
      onTouchStart={(e) => (touchX = e.nativeEvent.pageX)}
      onTouchEnd={(e) => {
        if (touchX - e.nativeEvent.pageX > 20) {
          nextAdvert();
        } else if (touchX - e.nativeEvent.pageX < 20) {
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

    </View>
  );
}
