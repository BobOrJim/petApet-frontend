import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Text, Image, View, BackHandler, StyleSheet } from "react-native";
import { Button, Surface } from "react-native-paper";
import { RootStackParamList } from "../App";
import { useAdverts } from "../contexts/AdvertContext";
import { Advert } from "../models/Advert";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SMS from "expo-sms";
import * as Mail from "expo-mail-composer";

type Props = NativeStackScreenProps<RootStackParamList, "AdvertDetails">;

export default function AdvertDetailsScreen({ route, navigation }: Props) {
  const [advert, setAdvert] = useState<Advert>();
  const [advertId, setAdvertId] = useState(route.params.advertId);
  const [visibility, setVisibility] = useState(false);
  const [isAvailable, setIsAvailable] = useState({ text: false, mail: false });
  const { getAdvertById, getNextAdvert } = useAdverts();
  // const { getUserById } = useUser();

  let touchX = 0;

  useEffect(() => {
    getAdvertById(advertId).then((advert) => setAdvert(advert));
  }, [advertId]);

  useEffect(() => {
    SMS.isAvailableAsync().then(isAvailable => setIsAvailable(prevState => ({...prevState, text: isAvailable})));
    Mail.isAvailableAsync().then(isAvailable => setIsAvailable(prevState => ({...prevState, mail: isAvailable})));
  }, []);

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

  function sendText() {
    // user = getUserById(advert?.userId)
    // SMS.sendSMSAsync(user.phonenumber, "")
    SMS.sendSMSAsync("000000000", "Hejsan, ");
  }

  function sendMail() {
    Mail.composeAsync({
      // recipients: [user.mail]
      recipients: ["placeholder@asd.com"],
      subject: "Hejsan",
    });
  }

  return (
    <View
      style={{ height: "100%" }}
      onTouchStart={(e) => (touchX = e.nativeEvent.pageX)}
      onTouchEnd={(e) => {
        if (touchX - e.nativeEvent.pageX > 20) {
          nextAdvert();
        } else if (e.nativeEvent.pageX - touchX > 20) {
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
          console.log("hejsan");
        }}
      >
        <Text>Kontakta ägaren</Text>
      </Button>
      {visibility && (
        <View style={styles.buttonContainer}>
          {isAvailable.text && (
            <Button style={styles.button} onPress={sendText}>
              <Text>
                sms <Ionicons name={"exit-outline"} size={17} />
              </Text>
            </Button>
          )}
          {isAvailable.mail && (
            <Button style={styles.button} onPress={sendMail}>
              <Text>
                mail <Ionicons name={"exit-outline"} size={17} />
              </Text>
            </Button>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
});
