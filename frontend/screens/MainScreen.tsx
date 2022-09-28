import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { RootStackParamList } from "../App";
import AdvertList from "../components/AdvertsList";
import CustomButton from "../components/CustomButton/CustomButton";

type Props = NativeStackScreenProps<RootStackParamList, "Main">;

export default function MainScreen({ navigation }: Props) {
  return (
    <>
      <View>
        <Text style={{ fontSize: 50 }}>Sök&Filter kommer här</Text>
        <CustomButton text='Go to add advert' onPress={() => navigation.navigate("AddAdvert")} />
      </View>
      <AdvertList navigation={navigation} />
    </>
  );
}
