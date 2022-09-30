import React, { useEffect, useState } from "react";
import * as SMS from "expo-sms";
import * as Mail from "expo-mail-composer";
import { View, StyleSheet } from "react-native";
import {  Text, Button } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUserContext } from "../../contexts/UserContext";
import { ContactDetails } from "../../models/User";

interface Props {
    userId: string | undefined;
}

export default function ContactUserButton({ userId } : Props) {
  const [isAvailable, setIsAvailable] = useState({ text: false, mail: false });
  const [contactDetails, setContactDetails] = useState<ContactDetails>({} as ContactDetails);
  const { user, GetContactDetailsByUserId } = useUserContext();

  useEffect(() => {
    SMS.isAvailableAsync().then((isAvailable) =>
      setIsAvailable((prevState) => ({ ...prevState, text: isAvailable })),
    );
    Mail.isAvailableAsync().then((isAvailable) =>
      setIsAvailable((prevState) => ({ ...prevState, mail: isAvailable })),
    );

    if(userId) {
      console.log("------------")
      GetContactDetailsByUserId(userId).then(res => console.log(res));
      console.log("------------")
    }

  }, []);

  function sendText() {
    SMS.sendSMSAsync("1336", "")
    // SMS.sendSMSAsync(contactDetails ? contactDetails.phoneNr : "", "Hejsan, ");
    // SMS.sendSMSAsync(contactDetails.phoneNr, "Hejsan, ");
  }

  function sendMail() {
    Mail.composeAsync({
      //recipients: [contactDetails.email],
      recipients: ["asd"],
      subject: "Hejsan",
    });
  }
  return (
    <View style={styles.buttonContainer}>
      <Button onPress={() => console.log(isAvailable)}  ><Text>Log availa</Text></Button>
      {isAvailable.text && //contactDetails.phoneNr && 
        <Button style={styles.button} onPress={sendText}>
          <Text>
            sms <Ionicons name={"exit-outline"} size={17} />
          </Text>
        </Button>
      }
      {isAvailable.mail && //contactDetails.email &&
        <Button style={styles.button} onPress={sendMail}>
          <Text>
            mail <Ionicons name={"exit-outline"} size={17} />
          </Text>
        </Button>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    flexDirection: "row",
  },
  button: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
