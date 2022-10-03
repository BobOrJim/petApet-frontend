import { useState } from "react";
import { useForm } from "react-hook-form";
import { View, Image, StyleSheet } from "react-native";
import { Button, IconButton, Text, TextInput, Title } from "react-native-paper";
import CustomButton from "../components/CustomButton/CustomButton";
import CustomInput from "../components/CustomInput/CustomInput";
import { useUserContext } from "../contexts/UserContext";
import { User } from "../models/User";
import { IMGURL_REGEX } from "./AddAdvertScreen";



export default function UserScreen() {
  const { user, updateUser } = useUserContext();
  const [editMode, setEditMode] = useState(false);
  const { control, handleSubmit } = useForm<User>({});
  

  async function onSubmit(data: User){
    console.log(data)
    if(user) {
      const result = await updateUser({
        ...user, 
        phoneNr: data.phoneNr ? data.phoneNr : user.phoneNr,
        profilePictureUrl: data.profilePictureUrl ? data.profilePictureUrl : user.profilePictureUrl,
        alias: data.alias ? data.alias : user.alias
      })

      console.log(result) // hade gärna fått en bool här 
    }
  }

  return (
    <View style={styles.container}>
        <Image style={styles.profilePicture} source={{uri: user?.profilePictureUrl ? user?.profilePictureUrl : "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png"}} />
        {
        editMode ?
        <View>
          <Title>EditMode: True</Title>
          <CustomInput
            defaultValue={user?.alias}
            value={user?.alias}
            name='Alias'
            placeholder='Alias'
            control={control}
            keyboardType={"default"}
            rules={{
              minLength: {
              value: 3,
              message: "Alias must be minimum 3 characters long",
            }
            }}
          />
          <CustomInput
            defaultValue={user?.phoneNr}
            name='phoneNr'
            placeholder='Phone number'
            value={user?.phoneNr}
            control={control}
            keyboardType={"numeric"}
            rules={{
              required: "Phone number is required",
              pattern: { value: /^[+]?\d{8,12}$/, message: "Must be valid phone number" },
            }}
          />
          <CustomInput
            defaultValue={user?.profilePictureUrl}
            placeholder='Profile picture url'
            name='profilePictureUrl'
            value={user?.profilePictureUrl}
            keyboardType={"url"}
            control={control}
            rules={{
                pattern: {value: IMGURL_REGEX, message: "Must be a valid url adress"}
            }}
          />
          <View style={{justifyContent: "center", marginLeft: "auto", marginRight: "auto"}}>
            <CustomButton
              text='Update profile'
              onPress={handleSubmit(onSubmit)}
            />
            <CustomButton
              text='Discard changes'
              bgColor="#c50f1f"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
        :
        <View><Title>Info här</Title></View>
        }

        <View style={styles.buttonContainer}>
          <Button mode="contained" buttonColor="#c50f1f">Delete account</Button>
          <Button mode="contained" onPress={() => setEditMode(prevState => !prevState)}>Edit profile</Button>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
    height: "95%",
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  profilePicture: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  }
})