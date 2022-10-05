import React, { useEffect, useState } from "react";
import * as SMS from "expo-sms";
import * as Mail from "expo-mail-composer";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useUserContext } from "../../contexts/UserContext";
import { ContactDetails } from "../../models/User";

interface Props {
  userId: string | undefined;
}

export default function ContactUserButton({ userId }: Props) {
  const [isAvailable, setIsAvailable] = useState({ text: false, mail: false });
  const [contactDetails, setContactDetails] = useState<ContactDetails>({} as ContactDetails);
  const { GetContactDetailsByUserId } = useUserContext();

  useEffect(() => {
    SMS.isAvailableAsync().then((isAvailable) =>
      setIsAvailable((prevState) => ({ ...prevState, text: isAvailable })),
    );
    Mail.isAvailableAsync().then((isAvailable) =>
      setIsAvailable((prevState) => ({ ...prevState, mail: isAvailable })),
    );

    if (userId) {
      GetContactDetailsByUserId(userId).then((res) => setContactDetails(res));
    }
  }, []);

  function openTextApp() {
    SMS.sendSMSAsync(contactDetails.phoneNr, "Hejsan, ");
  }

  function openMailApp() {
    Mail.composeAsync({
      recipients: [contactDetails.email],
      subject: "Hejsan",
    });
  }

  return (
    <View style={styles.buttonContainer}>
      {isAvailable.text && contactDetails.phoneNr && (
        <Button
          style={styles.button}
          onPress={openTextApp}
          mode='contained-tonal'
          icon='exit-to-app'
        >
          sms
        </Button>
      )}
      {isAvailable.mail && contactDetails.email && (
        <Button
          style={styles.button}
          onPress={openMailApp}
          mode='contained-tonal'
          icon='exit-to-app'
        >
          mail
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
});
