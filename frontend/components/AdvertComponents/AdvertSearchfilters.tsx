import { View, StyleSheet, Text, Button } from "react-native";
import { TextInput } from "react-native-paper";
import { SearchParams } from "../../screens/MainScreen";
import { Dispatch } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { useAdverts } from "../../contexts/AdvertContext";

interface Props {
  navigation: any;
  searchFilters: SearchParams;
  setSearchfilters: Dispatch<React.SetStateAction<SearchParams>>;
}

export default function AdvertSearchfilters({
  navigation,
  setSearchfilters,
  searchFilters,
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={searchFilters.searchAll}
        placeholder='frisök'
        onChangeText={(value) =>
          setSearchfilters((prevState) => ({ ...prevState, searchAll: value }))
        }
      />
      <CustomButton text='Go to add advert' onPress={() => navigation.navigate("AddAdvert")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
