import React, { useEffect, useState } from "react";
import * as SMS from "expo-sms";
import * as Mail from "expo-mail-composer";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

// interface Props: {
//     userId: string;
// }

export default function ContactUserButton() {
    const [isAvailable, setIsAvailable] = useState({ text: false, mail: false });
    // const [user, setUser] = useState<User>(undefined)
    // const { getUserById } = useUser();
    useEffect(() => {
        SMS.isAvailableAsync().then(isAvailable => setIsAvailable(prevState => ({...prevState, text: isAvailable})));
        Mail.isAvailableAsync().then(isAvailable => setIsAvailable(prevState => ({...prevState, mail: isAvailable})));
        // getUserById(userId).then(user => setUser(user))        
    }, []);

      function sendText() {
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
    )
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

