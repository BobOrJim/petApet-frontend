import { View, StyleSheet, Text, Button } from "react-native";
import { TextInput } from "react-native-paper";
import { SearchParams } from "../../screens/MainScreen";
import { Dispatch } from "react";

interface Props {
  searchFilters: SearchParams;
  setSearchfilters: Dispatch<React.SetStateAction<SearchParams>>;
}

export default function AdvertSearchfilters({
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
